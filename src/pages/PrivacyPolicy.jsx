import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className='min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 pt-28 px-4 max-w-3xl mx-auto pb-20'>
      <Link
        to='/'
        className='text-xs font-semibold uppercase tracking-wider text-tertiary dark:text-primary hover:underline mb-6 inline-block'
      >
        &larr; Return Home
      </Link>
      <h1 className='text-3xl text-secondary tracking-tight mb-2'>
        Privacy Policy
      </h1>
      <p className='text-xs text-stone-500 mb-8'>Last Updated: June 2026</p>

      <div className='space-y-6 text-tertiary dark:text-stone-300 leading-relaxed text-sm sm:text-base'>
        <section>
          <h2 className='text-xl font-bold text-stone-900 dark:text-white mb-2'>
            1. Information We Collect
          </h2>
          <p>
            We only collect information that you explicitly provide to us via
            our early-access waitlist and founding member registration forms.
            This includes your name, email address, and any optional project
            notes you submit. If you choose to register for a paid tier, payment
            processing is handled securely by Stripe, and we do not store your
            credit card information on our servers.
          </p>
        </section>

        <section>
          <h2 className='text-xl font-bold text-stone-900 dark:text-white mb-2'>
            2. How We Use Your Data
          </h2>
          <p>
            Your data is used strictly to manage your early-access placement,
            deliver platform update communications, verify active founder
            accounts, and provide product support. We do not sell, rent, or
            distribute your contact information to third-party data brokers or
            marketing agencies.
          </p>
        </section>

        <section>
          <h2 className='text-xl font-bold text-stone-900 dark:text-white mb-2'>
            3. Security
          </h2>
          <p>
            We secure your data submissions utilizing industry-standard Cloud
            Firestore database infrastructure and encryption transit layers.
            However, no database method over the internet is 100% secure, and we
            cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className='text-xl font-bold text-stone-900 dark:text-white mb-2'>
            4. Contact & Compliance
          </h2>
          <p>
            For data removal requests or specific privacy questions, please
            reach out directly to our administration desk at{' '}
            <strong>contact@wildbyte.dev</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
