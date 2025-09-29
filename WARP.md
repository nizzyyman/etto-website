# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project type
- Next.js 14 (App Router) with TypeScript and Tailwind CSS
- Package manager: npm (package-lock.json present)
- Linting: ESLint (extends next/core-web-vitals)
- Tests: No test framework configured

Commands (npm)
- Install dependencies: npm ci (preferred for clean installs) or npm install
- Start dev server (http://localhost:3000): npm run dev
- Build production bundle (includes type-checking): npm run build
- Start production server (after build): npm run start
- Lint all files: npm run lint
- Type-check only (no emit): npx tsc --noEmit
- Lint a single file: npx eslint app/stylists/[slug]/page.tsx

High-level architecture
- App Router structure (app/)
  - app/layout.tsx: Root layout. Loads two local font families via next/font/local (Raptor V2, ABCDiatype) and applies CSS variables (--font-raptor, --font-abcdiatype). Exports viewport and metadata for global SEO. Adds <Head> for favicon and minimal meta; body wraps all routes.
  - app/page.tsx: Landing page. Client-side markup with a full-viewport background video, overlay, header with CTA, and a minimal footer. Assets come from public/ (hero-video.mp4, images, favicon). Tailwind utility classes drive layout.
  - app/secretinvite/
    - layout.tsx: Per-route metadata for Open Graph/Twitter and viewport. Points OG image to /invitation.jpg.
    - page.tsx: Client component containing an RSVP form. On submit, it posts JSON to a Google Apps Script (no-cors) and also posts form-encoded data to Loops’s public form endpoint. The UI always shows success unless the outer try/catch fails; there is no server route or secret usage.
  - app/stylists/[slug]/page.tsx: Client component for dynamic stylist pages. Uses an in-file Record<string, Stylist> mock data store (currently only 'robyn'). Builds a masonry-like photo grid with inline CSS columns. Sets SEO tags using next/head (per-page). Uses public/ images for profile, work, and inspiration.
  - app/components/playvideo.tsx: Small client component that toggles a modal iframe (YouTube) with a Lucide Play icon.
- Styling
  - Tailwind CSS configured with globals in app/globals.css. Defines CSS variables --background and --foreground, a .body-text component class, and an iOS min-height fix via @supports.
  - tailwind.config.ts sets content globs for pages/, components/, and app/; extends theme with color variables and two font families mapping to the CSS variables.
  - postcss configured; see postcss.config.cjs and postcss.config.mjs (both present).
- Configuration
  - next.config.mjs is default (no custom config).
  - tsconfig.json: strict true, noEmit, bundler resolution, path alias @/* → project root.
  - ESLint: .eslintrc.json extends next/core-web-vitals; .eslintrc.js disables @typescript-eslint/no-unused-vars.
- Assets
  - public/ contains brand assets, hero media, and stylist galleries used by the stylists route and landing page. Filenames include spaces and non-ASCII punctuation in some cases; ensure proper URL encoding if referencing them in new code.

Notes and quirks observed
- ESLint configuration exists in two files (.eslintrc.json and .eslintrc.js). Be aware of potential precedence/conflicts when adjusting rules; prefer consolidating into a single config to avoid ambiguity.
- Two PostCSS configs (postcss.config.cjs and postcss.config.mjs) are present. Only one is needed; having both may cause confusion depending on tooling resolution.
- No test framework or scripts are defined. If tests are introduced (e.g., with Jest/Vitest/Playwright), add scripts to package.json and document commands here.

Important parts from README
- Start the dev server with npm run dev and edit app/page.tsx to see live updates at http://localhost:3000.
