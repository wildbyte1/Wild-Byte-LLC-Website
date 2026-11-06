import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { useAuth } from '../../context/useAuth';
import { resizeImage } from '../../lib/resizeImage';

const MAX_PDF = 10 * 1024 * 1024;

const PortalUpload = () => {
  const { childId } = useParams();
  const { user } = useAuth();
  const [child, setChild] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const inputRef = useRef(null);

  const load = useCallback(async () => {
    try {
      const childSnap = await getDoc(doc(db, 'children', childId));
      if (!childSnap.exists() || childSnap.data().parentUid !== user.uid) {
        setError('We could not find that child.');
        return;
      }
      setChild(childSnap.data());

      const q = query(collection(db, 'uploads'), where('parentUid', '==', user.uid), where('childId', '==', childId));
      const snap = await getDocs(q);
      const rows = await Promise.all(
        snap.docs.map(async (d) => {
          const data = d.data();
          let url = null;
          try { url = await getDownloadURL(ref(storage, data.storagePath)); } catch (e) { console.error(e); }
          return { id: d.id, ...data, url };
        }),
      );
      rows.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setItems(rows);
    } catch (err) {
      console.error(err);
      setError('Could not load uploads.');
    }
  }, [childId, user.uid]);

  useEffect(() => { load(); }, [load]);

  const handleFiles = async (fileList) => {
    setError('');
    const files = Array.from(fileList);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setStatus(`Uploading ${i + 1} of ${files.length}...`);
      try {
        const isImage = file.type.startsWith('image/');
        const isPdf = file.type === 'application/pdf';
        if (!isImage && !isPdf) throw new Error(`${file.name} is not a photo or PDF.`);
        if (isPdf && file.size > MAX_PDF) throw new Error(`${file.name} is over 10 MB.`);

        const blob = isImage ? await resizeImage(file) : file;
        const contentType = isImage ? 'image/jpeg' : 'application/pdf';
        const ext = isImage ? 'jpg' : 'pdf';
        const storagePath = `portal/${user.uid}/${childId}/${crypto.randomUUID()}.${ext}`;

        await uploadBytes(ref(storage, storagePath), blob, { contentType });
        await addDoc(collection(db, 'uploads'), {
          parentUid: user.uid,
          childId,
          storagePath,
          contentType,
          caption: '',
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        console.error(err);
        setError(err.message || 'An upload failed.');
      }
    }
    setStatus('');
    if (inputRef.current) inputRef.current.value = '';
    await load();
  };

  const saveCaption = async (item, caption) => {
    if (caption === item.caption) return;
    try {
      await updateDoc(doc(db, 'uploads', item.id), { caption });
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, caption } : i)));
    } catch (err) {
      console.error(err);
      setError('Could not save the caption.');
    }
  };

  const remove = async (item) => {
    if (!window.confirm('Delete this file? This cannot be undone.')) return;
    try {
      await deleteObject(ref(storage, item.storagePath));
      await deleteDoc(doc(db, 'uploads', item.id));
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err) {
      console.error(err);
      setError('Could not delete that file.');
    }
  };

  return (
    <main className='max-w-4xl mx-auto px-4 py-12 text-stone-900 dark:text-stone-100'>
      <Link to='/portal' className='text-xs font-bold text-stone-500 hover:text-primary'>&larr; Back to portal</Link>
      <h1 className='mt-3 text-3xl font-black tracking-tight text-secondary dark:text-primary'>
        {child ? `${child.displayName}’s work` : 'Upload work'}
      </h1>

      {error && <p className='mt-4 text-sm text-rose-600'>{error}</p>}

      {child && (
        <>
          <label className='mt-6 flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-primary/50 bg-white dark:bg-stone-900 p-8 text-center cursor-pointer hover:bg-primary/5'>
            <span className='font-extrabold text-secondary dark:text-primary'>Tap to choose photos or PDFs</span>
            <span className='text-xs text-stone-500'>Photos are resized automatically. PDFs up to 10 MB.</span>
            <input ref={inputRef} type='file' accept='image/*,application/pdf' multiple className='sr-only' onChange={(e) => handleFiles(e.target.files)} />
          </label>
          {status && <p className='mt-3 text-sm text-stone-600 dark:text-stone-300' role='status'>{status}</p>}

          {items.length === 0 && !status && (
            <p className='mt-8 text-sm text-stone-500'>Nothing uploaded yet. Add the first photo above.</p>
          )}

          <ul className='mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {items.map((item) => (
              <li key={item.id} className='rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900'>
                {item.contentType === 'application/pdf' ? (
                  <a href={item.url} target='_blank' rel='noreferrer' className='flex items-center justify-center h-48 bg-stone-100 dark:bg-stone-950 text-sm font-bold text-secondary dark:text-primary'>
                    Open PDF
                  </a>
                ) : (
                  <img src={item.url} alt={item.caption || 'Uploaded work'} className='w-full h-48 object-cover' loading='lazy' />
                )}
                <div className='p-4 space-y-3'>
                  <input
                    defaultValue={item.caption} maxLength={300} placeholder='Add a caption'
                    onBlur={(e) => saveCaption(item, e.target.value.trim())}
                    className='w-full px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary'
                  />
                  <button onClick={() => remove(item)} className='text-xs font-bold text-rose-600 hover:underline cursor-pointer'>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
};

export default PortalUpload;