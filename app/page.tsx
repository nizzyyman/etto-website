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
          <header className="flex justify-between items-center p-4 sm:p-6 md:p-8">
            <div className="font-raptor">
              <img 
                src="/etto-type-white.png" 
                alt="Etto" 
                className="h-5 sm:h-7"
              />
            </div>
            <a 
              href="https://tally.so/r/w8857x" 
              className="px-4 py-2 hover:text-gray-300 transition-all duration-300 text-sm sm:text-base"
            >
              JOIN WAITLIST
            </a>
          </header>

          {/* Main Content */}
          <main className="flex-grow flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8">
            <div className="w-full">
              <h1 className="font-raptor text-[6vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] xl:text-[3vw] mb-6 sm:mb-8 leading-tight">
                your taste, operationalized
              </h1>
            </div>
          </main>
        </div>
      </section>

      {/* White Section Below */}
      <section className="bg-white text-black py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4 px-4 sm:px-6 md:px-8">
          
          {/* Left Side - Text Content */}
          <div className="flex-1 text-left">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight">
              Etto is the operational workspace for stylists. From references to client feedback to pulls - <br />
              one place that remembers everything and acts upon it. 
              <br />
              Spend more time creative directing, and less time searching.
            </h2>
          </div>
          
          {/* Right Side - CTA Button */}
          <div className="flex-shrink-0">
            <a 
              href="https://tally.so/r/w8857x" 
              className="inline-block px-8 py-4 bg-gray-200 text-black hover:bg-gray-300 transition-all duration-300 text-base font-medium"
            >
              JOIN WAITLIST
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black px-4 sm:px-6 md:px-8 pb-4">
        <div className="flex justify-between items-center text-xs sm:text-sm">
          <span>© 2025 Etto Systems Inc.</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
