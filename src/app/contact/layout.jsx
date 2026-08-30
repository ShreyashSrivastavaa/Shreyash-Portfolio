export const metadata = {
  title: "Contact & Hire",
  description: "Get in touch with Shreyash Srivastava for backend engineering roles, freelance software architecture projects, and consulting.",
  keywords: [
    "Contact Shreyash Srivastava",
    "Hire Shreyash Srivastava",
    "Hire Backend Developer India",
    "Hire Node.js Engineer",
    "Backend Developer Freelance Contact",
    "Shreyash Srivastava Email"
  ],
  alternates: {
    canonical: 'https://shreyashsrivastava.vercel.app/contact',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shreyashsrivastava.vercel.app/contact',
    title: 'Contact & Hire | Shreyash Srivastava - Backend Engineer',
    description: 'Get in touch with Shreyash Srivastava for backend engineering roles and consulting.',
    siteName: 'Shreyash Srivastava Portfolio',
    images: [
      {
        url: 'https://shreyashsrivastava.vercel.app/og-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Shreyash Srivastava - Backend Engineer & Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Shreyash Srivastava',
    description: 'Get in touch with Shreyash Srivastava for backend engineering roles and consulting.',
    images: ['https://shreyashsrivastava.vercel.app/og-banner.jpg'],
    creator: '@ShreyashSrivastavaa',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': 'Home',
      'item': 'https://shreyashsrivastava.vercel.app',
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'name': 'Contact',
      'item': 'https://shreyashsrivastava.vercel.app/contact',
    },
  ],
}

export default function ContactLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  )
}
