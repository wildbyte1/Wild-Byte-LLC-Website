import { Link } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const AdminInvites = () => {
  const [email, setEmail] = useState('');
  const [invites, setInvites] = useState([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, 'invites'));
      setInvites(snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => a.id.localeCompare(b.id)));
    } catch (err) {
      console.error(err);
      setError('Could not load invites.');
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const add = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const addr = email.trim().toLowerCase(); // document ID must be the lowercase email
      await setDoc(doc(db, 'invites', addr), { email: addr, createdAt: serverTimestamp() });
      setEmail('');
      await load();
    } catch (err) {
      console.error(err);
      setError('Could not add that invite.');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm(`Remove invite for ${id}? Existing accounts keep access until their status is changed.`)) return;
    await deleteDoc(doc(db, 'invites', id));
    await load();
  };

  return (
    <main className='max-w-2xl mx-auto px-4 py-12 text-stone-900 dark:text-stone-100'>
      <h1 className='text-3xl font-black tracking-tight text-secondary dark:text-primary'>Parent invites</h1>
      <p className='mt-2 text-sm text-stone-600 dark:text-stone-300'>
        Add the email each enrolled family will use. They can then sign in from the Parents tab on the login page.
      </p>
<Link to='/workspace/showcase' className='inline-block mt-3 text-sm font-bold text-primary underline'>
        Open projector showcase
      </Link>
      <form onSubmit={add} className='mt-6 flex flex-col sm:flex-row gap-3'>
        <input
          type='email' required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder='parent@example.com'
          className='flex-1 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary'
        />
        <button disabled={busy} className='px-6 py-2.5 rounded-xl bg-primary hover:bg-secondary text-white font-semibold text-sm disabled:opacity-50 cursor-pointer'>
          Add invite
        </button>
      </form>
      {error && <p className='mt-3 text-sm text-rose-600'>{error}</p>}

      <ul className='mt-8 divide-y divide-stone-200 dark:divide-stone-800 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900'>
        {invites.length === 0 && <li className='p-5 text-sm text-stone-500'>No invites yet. Add the first family above.</li>}
        {invites.map((inv) => (
          <li key={inv.id} className='flex items-center justify-between gap-4 p-4'>
            <span className='text-sm break-all'>{inv.id}</span>
            <button onClick={() => remove(inv.id)} className='text-xs font-bold text-rose-600 hover:underline cursor-pointer'>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default AdminInvites;