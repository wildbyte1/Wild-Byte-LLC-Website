import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';

const JuniorEcologistModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  
    const hasSeenModal = sessionStorage.getItem('juniorEcologistModalSeen');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); 

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('juniorEcologistModalSeen', 'true');
    setIsOpen(false);
  };

  const handleNavigate = () => {
    handleClose();
    navigate('/programs');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 bg-stone-100 dark:bg-stone-800 rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer border-none"
          aria-label="Close dialog"
        >
          ✕
        </button>

       
        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-primary/10 text-secondary dark:bg-primary/20 dark:text-primary mb-3">
          🌱 Fall 2026 Registration Open
        </span>
        
        <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          Junior Ecologist Workshop Series
        </h3>

        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2 leading-relaxed">
          Join us at Root 66 Community Garden for a 7-week, hands-on outdoor nature connection & adventure featuring plant ecology, soil microscopy, animal care, and digital storytelling!
        </p>

        
        <div className="grid grid-cols-2 gap-2 my-5 text-xs">
          <div className="p-3 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-200/70 dark:border-stone-800">
            <span className="font-bold text-stone-900 dark:text-stone-100 block">Saturdays (9–11 AM)</span>
            <span className="text-stone-500 dark:text-stone-400 text-[11px]">Sept 26 – Nov 7</span>
          </div>
          <div className="p-3 bg-stone-50 dark:bg-stone-950 rounded-xl border border-stone-200/70 dark:border-stone-800">
            <span className="font-bold text-stone-900 dark:text-stone-100 block">Ages 6–12</span>
            <span className="text-stone-500 dark:text-stone-400 text-[11px]">$75 Sibling Discount</span>
          </div>
        </div>

        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleNavigate}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-tertiary dark:bg-primary dark:text-tertiary dark:hover:bg-light text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer border-none"
          >
            Explore Program & Register
            <img src={assets.arrow_icon} alt="" width={12} className="invert dark:invert-0" />
          </button>
          
          <button
            onClick={handleClose}
            className="sm:w-auto px-4 py-3 text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors bg-transparent border-none cursor-pointer"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default JuniorEcologistModal;