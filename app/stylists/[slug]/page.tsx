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
    profilePhoto: '/robyn-profile.jpg',
    workPhotos: ['/robyn-work-1.jpg', '/robyn-work-2.jpg', '/robyn-work-3.jpg', '/robyn-work-4.jpg'],
    inspirationPhotos: ['/robyn-inspo-1.jpg', '/robyn-inspo-2.jpg', '/robyn-inspo-3.jpg', '/robyn-inspo-4.jpg']
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

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_400px] gap-10 p-10 text-[#333]">
          
          {/* Column 1: Profile */}
          <div className="flex flex-col">
            {/* Block 1: Header + Bio */}
            <div className="mb-10">
              <div className="profile-header">
                <h1 className="text-[28px] font-light text-[#4a90e2] mb-2.5 tracking-wider">
                  {stylist.name}
                </h1>
                <div className="flex flex-col gap-1.5 mb-5">
                  <div className="text-[13px] text-[#666] flex items-center">
                    <span className="mr-2">📍</span>
                    {stylist.location}
                  </div>
                  <div className="text-[13px] text-[#666] flex items-center">
                    <span className="mr-2">👥</span>
                    styled {stylist.clientsStyled} clients
                  </div>
                </div>
              </div>
              
              <div className="text-[13px] text-[#333] leading-relaxed">
                {stylist.bio}
              </div>
            </div>
            
            {/* Block 2: Photo + Button */}
            <div className="flex flex-col gap-5">
              <div className="w-full h-[350px] bg-gradient-to-br from-[#ff0066] to-[#6600ff] rounded-lg relative overflow-hidden">
                {/* Profile photo - replace with actual image */}
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-6xl mb-2">📸</div>
                    <p className="text-sm">{stylist.name.split(' ')[0]}'s Photo</p>
                  </div>
                </div>
              </div>
              
              <a 
                href="#booking" 
                className="bg-[#e0e0e0] text-[#4a90e2] py-3 px-5 text-center rounded-md no-underline text-[13px] font-medium transition-colors duration-300 hover:bg-[#d0d0d0]"
              >
                BOOK {stylist.name.split(' ')[0].toUpperCase()}
              </a>
            </div>
          </div>

          {/* Column 2: Content */}
          <div className="flex flex-col gap-10">
            <div className="content-section">
              <h2 className="text-base font-semibold text-[#333] mb-4">{stylist.name.split(' ')[0].toUpperCase()}'S WORK</h2>
              <p className="text-[13px] text-[#333] leading-relaxed mb-4">
                {stylist.workDescription}
              </p>
              <p className="text-[13px] text-[#333] leading-relaxed mb-4">
                {stylist.workDetails}
              </p>
              <p className="italic text-[#555] text-[13px] leading-relaxed mb-4">
                "{stylist.quote}"
              </p>
            </div>

            <div className="content-section">
              <h2 className="text-base font-semibold text-[#333] mb-4">{stylist.name.split(' ')[0].toUpperCase()}'S WORLD</h2>
              <p className="text-[13px] text-[#333] leading-relaxed mb-4">
                {stylist.worldDescription}
              </p>
            </div>
          </div>

          {/* Column 3: Photos */}
          <div className="flex flex-col">
            {/* Block 1: Work Photos */}
            <div className="mb-10">
              <div className="grid grid-cols-4 gap-2.5">
                {stylist.workPhotos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="aspect-[4/5] bg-[#f0f0f0] rounded-md"
                  >
                    {/* Work photo placeholder - replace with actual images */}
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <div className="text-2xl mb-1">👗</div>
                        <p className="text-xs">Work {index + 1}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Block 2: Inspiration Photos */}
            <div>
              <div className="grid grid-cols-4 gap-2.5">
                {stylist.inspirationPhotos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="aspect-[4/5] bg-[#f8f8f8] rounded-md"
                  >
                    {/* Inspiration photo placeholder - replace with actual images */}
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <div className="text-2xl mb-1">✨</div>
                        <p className="text-xs">Inspo {index + 1}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylistPage;