export const metadata = {
  title: "About Me",
  description: "About Shreyash Srivastava, a Backend Software Engineer and Full-Stack Developer with experience at JBH Tech Innovation and UpscaleTechSolutions.",
  keywords: [
    "About Shreyash Srivastava",
    "Shreyash Srivastava Background",
    "Backend SDE Experience",
    "Full-Stack Developer India",
    "ITS Engineering College AKTU",
    "JBH Tech Innovation Intern",
    "UpscaleTechSolutions Freelance",
    "Software Engineer Bio"
  ],
  alternates: {
    canonical: 'https://shreyashsrivastava.vercel.app/about',
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: 'https://shreyashsrivastava.vercel.app/about',
    title: 'About Shreyash Srivastava | Backend Engineer & Full-Stack Developer',
    description: 'About Shreyash Srivastava, a Backend Software Engineer working with Node.js, NestJS, PostgreSQL, and Docker.',
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
