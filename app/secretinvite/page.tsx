'use client';

import { FormEvent } from 'react';
import Image from 'next/image';
import { Cutive_Mono } from 'next/font/google';

const cutiveMono = Cutive_Mono({
  weight: '400',
  subsets: ['latin'],
});

export default function Page() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;

    // For actual implementation, send this data to your backend
    console.log('RSVP Submitted:', { name, email, response: 'Yes' });

    // Show confirmation
    alert(`Thank you, ${name}! Your RSVP has been received. We look forward to seeing you on March 12.`);

    // Reset form
    form.reset();
  };

  // Add error boundary
  try {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-[1200px] mx-auto">
          {/* ETTO Logo */}
          <div className="text-[#494684] text-[32px] font-raptor mb-12">
            ETTO.
          </div>

          {/* Main Content */}
          <div className={`${cutiveMono.className} flex flex-col items-center`}>
            {/* Image Container */}
            <div className="w-full max-w-[500px] mb-8">
              <Image
                src="/invitation.jpg"
                alt="Fashion x Technology Event"
                width={500}
                height={707}  // Adjusted for correct aspect ratio
                className="w-full"
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>

            {/* RSVP Section */}
            <div className="w-full max-w-[500px] text-center text-gray-700">
              <p className="text-sm mb-6">
                RSVP 732.915.2768 or enter info below
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="enter name here"
                  required
                  className="w-full p-3 bg-[#e6e6e6] border-none text-sm text-center 
                           placeholder-gray-600 font-[&quot;Cutive_Mono&quot;]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="enter email here"
                  required
                  className="w-full p-3 bg-[#e6e6e6] border-none text-sm text-center 
                           placeholder-gray-600 font-[&quot;Cutive_Mono&quot;]"
                />
                <button
                  type="submit"
                  className="px-6 py-2 mt-1 border border-gray-700 bg-[#e6e6e6] 
                           text-sm text-gray-700 cursor-pointer transition-all 
                           hover:bg-[#d9d9d9] font-[&quot;Cutive_Mono&quot;]"
                >
                  Yes, I&apos;m coming!
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Something went wrong</h1>
          <p>Please try again later</p>
        </div>
      </div>
    );
  }
}