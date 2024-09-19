"use client";

import React, { useState } from 'react';
import { Play } from 'lucide-react';

const PlayVideo = () => {
  const [showVideo, setShowVideo] = useState(false);

  const toggleVideo = () => setShowVideo(!showVideo);

  return (
    <>
      <span className="relative inline-block">
        <span className="cursor-pointer" onClick={toggleVideo}>.</span>
        <Play 
          className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 cursor-pointer text-white" 
          size={16} 
          onClick={toggleVideo}
        />
      </span>
      
      {showVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={toggleVideo}
        >
          <div className="w-3/4 h-3/4 bg-white rounded-lg overflow-hidden shadow-lg">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/your-video-id" 
              frameBorder="0" 
              allow="autoplay; encrypted-media" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayVideo;
