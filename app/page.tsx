import React from 'react';

const LandingPage = () => {
  return (
    <div className="landing-page min-h-screen flex flex-col bg-[#f0f0f0] text-black">
      <header className="flex justify-between p-5">
        <div className="logo font-abcdiatype">ETTO</div>
        <div className="nav">SIGN UP</div>
      </header>
      <main className="flex-grow flex flex-col justify-center items-center text-center px-5">
        <h1 className="text-2xl mb-5 font-abcdiatype">WELCOME</h1>
        <p className="max-w-xl mb-10">
          the wardrobe that speaks to you.
        </p>
        <h2 className="text-[120px] m-0 font-raptor">ETTO</h2>
      </main>
      <footer className="flex justify-between p-5 mt-auto">
      </footer>
    </div>
  );
};

export default LandingPage;
