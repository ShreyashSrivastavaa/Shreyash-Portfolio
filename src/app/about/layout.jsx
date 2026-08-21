export const metadata = {
  title: "About Me | Backend SDE & Software Engineer",
  description: "Learn more about Shreyash Srivastava — Backend Software Engineer & Full-Stack Developer. Background at JBH Tech Innovation and UpscaleTechSolutions, B.Tech CSE @ ITS Engineering College.",
  keywords: [
    "About Shreyash Srivastava",
    "Shreyash Srivastava Background",
    "Shreyash Srivastava Bio",
    "Shreyash Srivastava Education",
    "Shreyash Srivastava Experience",
    "Backend SDE Greater Noida",
    "ITS Engineering College Developer"
  ],
  alternates: {
    canonical: 'https://shreyashsrivastava.vercel.app/about',
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: 'https://shreyashsrivastava.vercel.app/about',
    title: 'About Shreyash Srivastava | Backend Engineer & Full-Stack Developer',
    description: 'Learn more about Shreyash Srivastava — Backend Software Engineer with expertise in Node.js, NestJS, PostgreSQL, and scalable microservices.',
    siteName: 'Shreyash Srivastava Portfolio',
    images: [
      {
        url: 'https://shreyashsrivastava.vercel.app/shreyash-about.png',
        width: 1200,
        height: 630,
        alt: 'About Shreyash Srivastava',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Shreyash Srivastava | Backend Engineer',
    description: 'Backend Software Engineer & Full-Stack Developer. Node.js, NestJS, PostgreSQL expert.',
    images: ['https://shreyashsrivastava.vercel.app/shreyash-about.png'],
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
      'name': 'About',
      'item': 'https://shreyashsrivastava.vercel.app/about',
    },
  ],
}

export default function AboutLayout({ children }) {
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
