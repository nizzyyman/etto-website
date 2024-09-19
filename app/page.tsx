import React from 'react';
import PlayVideo from './components/PlayVideo';
import styles from './page.module.css';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black relative">
      <header className="flex justify-between p-4 sm:p-5">
        <div className="font-raptor text-2xl text-[#A000E7]">ETTO</div>
        <a 
          href="https://signup.etto.ai/" 
          className="cursor-pointer hover:text-[#A000E7] hover:underline transition-all duration-300"
        >
          SIGN UP
        </a>
      </header>
      <main className="flex-grow flex flex-col justify-between items-center text-center pt-20 sm:pt-24 md:pt-32">
        <div className="flex flex-col items-center mb-auto px-[12px] sm:px-0">
          <h1 className="font-raptor text-lg sm:text-2xl md:text-3xl mb-3 sm:mb-4">
            the wardrobe that speaks to you
          </h1>
          <p className="max-w-sm sm:max-w-md md:max-w-lg text-xs sm:text-sm md:text-base">
            Etto is the magic mirror camera that brings your wardrobe to life. 
          </p>
        </div>
        <div className="w-full overflow-hidden pb-4 sm:pb-6 md:pb-6 px-1 sm:px-4">
          <h2 className="font-raptor text-[37vw] leading-[0.8] mt-auto w-full">
            ETTO
            <PlayVideo />
          </h2>
        </div>
      </main>
      
      <footer className="w-full text-xs sm:text-sm">
        <div className="flex justify-between items-center px-4 py-2">
          <span>© 2024 Etto</span>
          <a 
            href="https://youtu.be/4-umSC9I_uM?feature=shared" 
            className="text-[#A000E7] hover:underline"
            target="_blank" 
            rel="noopener noreferrer"
          >
            watch film
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
