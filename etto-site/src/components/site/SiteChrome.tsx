import React from 'react';
import {
  COMPANY_NAME,
  COPYRIGHT_LABEL,
  HOME_PATH,
  PRIVACY_PATH,
  WAITLIST_ENDPOINT,
  secondaryLinks
} from './siteConfig';

function ExternalArrow() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="ml-0.5 mt-[-1px]"
      aria-hidden="true"
    >
      <path
        d="M1.5 9.5L9.5 1.5M9.5 1.5H3.5M9.5 1.5V7.5"
        stroke="#1a1a1a"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteChrome({
  children
}: {
  children: React.ReactNode;
}) {
  const firstInputRef = React.useRef<HTMLInputElement>(null);
  const lastFocusedElementRef = React.useRef<HTMLElement | null>(null);
  const [isWaitlistOpen, setIsWaitlistOpen] = React.useState(false);
  const [waitlistState, setWaitlistState] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [waitlistError, setWaitlistError] = React.useState('Oops! Something went wrong, please try again.');
  const [formValues, setFormValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  });

  React.useEffect(() => {
    if (!isWaitlistOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    window.setTimeout(() => {
      firstInputRef.current?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsWaitlistOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isWaitlistOpen]);

  const openWaitlist = React.useCallback(() => {
    lastFocusedElementRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setWaitlistState('idle');
    setWaitlistError('Oops! Something went wrong, please try again.');
    setIsWaitlistOpen(true);
  }, []);

  const closeWaitlist = React.useCallback(() => {
    setIsWaitlistOpen(false);
    lastFocusedElementRef.current?.focus();
  }, []);

  const handleWaitlistInputChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormValues((current) => ({
      ...current,
      [name]: value
    }));
  }, []);

  const handleWaitlistBack = React.useCallback(() => {
    setWaitlistState('idle');
    setWaitlistError('Oops! Something went wrong, please try again.');
    setFormValues({
      firstName: '',
      lastName: '',
      email: '',
      role: ''
    });
    firstInputRef.current?.focus();
  }, []);

  const handleWaitlistSubmit = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const timestamp = Date.now();
    const previousTimestamp = localStorage.getItem('loops-form-timestamp');

    if (previousTimestamp && Number(previousTimestamp) + 60000 > timestamp) {
      setWaitlistState('error');
      setWaitlistError('Too many signups, please try again in a little while');
      return;
    }

    localStorage.setItem('loops-form-timestamp', String(timestamp));
    setWaitlistState('loading');
    setWaitlistError('Oops! Something went wrong, please try again.');

    const formBody = new URLSearchParams({
      userGroup: '',
      mailingLists: '',
      email: formValues.email,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      role: formValues.role
    }).toString();

    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.ok) {
        setWaitlistState('success');
        setFormValues({
          firstName: '',
          lastName: '',
          email: '',
          role: ''
        });
        return;
      }

      const data = await response.json().catch(() => ({}));
      setWaitlistState('error');
      setWaitlistError(data.message || response.statusText || 'Oops! Something went wrong, please try again.');
    } catch (error) {
      if (error instanceof Error && error.message === 'Failed to fetch') {
        setWaitlistState('error');
        setWaitlistError('Too many signups, please try again in a little while');
        return;
      }

      localStorage.removeItem('loops-form-timestamp');
      setWaitlistState('error');
      setWaitlistError(error instanceof Error ? error.message : 'Oops! Something went wrong, please try again.');
    }
  }, [formValues]);

  return (
    <div
      className="flex min-h-screen w-full flex-col overflow-x-hidden bg-white text-[#1a1a1a]"
      style={{ fontFamily: 'ABC Diatype Semi-Mono' }}
    >
      <header className="w-full px-6 pt-5 pb-4">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 md:grid md:grid-cols-[1fr_auto_1fr_auto] md:items-start md:gap-6">
          <a
            href={HOME_PATH}
            className="text-[13px] leading-tight tracking-tight text-[#1a1a1a] transition-opacity hover:opacity-60"
          >
            ETTO
          </a>

          <div className="flex flex-col gap-1 md:justify-self-center">
            <span className="text-[14px] leading-snug text-[#1a1a1a] whitespace-nowrap">{COMPANY_NAME}</span>
            <a
              href={PRIVACY_PATH}
              className="text-[13px] leading-snug text-[#999] whitespace-nowrap transition-opacity hover:opacity-60"
            >
              Privacy Policy
            </a>
          </div>

          <div className="flex flex-col gap-1 md:justify-self-end md:pr-10">
            {secondaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                className="text-[13px] leading-snug text-[#1a1a1a] transition-opacity hover:opacity-60"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={openWaitlist}
            className="flex items-center gap-1 whitespace-nowrap text-[13px] text-[#1a1a1a] transition-opacity hover:opacity-60 md:justify-self-end"
          >
            <span>APPLY</span>
            <ExternalArrow />
          </button>
        </div>
      </header>

      <div className="flex-1">{children}</div>

      <footer className="w-full px-6 pt-5 pb-6">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 md:grid md:grid-cols-[1fr_1fr_auto] md:items-start md:gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-[14px] leading-snug text-[#999999] whitespace-nowrap">{COPYRIGHT_LABEL}</span>
            <a
              href={PRIVACY_PATH}
              className="text-[13px] leading-snug text-[#1a1a1a] whitespace-nowrap transition-opacity hover:opacity-60"
            >
              Privacy Policy
            </a>
          </div>

          <div className="flex flex-col gap-1 md:justify-self-end md:pr-10">
            {secondaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                className="text-[13px] leading-snug text-[#1a1a1a] transition-opacity hover:opacity-60"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={openWaitlist}
            className="flex items-center gap-1 whitespace-nowrap text-[13px] text-[#1a1a1a] transition-opacity hover:opacity-60 md:justify-self-end"
          >
            <span>APPLY</span>
            <ExternalArrow />
          </button>
        </div>
      </footer>

      {isWaitlistOpen ? (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-6">
          <button
            type="button"
            aria-label="Close waitlist form"
            onClick={closeWaitlist}
            className="absolute inset-0 bg-black/25 backdrop-blur-[6px]"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-title"
            className="relative w-full max-w-[420px] rounded-[10px] bg-white px-[34px] pb-[34px] pt-[34px] shadow-[0_20px_60px_rgba(0,0,0,0.14)]"
          >
            <button
              type="button"
              aria-label="Close waitlist form"
              onClick={closeWaitlist}
              className="absolute right-[14px] top-[14px] text-[18px] leading-none text-[#18181b] transition-opacity hover:opacity-60"
            >
              &times;
            </button>

            {waitlistState !== 'success' ? (
              <>
                <h2
                  id="waitlist-title"
                  className="mb-4 px-14 text-center text-[22px] leading-[1.15] text-[#18181b]"
                  style={{
                    fontFamily: 'ABC Diatype Medium',
                    fontWeight: 500
                  }}
                >
                  Join Waitlist
                </h2>
                <p className="mx-auto mb-[18px] mt-[-4px] max-w-[320px] text-center text-[14px] leading-[1.5] text-[#52525b]">
                  we're currently piloting with stylists, interior designers, and creative directors.
                </p>
              </>
            ) : null}

            {waitlistState === 'success' ? (
              <div className="pt-4 text-center text-[14px] leading-[1.55] text-[#18181b]">
                Thank you for your interest in Etto. We'll be in touch.
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-[10px]">
                <input
                  ref={firstInputRef}
                  className="w-full rounded-full border border-[#d4d4d8] px-[14px] py-[11px] text-[14px] text-[#18181b] shadow-[0_1px_2px_rgba(0,0,0,0.03)] outline-none placeholder:text-[#a1a1aa]"
                  placeholder="First name"
                  required
                  type="text"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleWaitlistInputChange}
                />
                <input
                  className="w-full rounded-full border border-[#d4d4d8] px-[14px] py-[11px] text-[14px] text-[#18181b] shadow-[0_1px_2px_rgba(0,0,0,0.03)] outline-none placeholder:text-[#a1a1aa]"
                  placeholder="Last name (optional)"
                  type="text"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleWaitlistInputChange}
                />
                <input
                  className="w-full rounded-full border border-[#d4d4d8] px-[14px] py-[11px] text-[14px] text-[#18181b] shadow-[0_1px_2px_rgba(0,0,0,0.03)] outline-none placeholder:text-[#a1a1aa]"
                  placeholder="you@example.com"
                  required
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleWaitlistInputChange}
                />
                <input
                  className="w-full rounded-full border border-[#d4d4d8] px-[14px] py-[11px] text-[14px] text-[#18181b] shadow-[0_1px_2px_rgba(0,0,0,0.03)] outline-none placeholder:text-[#a1a1aa]"
                  placeholder="What role best describes you?"
                  type="text"
                  name="role"
                  value={formValues.role}
                  onChange={handleWaitlistInputChange}
                />
                {waitlistState === 'error' ? (
                  <p className="mt-1 text-[14px] leading-[1.55] text-[#b91c1c]">{waitlistError}</p>
                ) : null}
                <button
                  type="submit"
                  disabled={waitlistState === 'loading'}
                  className="mt-1 flex min-h-[42px] w-full items-center justify-center rounded-full bg-[#18181b] px-[18px] py-[10px] text-[14px] text-white disabled:cursor-default disabled:opacity-80"
                >
                  {waitlistState === 'loading' ? 'Please wait...' : 'Join waitlist'}
                </button>
              </form>
            )}

            {waitlistState === 'success' || waitlistState === 'error' ? (
              <button
                type="button"
                onClick={handleWaitlistBack}
                className="mt-[10px] text-[14px] text-[#71717a] transition-opacity hover:opacity-60"
              >
                &larr; Back
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
