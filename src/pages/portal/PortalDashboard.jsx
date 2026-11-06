import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { useAuth } from '../../context/useAuth';

const PortalDashboard = () => {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [name, setName] = useState('');
  const [consentLevel, setConsentLevel] = useState('private');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const q = query(collection(db, 'children'), where('parentUid', '==', user.uid));
      const snap = await getDocs(q);
      setChildren(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
      setError('Could not load your children.');
    }
  }, [user.uid]);

  useEffect(() => { load(); }, [load]);

  const addChild = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await addDoc(collection(db, 'children'), {
        parentUid: user.uid,
        displayName: name.trim(),
        consentLevel,
        consentAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      });
      setName('');
      setAgreed(false);
      await load();
    } catch (err) {
      console.error(err);
      setError('Could not add your child. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const card = 'rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6';

  return (
    <main className='max-w-3xl mx-auto px-4 py-12 text-stone-900 dark:text-stone-100'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-black tracking-tight text-secondary dark:text-primary'>Parent portal</h1>
          <p className='mt-1 text-sm text-stone-600 dark:text-stone-300'>
            Upload your child’s Junior Ecologist work and turn it into a presentation.
          </p>
        </div>
        <button onClick={() => signOut(auth)} className='text-xs font-bold text-stone-500 hover:text-primary cursor-pointer'>
          Sign out
        </button>
      </div>

      {error && <p className='mt-4 text-sm text-rose-600'>{error}</p>}

      <section className='mt-8 space-y-4'>
        {children.length === 0 && (
          <p className={`${card} text-sm text-stone-500`}>Add your child below to start uploading.</p>
        )}
        {children.map((c) => (
          <div key={c.id} className={`${card} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
            <div>
              <h2 className='text-lg font-extrabold'>{c.displayName}</h2>
              <p className='text-xs text-stone-500'>
                Sharing: {c.consentLevel === 'program' ? 'May appear in the program showcase' : 'Private to your family and Wild Byte staff'}
              </p>
            </div>
            <div className='flex gap-2'>
              <Link to={`/portal/upload/${c.id}`} className='px-4 py-2 rounded-xl bg-primary hover:bg-secondary text-white text-sm font-semibold'>
                Upload work
              </Link>
              <Link to={`/portal/presentation/${c.id}`} className='px-4 py-2 rounded-xl border border-primary text-secondary dark:text-primary text-sm font-semibold hover:bg-primary/10'>
                Make presentation
              </Link>
            </div>
          </div>
        ))}
      </section>

      <form onSubmit={addChild} className={`${card} mt-8 space-y-4`}>
        <h2 className='text-lg font-extrabold'>Add a child</h2>
        <div>
          <label className='block text-xs font-bold text-stone-500 mb-1.5'>First name or nickname only</label>
          <input
            required maxLength={30} value={name} onChange={(e) => setName(e.target.value)}
            className='w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary'
          />
        </div>
        <div>
          <label className='block text-xs font-bold text-stone-500 mb-1.5'>How may Wild Byte use this work?</label>
          <select
            value={consentLevel} onChange={(e) => setConsentLevel(e.target.value)}
            className='w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-sm'
          >
            <option value='private'>Private: only my family and Wild Byte staff</option>
            <option value='program'>Program showcase: Wild Byte may share it with other program families</option>
          </select>
        </div>
        <label className='flex items-start gap-3 text-sm'>
          <input type='checkbox' checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className='mt-1' required />
          <span>
            I am this child’s parent or legal guardian. I agree to Wild Byte storing the work and photos I upload,
            as described in the <Link to='/privacy' className='underline'>privacy policy</Link>.
          </span>
        </label>
        <button disabled={busy || !agreed} className='px-6 py-2.5 rounded-xl bg-primary hover:bg-secondary text-white font-semibold text-sm disabled:opacity-50 cursor-pointer'>
          Add child
        </button>
      </form>
    </main>
  );
};

export default PortalDashboard;