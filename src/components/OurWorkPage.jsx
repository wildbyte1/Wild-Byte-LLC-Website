import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import assets from '../assets/assets';

const TIER_SETTINGS = {
  seed: {
    title: 'Seed Member',
    priceText: '$25',
    typeText: 'One-Time Contribution',
    description:
      'Plant the foundation for Wild Byte. Directly support digital archival preservation and secure permanent lifetime access to all curated stories.',
    inputLabel: 'What aspects of natural history interest you most?',
    stripeUrl: 'https://buy.stripe.com/3cIcN53DH0ENbej5iQ3cc00',
    isPaid: true,
  },
  guardian: {
    title: 'Archive Guardian',
    priceText: '$50',
    typeText: 'One-Time Contribution',
    description:
      'Step behind the scenes of history curation. Directly fund record preservation and gain early access to test interactive software builds and dashboard prototypes.',
    inputLabel:
      'What archival collections or historical eras are you most passionate about?',
    stripeUrl: 'https://buy.stripe.com/eVq00j0rvcnv2HN12A3cc01',
    isPaid: true,
  },
  visionary: {
    title: 'Visionary Founder',
    priceText: '$99',
    typeText: 'One-Time Contribution',
    description:
      'Gain ultimate VIP status. Help shape our development roadmap, receive permanent platform wall-of-fame recognition, and test all early software frameworks.',
    inputLabel:
      'How would you like to see technology and archive curation collaborate?',
    stripeUrl: 'https://buy.stripe.com/fZu14n4HL9bjcinaDa3cc02',
    isPaid: true,
  },
  beta: {
    title: 'Free Waitlist',
    priceText: 'Free',
    typeText: 'Early Alpha Access',
    description:
      'Secure your spot to test early interactive wildlife narrative software builds as an alpha framework reviewer.',
    inputLabel: 'Notes / Project Interests (Optional)',
    stripeUrl: null,
    isPaid: false,
  },
};

const OurWorkPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialTier = () => {
    let param = searchParams.get('tier') || 'beta';
    return param === 'founder' ? 'visionary' : param;
  };

  const [activeTier, setActiveTier] = useState(getInitialTier());

  useEffect(() => {
    let param = searchParams.get('tier');
    if (param) {
      setActiveTier(param === 'founder' ? 'visionary' : param);
    }
  }, [searchParams]);

  const tierConfig = TIER_SETTINGS[activeTier] || TIER_SETTINGS.beta;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleTierSelect = (tierKey) => {
    setActiveTier(tierKey);
    setSearchParams({ tier: tierKey });
    setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const collectionTarget = tierConfig.isPaid
        ? 'founding_member_submissions'
        : 'waitlist_submissions';
      const targetCollectionRef = collection(db, collectionTarget);

      await addDoc(targetCollectionRef, {
        name: formData.name,
        email: formData.email,
        note: formData.note,
        tierSelected: activeTier,
        paymentStatus: tierConfig.isPaid
          ? 'pending_redirect'
          : 'not_applicable',
        submittedAt: serverTimestamp(),
      });

      if (tierConfig.isPaid && tierConfig.stripeUrl) {
        const checkoutUrl = `${tierConfig.stripeUrl}?prefilled_email=${encodeURIComponent(formData.email)}`;
        window.location.href = checkoutUrl;
      } else {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', note: '' });
      }
    } catch (error) {
      console.error('Firebase write execution failed:', error);
      setSubmitStatus('error');
    } finally {
      if (!tierConfig.isPaid) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className='min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 lg:px-8 w-full overflow-x-hidden'>
      {/* METHODOLOGY SECTION */}
      <section className='max-w-4xl mx-auto mb-12 border-b border-stone-200 dark:border-stone-800 pb-12 w-full'>
        <Link
          to='/'
          className='text-xs font-semibold uppercase tracking-wider text-secondary dark:text-primary hover:underline mb-4 inline-block'
        >
          &larr; Back to Platform Overview
        </Link>

        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-tertiary tracking-tight mb-6 font-extrabold leading-tight'>
          Behind the Software: Bridging Tech & Archive Curation
        </h1>

        <div className='space-y-6 text-secondary dark:text-stone-300 leading-relaxed text-sm sm:text-base md:text-lg w-full'>
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
            environmental mysteries. This cross disciplinary approach adds
            structural validity to our platforms, turning data curation into
            profound connections to the natural world.
          </p>
        </div>
      </section>

      {/* PROTOTYPE SHOWCASE SECTION */}
      <section className='max-w-4xl mx-auto mb-16 w-full'>
        <div className='bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl shadow-secondary/5 w-full'>
          <header className='mb-6 w-full'>
            <span className='text-[10px] sm:text-xs font-bold uppercase tracking-widest text-secondary dark:text-primary bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full inline-block'>
              Dashboard Prototype Preview
            </span>
            <h2 className='text-lg sm:text-xl md:text-2xl font-black text-tertiary dark:text-stone-100 mt-3'>
              The Wild Byte Curation Engine
            </h2>
            <p className='text-xs sm:text-sm text-secondary dark:text-stone-300 mt-1.5 leading-relaxed'>
              A look at our software interface framework designed to synthesize
              archival history with content management tools. This pipeline
              enables historical wildlife records such as vintage photographs,
              species catalogs, and data logs to be categorized, contextualized
              with localized descriptions, and updated dynamically to empower
              choicedriven narratives.
            </p>
          </header>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-stone-100 dark:bg-stone-950 p-3 sm:p-4 rounded-xl border border-stone-200 dark:border-stone-800 w-full'>
            <div className='overflow-hidden rounded-lg shadow-md border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900 w-full'>
              <img
                src={assets.prototype1}
                alt='Wild Byte dashboard archive thumbnail upload and title metadata fields'
                className='w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-300'
              />
            </div>

            <div className='overflow-hidden rounded-lg shadow-md border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900 w-full'>
              <img
                src={assets.prototype2}
                alt='Wild Byte blog description custom rich text markdown editor with AI generation node module'
                className='w-full h-auto object-cover hover:scale-[1.01] transition-transform duration-300'
              />
            </div>
          </div>

          <footer className='mt-4 text-center w-full'>
            <p className='text-[10px] sm:text-[12px] text-stone-500 dark:text-stone-400 italic'>
              Interface prototypes illustrating full-stack data modeling for
              historical conservation storytelling platforms.
            </p>
          </footer>
        </div>
      </section>

      {/* MEMBERSHIP TIERS GRID SECTION */}
      <section className='max-w-4xl mx-auto mb-16 w-full'>
        <div className='text-center mb-8 px-2 w-full'>
          <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-secondary dark:text-light'>
            Select Your Wild Byte Membership Today!
          </h2>
          <p className='text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-2 max-w-2xl mx-auto'>
            Click a tier below to view its specific development benefits and
            configure your application form parameters.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full items-stretch'>
          {Object.keys(TIER_SETTINGS).map((key) => {
            const tier = TIER_SETTINGS[key];
            const isSelected = activeTier === key;

            // 1. Structural Brand Color Alternations (Ditching Flat Dark Blacks/Grays)
            const cardStyles = isSelected
              ? 'bg-light dark:bg-tertiary border-secondary dark:border-primary shadow-xl ring-4 ring-primary/20 lg:scale-[1.03] z-10'
              : 'bg-white dark:bg-stone-900/60 border-stone-200 dark:border-stone-800/80 shadow-sm hover:border-secondary dark:hover:border-primary';

            // 2. High-Contrast Typography Adaptations
            const titleStyles = isSelected
              ? 'text-tertiary dark:text-primary font-black'
              : 'text-stone-800 dark:text-stone-200 font-bold';

            const priceStyles = isSelected
              ? 'text-secondary dark:text-white'
              : 'text-tertiary dark:text-stone-400';

            const typeStyles = isSelected
              ? 'text-stone-500 dark:text-primary/70 font-bold'
              : 'text-stone-400 dark:text-stone-500 font-medium';

            const descriptionStyles = isSelected
              ? 'text-secondary dark:text-stone-100 font-medium'
              : 'text-stone-600 dark:text-stone-400';

            // 3. Dynamic Mode-Specific Button Transitions
            const buttonStyles = isSelected
              ? 'bg-secondary text-white dark:bg-primary dark:text-tertiary font-black shadow-inner'
              : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 group-hover:bg-secondary group-hover:text-white dark:group-hover:bg-primary dark:group-hover:text-tertiary';

            return (
              <button
                key={key}
                type='button'
                onClick={() => handleTierSelect(key)}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between w-full group relative cursor-pointer ${cardStyles}`}
              >
                <div className='w-full'>
                  <div className='flex items-baseline justify-between gap-2 mb-2 w-full'>
                    <h3
                      className={`text-sm sm:text-base transition-colors line-clamp-1 ${titleStyles}`}
                    >
                      {tier.title}
                    </h3>
                  </div>
                  <div className='mb-3 w-full'>
                    <span
                      className={`text-xl sm:text-2xl font-black block leading-none ${priceStyles}`}
                    >
                      {tier.priceText}
                    </span>
                    <span
                      className={`text-[9px] sm:text-[10px] block uppercase tracking-wider mt-1.5 ${typeStyles}`}
                    >
                      {tier.typeText}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] sm:text-xs leading-relaxed line-clamp-5 lg:line-clamp-none ${descriptionStyles}`}
                  >
                    {tier.description}
                  </p>
                </div>

                <div className='mt-6 w-full'>
                  <span
                    className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider block text-center py-2.5 rounded-xl transition-all ${buttonStyles}`}
                  >
                    {isSelected ? 'Selected Tier' : 'Select Tier'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* APPLICATION REGISTRATION FORM CONTAINER */}
      <section className='max-w-xl mx-auto bg-light dark:bg-stone-900 border border-tertiary dark:border-stone-800 p-5 sm:p-8 md:p-10 rounded-2xl shadow-xl mb-32 transition-colors w-full'>
        <header className='mb-6 border-b border-stone-200 dark:border-stone-800 pb-4 w-full'>
          <span className='text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-secondary dark:bg-primary text-white dark:text-tertiary inline-block'>
            Reviewing: {tierConfig.title} ({tierConfig.priceText})
          </span>
          <p className='text-xs text-secondary dark:text-stone-300 mt-2.5 italic leading-relaxed'>
            {tierConfig.description}
          </p>
        </header>

        {submitStatus === 'success' ? (
          <div className='p-4 bg-secondary dark:bg-primary border border-transparent text-white dark:text-tertiary rounded-xl text-center w-full'>
            <h3 className='font-bold text-lg mb-1'>Application Received!</h3>
            <p className='text-sm'>
              Thank you for supporting Wild Byte. Your submission has been
              securely synced to our system.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-4 sm:gap-5 w-full'
          >
            {submitStatus === 'error' && (
              <div className='p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 rounded-lg text-sm w-full'>
                Error syncing with cloud servers. Please check your connection
                and try again.
              </div>
            )}

            <div className='w-full'>
              <label className='block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-secondary dark:text-primary mb-1.5'>
                Full Name
              </label>
              <input
                type='text'
                required
                value={formData.name}
                className='w-full p-2.5 sm:p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-xs sm:text-sm text-stone-900 dark:text-stone-100'
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className='w-full'>
              <label className='block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-tertiary dark:text-primary mb-1.5'>
                Email Address
              </label>
              <input
                type='email'
                required
                value={formData.email}
                className='w-full p-2.5 sm:p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-xs sm:text-sm text-stone-900 dark:text-stone-100'
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className='w-full'>
              <label className='block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-primary mb-1.5'>
                {tierConfig.inputLabel}
              </label>
              <textarea
                rows='3'
                value={formData.note}
                className='w-full p-2.5 sm:p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-950 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-xs sm:text-sm text-stone-900 dark:text-stone-100 resize-none'
                onChange={(e) =>
                  setFormData({ ...formData, note: e.target.value })
                }
              />
            </div>

            {/* Mode-Reactive Core Submit Action Button */}
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full py-2.5 sm:py-3 bg-secondary hover:bg-tertiary dark:bg-primary dark:text-tertiary dark:hover:bg-light text-white font-extrabold rounded-xl transition-all shadow-md text-xs sm:text-sm mt-2 cursor-pointer touch-manipulation'
            >
              {isSubmitting
                ? tierConfig.isPaid
                  ? 'Syncing & Forwarding to Stripe...'
                  : 'Syncing Application...'
                : tierConfig.isPaid
                  ? `Complete ${tierConfig.priceText} Tier Order`
                  : 'Join Free Waitlist'}
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default OurWorkPage;
