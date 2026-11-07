import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { db, storage } from '../../firebase';

// Staff-only projector showcase + saved PowerPoints.
// Admin-only access is enforced by the route (ProtectedRoute allowedTiers={['admin']})
// AND by the Firestore/Storage rules.
const Showcase = () => {
  const [children, setChildren] = useState([]);
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [includePrivate, setIncludePrivate] = useState(false);
  const [selected, setSelected] = useState({}); // id -> boolean (default true)
  const [slides, setSlides] = useState(null); // null = setup screen
  const [index, setIndex] = useState(0);
  const [starting, setStarting] = useState(false);

  const load = useCallback(async () => {
    try {
      const [childSnap, uploadSnap, deckSnap] = await Promise.all([
        getDocs(collection(db, 'children')),
        getDocs(collection(db, 'uploads')),
        getDocs(collection(db, 'decks')),
      ]);

      const byChild = {};
      uploadSnap.docs.forEach((d) => {
        const u = { id: d.id, ...d.data() };
        if (u.contentType?.startsWith('image/')) (byChild[u.childId] ||= []).push(u);
      });

      const rows = childSnap.docs
        .map((d) => {
          const c = { id: d.id, ...d.data() };
          const photos = (byChild[c.id] || []).sort(
            (a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0),
          );
          return { ...c, photos };
        })
        .sort((a, b) => (a.displayName || '').localeCompare(b.displayName || ''));

      setChildren(rows);
      setDecks(
        deckSnap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (a.childName || '').localeCompare(b.childName || '')),
      );
    } catch (err) {
      console.error(err);
      setError('Could not load children and uploads.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const hasReflection = (c) => !!(c.favorite?.trim() || c.next?.trim());
  const visible = children.filter((c) => includePrivate || c.consentLevel === 'program');
  const isSelected = (c) => selected[c.id] !== false;
  const chosen = visible.filter((c) => (c.photos.length > 0 || hasReflection(c)) && isSelected(c));

  const exit = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    setSlides(null);
    setIndex(0);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    else document.documentElement.requestFullscreen?.().catch(() => {});
  };

  const start = async () => {
    setError('');
    setStarting(true);
    // Must be called straight from the click so the browser allows it.
    document.documentElement.requestFullscreen?.().catch(() => {});
    try {
      const built = [];
      for (const c of chosen) {
        built.push({ type: 'title', name: c.displayName });
        const urls = await Promise.all(
          c.photos.map((p) => getDownloadURL(ref(storage, p.storagePath)).catch(() => null)),
        );
        c.photos.forEach((p, i) => {
          if (urls[i]) built.push({ type: 'photo', name: c.displayName, url: urls[i], caption: p.caption });
        });
        if (hasReflection(c)) {
          built.push({ type: 'reflection', name: c.displayName, favorite: c.favorite?.trim(), next: c.next?.trim() });
        }
      }
      built.push({ type: 'end' });
      setIndex(0);
      setSlides(built);
    } catch (err) {
      console.error(err);
      setError('Could not load the photos for the slideshow.');
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    } finally {
      setStarting(false);
    }
  };

  const downloadDeck = async (d) => {
    setError('');
    try {
      const url = await getDownloadURL(ref(storage, d.storagePath));
      const a = document.createElement('a');
      a.href = url;
      a.download = d.fileName || 'presentation.pptx';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error(err);
      setError(`Could not download the presentation for ${d.childName}.`);
    }
  };

  // Keyboard controls
  useEffect(() => {
    if (!slides) return undefined;
    const onKey = (e) => {
      if (['ArrowRight', ' ', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, slides.length - 1));
      } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Escape') {
        exit();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slides, exit]);

  // Preload the next photo so slides change instantly
  useEffect(() => {
    if (!slides) return;
    const next = slides[index + 1];
    if (next?.url) new Image().src = next.url;
  }, [slides, index]);

  // Leave fullscreen if the page is closed or navigated away
  useEffect(() => () => {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  }, []);

  // ---------- Slideshow ----------
  if (slides) {
    const slide = slides[index];
    const go = (delta) => setIndex((i) => Math.max(0, Math.min(slides.length - 1, i + delta)));
    const bg = slide.type === 'photo' ? 'bg-[#2F3A24]' : 'bg-[#4A5638]';

    return (
      <div className={`fixed inset-0 z-[100] ${bg} text-white select-none flex flex-col`}>
        {/* Click zones: left third = back, right two thirds = forward */}
        <div className='absolute inset-y-0 left-0 w-1/3 z-10 cursor-w-resize' onClick={() => go(-1)} aria-hidden='true' />
        <div className='absolute inset-y-0 right-0 w-2/3 z-10 cursor-e-resize' onClick={() => go(1)} aria-hidden='true' />

        <div className='absolute top-4 right-4 z-20 flex gap-2 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity'>
          <button onClick={toggleFullscreen} className='px-3 py-1.5 rounded-lg bg-black/50 text-xs font-bold cursor-pointer'>Fullscreen (F)</button>
          <button onClick={exit} className='px-3 py-1.5 rounded-lg bg-black/50 text-xs font-bold cursor-pointer'>Exit (Esc)</button>
        </div>

        {slide.type === 'title' && (
          <div className='flex-1 flex flex-col items-center justify-center text-center px-8'>
            <p className='text-lg sm:text-2xl font-bold tracking-widest text-[#C8D8B0]'>JUNIOR ECOLOGIST PROGRAM</p>
            <h1 className='mt-6 text-5xl sm:text-7xl lg:text-8xl font-black leading-tight'>
              {slide.name}’s Nature Journal
            </h1>
          </div>
        )}

        {slide.type === 'photo' && (
          <>
            <div className='absolute top-4 left-6 z-20 text-sm sm:text-base font-bold text-[#C8D8B0]'>
              {slide.name}
            </div>
            <div className='flex-1 min-h-0 flex items-center justify-center p-4 pt-12'>
              <img
                src={slide.url}
                alt={slide.caption || `Work by ${slide.name}`}
                className='max-h-full max-w-full object-contain rounded-xl'
              />
            </div>
            <div className='min-h-[6rem] px-8 py-5 text-center bg-black/30'>
              <p className='text-2xl sm:text-4xl font-bold leading-snug'>
                {slide.caption || '\u00A0'}
              </p>
            </div>
          </>
        )}

        {slide.type === 'reflection' && (
          <>
            <div className='absolute top-4 left-6 z-20 text-sm sm:text-base font-bold text-[#C8D8B0]'>
              {slide.name}
            </div>
            <div className='flex-1 min-h-0 overflow-hidden flex flex-col justify-center gap-10 px-8 sm:px-20 py-16 max-w-6xl mx-auto w-full'>
              {slide.favorite && (
                <div>
                  <h2 className='text-2xl sm:text-4xl font-black text-[#C8D8B0]'>My favorite discovery</h2>
                  <p className='mt-3 text-2xl sm:text-4xl font-bold leading-snug'>{slide.favorite}</p>
                </div>
              )}
              {slide.next && (
                <div>
                  <h2 className='text-2xl sm:text-4xl font-black text-[#C8D8B0]'>What I want to explore next</h2>
                  <p className='mt-3 text-2xl sm:text-4xl font-bold leading-snug'>{slide.next}</p>
                </div>
              )}
            </div>
          </>
        )}

        {slide.type === 'end' && (
          <div className='flex-1 flex flex-col items-center justify-center text-center px-8'>
            <h1 className='text-5xl sm:text-7xl font-black'>Thank you for exploring with us!</h1>
            <p className='mt-6 text-xl sm:text-3xl text-[#C8D8B0]'>Wild Byte  |  wildbyte.dev</p>
          </div>
        )}

        <div className='absolute bottom-3 right-5 z-20 text-xs opacity-50'>
          {index + 1} / {slides.length}
        </div>
      </div>
    );
  }

  // ---------- Setup screen ----------
  const badge = (level) => (
    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${level === 'program' ? 'bg-primary/20 text-secondary dark:text-primary' : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300'}`}>
      {level === 'program' ? 'Showcase OK' : 'Private'}
    </span>
  );
  const listBox = 'divide-y divide-stone-200 dark:divide-stone-800 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900';

  return (
    <main className='max-w-3xl mx-auto px-4 py-12 text-stone-900 dark:text-stone-100'>
      <Link to='/workspace/invites' className='text-xs font-bold text-stone-500 hover:text-primary'>&larr; Back to invites</Link>
      <h1 className='mt-3 text-3xl font-black tracking-tight text-secondary dark:text-primary'>Projector showcase</h1>
      <p className='mt-2 text-sm text-stone-600 dark:text-stone-300'>
        Shows each child’s photos, captions, and saved answers full screen. Use the arrow keys, space bar, or tap the screen sides to move through slides. Press Esc to exit.
      </p>

      {error && <p className='mt-4 text-sm text-rose-600'>{error}</p>}

      <label className='mt-6 flex items-start gap-3 text-sm'>
        <input type='checkbox' className='mt-1' checked={includePrivate} onChange={(e) => setIncludePrivate(e.target.checked)} />
        <span>
          Also include children whose parents chose <strong>Private</strong>.
          <span className='block text-xs text-stone-500'>
            Leave this off when showing work to other families. Only children marked “Program showcase” appear by default.
          </span>
        </span>
      </label>

      {loading ? (
        <p className='mt-8 text-sm text-stone-500'>Loading...</p>
      ) : (
        <ul className={`mt-6 ${listBox}`}>
          {visible.length === 0 && (
            <li className='p-5 text-sm text-stone-500'>No children have chosen the program showcase yet.</li>
          )}
          {visible.map((c) => {
            const empty = c.photos.length === 0 && !hasReflection(c);
            return (
              <li key={c.id} className={`flex items-center gap-3 p-4 ${empty ? 'opacity-50' : ''}`}>
                <input
                  type='checkbox'
                  disabled={empty}
                  checked={!empty && isSelected(c)}
                  onChange={(e) => setSelected((s) => ({ ...s, [c.id]: e.target.checked }))}
                  aria-label={`Include ${c.displayName}`}
                />
                <span className='flex-1 font-bold'>{c.displayName}</span>
                <span className='text-xs text-stone-500'>
                  {empty
                    ? 'Nothing yet'
                    : `${c.photos.length} photo${c.photos.length === 1 ? '' : 's'}${hasReflection(c) ? ' + answers' : ''}`}
                </span>
                {badge(c.consentLevel)}
              </li>
            );
          })}
        </ul>
      )}

      <button
        onClick={start}
        disabled={starting || chosen.length === 0}
        className='mt-6 px-6 py-3 rounded-xl bg-primary hover:bg-secondary text-white font-semibold text-sm disabled:opacity-50 cursor-pointer'
      >
        {starting ? 'Loading photos...' : `Start slideshow (${chosen.length} ${chosen.length === 1 ? 'child' : 'children'})`}
      </button>

      {/* ---------- Saved PowerPoints ---------- */}
      <h2 className='mt-14 text-2xl font-black tracking-tight text-secondary dark:text-primary'>Saved PowerPoints</h2>
      <p className='mt-1 text-sm text-stone-600 dark:text-stone-300'>
        The latest deck each parent downloaded. A new download replaces the previous one.
      </p>
      {!loading && (
        <ul className={`mt-4 ${listBox}`}>
          {decks.length === 0 && (
            <li className='p-5 text-sm text-stone-500'>No presentations saved yet. They appear after a parent clicks Download PowerPoint.</li>
          )}
          {decks.map((d) => (
            <li key={d.id} className='flex flex-wrap items-center gap-3 p-4'>
              <span className='flex-1 font-bold'>{d.childName}</span>
              <span className='text-xs text-stone-500'>
                {d.updatedAt?.toDate ? d.updatedAt.toDate().toLocaleDateString() : ''}
                {d.size ? ` · ${(d.size / (1024 * 1024)).toFixed(1)} MB` : ''}
              </span>
              {badge(d.consentLevel)}
              <button
                onClick={() => downloadDeck(d)}
                className='px-4 py-2 rounded-xl border border-primary text-secondary dark:text-primary text-xs font-bold hover:bg-primary/10 cursor-pointer'
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Showcase;
