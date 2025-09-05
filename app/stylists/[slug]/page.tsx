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
    bio: "Featured in Vogue, Elle, & Harper's Bazaar. Clients include Tony-award winning actor, New York Times-featured artist, Vogue-featured communications agency co-founder, former editor-in-chief of Nylon Magazine, and more.",
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
  },
  'sarah': {
    slug: 'sarah',
    name: 'SARAH CHEN',
    location: 'in Manhattan, New York',
    clientsStyled: 95,
    bio: "Sustainable fashion advocate and personal stylist with 8+ years of experience. Specializing in timeless elegance and conscious consumption.",
    workDescription: "Sarah transforms wardrobes through sustainable practices and personalized style solutions.",
    workDetails: "With a background in sustainable fashion and a passion for helping clients discover their authentic style, Sarah creates looks that are both beautiful and environmentally conscious.",
    quote: "Style should reflect who you are, not just what's trending. Let's create a wardrobe that speaks to your soul.",
    worldDescription: "Connect with Sarah if you value sustainability, authenticity, and timeless elegance in your personal style.",
    profilePhoto: '/sarah-profile.jpg',
    workPhotos: ['/sarah-work-1.jpg', '/sarah-work-2.jpg', '/sarah-work-3.jpg', '/sarah-work-4.jpg'],
    inspirationPhotos: ['/sarah-inspo-1.jpg', '/sarah-inspo-2.jpg', '/sarah-inspo-3.jpg', '/sarah-inspo-4.jpg']
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
      {/* Header Navigation - same as main page */}
      <header className="flex justify-between items-center p-4 sm:p-6 md:p-8 bg-white">
        <div className="font-raptor">
          <a href="/">
            <img 
              src="/etto-type-black.png" 
              alt="Etto" 
              className="h-5 sm:h-7"
            />
          </a>
        </div>
        <a 
          className="px-4 py-2 hover:text-gray-300 transition-all duration-300 text-sm sm:text-base text-black hover:text-gray-600"
        >
          BOOK ROBYN
        </a>
      </header>

      <div className="max-w-[1600px] mx-auto p-6">
        {/* Main layout: 2 columns left (stylist info) + 3 columns right (masonry) */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8">
          
          {/* LEFT SIDE: Stylist Information (2 columns internally) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column: Profile & Bio */}
            <div className="flex flex-col gap-6">
              {/* Profile Header */}
              <div>
                <h1 className="text-[32px] font-light text-[#4a90e2] mb-3 tracking-wider">
                  {stylist.name}
                </h1>
                <div className="flex flex-col gap-2 mb-6">
                  <div className="text-[14px] text-[#666] flex items-center">
                    <span className="mr-2">📍</span>
                    {stylist.location}
                  </div>
                  <div className="text-[14px] text-[#666] flex items-center">
                    <span className="mr-2">👥</span>
                    styled {stylist.clientsStyled} clients
                  </div>
                </div>
              </div>
              
              {/* Bio */}
              <div className="text-[14px] text-[#333] leading-relaxed">
                {stylist.bio}
              </div>

              {/* Profile Photo */}
              <div className="w-full h-[400px] rounded-lg relative overflow-hidden">
                <img 
                  src={stylist.profilePhoto} 
                  alt={`${stylist.name} profile photo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.className = 'w-full h-[400px] bg-gradient-to-br from-[#ff0066] to-[#6600ff] rounded-lg relative overflow-hidden';
                      parent.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center text-white">
                          <div class="text-center">
                            <div class="text-6xl mb-2">📸</div>
                            <p class="text-sm">${stylist.name.split(' ')[0]}'s Photo</p>
                          </div>
                        </div>
                      `;
                    }
                  }}
                />
              </div>

              {/* Book Button */}
              <a 
                href="#booking" 
                className="bg-[#e0e0e0] text-[#4a90e2] py-3 px-6 text-center rounded-md no-underline text-[14px] font-medium transition-colors duration-300 hover:bg-[#d0d0d0]"
              >
                BOOK {stylist.name.split(' ')[0].toUpperCase()}
              </a>
            </div>

            {/* Right Column: Work & World Info */}
            <div className="flex flex-col gap-8">
              
              {/* Work Section */}
              <div>
                <h2 className="text-[18px] font-semibold text-[#333] mb-4">
                  {stylist.name.split(' ')[0].toUpperCase()}'S WORK
                </h2>
                <p className="text-[14px] text-[#333] leading-relaxed mb-4">
                  {stylist.workDescription}
                </p>
                <p className="text-[14px] text-[#333] leading-relaxed mb-4">
                  {stylist.workDetails}
                </p>
                <p className="italic text-[#555] text-[14px] leading-relaxed">
                  "{stylist.quote}"
                </p>
              </div>

              {/* World Section */}
              <div>
                <h2 className="text-[18px] font-semibold text-[#333] mb-4">
                  {stylist.name.split(' ')[0].toUpperCase()}'S WORLD
                </h2>
                <p className="text-[14px] text-[#333] leading-relaxed">
                  {stylist.worldDescription}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Masonry Photo Grid using CSS columns */}
          <div 
            className="masonry-container"
            style={{ columns: '300px', gap: '0.5rem' }}
          >
            {allPhotos.map((photo, index) => (
              <img 
                key={index}
                src={photo} 
                alt={`${stylist.name} photo ${index + 1}`}
                style={{ 
                  width: '100%', 
                  marginBottom: '0.5rem',
                  borderRadius: '8px'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  const placeholder = document.createElement('div');
                  placeholder.style.width = '100%';
                  placeholder.style.height = '200px';
                  placeholder.style.marginBottom = '1rem';
                  placeholder.style.borderRadius = '8px';
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
    </div>
  );
};

export default StylistPage;