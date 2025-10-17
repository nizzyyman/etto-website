import { Metadata } from 'next';

// Define the stylist data structure
interface Stylist {
  slug: string;
  name: string;
  bio: string;
  profilePhoto: string;
}

// Mock data - keep in sync with page.tsx
const stylists: Record<string, Stylist> = {
  'robyn': {
    slug: 'robyn',
    name: 'ROBYN DAVIES',
    bio: "Featured in Vogue, Elle, & Harper's Bazaar.",
    profilePhoto: '/stylists/Robyn Profile Photo.jpeg',
  },
  'felicia': {
    slug: 'felicia',
    name: 'FELICIA GARCIA-RIVERA',
    bio: "Featured in Vogue & W Magazine",
    profilePhoto: '/stylists/Felicia Profile Photo.jpg',
  },
  'tommyrae': {
    slug: 'tommyrae',
    name: 'TOMMY RAE JONES',
    bio: "Featured in Dirty Magazine & Valentino Beauty",
    profilePhoto: '/stylists/Tommy Profile Photo.jpeg',
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const stylist = stylists[params.slug];

  if (!stylist) {
    return {
      title: 'Stylist Not Found | Etto',
    };
  }

  const title = `Book ${stylist.name.split(' ')[0]}`;
  const description = stylist.bio;
  const imageUrl = `https://etto.ai${stylist.profilePhoto}`;
  const pageUrl = `https://etto.ai/stylists/${stylist.slug}`;

  return {
    title: `${title} | Etto`,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Etto',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${stylist.name} - Professional Stylist`,
        },
      ],
      locale: 'en_US',
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function StylistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}