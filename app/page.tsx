'use client';
import React, { useRef, useState } from 'react';

const LandingPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setPaused(false);
      } else {
        videoRef.current.pause();
        setPaused(true);
      }
    }
  };
  return (
    <div>
      {/* Video Hero Section */}
      <section className="h-screen relative overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
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
              className="py-2 hover:text-gray-300 transition-all duration-300 text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none focus-visible:rounded-sm"
            >
              JOIN WAITLIST
            </a>
          </header>

          {/* Video pause/play toggle */}
          <button
            onClick={toggleVideo}
            aria-label={paused ? 'Play video' : 'Pause video'}
            className="absolute bottom-4 right-4 z-30 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none rounded-full"
          >
            {paused ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6V2z"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><rect x="2" y="2" width="4" height="12"/><rect x="10" y="2" width="4" height="12"/></svg>
            )}
          </button>

          {/* Main Content */}
          <main className="flex-grow flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8">
            <div className="w-full">
              <h1 className="font-medium text-[6vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] xl:text-[3vw] mb-6 sm:mb-8 leading-tight">
                your taste, operationalized
              </h1>
            </div>
          </main>
        </div>
      </section>

      {/* White Section Below — Swiss grid layout */}
      <section className="bg-white text-black py-16 sm:py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-8 sm:px-12 md:px-16 grid grid-cols-12 gap-x-5">

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

          {/* Right Side — Parenthesis Join Button */}
          <div className="col-span-12 md:col-span-5 flex items-center justify-center md:justify-end mt-10 md:mt-0">
            <a
              href="https://tally.so/r/w8857x"
              className="paren-btn group relative w-[120px] h-[56px] sm:w-[150px] sm:h-[64px] flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:rounded-sm focus-visible:outline-none"
            >
              {/* Stamp parentheses SVG — raised by default */}
              <svg
                aria-hidden="true"
                viewBox="0 0 1238 457"
                fill="none"
                className="absolute inset-0 w-full h-full transition-all duration-200"
              >
                <path d="M14.4521 150.41C-13.5379 231.17 -1.06791 308.48 53.5821 374.84C95.9621 426.3 159.602 454.03 224.392 456.06V397.64C207.212 395.45 190.842 390.72 175.642 383.82C116.402 356.94 75.1821 297.31 75.1821 228.02C75.1821 184.54 91.4322 144.87 118.162 114.69C134.782 95.92 155.452 80.82 178.822 70.78C193.112 64.65 208.412 60.44 224.392 58.4V0C211.012 0.69 197.402 2.42 183.582 5.13C100.352 21.49 42.1421 70.52 14.4421 150.42L14.4521 150.41Z" className="fill-[#e4e4e4] group-hover:fill-[#d4d4d4] transition-all duration-200" />
                <path d="M1222.95 150.42C1195.25 70.53 1137.04 21.49 1053.81 5.13C1040 2.41 1026.39 0.69 1013 0V57.94C1044.81 61.29 1074.01 73.35 1098.19 91.7C1124.82 110.86 1144.32 137.44 1155.13 168.09C1162.11 186.75 1165.96 206.94 1165.96 228.03C1165.96 261.44 1156.35 292.59 1139.78 318.93C1131.48 332.54 1121.37 344.49 1109.93 354.64C1109.88 354.68 1109.83 354.72 1109.79 354.77C1108.67 355.76 1107.55 356.74 1106.41 357.7C1080.76 379.78 1048.51 394.4 1013.01 398.13V456.07C1077.8 454.04 1141.44 426.31 1183.82 374.85C1238.47 308.49 1250.95 231.18 1222.95 150.42Z" className="fill-[#e4e4e4] group-hover:fill-[#d4d4d4] transition-all duration-200" />
              </svg>
              <span className="relative z-10 text-[13px] sm:text-[14px] tracking-[0.08em] uppercase font-bold text-black/60 group-hover:text-black transition-colors duration-200 select-none">
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
            <span className="text-[11px] sm:text-xs text-black/40">© 2026 Etto Systems Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
