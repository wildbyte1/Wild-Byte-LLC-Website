import React from 'react';
import assets from '../assets/assets';

const AboutUs = () => {
  return (
    <div className='py-16 px-6 max-w-7xl mx-auto'>
      <header className='text-center mb-16'>
        <h1 className='text-5xl font-bold text-secondary dark:text-primary mb-3'>
          About Us
        </h1>
        <p className='text-xl text-tertiary dark:text-white italic'>
          Where Nature's History Meets Digital Storytelling
        </p>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 items-start'>
        <main className='lg:col-span-2'>
          <article className='bg-light dark:bg-tertiary p-8 md:p-12 rounded-xl shadow-sm leading-relaxed text-lg border-l-4 border-primary'>
            <h2 className='text-3xl font-semibold text-secondary dark:text-primary mb-6'>
              Welcome to Wild Byte.
            </h2>

            <p className='mb-6 text-tertiary/400 dark:text-white'>
              Every landscape has a story to tell, but those stories are often
              hidden just beneath the surface. Wild Byte was created to bring
              those narratives to light, utilizing technology and primary
              historical sources to showcase the rich history inspired by the
              natural world.
            </p>

            <p className='mb-6 text-tertiary/400 dark:text-white'>
              My professional background is rooted in the mental health field,
              where I facilitate community workshops and guide groups in
              developing nature based coping skills. Through this work, I have
              seen firsthand how profoundly grounding it can be to connect with
              the environment. When we engage with nature, we aren’t just
              stepping outside; we are participating in a living, breathing
              history.
            </p>

            <p className='mb-6 text-secondary/400 dark:text-white'>
              This appreciation for nature's restorative power is deeply
              intertwined with my academic background in history. With a
              concentration on 19th century United States history, my focus has
              always been on the environment and its profound transformation
              tracing the shift from untamed wilderness to the cities we live in
              today.
            </p>

            <p className='mb-6 text-tertiary/400 dark:text-white'>
              Wild Byte was born from this intersection of human well-being,
              historical study, and digital storytelling. By exploring authentic
              primary sources from the past, we can foster a deeper, more
              meaningful connection to the world around us right now. Our goal
              is to make these narratives accessible, engaging, and restorative
              for everyone.
            </p>

            <p className='mb-6 text-secondary/400 dark:text-white'>
              Whether you are here to explore local ecology, dive into
              historical archives, or simply find a new way to connect with the
              outdoors, I invite you to step into the narrative with us.
            </p>

            <div className='mt-12 border-t border-slate-100 pt-6'>
              <p className='mb-1 text-tertiary dark:text-light'>Warmly,</p>
              <p className='text-2xl font-semibold text-secondary dark:text-primary/90 my-1'>
                Angelica Victoria
              </p>
              <p className='text-sm text-tertiary dark:text-light uppercase tracking-widest font-medium'>
                Founder, Wild Byte
              </p>
            </div>
          </article>
        </main>

        <aside className='flex flex-col gap-8 lg:sticky lg:top-8'>
          {/* Artifact Card 1 */}
          <div className='bg-primary dark:bg-light p-4 rounded-xl shadow-sm border border-slate-100'>
            <div className='overflow-hidden rounded-lg bg-slate-50 flex items-center justify-center p-2'>
              <img
                src={assets.about_us1}
                alt='19th-century botanical illustration'
                className='w-full h-auto max-h-72 object-contain grayscale-[5%] hover:grayscale-0 transition-all duration-300'
              />
            </div>
            <p className='text-xs text-tertiary dark:text-secondary italic mt-3 text-center tracking-wide'>
              Fig 1. Botanical survey record, plants of the Fiji islands,
              1817-1892. Collection of the Biodiversity Heritage Library NZ.
            </p>
          </div>

          {/* Artifact Card 2 */}
          <div className='bg-primary dark:bg-light p-4 rounded-xl shadow-sm border border-slate-100'>
            <div className='overflow-hidden rounded-lg bg-slate-50 flex items-center justify-center p-2'>
              <img
                src={assets.about_us2}
                alt='19th-century wild turkey and curassow sketch'
                className='w-full h-auto max-h-72 object-contain grayscale-[5%] hover:grayscale-0 transition-all duration-300'
              />
            </div>
            <p className='text-xs text-tertiary dark:text-secondary italic mt-3 text-center tracking-wide'>
              Fig 2. Mid-19th century sketch of wild turkey, crested curassow,
              galeated curassow, and red curassow. Blackie & Son. Glasgow
              Edinburgh & London.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AboutUs;
