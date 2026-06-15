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

      // Delay briefly to let the DOM structure render fully
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

  return (
    <div className='flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-8 py-2 sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70'>
      <img
        src={theme === 'dark' ? assets.logo_dark : assets.logo}
        className='w-24 sm:w-24 cursor-pointer'
        alt='Wild Byte'
        onClick={() => handleNavigation('/', 'home')}
      />

      <div
        className={`text-secondary dark:text-white sm:text-sm gap-5 ml-18 ${!sidebarOpen ? 'max-sm:w-0 overflow-hidden' : 'max-sm:w-60 max-sm:pl-10'} max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full max-sm:flex-col max-sm:bg-primary max-sm:text-white max-sm:pt-20 flex sm:items-center gap-5 transition-all`}
      >
        <img
          src={assets.close_icon}
          alt=''
          className='w-5 absolute right-4 top-4 sm:hidden cursor-pointer'
          onClick={() => setSidebarOpen(false)}
        />

        <button
          onClick={() => handleNavigation('/', 'home')}
          className='sm:hover:border-b text-left bg-transparent border-none cursor-pointer font-medium sm:font-normal'
        >
          Home
        </button>

        <button
          onClick={() => handleNavigation('/', 'services')}
          className='sm:hover:border-b text-left bg-transparent border-none cursor-pointer font-medium sm:font-normal'
        >
          Services
        </button>

        <button
          onClick={() => handleNavigation('/our-work', 'top')}
          className='sm:hover:border-b text-left bg-transparent border-none cursor-pointer font-medium sm:font-normal'
        >
          Our Work
        </button>

        <button
          onClick={() => handleNavigation('/about-us', 'top')}
          className='sm:hover:border-b text-left bg-transparent border-none cursor-pointer font-medium sm:font-normal'
        >
          About Us
        </button>

        <button
          onClick={() => handleNavigation('/contact', 'top')}
          className='sm:hover:border-b text-left bg-transparent border-none cursor-pointer font-medium sm:font-normal'
        >
          Contact Us
        </button>
      </div>

      <div className='flex items-center gap-2 sm:gap-4'>
        <ThemeToggleBtn theme={theme} setTheme={setTheme} />

        <img
          src={theme === 'dark' ? assets.menu_icon_dark : assets.menu_icon}
          alt=''
          onClick={() => setSidebarOpen(true)}
          className='w-8 sm:hidden cursor-pointer'
        />

        <button
          onClick={() => handleNavigation('/', 'early-access')}
          className='text-sm max-sm:hidden flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full cursor-pointer hover:scale-103 transition-all border-none font-medium'
        >
          Connect <img src={assets.arrow_icon} width={14} alt='' />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
