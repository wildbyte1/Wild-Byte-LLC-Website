import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import assets from '../assets/assets'; // Imported assets file at top

const OurWorkPage = () => {
  // 1. Detect which tier button was clicked on the homepage (?tier=beta or ?tier=founder)
  const [searchParams] = useSearchParams();
  const tier = searchParams.get('tier') || 'beta';

  // 2. React state to track user form input
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    note: '',
  });

  // UI Status tracking
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  // 3. Form Submission Logic to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Determine target collection folder dynamically based on URL tier parameters
      const collectionTarget =
        tier === 'founder' ? 'founder_submissions' : 'waitlist_submissions';

      // Target reference
      const targetCollectionRef = collection(db, collectionTarget);

      // Save document payload directly into Cloud Firestore
      await addDoc(targetCollectionRef, {
        name: formData.name,
        email: formData.email,
        note: formData.note,
        tierSelected: tier,
        submittedAt: serverTimestamp(), // Generates a reliable database-side timestamp
      });

      setSubmitStatus('success');
      setFormData({ name: '', email: '', note: '' }); // Clear input fields
    } catch (error) {
      console.error('Firebase write execution failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 pt-28 px-4 sm:px-6 w-full overflow-hidden'>
      {/* METHODOLOGY SECTION */}
      <section className='max-w-4xl mx-auto mb-12 border-b border-stone-200 dark:border-stone-800 pb-12'>
        <Link
          to='/'
          className='text-xs font-semibold uppercase tracking-wider text-secondary dark:text-primary hover:underline mb-4 inline-block'
        >
          &larr; Back to Platform Overview
        </Link>

        <h1 className='text-3xl md:text-5xl text-tertiary tracking-tight mb-6 font-extrabold'>
          Behind the Software: Bridging Tech & Archive Curation
        </h1>

        <div className='space-y-6 text-secondary dark:text-stone-300 leading-relaxed text-base md:text-lg'>
          <p>
            Every narrative branch engineered inside Wild Byte is built directly
            upon primary and secondary sources, such as natural history and
            wildlife archives. By transforming historical data footprints into
            immersive, choice driven journeys, we empower users to interact with
            authentic scientific history.
          </p>
          <p>
            Our software frameworks go beyond simple nature gamification. By
            applying rigorous historical research methodologies to environmental
            education, we challenge players to decode primary field records,
            analyze ecological shifts across time, and solve historical
            environmental mysteries. This cross-disciplinary approach adds
            structural validity to our platforms, turning data curation into
            profound connections to the natural world.
          </p>
        </div>
      </section>

      {/* NEW PROTOTYPE IMAGE SHOWCASE SECTION */}
      <section className='max-w-4xl mx-auto mb-16'>
        <div className='bg-white dark:bg-stone-900 border border-tertiary dark:border-primary p-6 md:p-8 rounded-2xl shadow-xl shadow-secondary/5'>
          <header className='mb-6'>
            <span className='text-xs font-bold uppercase tracking-widest text-secondary dark:text-primary bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full'>
              Dashboard Prototype Preview
            </span>
            <h2 className='text-xl md:text-2xl font-black text-tertiary dark:text-stone-100 mt-3'>
              The Wild Byte Curation Engine
            </h2>
            <p className='text-sm text-secondary dark:text-stone-300 mt-1.5 leading-relaxed'>
              A look at our software interface framework designed to synthesize
              archival history with content management tools. This pipeline
              enables historical wildlife records such as vintage photographs,
              species catalogs, and data logs to be categorized, contextualized
              with localized descriptions, and updated dynamically to empower
              choicedriven narratives.
            </p>
          </header>

          {/* Screenshot Grid Container */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-stone-100 dark:bg-stone-950 p-4 rounded-xl border border-stone-200 dark:border-stone-800 w-full'>
            {/* Screenshot 1 */}
            <div className='overflow-hidden rounded-lg shadow-md border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900'>
              <img
                src={assets.prototype1}
                alt='Wild Byte dashboard archive thumbnail upload and title metadata fields'
                className='w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-300'
              />
            </div>

            {/* Screenshot 2 */}
            <div className='overflow-hidden rounded-lg shadow-md border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900'>
              <img
                src={assets.prototype2}
                alt='Wild Byte blog description custom rich text markdown editor with AI generation node module'
                className='w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-300'
              />
            </div>
          </div>

          <footer className='mt-4 text-center'>
            <p className='text-[11px] text-stone-500 dark:text-stone-400 italic'>
              Interface prototypes illustrating full-stack data modeling for
              historical conservation storytelling platforms.
            </p>
          </footer>
        </div>
      </section>

      {/* DYNAMIC DATA INTAKE FORM */}
      <section className='max-w-xl mx-auto bg-light dark:bg-tertiary border border-tertiary dark:border-white p-6 sm:p-10 rounded-2xl shadow-xl mb-32 transition-colors'>
        <header className='mb-8'>
          <span className='text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-primary dark:bg-primary text-secondary dark:text-white'>
            {tier === 'founder' ? 'VIP Tier' : 'Early Access'}
          </span>
          <h2 className='text-2xl sm:text-3xl font-extrabold mt-3 tracking-tight'>
            {tier === 'founder'
              ? 'Become a Founding Member'
              : 'Join the Free Waitlist'}
          </h2>
          <p className='text-sm text-secondary dark:text-white mt-2'>
            {tier === 'founder'
              ? 'Support custom natural history assets, preserve historical logs, and gain direct development roadmap input.'
              : 'Secure your spot to test early interactive wildlife narrative software builds.'}
          </p>
        </header>

        {submitStatus === 'success' ? (
          <div className='p-4 bg-secondary dark:bg-white border border-tertiary dark:border-white text-light dark:text-tertiary rounded-xl text-center'>
            <h3 className='font-bold text-lg mb-1'>Application Received!</h3>
            <p className='text-sm'>
              Thank you for supporting Wild Byte. Your submission has been
              securely synced to our system.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
            {submitStatus === 'error' && (
              <div className='p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-primary text-secondary dark:text-white rounded-lg text-sm'>
                Error syncing with cloud servers. Please check your connection
                and try again.
              </div>
            )}

            <div>
              <label className='block text-xs font-bold uppercase tracking-wider text-secondary dark:text-primary mb-1.5'>
                Full Name
              </label>
              <input
                type='text'
                required
                value={formData.name}
                className='w-full p-3 rounded-xl border border-stone-200 dark:border-tertiary bg-stone-50 dark:bg-light focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm text-tertiary'
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className='block text-xs font-bold uppercase tracking-wider text-tertiary dark:text-primary mb-1.5'>
                Email Address
              </label>
              <input
                type='email'
                required
                value={formData.email}
                className='w-full p-3 rounded-xl border border-tertiary dark:border-tertiary bg-stone-50 dark:bg-light focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm text-tertiary '
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className='block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-primary mb-1.5'>
                {tier === 'founder'
                  ? 'What aspects of natural history interest you most?'
                  : 'Notes / Project Interests (Optional)'}
              </label>
              <textarea
                rows='3'
                value={formData.note}
                className='w-full p-3 rounded-xl border border-stone-200 dark:border-tertiary bg-stone-50 dark:bg-light focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm text-tertiary resize-none'
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
              />
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full py-3 bg-secondary hover:bg-primary dark:bg-primary  text-white font-extrabold rounded-xl transition-all shadow-md text-sm mt-2 cursor-pointer'
            >
              {isSubmitting ? 'Syncing Application...' : 'Submit to Wild Byte'}
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default OurWorkPage;
