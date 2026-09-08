export const metadata = {
  title: "Projects & Architecture Case Studies",
  description: "Projects built by Shreyash Srivastava, including IHateLovePDF, HMS, ZyMeal, GitFC, and SwipeRide API.",
  keywords: [
    "Shreyash Srivastava Projects",
    "IHateLovePDF WebAssembly",
    "Hospital Management System",
    "ZyMeal Food Ordering API",
    "Backend Projects Node.js",
    "PostgreSQL Projects",
    "Microservices Case Studies",
    "Full-Stack Portfolio Projects"
  ],
  alternates: {
    canonical: 'https://shreyashsrivastava.vercel.app/projects',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shreyashsrivastava.vercel.app/projects',
    title: 'Projects & Architecture Case Studies | Shreyash Srivastava',
    description: 'Explore production-ready backend systems and full-stack applications built by Shreyash Srivastava.',
    siteName: 'Shreyash Srivastava Portfolio',
    images: [
      {
        url: 'https://shreyashsrivastava.vercel.app/og-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Shreyash Srivastava Projects & Case Studies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Shreyash Srivastava',
    description: 'Explore backend engineering and full-stack projects built with Node.js, NestJS, and PostgreSQL.',
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
      'name': 'Projects',
      'item': 'https://shreyashsrivastava.vercel.app/projects',
    },
  ],
}

export default function ProjectsLayout({ children }) {
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
