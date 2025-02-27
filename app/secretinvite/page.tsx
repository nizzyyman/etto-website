'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { Cutive_Mono } from 'next/font/google';

const cutiveMono = Cutive_Mono({
  weight: '400',
  subsets: ['latin'],
});

export default function SecretInvitePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const timestamp = new Date().toISOString();
    
    try {
      // Create the data objects for both submissions
      const userData = {
        name,
        email,
        response: 'Yes',
        timestamp
      };
      
      // Send to Google Apps Script first
      try {
        await fetch(
          'https://script.google.com/macros/s/AKfycbwQXAxuDEtmPAL1kr5WdnRufZvraUHTfTk7wwhXYFyQVRDBVyqxAKIQYjdPik9mTU6JVw/exec',
          {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          }
        );
        console.log('Google Apps Script submission attempted');
      } catch (error) {
        console.log('Google Apps Script submission error (continuing):', error);
        // Continue even if Google Script fails
      }
      
      // Then try the Loops submission using their public form endpoint format
      try {
        // Follow exactly how browser forms submit to Loops
        const loopsFormData = new URLSearchParams();
        loopsFormData.append('email', email);
        loopsFormData.append('firstName', name);
        loopsFormData.append('userGroup', 'Etto Event');
        
        console.log('Sending to Loops with data:', { email, firstName: name, userGroup: 'Etto Event' });
        
        const loopsResponse = await fetch('https://app.loops.so/api/newsletter-form/cm1toonmr00c2yqwb5530z2a0', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: loopsFormData.toString(),
        });
        
        const loopsResult = await loopsResponse.json().catch(() => null);
        console.log('Loops response status:', loopsResponse.status);
        console.log('Loops response body:', loopsResult);
        
        if (!loopsResponse.ok) {
          console.error('Loops API error:', loopsResult);
          // Continue even if Loops submission has an error
        }
      } catch (loopsError) {
        console.error('Loops submission error (continuing):', loopsError);
        // Continue even if Loops fails
      }
      
      // Consider the submission successful regardless of API responses
      // Since we're using no-cors mode for Google Script and Loops might fail but we still want to show success
      setSubmitStatus('success');
      form.reset();
    } catch (error) {
      console.error('Overall form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }
  };

  // Add error boundary
  try {
    return (
      <>
        <div className="min-h-screen bg-white p-4">
          <div className="max-w-[1200px] mx-auto">
            {/* ETTO Logo */}
            <div className="text-[#494684] text-[28px] font-raptor mb-4">
              ETTO.
            </div>
            
            {/* Main Content */}
            <div className={`${cutiveMono.className} flex flex-col items-center`}>
              {/* Image Container */}
              <div className="w-full max-w-[425px] mb-8">
                <Image
                  src="/invitation.jpg"
                  alt="Fashion x Technology Event"
                  width={500}
                  height={707}
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
                
                {submitStatus === 'success' ? (
                  <div className="p-4 bg-green-50 text-green-800 mb-4 rounded">
                    Thank you! Your RSVP has been received. We look forward to seeing you on March 12.
                  </div>
                ) : submitStatus === 'error' ? (
                  <div className="p-4 bg-red-50 text-red-800 mb-4 rounded">
                    There was an error submitting your RSVP. Please try again or text the number above.
                  </div>
                ) : null}
                
                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="enter name here"
                    required
                    className="w-full p-3 bg-[#e6e6e6] border-none text-sm text-center
                            placeholder-gray-600 font-[&quot;Cutive_Mono&quot;]"
                    disabled={isSubmitting}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="enter email here"
                    required
                    className="w-full p-3 bg-[#e6e6e6] border-none text-sm text-center
                            placeholder-gray-600 font-[&quot;Cutive_Mono&quot;]"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 mt-1 border border-gray-700 bg-[#e6e6e6]
                            text-sm text-gray-700 cursor-pointer transition-all
                            hover:bg-[#d9d9d9] font-[&quot;Cutive_Mono&quot;]
                            disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Yes, I\'m coming!'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
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