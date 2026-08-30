export const metadata = {
  title: "Technical Skills & Tech Stack",
  description: "Comprehensive overview of technical proficiencies, frameworks, databases, and DevOps tools mastered by Shreyash Srivastava.",
  keywords: [
    "Shreyash Srivastava Skills",
    "Node.js Expert",
    "NestJS Developer Skills",
    "PostgreSQL Prisma Engineer",
    "Redis RabbitMQ Backend",
    "Docker Microservices",
    "Backend Tech Stack",
    "TypeScript Developer Skills"
  ],
  alternates: {
    canonical: 'https://shreyashsrivastava.vercel.app/skills',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shreyashsrivastava.vercel.app/skills',
    title: 'Technical Skills & Tech Stack | Shreyash Srivastava',
    description: 'Technical proficiencies, frameworks, databases, and DevOps tools mastered by Shreyash Srivastava.',
    siteName: 'Shreyash Srivastava Portfolio',
    images: [
      {
        url: 'https://shreyashsrivastava.vercel.app/og-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Shreyash Srivastava Skills & Tech Stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Skills | Shreyash Srivastava',
    description: 'Node.js, NestJS, PostgreSQL, Redis, RabbitMQ, and Docker skills.',
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
      'name': 'Skills',
      'item': 'https://shreyashsrivastava.vercel.app/skills',
    },
  ],
}

export default function SkillsLayout({ children }) {
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
