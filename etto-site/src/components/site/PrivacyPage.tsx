export function PrivacyPage() {
  return (
    <main className="w-full px-5 pb-20 pt-4 md:px-10 md:pb-24">
      <div className="mx-auto w-full max-w-[760px]">
        <h1
          className="mb-3 text-[#18181b]"
          style={{
            fontFamily: 'ABC Diatype Medium',
            fontWeight: 500,
            fontSize: 'clamp(28px, 4vw, 38px)',
            lineHeight: 1.1,
            letterSpacing: '-0.025em'
          }}
        >
          Privacy Policy
        </h1>
        <p className="mb-8 text-[16px] leading-[1.55] text-[#18181b]">Effective April 1, 2026</p>

        <div className="space-y-4 text-[16px] leading-[1.65] text-[#18181b]">
          <p>
            This policy describes how Etto collects, uses, and protects information through the Etto platform (the
            "App") and the Etto browser extension (the "Extension"), collectively the "Service."
          </p>

          <section className="pt-4">
            <h2
              className="mb-3 text-[#18181b]"
              style={{
                fontFamily: 'ABC Diatype Medium',
                fontWeight: 500,
                fontSize: '22px',
                lineHeight: 1.2,
                letterSpacing: '-0.02em'
              }}
            >
              Information We Collect
            </h2>
            <p>We collect information only when you actively use the Service. This includes:</p>
            <p>
              URLs, page titles, and metadata of pages you save
              <br />
              Images you select for clipping
              <br />
              Tags, notes, and organizational data you provide
              <br />
              An authentication token stored locally to maintain your session
            </p>
            <p>We do not collect browsing history, keystrokes, form data, or any information from pages you do not save.</p>
          </section>

          <section className="pt-4">
            <h2
              className="mb-3 text-[#18181b]"
              style={{
                fontFamily: 'ABC Diatype Medium',
                fontWeight: 500,
                fontSize: '22px',
                lineHeight: 1.2,
                letterSpacing: '-0.02em'
              }}
            >
              How We Use Your Information
            </h2>
            <p>
              We use collected information solely to operate the Extension: saving content to your Etto workspace,
              authenticating your session, and remembering your preferences. We do not sell, rent, or share your
              personal information with third parties for advertising or marketing.
            </p>
          </section>

          <section className="pt-4">
            <h2
              className="mb-3 text-[#18181b]"
              style={{
                fontFamily: 'ABC Diatype Medium',
                fontWeight: 500,
                fontSize: '22px',
                lineHeight: 1.2,
                letterSpacing: '-0.02em'
              }}
            >
              Data Security
            </h2>
            <p>
              All data is transmitted over HTTPS. Your account data is stored in encrypted databases with row-level
              access controls scoped to your authenticated user. While no method of electronic transmission is 100%
              secure, we implement commercially reasonable measures to protect your information.
            </p>
          </section>

          <section className="pt-4">
            <h2
              className="mb-3 text-[#18181b]"
              style={{
                fontFamily: 'ABC Diatype Medium',
                fontWeight: 500,
                fontSize: '22px',
                lineHeight: 1.2,
                letterSpacing: '-0.02em'
              }}
            >
              Data Retention and Deletion
            </h2>
            <p>
              You may delete any saved content from your Etto workspace at any time. To request complete deletion of
              your account and associated data, contact us at the address below. We will process deletion requests
              within 30 days.
            </p>
          </section>

          <section className="pt-4">
            <h2
              className="mb-3 text-[#18181b]"
              style={{
                fontFamily: 'ABC Diatype Medium',
                fontWeight: 500,
                fontSize: '22px',
                lineHeight: 1.2,
                letterSpacing: '-0.02em'
              }}
            >
              Children's Privacy
            </h2>
            <p>
              The Service is not directed to individuals under 13. We do not knowingly collect personal information from
              children. If we learn that we have collected such information, we will delete it promptly.
            </p>
          </section>

          <section className="pt-4">
            <h2
              className="mb-3 text-[#18181b]"
              style={{
                fontFamily: 'ABC Diatype Medium',
                fontWeight: 500,
                fontSize: '22px',
                lineHeight: 1.2,
                letterSpacing: '-0.02em'
              }}
            >
              Changes to This Policy
            </h2>
            <p>
              We may update this policy from time to time. Material changes will be communicated through the Service or
              at this URL. Continued use after changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section className="pt-4">
            <h2
              className="mb-3 text-[#18181b]"
              style={{
                fontFamily: 'ABC Diatype Medium',
                fontWeight: 500,
                fontSize: '22px',
                lineHeight: 1.2,
                letterSpacing: '-0.02em'
              }}
            >
              Contact Us
            </h2>
            <p>
              If you have questions about our privacy practices or this Privacy Notice, or to exercise your rights as
              detailed in this Privacy Notice, please contact us at:
            </p>
            <div className="space-y-0 text-[16px] leading-[1.65]">
              <p>Etto Systems Inc.</p>
              <p>169 Madison Ave STE 11748</p>
              <p>New York NY 10016</p>
              <p>United States</p>
              <p>
                <a href="mailto:hello@etto.ai" className="transition-opacity hover:opacity-60">
                  hello@etto.ai
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
