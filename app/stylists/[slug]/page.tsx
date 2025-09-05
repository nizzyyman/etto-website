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
  workDetails: string;
  quote: string;
  worldDescription: string;
  profilePhoto: string;
  workPhotos: string[];
  inspirationPhotos: string[];
}

// Mock data - you can move this to a database or CMS later
const stylists: Record<string, Stylist> = {
  'robyn': {
    slug: 'robyn',
    name: 'ROBYN DAVIES',
    location: 'in Brooklyn, New York',
    clientsStyled: 130,
    bio: "Featured in Vogue, Elle, & Harper's Bazaar.",
    workDescription: "Robyn specializes in working within your existing closet and seeing it in a new light.",
    workDetails: "After getting her start assisting the editors of Vogue Paris, and later learning about the systemic labor rights and environmental issues in the fashion industry, Robyn went on to develop her sustainably-minded styling practice. Today she styles individuals who value cultivating their personal taste over chasing trends.",
    quote: "I gravitate towards textured, lived in looks. Considered, but not too precious. Looks where the clothes compliment the wearer.",
    worldDescription: "You'll resonate with Robyn if you resonate with that which inspires her",
    profilePhoto: '/Robyn Profile Photo.jpeg',
    workPhotos: [
      '/Robyn Work/1_Susanna Moyer.jpg',
      '/Robyn Work/2_Rosalee Lewis.jpg',
      '/Robyn Work/3_Hilliary Bianca Salamanca.jpg',
      '/Robyn Work/4_Colette Johnson.jpg'
    ],
    inspirationPhotos: [
      '/Robyn Inspiration/1_Elle-September 2019.jpg',
      '/Robyn Inspiration/2_Vogue-January 2019.jpg', 
      '/Robyn Inspiration/3_Elle-April 2019.jpg',
      '/Robyn Inspiration/4_Harper_s BAZAAR-September 2021.jpg'
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

  // Combine work and inspiration photos for masonry layout
  const allPhotos = [...stylist.workPhotos, ...stylist.inspirationPhotos];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation - matching your design */}
      <header className="h-[100px] flex justify-between items-center px-12 bg-white">
        <div className="font-raptor">
          <a href="/">
            <img 
              src="/etto-type-black.png" 
              alt="Etto" 
              className="h-4"
            />
          </a>
        </div>
        <nav className="flex gap-16">
          <a 
            href="/"
            className="text-[#1E0E62] text-base font-medium hover:opacity-70 transition-opacity"
          >
          </a>
          <a 
            href="#booking"
            className="text-[#1E0E62] text-base font-medium hover:opacity-70 transition-opacity"
          >
            BOOK ROBYN
          </a>
        </nav>
      </header>

      {/* Main Content Container */}
      <div className="max-w-[1440px] mx-auto px-10 flex gap-12">
        
        {/* LEFT SIDE: 50% width with full-width title and 2-column content */}
        <div className="w-[50%] flex flex-col">
          
          {/* Full-width Title spanning entire left section */}
          <h1 className="text-[85px] font-medium text-[#1AB1ED] leading-none mb-1">
            {stylist.name}
          </h1>
          
          {/* Two-column content grid below title */}
          <div className="grid grid-cols-2 gap-8">
            
            {/* Left Column: Location, Bio, Profile Photo, Book Button */}
            <div className="flex flex-col">
              
              {/* Location & Stats */}
              <div className="mb-4">
                <div className="flex items-start gap-2 body-text">
                  <span className="mt-1">📍</span>
                  <span className="font-medium">{stylist.location}</span>
                </div>
                <div className="flex items-start gap-2 body-text mb-2">
                  <span className="mt-1">👥</span>
                  <span className="font-medium">styled {stylist.clientsStyled} clients</span>
                </div>
              </div>
              
              {/* Bio */}
              <div className="body-text mb-4">
                {stylist.bio}
              </div>

              {/* Book Button */}
              <a 
                href="#booking" 
                className="w-full h-[65px] bg-[#D9D9D9] text-[#1AB1ED] text-[20px] font-bold flex items-center justify-center hover:bg-[#c9c9c9] transition-colors mb-6"
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
                          <p class="text-sm">${stylist.name.split(' ')[0]}'s Photo</p>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            </div>

            {/* Right Column: Work & World Info */}
            <div className="flex flex-col pt-2">
              
              {/* Work Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-[#333] mb-4">
                  {stylist.name.split(' ')[0].toUpperCase()}'S WORK
                </h2>
                <p className="body-text mb-4">
                  {stylist.workDescription}
                </p>
                <p className="body-text mb-4">
                  {stylist.workDetails}
                </p>
                <p className="italic text-[#555] body-text">
                  "{stylist.quote}"
                </p>
              </div>

              {/* World Section */}
              <div>
                <h2 className="text-xl font-semibold text-[#333] mb-4">
                  {stylist.name.split(' ')[0].toUpperCase()}'S WORLD
                </h2>
                <p className="body-text">
                  {stylist.worldDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Masonry Photo Grid - 50% width */}
        <div className="w-[50%]">
          <div 
            className="masonry-container"
            style={{ 
              columns: '2',
              columnGap: '0.5rem'
            }}
          >
            {allPhotos.map((photo, index) => (
              <div 
                key={index}
                className="break-inside-avoid mb-4"
              >
                <img 
                  src={photo} 
                  alt={`${stylist.name} photo ${index + 1}`}
                  className="w-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const placeholder = document.createElement('div');
                    placeholder.className = 'w-full h-[300px] bg-gray-100 flex items-center justify-center mb-4';
                    placeholder.innerHTML = `
                      <div style="text-align: center; color: #999;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">${index < stylist.workPhotos.length ? '👗' : '✨'}</div>
                        <p style="font-size: 0.75rem;">${index < stylist.workPhotos.length ? 'Work' : 'Inspiration'} ${index + 1}</p>
                      </div>
                    `;
                    target.parentNode?.replaceChild(placeholder, target);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylistPage;