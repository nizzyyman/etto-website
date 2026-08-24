import React from 'react';
import ettoStamp from '../../assets/etto-stamp.svg';
import { COMPANY_NAME, HOME_PATH } from './siteConfig';

const LUMA_EVENT_ID = 'evt-AZvhnEXKkRF1Acq';
const LUMA_EVENT_URL = `https://luma.com/event/${LUMA_EVENT_ID}`;

export function NYFWPage() {
  React.useEffect(() => {
    document.title = 'Etto x NYFW';
  }, []);

  return (
    <div
      className="flex min-h-screen w-full flex-col items-center bg-white text-[#1a1a1a]"
      style={{ fontFamily: 'ABC Diatype Semi-Mono' }}
    >
      <script async id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" />

      <header className="w-full px-6 pt-5 pb-4">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-2 text-center md:grid md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-6 md:text-left">
          <a
            href={HOME_PATH}
            className="inline-flex items-center transition-opacity hover:opacity-60 md:justify-self-start"
            aria-label="Etto home"
          >
            <img src={ettoStamp} alt="Etto" className="h-4 w-auto" />
          </a>

          <div className="flex flex-col items-center gap-1 md:justify-self-center">
            <span className="text-[14px] leading-snug whitespace-nowrap">{COMPANY_NAME}</span>
          </div>

          <div aria-hidden="true" className="hidden md:block" />
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-6">
        <img src={ettoStamp} alt="Etto" className="h-10 w-auto md:h-14" />
      </div>

      <div className="w-full px-6 pb-12 md:pb-20">
        <div className="flex justify-center">
          <a
            href={LUMA_EVENT_URL}
            target="_blank"
            rel="noreferrer"
            className="luma-checkout--button flex items-center justify-center whitespace-nowrap rounded-full bg-[#18181b] px-7 py-2.5 text-white transition-opacity hover:opacity-80"
            style={{ fontSize: '10px' }}
            data-luma-action="checkout"
            data-luma-event-id={LUMA_EVENT_ID}
          >
            Register for Event
          </a>
        </div>
      </div>
    </div>
  );
}
