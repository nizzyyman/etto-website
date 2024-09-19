import localFont from 'next/font/local'
import type { Metadata } from "next";
import "./globals.css";

const raptorV2 = localFont({
  src: './fonts/Raptor V2 Premium Semibold.ttf',
  display: 'swap',
  variable: '--font-raptor',
})

const abcDiatypeLight = localFont({
  src: './fonts/ABCDiatype Light.otf',
  display: 'swap',
  variable: '--font-abcdiatype',
})

export const metadata: Metadata = {
  title: "ETTO - The Wardrobe That Speaks To You",
  description: "ETTO is a innovative wardrobe solution that understands your style.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${raptorV2.variable} ${abcDiatypeLight.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={abcDiatypeLight.className}>
        {children}
      </body>
    </html>
  );
}
