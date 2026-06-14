import React from 'react';
import assets from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full bg-light text-tertiary py-12 px-6 border-t border-primary dark:bg-primary dark:text-white'>
      <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6'>
        {/* Left Side: Brand & Mission Brief */}
        <div className='text-center md:text-left'>
          <div className='flex items-center justify-center md:justify-start gap-2 text-secondary dark:text-white font-bold text-lg mb-1'>
            <span>
              <img
                src={assets.logo}
                alt='Wild Byte LLC Logo'
                className='w-18 h-18'
              />
            </span>{' '}
            Wild Byte LLC
          </div>
          <p className='text-xs font-bold text-tertiary max-w-sm leading-relaxed'>
            Wild Byte is an interactive platform that blends natural history,
            technology, and storytelling to inspire people of all ages to
            connect with the natural world.
          </p>
          <br />
          <p className='text-xs text-secondary text-semibold italic max-w-sm leading-relaxed'>
            Wild Byte was created on the ancestral lands of the
            Gabrielino-Kizh Nation. This project is offered with respect and
            gratitude to the Gabrielino-Kizh community past, present, and future.
          </p>
        </div>

        <div className='flex items-center gap-5 text-sm font-medium text-tertiary dark:text-white'>
          <a
            className='  hover:bg-primary dark:hover:bg-secondary transition-colors duration-200'
            href='https://www.facebook.com/profile.php?id=61579262037395'
            target='_blank'
            rel='noopener noreferrer'
          >
            Facebook
          </a>
          <a
            className=' hover:bg-primary dark:hover:bg-secondary transition-colors duration-200'
            href='https://www.instagram.com/wildbyteai/'
            target='_blank'
            rel='noopener noreferrer'
            className=' hover:bg-primary dark:hover:bg-secondary transition-colors duration-200'
          >
            Instagram
          </a>
          <a
            className=' hover:bg-primary dark:hover:bg-secondary transition-colors duration-200'
            href='https://www.tiktok.com/@wildbyte23?_r=1&_t=ZT-96qXyyVJCQw'
            target='_blank'
            rel='noopener noreferrer'
          >
            TikTok
          </a>
          <a
            className=' hover:bg-primary dark:hover:bg-secondary transition-colors duration-200'
            href='https://www.linkedin.com/home'
            target='_blank'
            rel='noopener noreferrer'
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className='max-w-6xl mx-auto border-t border-secondary dark:border-white my-8'></div>

      <div className='max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-tertiary '>
        <div>&copy; {currentYear} Wild Byte LLC. All rights reserved.</div>

        <div className='flex items-center gap-6'>
          <Link
            to='/privacy'
            className='hover:text-primary dark:hover:text-white transition-colors duration-200'
          >
            Privacy Policy
          </Link>
          <Link
            to='/terms'
            className='hover:text-primary dark:hover:text-white transition-colors duration-200'
          >
            Terms of Service
          </Link>
          <a
            href='mailto:support@wildbyte.dev'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-primary dark:hover:text-white transition-colors duration-200'
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
