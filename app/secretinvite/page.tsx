'use client';

import { Cutive_Mono } from 'next/font/google';
import { FormEvent } from 'react';
import Image from 'next/image';

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

  return (
    <div className={`min-h-screen bg-white`}>
      <div className="max-w-[1000px] w-full mx-auto p-5 flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-8">
          <div className="text-[#494684] text-[32px] font-raptor">
            ETTO.
          </div>
        </div>

        <div className={cutiveMono.className}>
          <div className="w-full max-w-[600px] relative">
            <Image
              src="/invitation.jpg"
              alt="Fashion x Technology Event"
              width={600}
              height={450}
              className="w-full h-auto"
              priority
            />
          </div>

          <div className="w-full max-w-[600px] text-center mt-4 text-gray-700">
            <p className="text-base mb-4">
              RSVP 732.915.2768 or enter info below
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <input
                type="text"
                name="name"
                placeholder="enter name here"
                required
                className="w-full max-w-[600px] p-3 mb-2.5 bg-[#e6e6e6] border-none 
                         font-['Cutive_Mono'] text-sm text-center placeholder-gray-600"
              />
              <input
                type="email"
                name="email"
                placeholder="enter email here"
                required
                className="w-full max-w-[600px] p-3 mb-2.5 bg-[#e6e6e6] border-none 
                         font-['Cutive_Mono'] text-sm text-center placeholder-gray-600"
              />
              <button
                type="submit"
                className="px-8 py-3 border border-gray-700 bg-[#e6e6e6] 
                         font-['Cutive_Mono'] text-sm text-gray-700 cursor-pointer 
                         transition-all hover:bg-[#d9d9d9] mt-1.5"
              >
                Yes, I'm coming!
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 