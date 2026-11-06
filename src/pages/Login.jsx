import React, { useEffect, useRef, useState } from 'react';
import {
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { useAuth } from '../context/useAuth';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-stone-900 dark:text-stone-100';
const labelClass =
  'block text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5';
const buttonClass =
  'w-full py-3 bg-primary hover:bg-secondary text-white font-extrabold uppercase text-xs tracking-wider rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer';

const Login = () => {
  const [mode, setMode] = useState('parent'); // 'parent' | 'staff'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [linkSent, setLinkSent] = useState(false);
  const [needsEmail, setNeedsEmail] = useState(false);

  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const handledLink = useRef(false); // guards React StrictMode double-run

  // First sign-in creates the profile. Firestore rules only allow this
  // if an invite exists for the verified email.
  const ensureParentProfile = async (user) => {
    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);
    if (snap.exists()) return;
    await setDoc(ref, {
      email: user.email.toLowerCase(),
      displayName: '',
      membershipTier: 'parent',
      accountStatus: 'active',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });
  };

  const finishEmailLink = async (addr) => {
    setError('');
    setLoading(true);
    try {
      const cred = await signInWithEmailLink(auth, addr.trim(), window.location.href);
      try {
        await ensureParentProfile(cred.user);
      } catch (err) {
        console.error(err);
        await signOut(auth);
        setError(
          "This email hasn't been invited to the parent portal. Contact Wild Byte to be added.",
        );
        return;
      }
      window.localStorage.removeItem('emailForSignIn');
      await refreshProfile();
      navigate('/portal', { replace: true });
    } catch (err) {
      console.error(err);
      setError('That sign-in link is expired or was already used. Request a new one below.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (handledLink.current) return;
    if (!isSignInWithEmailLink(auth, window.location.href)) return;
    handledLink.current = true;
    const saved = window.localStorage.getItem('emailForSignIn');
    if (saved) finishEmailLink(saved);
    else setNeedsEmail(true); // link opened on a different device
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendLink = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const addr = email.trim().toLowerCase();
      await sendSignInLinkToEmail(auth, addr, {
        url: `${window.location.origin}/login`,
        handleCodeInApp: true,
      });
      window.localStorage.setItem('emailForSignIn', addr);
      setLinkSent(true);
    } catch (err) {
      console.error(err);
      setError('Could not send the link. Check the email address and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStaffLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/workspace/invites');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        setError('Invalid email or password.');
      } else {
        setError('Could not sign in. Try again in a moment.');
      }
    } finally {
      setLoading(false);
    }
  };

  const tabClass = (active) =>
    `flex-1 py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
      active
        ? 'bg-white dark:bg-stone-800 text-secondary dark:text-primary shadow-sm'
        : 'text-stone-500 dark:text-stone-400'
    }`;

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 text-secondary dark:text-primary'>
      <div className='max-w-md w-full space-y-6 p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl'>
        <div className='text-center'>
          <span className='text-[10px] uppercase font-black tracking-widest text-white bg-secondary dark:bg-primary dark:text-tertiary px-3 py-1 rounded-full inline-block mb-3'>
            Wild Byte
          </span>
          <h2 className='text-2xl font-black tracking-tight text-stone-900 dark:text-stone-100'>
            {mode === 'parent' ? 'Parent portal' : 'Staff sign-in'}
          </h2>
          <p className='mt-1.5 text-xs text-stone-500 dark:text-stone-400'>
            {mode === 'parent'
              ? 'Upload your child’s Junior Ecologist work and build their presentation.'
              : 'Wild Byte staff and archivists.'}
          </p>
        </div>

        <div className='flex gap-1 p-1 bg-stone-100 dark:bg-stone-950 rounded-xl'>
          <button type='button' className={tabClass(mode === 'parent')} onClick={() => { setMode('parent'); setError(''); }}>
            Parents
          </button>
          <button type='button' className={tabClass(mode === 'staff')} onClick={() => { setMode('staff'); setError(''); }}>
            Staff
          </button>
        </div>

        {error && (
          <div className='p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold'>
            {error}
          </div>
        )}

        {mode === 'parent' && needsEmail && (
          <form className='space-y-4' onSubmit={(e) => { e.preventDefault(); finishEmailLink(email); }}>
            <p className='text-xs text-stone-600 dark:text-stone-300'>
              Confirm your email to finish signing in.
            </p>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder='you@example.com' required />
            <button type='submit' disabled={loading} className={buttonClass}>
              {loading ? 'Signing in...' : 'Finish sign-in'}
            </button>
          </form>
        )}

        {mode === 'parent' && !needsEmail && (linkSent ? (
          <div className='p-4 rounded-xl bg-primary/10 border border-primary/30 text-sm text-stone-700 dark:text-stone-200'>
            If <strong>{email}</strong> has been invited, a sign-in link is on its way. Open it on
            this device. Check spam if it doesn’t arrive in a few minutes.
          </div>
        ) : (
          <form className='space-y-4' onSubmit={sendLink}>
            <div>
              <label className={labelClass}>Email address</label>
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder='The email you registered with' required />
            </div>
            <button type='submit' disabled={loading} className={buttonClass}>
              {loading ? 'Sending...' : 'Email me a sign-in link'}
            </button>
          </form>
        ))}

        {mode === 'staff' && (
          <form className='space-y-4' onSubmit={handleStaffLogin}>
            <div>
              <label className={labelClass}>Email address</label>
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Password</label>
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} required />
            </div>
            <button type='submit' disabled={loading} className={buttonClass}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        )}

        <div className='text-center pt-2 border-t border-stone-100 dark:border-stone-800/60'>
          <Link to='/' className='text-xs font-bold text-stone-400 hover:text-primary transition-colors'>
            &larr; Back to wildbyte.dev
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;