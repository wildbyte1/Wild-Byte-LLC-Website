import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import assets from '../assets/assets';

const ContactPage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    // w-full max-w-5xl prevents elements from shifting behind your navbar boundaries
    <div className='min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 pt-28 px-4 max-w-5xl mx-auto pb-20 w-full overflow-hidden'>
      {/* Header Section */}
      <div className='text-center max-w-2xl mx-auto mb-10'>
        <Link
          to='/'
          className='text-xs font-semibold uppercase tracking-wider text-secondary dark:text-primary hover:underline mb-4 inline-block'
        >
          &larr; Back To Home
        </Link>
        <h1 className='text-4xl text-tertiary tracking-tight mb-3 font-extrabold'>
          Book a Consultation
        </h1>
        <p className='text-secondary dark:text-white/70 text-sm sm:text-base'>
          Select a time below to connect directly with us and explore how we can
          collaborate on your digital narrative or archival project.
        </p>
      </div>

      <div className='mb-12 w-full'>
        <h2 className='text-lg font-bold mb-4 text-tertiary dark:text-primary border-b border-stone-200 dark:border-stone-800 pb-2'>
          Our Programs in Action
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
          <div className='relative group overflow-hidden rounded-xl bg-stone-100 border border-tertiary dark:border-primary shadow-md h-48'>
            <img
              src={assets.workshop1}
              alt='Succulent planting and terracotta pot painting art therapy'
              className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-102'
            />
            <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-transparent p-3 pt-8'>
              <p className='text-xs font-bold text-white tracking-wide'>
                Art Therapy Workshops
              </p>
              <p className='text-[10px] text-stone-300 mt-0.5 leading-tight'>
                Planting succulents and custom painting terracotta pots.
              </p>
            </div>
          </div>

          <div className='relative group overflow-hidden rounded-xl bg-stone-100 border border-tertiary dark:border-primary shadow-md h-48'>
            <img
              src={assets.workshop2}
              alt='Nature group walk with mindfulness and CA native wildlife observation'
              className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-102'
            />
            <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-transparent p-3 pt-8'>
              <p className='text-xs font-bold text-white tracking-wide'>
                Eco-Observation Walks
              </p>
              <p className='text-[10px] text-stone-300 mt-0.5 leading-tight'>
                Guided interactions focusing on California native plants,
                wildlife, and the importance of pollinators.
              </p>
            </div>
          </div>

          <div className='relative group overflow-hidden rounded-xl bg-stone-100 border border-tertiary dark:border-primary shadow-md h-48'>
            <img
              src={assets.workshop3}
              alt='Community composting scraps'
              className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-102'
            />
            <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-transparent p-3 pt-8'>
              <p className='text-xs font-bold text-white tracking-wide'>
                Urban Ecology & Regeneration
              </p>
              <p className='text-[10px] text-stone-300 mt-0.5 leading-tight'>
                Hands on community workshop focused on processing food scraps
                and building soil health through composting.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full mt-6'>
        <h2 className='text-lg font-bold mb-4 text-tertiary dark:text-primary border-b border-stone-200 dark:border-stone-800 pb-2'>
          Available Times
        </h2>
        <div
          className='calendly-inline-widget w-full rounded-2xl overflow-hidden border border-tertiary dark:border-primary bg-white shadow-lg'
          data-url='https://calendly.com/wildbyte-avictoria/30min'
          style={{ minWidth: '320px', height: '680px' }}
        />
      </div>
    </div>
  );
};

export default ContactPage;
