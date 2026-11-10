import React from 'react';
import { Link } from 'react-router-dom';

const ParentPortalCTA = () => (
  <aside
    id="parent-portal"
    aria-label="Parent portal"
    className="rounded-2xl bg-secondary dark:bg-stone-800 border-2 border-primary text-white p-5 sm:p-6 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-5"
  >
    <div className="text-center sm:text-left">
      <span className="text-[11px] font-black uppercase tracking-wider text-primary">
        🌿 Enrolled families
      </span>
      <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
        Parent Portal
      </h3>
      <p className="text-sm text-stone-200 mt-1 max-w-md">
        Sign in to upload your child’s work and build their presentation.
      </p>
    </div>

    <Link
      to="/login"
      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-primary hover:bg-white text-tertiary font-extrabold text-sm uppercase tracking-wider py-4 px-8 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200 whitespace-nowrap"
    >
      Parent Login <span aria-hidden="true">→</span>
    </Link>
  </aside>
);

export default ParentPortalCTA;