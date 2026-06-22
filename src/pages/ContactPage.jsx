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

  const TIKTOK_URL =
    'https://www.tiktok.com/@wildbyte23?_r=1&_t=ZT-96qXyyVJCQw';

  return (
    <div className='min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 pt-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pb-20 w-full overflow-hidden'>
      {/* HEADER SECTION */}
      <div className='text-center max-w-2xl mx-auto mb-12'>
        <Link
          to='/'
          className='text-xs font-semibold uppercase tracking-wider text-secondary dark:text-primary hover:underline mb-4 inline-block'
        >
          &larr; Back To Home
        </Link>
        <h1 className='text-3xl sm:text-4xl md:text-5xl text-tertiary dark:text-stone-100 tracking-tight mb-3 font-extrabold'>
          Get In Touch & Book
        </h1>
        <p className='text-secondary dark:text-stone-300 text-sm sm:text-base leading-relaxed'>
          Whether you want to bring an interactive workshop to your community,
          coordinate a custom educational curriculum, or explore digital archive
          collaborations—select a window or shoot us a line below.
        </p>
      </div>

      {/* PROGRAMS & CURRICULA GALLERY */}
      <div className='mb-16 w-full'>
        <div className='mb-6 border-b border-stone-200 dark:border-stone-800 pb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 w-full'>
          <h2 className='text-xl font-black text-tertiary dark:text-primary'>
            Our Programs & Curricula in Action
          </h2>
          <p className='text-xs text-stone-500 dark:text-stone-400'>
            Fostering deep nature connection through historical and digital
            storytelling.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 w-full'>
          {/* CARD 1 */}
          <div className='relative group overflow-hidden rounded-xl bg-stone-100 border border-stone-200 dark:border-stone-800 shadow-md h-56 transition-all'>
            <img
              src={assets.workshop1}
              alt='Succulent planting and terracotta pot painting art therapy'
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/60 to-transparent p-4 flex flex-col justify-end'>
              <p className='text-sm font-bold text-white tracking-wide'>
                Horticultural & Core Nature Connection
              </p>
              <p className='text-[11px] text-stone-300 mt-1 leading-relaxed line-clamp-3'>
                Integrating container gardening, native flora planting, and
                physical pottery crafts to inspire sensory engagement, creative
                focus, and active interaction with the local natural world.
              </p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className='relative group overflow-hidden rounded-xl bg-stone-100 border border-stone-200 dark:border-stone-800 shadow-md h-56 transition-all'>
            <img
              src={assets.workshop2}
              alt='Nature group walk with mindfulness and CA native wildlife observation'
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/60 to-transparent p-4 flex flex-col justify-end'>
              <p className='text-sm font-bold text-white tracking-wide'>
                Ecological Observation & Botanical Folklore
              </p>
              <p className='text-[11px] text-stone-300 mt-1 leading-relaxed line-clamp-3'>
                Guided walks highlighting California native species and
                historical folklore mythology. Participants engage deeply with
                the local natural world by linking historic data to community
                spaces.
              </p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className='relative group overflow-hidden rounded-xl bg-stone-100 border border-stone-200 dark:border-stone-800 shadow-md h-56 transition-all'>
            <img
              src={assets.workshop3}
              alt='Community composting scraps'
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/60 to-transparent p-4 flex flex-col justify-end'>
              <p className='text-sm font-bold text-white tracking-wide'>
                Urban Ecology & Natural Systems
              </p>
              <p className='text-[11px] text-stone-300 mt-1 leading-relaxed line-clamp-3'>
                Interactive modeling focusing on composting cycles, healthy soil
                production, and micro-habitat cultivation to encourage
                collaborative environmental stewardship and neighborhood
                eco-literacy.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 items-stretch w-full'>
       
        <div className='lg:col-span-2 flex flex-col justify-between bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-2xl shadow-xl transition-colors'>
          <div>
            <span className='text-[10px] uppercase font-bold tracking-widest text-white dark:text-primary bg-primary dark:bg-primary/20 px-3 py-1 rounded-full inline-block mb-3'>
              Direct Channels
            </span>
            <h2 className='text-2xl font-black text-tertiary dark:text-stone-100 mb-2'>
              Connect Directly
            </h2>
            <p className='text-sm sm:text-base text-secondary dark:text-stone-300 mb-6 leading-relaxed'>
              Have specific program requirements, partnership inquiries, or
              custom narrative development requests? Skip the automation and
              email directly.
            </p>

          
            <div className='flex items-center gap-4 bg-stone-50 dark:bg-stone-950 p-4 rounded-xl border border-stone-200 dark:border-stone-800 mb-6 group'>
              <div className='p-3 rounded-xl bg-secondary dark:bg-primary text-white dark:text-tertiary shadow-sm transition-transform group-hover:scale-105 flex items-center justify-center'>
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2.5'
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  ></path>
                </svg>
              </div>
              <div>
                <span className='block text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500'>
                  General Inquiries & Workshop Booking
                </span>
                <a
                  href='mailto:contact@wildbyte.dev'
                  className='text-base sm:text-lg font-black text-tertiary dark:text-primary hover:underline tracking-tight'
                >
                  contact@wildbyte.dev
                </a>
              </div>
            </div>

           
            <h3 className='text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3'>
              Service Coverage Area
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm mb-6'>
            
              <div className='p-4 rounded-xl bg-tertiary dark:bg-stone-950/50 border border-tertiary/20 dark:border-stone-800'>
                <span className='font-bold text-primary/100 dark:text-primary block mb-1 text-sm'>
                  📍 Southern California In-Person
                </span>
                <p className='text-light dark:text-stone-400 leading-relaxed text-xs sm:text-sm'>
                  Available for community organizations, urban farms, community
                  gardens, schools, and events across the Inland Empire, Los
                  Angeles, and Orange County regions.
                </p>
              </div>

              <div className='p-4 rounded-xl bg-tertiary dark:bg-stone-950/50 border border-tertiary/20 dark:border-stone-800'>
                <span className='font-bold text-primary/100 dark:text-primary block mb-1 text-sm'>
                  🌐 Nationwide Virtual Options
                </span>
                <p className='text-light dark:text-stone-400 leading-relaxed text-xs sm:text-sm'>
                  Interactive online storytelling sessions, live streamed nature
                  histories, and digital archive narration workshops scaled
                  globally via custom remote frameworks.
                </p>
              </div>
            </div>

            <div className='w-full rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 h-40 relative group shadow-inner'>
              <img
                src={assets.service_map}
                alt='Wild Byte Southern California Operational Coverage Map: Inland Empire, Los Angeles, Orange County'
                className='w-full h-full object-cover opacity-80 dark:opacity-90 transition-transform duration-700 group-hover:scale-[1.02]'
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className='hidden absolute inset-0 flex-col items-center justify-center p-4 text-center bg-stone-100 dark:bg-stone-950'>
                <span className='text-2xl mb-1'>🗺️</span>
                <span className='text-xs font-bold text-tertiary dark:text-primary uppercase tracking-wide'>
                  SoCal Service Footprint Map
                </span>
                <span className='text-[11px] text-stone-400 mt-0.5'>
                  IE • LA • OC
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-light dark:bg-primary border-stone-200 dark:border-stone-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between transition-colors w-full'>
          <div>
            <div className='flex items-center justify-between mb-3 w-full'>
              <span className='text-[10px] uppercase font-bold tracking-widest text-white/100 bg-primary dark:bg-secondary dark:text-white px-3 py-1 rounded-full inline-block'>
                Digital Archives
              </span>
              <span className='text-[10px] text-tertiary font-semibold'>
                @wildbyte23
              </span>
            </div>

            <a
              href={TIKTOK_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='relative w-full aspect-[9/13] max-h-64 rounded-xl overflow-hidden bg-stone-950 border border-stone-800 shadow-md group mb-3 flex flex-col justify-end p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary block'
            >
              <img
                src={assets.tiktok_preview}
                alt='TikTok post preview snapshot detailing natural history archive documents'
                className='absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90'
                onError={(e) => {
                  e.target.className =
                    'absolute inset-0 w-full h-full bg-gradient-to-br from-tertiary to-stone-950 opacity-40';
                }}
              />
              <div className='absolute inset-0 bg-gradient-to-b from-stone-900/10 via-transparent to-stone-950/95 z-10' />

              <div className='relative z-20 w-full flex items-center justify-between text-white'>
                <div className='flex items-center gap-2'>
                  <div className='w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] text-white font-black shadow'>
                    📜
                  </div>
                  <div className='text-[11px] dark:text-stone-200 font-bold tracking-tight shadow-sm'>
                    Decoding Natural History
                  </div>
                </div>

                <span className='text-[8px] bg-secondary hover:bg-primary dark:bg-white dark:text-secondary font-bold px-3 py-1 rounded-full backdrop-blur-sm tracking-wider shadow active:scale-95 transition-all'>
                  ▶ WATCH
                </span>
              </div>
            </a>

            <h3 className='text-md text-secondary font-extrabold dark:text-white/100 mb-1'>
              Decoding Natural History Archives
            </h3>
            <p className='text-[14px] text-tertiary dark:text-tertiary leading-relaxed italic'>
              Exploring how primary source documents, wildlife records, and
              environmental footprints are synthesized into creative, immersive
              digital storytelling.
            </p>
          </div>

          <a
            href={TIKTOK_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-4 block w-full py-2.5 bg-secondary hover:bg-tertiary dark:bg-light dark:text-tertiary dark:hover:bg-white text-white text-center text-[11px] font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer'
          >
            Open Feed on TikTok &rarr;
          </a>
        </div>
      </div>

      
      <div className='w-full mt-6'>
        <h2 className='text-xl font-black mb-4 text-tertiary dark:text-primary border-b border-stone-200 dark:border-stone-800 pb-2'>
          Select a Booking Window
        </h2>
        <div
          className='calendly-inline-widget w-full rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white shadow-lg shadow-secondary/5'
          data-url='https://calendly.com/wildbyte-avictoria/30min'
          style={{ minWidth: '320px', height: '680px' }}
        />
      </div>
    </div>
  );
};

export default ContactPage;
