import React from 'react';
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
      className='relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-secondary dark:text-primary'
    >
      <Title
        title='How can we help?'
        desc='We offer a range of services to engage and educate your audience about wildlife and conservation.'
      />

      <div className='flex flex-col md:grid grid-cols-2'>
        {servicesData.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Services;
