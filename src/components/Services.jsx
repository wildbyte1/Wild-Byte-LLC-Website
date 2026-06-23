import React from 'react';
import { Link } from 'react-router-dom';
import assets from '../assets/assets';
import Title from './Title';
import ServiceCard from './ServiceCard';

const Services = () => {
  const servicesData = [
    {
      title: 'Interactive Digital Storytelling',
      description:
        'Engaging audiences through choice driven platforms bridging technology and environmental education. We design digital narratives built directly upon primary and secondary sources, such as natural history and wildlife archives. By transforming raw field notes into interactive journeys, we empower users to analyze authentic scientific data, solve historical ecological mysteries, and build a profound connection to the natural world.',
      icon: assets.letter,
    },
    {
      title: 'Community Workshops & Public Programs',
      description:
        'Bridging digital storytelling with hands on community workshops. We design and facilitate interactive, family friendly experiences such as nature art therapy, garden ecology, and wildflie habitat building tailored for local schools, community gardens, and educational spaces and organizations.',
      icon: assets.bison_smithsonian,
    },
  ];

  return (
    <div
      id='services'
      className='relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-secondary dark:text-primary w-full max-w-7xl mx-auto'
    >
      <Title
        title='How can we help?'
        desc='We offer a range of services to engage and educate your audience about wildlife and conservation.'
      />

     
      <div className='flex flex-col md:grid grid-cols-2 gap-6 w-full mb-4'>
        {servicesData.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>

     
      <div className='w-full mb-12 p-6 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-tertiary dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6 transition-colors shadow-sm'>
        <div className='text-center sm:text-left max-w-2xl'>
          <div className='flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2'>
            <span className='text-[10px] uppercase font-black tracking-widest text-white bg-secondary dark:bg-primary dark:text-tertiary px-3 py-1 rounded-full inline-block'>
              ¡Hablamos Español!
            </span>
            <span className='text-xs font-bold text-stone-500 dark:text-stone-400'>
              Bilingual Facilitation Available
            </span>
          </div>
          <p className='text-sm text-secondary dark:text-stone-300 leading-relaxed'>
            All digital storytelling platforms, community workshops, and
            public archival collaborations can be customized as fully bilingual
            experiences or facilitated entirely in Spanish to support inclusivity. 
          </p>
        </div>

        
        <Link
          to='/contact'
          className='whitespace-nowrap px-5 py-3 bg-secondary hover:bg-tertiary dark:bg-primary dark:text-tertiary dark:hover:bg-light text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95 text-center w-full sm:w-auto'
        >
          Book a Bilingual Program &rarr;
        </Link>
      </div>
    </div>
  );
};

export default Services;
