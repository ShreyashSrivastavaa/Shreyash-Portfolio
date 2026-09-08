import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "../components/theme-provider.jsx";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
    metadataBase: new URL('https://shreyashsrivastava.vercel.app'),
    title: {
        default: "Shreyash Srivastava | Backend Engineer & Full-Stack Developer",
        template: "%s | Shreyash Srivastava"
    },
    description: "Portfolio of Shreyash Srivastava, a Backend Software Engineer and Full-Stack Developer. Experienced in Node.js, NestJS, PostgreSQL, Redis, RabbitMQ, and Docker.",
    keywords: [
        "Shreyash Srivastava",
        "Shreyash Srivastava Portfolio",
        "Shreyash Srivastava Backend Developer",
        "Shreyash Srivastava SDE",
        "Shreyash Srivastava Software Engineer",
        "Shreyash Srivastava Delhi NCR",
        "Shreyash Srivastava India",
        "Backend Engineer",
        "Backend Developer",
        "Full-Stack Developer",
        "Backend SDE India",
        "NestJS Developer",
        "Node.js Engineer",
        "PostgreSQL Developer",
        "REST API Developer",
        "Distributed Systems Engineer",
        "Microservices Architecture",
        "IHateLovePDF",
        "SwipeRide"
    ],
    authors: [{ name: "Shreyash Srivastava", url: "https://shreyashsrivastava.vercel.app" }],
    creator: "Shreyash Srivastava",
    publisher: "Shreyash Srivastava",
    alternates: {
        canonical: 'https://shreyashsrivastava.vercel.app',
    },
    icons: {
        icon: '/app-logo.png?v=3',
        shortcut: '/app-logo.png?v=3',
        apple: '/app-logo.png?v=3',
    },
    manifest: '/site.webmanifest',
    openGraph: {
        type: "profile",
        locale: "en_US",
        url: "https://shreyashsrivastava.vercel.app",
        title: "Shreyash Srivastava | Backend Engineer & Full-Stack Developer",
        description: "Official portfolio of Shreyash Srivastava. Backend Software Engineer specializing in Node.js, NestJS, PostgreSQL, Redis, RabbitMQ, and scalable distributed systems.",
        siteName: "Shreyash Srivastava Portfolio",
        images: [
            {
                url: "https://shreyashsrivastava.vercel.app/og-banner.jpg",
                width: 1200,
                height: 630,
                alt: "Shreyash Srivastava - Backend Engineer & Full-Stack Developer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Shreyash Srivastava | Backend Engineer & Full-Stack Developer",
        description: "Building scalable backends and high-throughput APIs. Node.js, NestJS, PostgreSQL, Redis expert.",
        images: ["https://shreyashsrivastava.vercel.app/og-banner.jpg"],
        creator: "@ShreyashSrivastavaa",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'm8KoSeRzU9slpYn6QHT5ZBRMnb_wkcU00sdc_B-ZPvg',
    },
    other: {
        'geo.region': 'IN-UP',
        'geo.placename': 'Greater Noida, Delhi NCR, India',
        'geo.position': '28.4744;77.5040',
        'ICBM': '28.4744, 77.5040',
    },
};

const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": "https://shreyashsrivastava.vercel.app/#person",
            "name": "Shreyash Srivastava",
            "givenName": "Shreyash",
            "familyName": "Srivastava",
            "alternateName": [
                "Shreyash Srivastava Backend Developer",
                "Shreyash Srivastava SDE",
                "Shreyash Srivastava Portfolio",
                "Shreyash Srivastava Full-Stack Engineer"
            ],
            "url": "https://shreyashsrivastava.vercel.app",
            "image": "https://shreyashsrivastava.vercel.app/profile.png",
            "description": "Backend Software Engineer & Full-Stack Developer specializing in Node.js, NestJS, PostgreSQL, Redis, RabbitMQ, Docker, and distributed microservices architecture.",
            "email": "shreyashsr2004@gmail.com",
            "sameAs": [
                "https://github.com/ShreyashSrivastavaa",
                "https://github.com/ShreyashSrivastava15",
                "https://linkedin.com/in/shreyashsrivastavaa"
            ],
            "jobTitle": "Backend Software Engineer & Full-Stack Developer",
            "worksFor": [
                {
                    "@type": "Organization",
                    "name": "JBH Tech Innovation"
                }
            ],
            "alumnusOf": {
                "@type": "EducationalOrganization",
                "name": "ITS Engineering College, Greater Noida (AKTU)",
                "url": "https://its.edu.in"
            },
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Greater Noida",
                "addressRegion": "Uttar Pradesh",
                "addressCountry": "IN"
            },
            "knowsAbout": [
                "Backend Engineering",
                "Distributed Systems",
                "Full-Stack Development",
                "Node.js",
                "NestJS",
                "TypeScript",
                "JavaScript",
                "PostgreSQL",
                "Prisma ORM",
                "REST APIs",
                "Docker",
                "Microservices Architecture",
                "RabbitMQ",
                "Redis",
                "System Design"
            ],
            "knowsLanguage": ["English", "Hindi"]
        },
        {
            "@type": "ProfilePage",
            "@id": "https://shreyashsrivastava.vercel.app/#profilepage",
            "url": "https://shreyashsrivastava.vercel.app",
            "name": "Shreyash Srivastava - Portfolio & Professional Profile",
            "mainEntity": {
                "@id": "https://shreyashsrivastava.vercel.app/#person"
            }
        },
        {
            "@type": "WebSite",
            "@id": "https://shreyashsrivastava.vercel.app/#website",
            "url": "https://shreyashsrivastava.vercel.app",
            "name": "Shreyash Srivastava Portfolio",
            "description": "Official portfolio of Shreyash Srivastava showcasing scalable backend systems, microservices, and full-stack projects.",
            "publisher": {
                "@id": "https://shreyashsrivastava.vercel.app/#person"
            },
            "inLanguage": "en-US"
        }
    ]
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
                />
            </head>
            <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased text-foreground bg-background`}>
                <ThemeProvider
                    attribute="data-theme"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <main className="min-h-screen">
                        {children}
                    </main>
                </ThemeProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
