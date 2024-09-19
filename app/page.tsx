import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <header className="flex justify-between p-4 sm:p-5">
        <div className="font-raptor text-2xl">ETTO</div>
        <div>SIGN UP</div>
      </header>
      <main className="flex-grow flex flex-col justify-between items-center text-center px-4 sm:px-5 pt-20 sm:pt-24 md:pt-32 pb-0 sm:pb-2 md:pb-4">
        <div className="flex flex-col items-center mb-8 sm:mb-10">
          <h1 className="font-raptor text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4">
            the wardrobe that speaks to you
          </h1>
          <p className="max-w-sm sm:max-w-md md:max-w-lg text-sm sm:text-base">
            Etto is the magic mirror camera that brings your wardrobe to life. 
          </p>
        </div>
        <h2 className="font-raptor text-[30vw] sm:text-[35vw] md:text-[40vw] leading-[0.8]">
          ETTO.
        </h2>
      </main>
    </div>
  );
};

export default LandingPage;
