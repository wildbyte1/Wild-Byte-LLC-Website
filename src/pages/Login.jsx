import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      
      await signInWithEmailAndPassword(auth, email, password);
      
      navigate('/workspace');
    } catch (err) {
      console.error(err);
      
      if (
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/user-not-found'
      ) {
        setError('Invalid email or password configuration.');
      } else {
        setError('Failed to securely interface with authentication server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 text-secondary dark:text-primary'>
      <div className='max-w-md w-full space-y-8 p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl'>
       
        <div className='text-center'>
          <span className='text-[10px] uppercase font-black tracking-widest text-white bg-secondary dark:bg-primary dark:text-tertiary px-3 py-1 rounded-full inline-block mb-3'>
            Wild Byte Core
          </span>
          <h2 className='text-2xl font-black tracking-tight text-stone-900 dark:text-stone-100'>
            Platform Gateway
          </h2>
          <p className='mt-1.5 text-xs text-stone-500 dark:text-stone-400'>
            Authorized subscriber and archivist portal access point.
          </p>
        </div>

        
        {error && (
          <div className='p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-2'>
            ⚠️ {error}
          </div>
        )}

       
        <form className='mt-8 space-y-4' onSubmit={handleLogin}>
          <div>
            <label className='block text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5'>
              Email Address
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='name@organization.org'
              className='w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-stone-900 dark:text-stone-100'
              required
            />
          </div>

          <div>
            <label className='block text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5'>
              Secure Account Password
            </label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='••••••••'
              className='w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-stone-900 dark:text-stone-100'
              required
            />
          </div>

          <div className='pt-2'>
            <button
              type='submit'
              disabled={loading}
              className='w-full py-3 bg-primary hover:bg-secondary text-white font-extrabold uppercase text-xs tracking-wider rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer'
            >
              {loading ? 'Validating Credentials...' : 'Authenticate & Enter'}
            </button>
          </div>
        </form>

        <div className='text-center pt-2 border-t border-stone-100 dark:border-stone-800/60'>
          <Link
            to='/'
            className='text-xs font-bold text-stone-400 hover:text-primary transition-colors'
          >
            &larr; Return to Public Site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
