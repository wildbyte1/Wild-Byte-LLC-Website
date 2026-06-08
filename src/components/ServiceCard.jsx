import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service, index }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [visible, setVisible] = useState(false);

  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = divRef.current.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      className='relative overflow-hidden max-w-lg m-2 sm:m-4 rounded-xl border border-tertiary dark:border-primary shadow-2xl shadow-primary-100 dark:shadow-white/10'
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      ref={divRef}
      onMouseMove={handleMouseMove}
    >
      <div
        className={`pointer-events-none blur-2xl rounded-full bg-gradient-to-r from-primary via-secondary to-primary w-[300px] h-[300px] absolute z-0 transition-opacity duration-500 mix-blend-lighten ${visible ? 'opacity-70' : 'opacity-0'}`}
        style={{ top: position.y - 150, left: position.x - 150 }}
      />

      <div className='flex items-center gap-6 p-8 hover:p-7.5 hover:m-0.5 transition-all rounded-[10px] bg-white dark:bg-gray-700 z-10 relative h-full'>
        <div className='bg-gray-100 dark:bg-gray-700 rounded-full flex-shrink-0 aspect-square w-24 h-24 overflow-hidden flex items-center justify-center border border-tertiary-200 dark:border-stone-600'>
          <img
            src={service.icon}
            alt=''
            className='w-full h-full object-cover'
          />
        </div>

        <div className='flex-1 min-w-0'>
          <h3 className='font-extrabold text-stone-900 dark:text-stone-100 text-lg leading-snug'>
            {service.title}
          </h3>

          <p className='text-sm mt-2 text-stone-600 dark:text-stone-300 leading-relaxed'>
            {service.description}
          </p>
          <Link
            to='/contact'
            className='mt-6 inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary hover:bg-secondary text-white font-semibold transition-all shadow-sm'
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
