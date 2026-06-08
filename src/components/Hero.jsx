import React from 'react';
import assets from '../assets/assets';

const Hero = () => {
  return (
    <div
      id='hero'
      className='flex flex-col items-center gap-6 py-20 px-4 sm:px-12 lg:px-24 xl:px-40 text-center w-full overflow-hidden text-secondary dark:text-white'
    >
      <div className='inline-flex items-center border-2  border-primary p-1.5 pr-4 rounded-full cursor-pointer hover:scale-103 transition-all'>
        <a href='#early-access'>
          <span className='text-sm font-semibold'>🚀 Join the Wild Byte Early Access Community</span>
        </a>
      </div>

      <h1 className='text-4xl sm:text-5xl md:text-6xl xl:text-[84px] font-medium xl:leading-[95px] max-w-5xl'>
        Discover the wild through {''}
        <span className='bg-gradient-to-r from-[#C5D8AF] to-[#495A34] bg-clip-text text-transparent'>
          interactive digital {''}
        </span>
        stories.
      </h1>

      <p className='text-sm sm:text-lg font-medium text-gray-500 dark:text-white/75 max-w-4/5 sm:max-w-lg pb-3'>
        Where natural history meets interactive storytelling to inspire the next
        generation of wildlife protectors.
      </p>

      <div className='relative'>
        <img
          src={assets.hero_img}
          alt=''
          className='w-90 max-w-xl rounded-4xl'
        />
        <img
          src={assets.bgImage1}
          alt=''
          className='absolute -top-40 -right-40 sm:-top-60 sm:-right-0 -z-1 dark:hidden '
        />
      </div>
    </div>
  );
};

export default Hero;
