'use client';

import React from 'react';
import { notFound } from 'next/navigation';

// Define the stylist data structure
interface Stylist {
  slug: string;
  name: string;
  location: string;
  clientsStyled: number;
  bio: string;
  workDescription: string;
  quote?: string;
  worldDescription: string;
  profilePhoto: string;
  workPhotos: string[];
  inspirationPhotos: string[];
}

// Booking links for each stylist
const bookingLinks: Record<string, string> = {
  'robyn': 'https://calendly.com/rdaviesstyling/styling-consultation',
  'felicia': '#booking', // Placeholder for Felicia
};

// Mock data - you can move this to a database or CMS later
const stylists: Record<string, Stylist> = {
  'robyn': {
    slug: 'robyn',
    name: 'ROBYN DAVIES',
    location: 'in Brooklyn, New York',
    clientsStyled: 86,
    bio: "Featured in Vogue, Elle, & Harper's Bazaar.",
    workDescription: "Robyn specializes in working within your existing wardrobe and translating it into wearable looks. She got her start assisting the editors of Vogue Paris, and later first-hand learned about the systemic labor rights and environmental issues in the industry. Today, she styles individuals who value cultivating their personal taste over chasing trends.",
    quote: "I gravitate towards textured, lived in looks. Considered, but not too precious.",
    worldDescription: "You'll resonate with Robyn if you're inspired by the overlap between aspiration and functionality. As well as statment outerwear and vintage Ralph Lauren.",
    profilePhoto: '/Robyn Profile Photo.jpeg',
    workPhotos: [
      '/Robyn Work/1_Susanna Moyer.jpg',
      '/Robyn Work/2_Rosalee Lewis.jpg',
      '/Robyn Work/3_Hilliary Bianca Salamanca.jpg',
      '/Robyn Work/5_Alyssa Vingan.jpg'
    ],
    inspirationPhotos: [
      '/Robyn Inspiration/1_Elle-September 2019.jpg',
      '/Robyn Inspiration/2_Vogue-January 2019.jpg',
      '/Robyn Inspiration/3_Elle-April 2019.jpg',
      '/Robyn Inspiration/4_Harper_s BAZAAR-September 2021.jpg'
    ]
  },
  'felicia': {
    slug: 'felicia',
    name: 'FELICIA GARCIA-RIVERA',
    location: 'in NYC & London',
    clientsStyled: 134,
    bio: "Featured in Vogue & W Magazine",
    workDescription: "Felicia specializes in building new identities that bring out the uniqueness in you.\n\nFelicia Garcia has over a decade of experience as a stylist, fashion editor and consultant in the luxury fashion world with an emphasis on sustainable brand practices.\n\nAfter beginning her career working with Edward Enninful (most recently Editor-in-Chief @ British Vogue) at US Vogue and W magazine, Felicia went on to launch a freelance career contributing to global publications like Vogue, W Magazine, Noon, Modern Weekly and SSAW and consulting with brands such as Dolce & Gabbana, Diane Von Furstenberg, Another Tomorrow and Nars Cosmetics. Felicia holds an MBA with a focus in sustainable business and strategy from NYU Stern.",
    worldDescription: "You'll resonate with Felicia if you're inspired by simplicity and sustainability.",
    profilePhoto: '/Felicia Profile Photo.jpg',
    workPhotos: [
      "/Felicia's Work/1_Thomas Tait.jpeg"
    ],
    inspirationPhotos: [
      "/Felicia's World/1_Vogue Horizon.jpg",
      "/Felicia's World/2_Shalom Harlow 90s.jpg",
      "/Felicia's World/3_ Craig Mcdean Yojhi.jpeg"
    ]
  }
};

interface PageProps {
  params: {
    slug: string;
  };
}

