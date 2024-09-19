import React from 'react';

const LandingPage = () => {
  return (
    <div className="landing-page min-h-screen flex flex-col bg-[#f0f0f0] text-black">
      <header className="flex justify-between p-4 sm:p-5">
        <div className="logo font-raptor text-lg sm:text-xl">ETTO</div>
        <div className="nav text-sm sm:text-base">SIGN UP</div>
      </header>
      <main className="flex-grow flex flex-col justify-end items-center text-center px-4 sm:px-5 pt-6 sm:pt-10 pb-0">
        <div className="flex-grow"></div>
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-xl mb-2 sm:mb-3 font-abcdiatype">the wardrobe that speaks to you</h1>
          <p className="max-w-xs sm:max-w-xl text-xs sm:text-sm">
            the wardrobe that speaks to you.
          </p>
        </div>
        <h2 className="text-[30vw] sm:text-[35vw] md:text-[40vw] leading-[0.8] font-raptor">ETTO.</h2>
      </main>
      <footer className="h-4 sm:h-5">
        {/* Add footer content if needed */}
      </footer>
    </div>
  );
};

export default LandingPage;
