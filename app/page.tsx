import React from 'react';

const LandingPage = () => {
  return (
    <div>
      {/* Video Hero Section */}
      <section className="h-screen relative overflow-hidden">
        {/* Background Video */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          poster="/hero-poster.png"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <img src="/hero-poster.png" alt="Hero background" className="w-full h-full object-cover" />
        </video>

        {/* Overlay for better text readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 z-10"></div>

        {/* Content Layer */}
        <div className="relative z-20 h-full flex flex-col text-white">
          
          {/* Header */}
          <header className="flex justify-between items-center py-6 px-8 sm:py-8 sm:px-12 md:py-10 md:px-16">
            <div className="font-raptor">
              <img
                src="/etto-type-white.png"
                alt="Etto"
                className="h-4 sm:h-4"
              />
            </div>
            <a
              href="https://tally.so/r/w8857x"
              className="py-2 hover:text-gray-300 transition-all duration-300 text-sm sm:text-base"
            >
              JOIN WAITLIST
            </a>
          </header>

          {/* Main Content */}
          <main className="flex-grow flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8">
            <div className="w-full">
              <h1 className="font-abc-bold text-[6vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] xl:text-[3vw] mb-6 sm:mb-8 leading-tight">
                your taste, operationalized
              </h1>
            </div>
          </main>
        </div>
      </section>

      {/* White Section Below — Swiss grid layout */}
      <section className="bg-white text-black py-16 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 md:px-16 grid grid-cols-12 gap-x-5">

          {/* Text Content — constrained to left 7 columns */}
          <div className="col-span-12 md:col-span-7 text-left">
            <p className="text-base sm:text-xl md:text-[22px] leading-snug tracking-[-0.01em]">
              Etto is an AI-powered workspace for stylists.
            </p>
            <p className="mt-6 sm:mt-7 text-base sm:text-xl md:text-[22px] leading-snug tracking-[-0.01em]">
              One place that remembers everything and acts upon it.
              <br />
              From references to client feedback to pulls.
            </p>
            <p className="mt-6 sm:mt-7 text-base sm:text-xl md:text-[22px] leading-snug tracking-[-0.01em]">
              Spend more time creative directing,
              <br />
              and less time with admin and organization.
            </p>
          </div>

          {/* Right Side — Circular Join Button */}
          <div className="col-span-12 md:col-span-5 flex items-center justify-center md:justify-end mt-10 md:mt-0">
            <a
              href="https://tally.so/r/w8857x"
              className="group relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full flex items-center justify-center text-[13px] sm:text-[14px] tracking-[0.08em] uppercase transition-all duration-300 cursor-pointer hover:scale-105"
              style={{
                background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
                boxShadow: '8px 8px 20px #d1d1d1, -8px -8px 20px #ffffff',
              }}
            >
              <span className="relative z-10 text-black/70 group-hover:text-black transition-colors duration-300 font-bold">
                join
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black px-6 sm:px-10 md:px-16 pb-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-x-5">
          <div className="col-span-12">
            <span className="text-[11px] sm:text-xs text-black/40">© 2025 Etto Systems Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