const StylistPage = ({ params }: PageProps) => {
  const stylist = stylists[params.slug];

  // If stylist doesn't exist, show 404
  if (!stylist) {
    notFound();
  }

  // Get booking link for this stylist
  const bookingLink = bookingLinks[params.slug] || '#booking';

  // Combine work and inspiration photos for masonry layout
  const allPhotos = [...stylist.workPhotos, ...stylist.inspirationPhotos];

  return (
    <>
      <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="h-[100px] flex justify-between items-center px-6 md:px-12 bg-white">
        <div className="font-raptor">
          <a href="/">
            <img
              src="/etto-type-black.png"
              alt="Etto"
              className="h-5"
            />
          </a>
        </div>
        <nav className="flex gap-16">
          <a
            href={bookingLink}
            className="text-[#000000] text-base font-medium hover:opacity-70 transition-opacity"
            target={bookingLink.startsWith('http') ? '_blank' : undefined}
            rel={bookingLink.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            BOOK {stylist.name.split(' ')[0].toUpperCase()}
          </a>
        </nav>
      </header>

      {/* Main Content Container */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:flex lg:gap-12">

        {/* LEFT SIDE: 50% width on desktop, full width on mobile */}
        <div className="lg:w-[50%] flex flex-col">

          {/* Stylist Name Header */}
          <h1 className="text-[48px] md:text-[85px] font-medium text-[#1AB1ED] leading-none mb-4 md:mb-1">
            {stylist.name}
          </h1>

          {/* Profile Photo - Mobile Only */}
          <div className="w-full aspect-[3/4] relative overflow-hidden mb-6 lg:hidden">
            <img
              src={stylist.profilePhoto}
              alt={`${stylist.name} profile photo`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.className = 'w-full aspect-[3/4] bg-gradient-to-br from-[#1AB1ED] to-[#0066ff] relative overflow-hidden flex items-center justify-center';
                  parent.innerHTML = `
                    <div class="text-center text-white">
                      <div class="text-6xl mb-2">📸</div>
                      <p class="text-sm">${stylist.name.split(' ')[0]}&apos;s Photo</p>
                    </div>
                  `;
                }
              }}
            />
          </div>

          {/* Location & Stats - Mobile */}
          <div className="mb-6 lg:hidden">
            <div className="flex items-start gap-2 body-text mb-2">
              <img src="/map-pin.svg" alt="Location" className="w-4 h-4 mt-0.5" />
              <span className="font-medium">{stylist.location}</span>
            </div>
            <div className="flex items-start gap-2 body-text">
              <img src="/user-badge-check.svg" alt="Clients" className="w-4 h-4 mt-0.5" />
              <span className="font-medium">styled {stylist.clientsStyled} clients</span>
            </div>
          </div>

          {/* Bio - Mobile */}
          <div className="body-text mb-6 lg:hidden">
            {stylist.bio}
          </div>

          {/* Book Button - Mobile */}
          <a
            href={bookingLink}
            className="w-full h-[65px] bg-[#000000] text-[#1AB1ED] text-[20px] font-medium flex items-center justify-center hover:bg-[#c9c9c9] transition-colors mb-8 lg:hidden"
            target={bookingLink.startsWith('http') ? '_blank' : undefined}
            rel={bookingLink.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            BOOK {stylist.name.split(' ')[0].toUpperCase()}
          </a>

          {/* Desktop Two-column layout */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">

            {/* Left Column: Location, Bio, Profile Photo, Book Button - Desktop */}
            <div className="flex flex-col">

              {/* Location & Stats */}
              <div className="mb-4">
                <div className="flex items-start gap-2 body-text">
                  <img src="/map-pin.svg" alt="Location" className="w-4 h-4 mt-0.5" />
                  <span className="font-medium">{stylist.location}</span>
                </div>
                <div className="flex items-start gap-2 body-text mb-2">
                  <img src="/user-badge-check.svg" alt="Clients" className="w-4 h-4 mt-0.5" />
                  <span className="font-medium">styled {stylist.clientsStyled} clients</span>
                </div>
              </div>

              {/* Bio */}
              <div className="body-text mb-4">
                {stylist.bio}
              </div>

              {/* Book Button */}
              <a
                href={bookingLink}
                className="w-full h-[65px] bg-[#000000] text-[#1AB1ED] text-[20px] font-medium flex items-center justify-center hover:bg-[#c9c9c9] transition-colors mb-6"
                target={bookingLink.startsWith('http') ? '_blank' : undefined}
                rel={bookingLink.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                BOOK {stylist.name.split(' ')[0].toUpperCase()}
              </a>

              {/* Profile Photo */}
              <div className="w-full aspect-[3/4] relative overflow-hidden">
                <img
                  src={stylist.profilePhoto}
                  alt={`${stylist.name} profile photo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.className = 'w-full aspect-[3/4] bg-gradient-to-br from-[#1AB1ED] to-[#0066ff] relative overflow-hidden flex items-center justify-center';
                      parent.innerHTML = `
                        <div class="text-center text-white">
                          <div class="text-6xl mb-2">📸</div>
                          <p class="text-sm">${stylist.name.split(' ')[0]}&apos;s Photo</p>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            </div>

            {/* Right Column: Work & World Info - Desktop */}
            <div className="flex flex-col pt-2">

              {/* Work Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-[#333] mb-4">
                  {stylist.name.split(' ')[0].toUpperCase()}&apos;S WORK
                </h2>
                <div className="body-text mb-4">
                  {stylist.workDescription.split('\n').map((paragraph, index) => (
                    <p key={index} className={index > 0 ? 'mt-4' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                {stylist.quote && (
                  <p className="italic text-[#555] body-text">
                    &ldquo;{stylist.quote}&rdquo;
                  </p>
                )}
              </div>

              {/* World Section */}
              <div>
                <h2 className="text-xl font-semibold text-[#333] mb-4">
                  {stylist.name.split(' ')[0].toUpperCase()}&apos;S WORLD
                </h2>
                <p className="body-text">
                  {stylist.worldDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Work & World Sections - Mobile */}
          <div className="lg:hidden">
            {/* Work Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[#333] mb-4">
                {stylist.name.split(' ')[0].toUpperCase()}&apos;S WORK
              </h2>
              <div className="body-text mb-4">
                {stylist.workDescription.split('\n').map((paragraph, index) => (
                  <p key={index} className={index > 0 ? 'mt-4' : ''}>
                    {paragraph}
                  </p>
                ))}
              </div>
              {stylist.quote && (
                <p className="italic text-[#555] body-text">
                  &ldquo;{stylist.quote}&rdquo;
                </p>
              )}
            </div>

            {/* World Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-[#333] mb-4">
                {stylist.name.split(' ')[0].toUpperCase()}&apos;S WORLD
              </h2>
              <p className="body-text">
                {stylist.worldDescription}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Masonry Photo Grid */}
        <div className="lg:w-[50%] mb-8 lg:mb-0">
          <div 
            className="masonry-container"
            style={{ 
              columns: '300px',
              columnGap: '0.5rem'
            }}
          >
            {allPhotos.map((photo, index) => (
              <img 
                key={index}
                src={photo} 
                alt={`${stylist.name} photo ${index + 1}`}
                style={{
                  width: '100%',
                  marginBottom: '0.5rem'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const placeholder = document.createElement('div');
                  placeholder.style.width = '100%';
                  placeholder.style.height = '300px';
                  placeholder.style.marginBottom = '0.5rem';
                  placeholder.style.backgroundColor = '#f5f5f5';
                  placeholder.style.display = 'flex';
                  placeholder.style.alignItems = 'center';
                  placeholder.style.justifyContent = 'center';
                  placeholder.innerHTML = `
                    <div style="text-align: center; color: #999;">
                      <div style="font-size: 2rem; margin-bottom: 0.5rem;">${index < stylist.workPhotos.length ? '👗' : '✨'}</div>
                      <p style="font-size: 0.75rem;">${index < stylist.workPhotos.length ? 'Work' : 'Inspiration'} ${index + 1}</p>
                    </div>
                  `;
                  target.parentNode?.replaceChild(placeholder, target);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Book Button - Mobile Bottom */}
      <div className="px-6 md:px-10 lg:hidden mb-8">
        <a
          href={bookingLink}
          className="w-full h-[65px] bg-[#000000] text-[#1AB1ED] text-[20px] font-medium flex items-center justify-center hover:bg-[#c9c9c9] transition-colors"
          target={bookingLink.startsWith('http') ? '_blank' : undefined}
          rel={bookingLink.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          BOOK {stylist.name.split(' ')[0].toUpperCase()}
        </a>
      </div>

      {/* Footer spacing */}
      <div className="h-24"></div>
      </div>
    </>
  );
};

export default StylistPage;