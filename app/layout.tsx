import localFont from 'next/font/local'
import type { Metadata } from "next";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "ETTO - The Wardrobe That Speaks To You",
  description: "ETTO is an innovative wardrobe solution that understands your style.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${raptorV2.variable} ${abcdiatype.variable}`}>
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
