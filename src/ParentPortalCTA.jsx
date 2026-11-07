import React from 'react';
import { Link } from 'react-router-dom';

const ParentPortalCTA = () => (
  <div className='max-w-3xl mx-auto rounded-2xl border border-tertiary dark:border-primary bg-white dark:bg-stone-900 p-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
    <div className='text-center sm:text-left'>
      <h3 className='text-lg font-extrabold text-secondary dark:text-primary'>
        Junior Ecologist families
      </h3>
      <p className='text-sm text-stone-600 dark:text-stone-300'>
        Upload your child’s work and build their presentation.
      </p>
    </div>
    <Link
      to='/login'
      className='inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary hover:bg-secondary text-white font-semibold transition-all shadow-sm w-full sm:w-auto'
    >
      Parent portal
    </Link>
  </div>
);

export default ParentPortalCTA;