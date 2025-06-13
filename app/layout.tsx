import localFont from 'next/font/local'
import type { Metadata, Viewport } from 'next'
import "./globals.css";
import Head from 'next/head';

const raptorV2 = localFont({
  src: './fonts/Raptor V2 Premium Semibold.ttf',
  display: 'swap',
  variable: '--font-raptor',
})

const abcdiatype = localFont({
  src: [
    {
      path: './fonts/ABCDiatype Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/ABCDiatype Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/ABCDiatype Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-abcdiatype',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'Etto - The Wardrobe That Speaks To You',
  description: 'Etto uses AI to surface patterns in how you dress and feel. Stylists bring the insight that helps you evolve.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${raptorV2.variable} ${abcdiatype.variable}`}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={abcdiatype.className}>
        {children}
      </body>
    </html>
  );
}
