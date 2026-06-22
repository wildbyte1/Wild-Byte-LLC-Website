import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import assets from '../assets/assets';
import ThemeToggleBtn from './ThemeToggleBtn';

const Navbar = ({ theme, setTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (targetPath, sectionId) => {
    setSidebarOpen(false);

    if (location.pathname === targetPath) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate(targetPath);

      
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 120);
    }
  };

  
  const navLinkStyles = `
    relative text-left bg-transparent border-none cursor-pointer font-medium sm:font-semibold 
    text-secondary dark:text-stone-200 hover:text-secondary dark:hover:text-primary 
    transition-colors duration-300 py-1
    after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] 
    after:bg-secondary dark:after:bg-primary after:scale-x-0 hover:after:scale-x-100 
    after:transition-transform after:duration-300 after:origin-left max-sm:text-white max-sm:hover:text-stone-200
  `;

  return (
    <div className='flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-8 py-3 sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-stone-950/70 border-b border-stone-200/50 dark:border-stone-900/50 transition-colors'>
      <img
        src={theme === 'dark' ? assets.logo_dark : assets.logo}
        className='w-24 sm:w-24 cursor-pointer hover:opacity-90 transition-opacity'
        alt='Wild Byte'
        onClick={() => handleNavigation('/', 'home')}
      />

      
      <div
        className={`text-secondary dark:text-white sm:text-sm gap-6 ml-18 ${!sidebarOpen ? 'max-sm:w-0 overflow-hidden' : 'max-sm:w-60 max-sm:pl-10'} max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full max-sm:flex-col max-sm:bg-tertiary dark:max-sm:bg-stone-900 max-sm:text-white max-sm:pt-20 flex sm:items-center transition-all duration-300`}
      >
        <img
          src={assets.close_icon}
          alt='Close menu'
          className='w-5 absolute right-4 top-4 sm:hidden cursor-pointer hover:scale-110 transition-transform'
          onClick={() => setSidebarOpen(false)}
        />

        <button
          onClick={() => handleNavigation('/', 'home')}
          className={navLinkStyles}
        >
          Home
        </button>

        <button
          onClick={() => handleNavigation('/', 'services')}
          className={navLinkStyles}
        >
          Services
        </button>

        <button
          onClick={() => handleNavigation('/our-work', 'top')}
          className={navLinkStyles}
        >
          Our Work
        </button>

        <button
          onClick={() => handleNavigation('/about-us', 'top')}
          className={navLinkStyles}
        >
          About Us
        </button>

        <button
          onClick={() => handleNavigation('/contact', 'top')}
          className={navLinkStyles}
        >
          Contact Us
        </button>
      </div>

     
      <div className='flex items-center gap-2 sm:gap-4'>
        <ThemeToggleBtn theme={theme} setTheme={setTheme} />

        <img
          src={theme === 'dark' ? assets.menu_icon_dark : assets.menu_icon}
          alt='Open Menu'
          onClick={() => setSidebarOpen(true)}
          className='w-8 sm:hidden cursor-pointer hover:opacity-80 active:scale-95 transition-all'
        />

        
        <button
          onClick={() => handleNavigation('/', 'early-access')}
          className='text-sm max-sm:hidden flex items-center gap-2 bg-secondary hover:bg-tertiary dark:bg-primary dark:text-tertiary dark:hover:bg-light text-white px-6 py-2.5 rounded-full cursor-pointer hover:scale-[1.03] active:scale-[0.98] transition-all border-none font-bold shadow-sm hover:shadow-md'
        >
          Connect{' '}
          <img
            src={assets.arrow_icon}
            width={14}
            alt=''
            className='group-hover:translate-x-0.5 transition-transform'
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
