export const metadata = {
  title: "Work Experience & Career History",
  description: "Work history, internships, and education of Shreyash Srivastava, Backend Software Engineer and former intern at JBH Tech Innovation.",
  keywords: [
    "Shreyash Srivastava Experience",
    "Shreyash Srivastava Career",
    "JBH Tech Innovation Intern",
    "Freelance Software Engineer",
    "ITS Engineering College AKTU",
    "Backend SDE Experience",
    "Software Engineer Resume"
  ],
  alternates: {
    canonical: 'https://shreyashsrivastava.vercel.app/experience',
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: 'https://shreyashsrivastava.vercel.app/experience',
    title: 'Work Experience & Education | Shreyash Srivastava',
    description: 'Career history and engineering roles held by Shreyash Srivastava.',
    siteName: 'Shreyash Srivastava Portfolio',
    images: [
      {
        url: 'https://shreyashsrivastava.vercel.app/og-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Shreyash Srivastava Work Experience & Background',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience | Shreyash Srivastava',
    description: 'Backend Software Engineer and former SDE intern at JBH Tech Innovation.',
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
      'name': 'Experience',
      'item': 'https://shreyashsrivastava.vercel.app/experience',
    },
  ],
}

export default function ExperienceLayout({ children }) {
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
