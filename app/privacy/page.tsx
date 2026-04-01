'use client';
import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      {/* Header */}
      <header className="px-6 sm:px-10 md:px-16 pt-10 pb-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-x-5">
          <div className="col-span-12">
            <a href="/" className="text-[11px] sm:text-xs tracking-[0.08em] uppercase font-bold text-black/60 hover:text-black transition-colors duration-200">
              Etto
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 sm:px-10 md:px-16 pb-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-x-5">
          <div className="col-span-12 md:col-span-8 lg:col-span-6">
            <h1 className="font-[family-name:var(--font-raptor)] text-[28px] sm:text-[36px] leading-[1.1] mb-2">
              Privacy Policy
            </h1>
            <p className="text-[11px] sm:text-xs text-black/40 mb-12">
              Effective April 1, 2026
            </p>

            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-black/70 mb-10">
              This policy describes how Etto collects, uses, and protects information through the Etto platform (the &ldquo;App&rdquo;) and the Etto browser extension (the &ldquo;Extension&rdquo;), collectively the &ldquo;Service.&rdquo;
            </p>

            <h2 className="text-[11px] sm:text-xs tracking-[0.08em] uppercase font-bold text-black mb-4">
              Information We Collect
            </h2>
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-black/70 mb-4">
              We collect information only when you actively use the Service. This includes:
            </p>
            <ul className="text-[13px] sm:text-[14px] leading-[1.7] text-black/70 mb-4 list-disc pl-5 space-y-1">
              <li>URLs, page titles, and metadata of pages you save</li>
              <li>Images you select for clipping</li>
              <li>Tags, notes, and organizational data you provide</li>
              <li>An authentication token stored locally to maintain your session</li>
            </ul>
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-black/70 mb-10">
              We do not collect browsing history, keystrokes, form data, or any information from pages you do not save.
            </p>

            <h2 className="text-[11px] sm:text-xs tracking-[0.08em] uppercase font-bold text-black mb-4">
              How We Use Your Information
            </h2>
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-black/70 mb-10">
              We use collected information solely to operate the Extension: saving content to your Etto workspace, authenticating your session, and remembering your preferences. We do not sell, rent, or share your personal information with third parties for advertising or marketing.
            </p>

            <h2 className="text-[11px] sm:text-xs tracking-[0.08em] uppercase font-bold text-black mb-4">
              Third-Party Services
            </h2>
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-black/70 mb-10">
              The Extension communicates with Supabase (authentication and database), Cloudflare (image storage), and Anthropic (optional AI tagging). Data shared with these services is limited to what is necessary to provide core functionality. Each service is governed by its own privacy policy.
            </p>

            <h2 className="text-[11px] sm:text-xs tracking-[0.08em] uppercase font-bold text-black mb-4">
              Data Security
            </h2>
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-black/70 mb-10">
              All data is transmitted over HTTPS. Your account data is stored in encrypted databases with row-level access controls scoped to your authenticated user. While no method of electronic transmission is 100% secure, we implement commercially reasonable measures to protect your information.
            </p>

            <h2 className="text-[11px] sm:text-xs tracking-[0.08em] uppercase font-bold text-black mb-4">
              Data Retention and Deletion
            </h2>
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-black/70 mb-10">
              You may delete any saved content from your Etto workspace at any time. To request complete deletion of your account and associated data, contact us at the address below. We will process deletion requests within 30 days.
            </p>

            <h2 className="text-[11px] sm:text-xs tracking-[0.08em] uppercase font-bold text-black mb-4">
              Children&rsquo;s Privacy
            </h2>
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-black/70 mb-10">
              The Service is not directed to individuals under 13. We do not knowingly collect personal information from children. If we learn that we have collected such information, we will delete it promptly.
            </p>

            <h2 className="text-[11px] sm:text-xs tracking-[0.08em] uppercase font-bold text-black mb-4">
              Changes to This Policy
            </h2>
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-black/70 mb-10">
              We may update this policy from time to time. Material changes will be communicated through the Service or at this URL. Continued use after changes constitutes acceptance of the revised policy.
            </p>

            <h2 className="text-[11px] sm:text-xs tracking-[0.08em] uppercase font-bold text-black mb-4">
              Contact Us
            </h2>
            <p className="text-[13px] sm:text-[14px] leading-[1.7] text-black/70 mb-2">
              If you have questions about our privacy practices or this Privacy Notice, or to exercise your rights as detailed in this Privacy Notice, please contact us at:
            </p>
            
            <address className="text-[13px] sm:text-[14px] leading-[1.7] text-black/70 not-italic">
              Etto Systems Inc.<br />
              169 Madison Ave STE 11748<br />
              New York NY 10016<br />
              United States<br />
              <a href="mailto:hello@etto.ai" className="underline hover:text-black transition-colors duration-200">hello@etto.ai</a>
            </address>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-black px-6 sm:px-10 md:px-16 pb-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-x-5">
          <div className="col-span-12">
            <span className="text-[11px] sm:text-xs text-black/40">&copy; 2026 Etto Systems Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPage;
