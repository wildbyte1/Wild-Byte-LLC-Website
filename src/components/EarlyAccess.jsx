import React from 'react';
import { earlyAccessImages } from '../assets/assets';
import { Link } from 'react-router-dom';

const EarlyAccess = () => {
  return (
    <div id='early-access' className='py-16 px-4 max-w-5xl mx-auto text-center'>
      <h3 className='text-3xl font-bold text-secondary mb-2 dark:text-white'>
        Join the Early Access Community
      </h3>
      <p className='text-tertiary mb-12 max-w-md mx-auto dark:text-primary/80'>
        Help us bridge technology and natural history. Choose how you want to
        explore the wild with us.
      </p>

     
      <div className='flex items-stretch justify-center flex-wrap gap-8 m-4'>
        
        <div className='flex-1 min-w-[300px] max-w-[400px] border-2 primary  rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col text-left'>
          
          <div className='h-48 bg-stone-100 relative overflow-hidden'>
            <img
              src={earlyAccessImages[3]}
              className='w-full h-full object-cover dark:drop-shadow-xl'
            />
            <div className='absolute top-3 right-3 bg-stone-900/80 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm'>
              Free
            </div>
          </div>

          <div className='p-6 flex-1 flex flex-col'>
            <h4 className='font-bold text-xl text-tertiary mb-1'>
              Beta Explorer
            </h4>
            <p className='text-sm text-secondary mb-6 leading-relaxed'>
              Get on the list to test our public beta features. Try early
              interactive wildlife narratives and provide feedback to shape our
              launch.
            </p>
            <div className='mt-auto'>
            
              <Link
                to='/our-work?tier=beta'
                className='w-full bg-secondary hover:bg-primary text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors duration-200 cursor-pointer'
              >
                Join Free Waitlist
              </Link>
            </div>
          </div>
        </div>

        
        <div className='flex-1 min-w-[300px] max-w-[400px] border-2 primary rounded-2xl overflow-hidden bg-white shadow-md flex flex-col text-left relative'>
          <div className='absolute top-3 right-3 text-light text-xs font-bold px-3 py-1 rounded-full'>
            $25 Suggested
          </div>

          <div className='h-48 bg-stone-100 relative overflow-hidden dark:drop-shadow-xl'>
            <img
              src={earlyAccessImages[1]}
              className='w-full h-full object-cover dark:drop-shadow-xl'
            />
          </div>

          <div className='p-6 flex-1 flex flex-col'>
            <h4 className='font-bold text-xl text-secondary mb-1'>
              Wild Byte Member
            </h4>
            <p className='text-sm text-tertiary mb-4 leading-relaxed'>
              Directly support the development of Wild Byte. Your contribution
              funds custom natural history art and interactive story software.
            </p>
            <ul className='text-xs text-tertiary space-y-2 mb-6 bg-stone-50 p-3 rounded-xl border border-stone-100'>
              <li>
                🚀 <strong>Immediate First-Access:</strong> Test alpha-builds
                right now.
              </li>
              <li>
                🎨 <strong>Exclusive Digital Assets:</strong> Early access to
                interactive tools.
              </li>
              <li>
                💬 <strong>Direct Roadmap Input:</strong> Monthly group chat
                with the founder.
              </li>
            </ul>
            <div className='mt-auto'>
              
              <Link
                to='/our-work?tier=founder'
                className='w-full bg-secondary hover:bg-primary text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors duration-200 shadow-sm cursor-pointer'
              >
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccess;
