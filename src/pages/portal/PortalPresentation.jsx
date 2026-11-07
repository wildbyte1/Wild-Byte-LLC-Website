import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { getBlob, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { useAuth } from '../../context/useAuth';
import { buildDeck } from '../../lib/buildDeck';

const PPTX_MIME = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';

const blobToDataUrl = (blob) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });

const downloadBlob = (blob, fileName) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
};

const PortalPresentation = () => {
  const { childId } = useParams();
  const { user } = useAuth();
  const [child, setChild] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [selected, setSelected] = useState({});
  const [title, setTitle] = useState('');
  const [favorite, setFavorite] = useState('');
  const [next, setNext] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    try {
      const childSnap = await getDoc(doc(db, 'children', childId));
      if (!childSnap.exists() || childSnap.data().parentUid !== user.uid) {
        setError('We could not find that child.');
        return;
      }
      const c = childSnap.data();
      setChild(c);
      setTitle(`${c.displayName}’s Nature Journal`);
      setFavorite(c.favorite || '');
      setNext(c.next || '');

      const q = query(collection(db, 'uploads'), where('parentUid', '==', user.uid), where('childId', '==', childId));
      const snap = await getDocs(q);
      const rows = await Promise.all(
        snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((u) => u.contentType?.startsWith('image/'))
          .map(async (u) => ({ ...u, url: await getDownloadURL(ref(storage, u.storagePath)).catch(() => null) })),
      );
      rows.sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));
      setPhotos(rows);
      setSelected(Object.fromEntries(rows.map((r) => [r.id, true])));
    } catch (err) {
      console.error(err);
      setError('Could not load photos.');
    }
  }, [childId, user.uid]);

  useEffect(() => { load(); }, [load]);

  const chosen = photos.filter((p) => selected[p.id]);

  const saveReflections = async () => {
    await updateDoc(doc(db, 'children', childId), {
      favorite: favorite.trim(),
      next: next.trim(),
      reflectionUpdatedAt: serverTimestamp(),
    });
  };

  const handleSaveAnswers = async () => {
    setError('');
    setNotice('');
    try {
      await saveReflections();
      setNotice('Your answers are saved.');
    } catch (err) {
      console.error(err);
      setError('Could not save your answers. Please try again.');
    }
  };

  const generate = async () => {
    setError('');
    setNotice('');
    setBusy(true);
    try {
      // Save the answers first, but never block the download if this fails.
      try { await saveReflections(); } catch (err) { console.error(err); }

      const items = [];
      for (const p of chosen) {
        const blob = await getBlob(ref(storage, p.storagePath));
        items.push({ dataUrl: await blobToDataUrl(blob), caption: p.caption });
      }
      const { blob, fileName } = await buildDeck({
        childName: child.displayName,
        title: title.trim() || 'My Nature Journal',
        favorite,
        next,
        items,
      });

      downloadBlob(blob, fileName);

      // Keep a copy for Wild Byte staff. The parent's download already succeeded.
      try {
        const storagePath = `decks/${user.uid}/${childId}/deck.pptx`;
        await uploadBytes(ref(storage, storagePath), blob, { contentType: PPTX_MIME });
        await setDoc(doc(db, 'decks', childId), {
          childId,
          parentUid: user.uid,
          childName: child.displayName,
          consentLevel: child.consentLevel,
          storagePath,
          fileName,
          size: blob.size,
          updatedAt: serverTimestamp(),
        });
        setNotice('Your presentation was downloaded, and a copy was saved for Wild Byte staff.');
      } catch (err) {
        console.error(err);
        setNotice('Your presentation was downloaded, but we could not save a copy for Wild Byte. Please email the file to contact@wildbyte.dev.');
      }
    } catch (err) {
      console.error(err);
      setError('Could not build the presentation. If this keeps happening, contact Wild Byte.');
    } finally {
      setBusy(false);
    }
  };

  const field = 'w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary';

  return (
    <main className='max-w-4xl mx-auto px-4 py-12 text-stone-900 dark:text-stone-100'>
      <Link to='/portal' className='text-xs font-bold text-stone-500 hover:text-primary'>&larr; Back to portal</Link>
      <h1 className='mt-3 text-3xl font-black tracking-tight text-secondary dark:text-primary'>Make a presentation</h1>
      <p className='mt-1 text-sm text-stone-600 dark:text-stone-300'>
        Pick photos, edit the words, and download a PowerPoint. Captions come from the Upload page.
      </p>

      {error && <p className='mt-4 text-sm text-rose-600'>{error}</p>}
      {notice && <p className='mt-4 text-sm text-secondary dark:text-primary font-bold' role='status'>{notice}</p>}

      {child && (
        <div className='mt-8 space-y-6'>
          <div>
            <label className='block text-xs font-bold text-stone-500 mb-1.5'>Presentation title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={60} className={field} />
          </div>

          <div>
            <p className='text-xs font-bold text-stone-500 mb-2'>
              Photos ({chosen.length} of {photos.length} selected). Each one becomes a slide.
            </p>
            {photos.length === 0 ? (
              <p className='text-sm text-stone-500'>
                No photos yet. <Link to={`/portal/upload/${childId}`} className='underline'>Upload some first.</Link>
              </p>
            ) : (
              <ul className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                {photos.map((p) => (
                  <li key={p.id}>
                    <label className={`block rounded-xl overflow-hidden border-2 cursor-pointer ${selected[p.id] ? 'border-primary' : 'border-transparent opacity-50'}`}>
                      <img src={p.url} alt={p.caption || 'Uploaded work'} className='w-full h-32 object-cover' />
                      <span className='flex items-center gap-2 p-2 text-xs bg-white dark:bg-stone-900'>
                        <input type='checkbox' checked={!!selected[p.id]} onChange={(e) => setSelected((s) => ({ ...s, [p.id]: e.target.checked }))} />
                        <span className='truncate'>{p.caption || 'No caption'}</span>
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className='block text-xs font-bold text-stone-500 mb-1.5'>My favorite discovery (optional)</label>
            <textarea rows={3} maxLength={500} value={favorite} onChange={(e) => setFavorite(e.target.value)} className={field} />
          </div>
          <div>
            <label className='block text-xs font-bold text-stone-500 mb-1.5'>What I want to explore next (optional)</label>
            <textarea rows={3} maxLength={500} value={next} onChange={(e) => setNext(e.target.value)} className={field} />
          </div>

          <div className='flex flex-col sm:flex-row gap-3'>
            <button onClick={generate} disabled={busy || chosen.length === 0}
              className='px-6 py-3 rounded-xl bg-primary hover:bg-secondary text-white font-semibold text-sm disabled:opacity-50 cursor-pointer'>
              {busy ? 'Building your slides...' : 'Download PowerPoint'}
            </button>
            <button onClick={handleSaveAnswers} disabled={busy}
              className='px-6 py-3 rounded-xl border border-primary text-secondary dark:text-primary font-semibold text-sm hover:bg-primary/10 disabled:opacity-50 cursor-pointer'>
              Save my answers
            </button>
          </div>
          <p className='text-xs text-stone-500'>
            When you download, we also save a copy of the presentation for Wild Byte staff. Your answers are saved with your child’s profile.
          </p>
        </div>
      )}
    </main>
  );
};

export default PortalPresentation;
