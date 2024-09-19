import React from 'react';
import PlayVideo from './components/PlayVideo';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black relative">
      <header className="flex justify-between p-4 sm:p-5">
        <div className="font-raptor text-2xl">ETTO</div>
        <div>SIGN UP</div>
      </header>
      <main className="flex-grow flex flex-col justify-between items-center text-center px-4 sm:px-5 pt-20 sm:pt-24 md:pt-32">
        <div className="flex flex-col items-center mb-auto">
          <h1 className="font-raptor text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4">
            the wardrobe that speaks to you
          </h1>
          <p className="max-w-sm sm:max-w-md md:max-w-lg text-sm sm:text-base">
            Etto is the magic mirror camera that brings your wardrobe to life. 
          </p>
        </div>
        <div className="w-full overflow-hidden">
          <h2 className="font-raptor text-[30vw] sm:text-[35vw] md:text-[38vw] leading-[.9] whitespace-nowrap">
            ETTO<PlayVideo />
          </h2>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
