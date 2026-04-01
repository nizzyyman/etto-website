import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Etto',
  description: 'Privacy policy for Etto Studio and the Etto Web Clipper browser extension.',
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
