import React from 'react';
import PlayVideo from './components/playvideo';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <header className="flex justify-between p-4 sm:p-5">
        <div className="font-raptor text-2xl text-[#514F8C]">ETTO</div>
        <a 
          href="https://signup.etto.ai/" 
          className="cursor-pointer hover:text-[#514F8C] hover:underline transition-all duration-300"
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
            Etto is AI for your personal style - aligning and refining your wardrobe to bring you closer to yourself.
          </p>
        </div>
        <div className="w-full overflow-hidden pb-4 sm:pb-6 md:pb-6 px-1 sm:px-4">
          <h2 className="font-raptor text-[37vw] leading-[0.8] mt-auto w-full">
            ETTO
            <PlayVideo />
          </h2>
        </div>
      </main>
      
      <footer className="w-full mt-auto">
        <div className="flex justify-between items-center px-4 py-2">
          <span className="text-xs sm:text-sm">© 2024 Etto</span>
          <a 
            href="https://youtu.be/4-umSC9I_uM?feature=shared" 
            className="text-xs sm:text-sm text-[#514F8C] hover:underline"
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
