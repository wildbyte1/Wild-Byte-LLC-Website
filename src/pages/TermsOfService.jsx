import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className='min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 pt-28 px-4 max-w-3xl mx-auto pb-20'>
      <Link
        to='/'
        className='text-xs font-semibold uppercase tracking-wider text-tertiary dark:text-primary hover:underline mb-6 inline-block'
      >
        &larr; Return Home
      </Link>
      <h1 className='text-3xl text-secondary tracking-tight mb-2'>
        Terms of Service
      </h1>
      <p className='text-xs text-stone-500 mb-8'>Last Updated: June 2026</p>

      <div className='space-y-6 text-tertiary dark:text-stone-300 leading-relaxed text-sm sm:text-base'>
        <section>
          <h2 className='text-xl font-bold text-stone-900 dark:text-white mb-2'>
            1. Terms Acceptance
          </h2>
          <p>
            By accessing the Wild Byte LLC web properties, waitlists, and
            interactive storytelling software builds, you agree to comply with
            and be bound by these operational terms. If you do not agree, please
            discontinue platform use immediately.
          </p>
        </section>

        <section>
          <h2 className='text-xl font-bold text-stone-900 dark:text-white mb-2'>
            2. Founding Membership & Billing
          </h2>
          <p>
            Founding Member tiers represent early-stage project support
            allocations. Payments are executed securely via Stripe Checkout.
            Contributions grant early application access tokens and roadmap
            review privileges but do not constitute corporate equity or
            fractional ownership of Wild Byte LLC.
          </p>
        </section>

        <section>
          <h2 className='text-xl font-bold text-stone-900 dark:text-white mb-2'>
            3. Proprietary Intellectual Property
          </h2>
          <p>
            All software engines, interactive narrative trees, digital natural
            history assets, archival adaptations, and graphics rendered on this
            platform are the exclusive property of Wild Byte LLC and are
            protected by applicable trademark and copyright laws.
          </p>
        </section>

        <section>
          <h2 className='text-xl font-bold text-stone-900 dark:text-white mb-2'>
            4. Customer Support & Refund Framework
          </h2>
          <p>
            As these accounts grant immediate digital platform tier access,
            refund queries are assessed manually on a case-by-case evaluation.
            For logistical support, billing assistance, or site service
            requests, contact us at <strong>contact@wildbyte.dev</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
