import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://etto.ai'),
  title: "ETTO Invite",
  description: "Fashion x Technology Event - March 12",
  openGraph: {
    title: 'ETTO Invite',
    description: 'Fashion x Technology Event - March 12',
    url: 'https://etto.ai/secretinvite',
    siteName: 'ETTO',
    images: [{
      url: '/invitation.jpg', // This image will only be used for /secretinvite
      width: 500,
      height: 707,
      alt: 'ETTO Event Invitation'
    }],
    locale: 'en_US',
    type: 'website',
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function SecretInviteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
