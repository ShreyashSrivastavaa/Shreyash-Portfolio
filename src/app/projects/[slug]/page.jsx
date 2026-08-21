import { notFound } from 'next/navigation'
import projectsData from '@/data/projects.json'
import ProjectDetailClient from '@/components/portfolio/ProjectDetailClient'

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.id,
  }))
}

export async function generateMetadata({ params: paramsPromise }) {
  const params = await paramsPromise
  const slug = params?.slug
  const project = projectsData.find((p) => p.id === slug)

  if (!project) {
    return {
      title: 'Project Not Found | Shreyash Srivastava',
      description: 'The requested project case study could not be found.',
    }
  }

  const title = `${project.title} | Case Study | Shreyash Srivastava`
  const description = project.tagline || project.description || `Case study of ${project.title} built by Shreyash Srivastava.`
  const ogImage = project.image_url
    ? `https://shreyashsrivastava.vercel.app${project.image_url}`
    : 'https://shreyashsrivastava.vercel.app/shreyash-hero.png'

  return {
    title,
    description,
    keywords: [
      project.title,
      `${project.title} case study`,
      "Shreyash Srivastava",
      "Shreyash Srivastava projects",
      ...(project.tech || []),
      "Backend Architecture",
      "Full-Stack Development"
    ],
    alternates: {
      canonical: `https://shreyashsrivastava.vercel.app/projects/${slug}`,
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: `https://shreyashsrivastava.vercel.app/projects/${slug}`,
      title,
      description,
      siteName: 'Shreyash Srivastava Portfolio',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${project.title} - Architecture & Project Preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@ShreyashSrivastavaa',
    },
  }
}

export default async function ProjectCaseStudyPage({ params: paramsPromise }) {
  const params = await paramsPromise
  const slug = params?.slug
  const project = projectsData.find((p) => p.id === slug)

  if (!project) {
    notFound()
  }

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareSourceCode',
        '@id': `https://shreyashsrivastava.vercel.app/projects/${slug}#software`,
        'name': project.title,
        'description': project.description || project.tagline,
        'author': {
          '@id': 'https://shreyashsrivastava.vercel.app/#person',
        },
        'programmingLanguage': project.tech || [],
        'codeRepository': project.github_url || 'https://github.com/ShreyashSrivastavaa',
        'url': `https://shreyashsrivastava.vercel.app/projects/${slug}`,
        'image': project.image_url
          ? `https://shreyashsrivastava.vercel.app${project.image_url}`
          : 'https://shreyashsrivastava.vercel.app/shreyash-hero.png',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://shreyashsrivastava.vercel.app/projects/${slug}#breadcrumb`,
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
          {
            '@type': 'ListItem',
            'position': 3,
            'name': project.title,
            'item': `https://shreyashsrivastava.vercel.app/projects/${slug}`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <ProjectDetailClient project={project} />
    </>
  )
}
