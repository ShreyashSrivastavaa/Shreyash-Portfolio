import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "../components/theme-provider.jsx";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
    metadataBase: new URL('https://www.shreyashsrivastava.in'),
    title: {
        default: "Shreyash Srivastava | Full-Stack Developer, Product Builder & Founder",
        template: "%s | Shreyash Srivastava"
    },
    description: "Official portfolio of Shreyash Srivastava, Full-Stack Developer, Product Builder, and Founder of Zenith District. Turning ideas into digital products people can use.",
    keywords: [
        "Shreyash Srivastava",
        "Shreyash Srivastava Portfolio",
        "Full-Stack Developer",
        "Product Builder",
        "Founder Zenith District",
        "Zenith District",
        "Shreyash Srivastava Founder",
        "Shreyash Srivastava Software Engineer",
        "Shreyash Srivastava Delhi",
        "Shreyash Srivastava India",
        "Next.js Developer",
        "React Developer",
        "Node.js Engineer",
        "PostgreSQL Developer",
        "REST API Developer",
        "IHateLovePDF",
        "Product.forum",
        "GitFC",
        "ZyMeal"
    ],
    authors: [{ name: "Shreyash Srivastava", url: "https://www.shreyashsrivastava.in" }],
    creator: "Shreyash Srivastava",
    publisher: "Shreyash Srivastava",
    alternates: {
        canonical: 'https://www.shreyashsrivastava.in',
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
        url: "https://www.shreyashsrivastava.in",
        title: "Shreyash Srivastava | Full-Stack Developer, Product Builder & Founder",
        description: "Full-Stack Developer, Product Builder, and Founder of Zenith District. Turning ideas into digital products people can use.",
        siteName: "Shreyash Srivastava Portfolio",
        images: [
            {
                url: "https://www.shreyashsrivastava.in/og-banner.jpg",
                width: 1200,
                height: 630,
                alt: "Shreyash Srivastava - Full-Stack Developer, Product Builder & Founder",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Shreyash Srivastava | Full-Stack Developer, Product Builder & Founder",
        description: "Full-Stack Developer, Product Builder, and Founder of Zenith District. Turning ideas into digital products people can use.",
        images: ["https://www.shreyashsrivastava.in/og-banner.jpg"],
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
        'geo.region': 'IN-DL',
        'geo.placename': 'Delhi, India',
        'geo.position': '28.6139;77.2090',
        'ICBM': '28.6139, 77.2090',
    },
};

const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shreyash Srivastava",
    "url": "https://www.shreyashsrivastava.in/",
    "sameAs": [
        "https://github.com/ShreyashSrivastavaa",
        "https://www.linkedin.com/in/shreyashsrivastavaa",
        "https://buymeacoffee.com/shreyashsrivastavaa"
    ],
    "founder": [
        {
            "@type": "Organization",
            "name": "Zenith District",
            "url": "https://zenithdistrict.com"
        },
        {
            "@type": "Organization",
            "name": "I Hate Love PDF",
            "url": "https://www.ihatelovepdf.com"
        }
    ]
};

const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": "https://www.shreyashsrivastava.in/#person",
            "name": "Shreyash Srivastava",
            "givenName": "Shreyash",
            "familyName": "Srivastava",
            "alternateName": [
                "Shreyash Srivastava Full-Stack Developer",
                "Shreyash Srivastava Product Builder",
                "Shreyash Srivastava Founder Zenith District",
                "Shreyash Srivastava Portfolio"
            ],
            "url": "https://www.shreyashsrivastava.in/",
            "image": "https://www.shreyashsrivastava.in/profile.png",
            "description": "Full-Stack Developer, Product Builder, and Founder of Zenith District. Experienced in building digital products, scalable web apps, and dependable backend APIs.",
            "email": "shreyashsr2004@gmail.com",
            "sameAs": [
                "https://github.com/ShreyashSrivastavaa",
                "https://github.com/ShreyashSrivastava15",
                "https://www.linkedin.com/in/shreyashsrivastavaa",
                "https://buymeacoffee.com/shreyashsrivastavaa"
            ],
            "jobTitle": "Full-Stack Developer, Product Builder & Founder",
            "worksFor": [
                {
                    "@type": "Organization",
                    "name": "Zenith District"
                }
            ],
            "founder": [
                {
                    "@type": "Organization",
                    "name": "Zenith District",
                    "url": "https://zenithdistrict.com"
                },
                {
                    "@type": "Organization",
                    "name": "I Hate Love PDF",
                    "url": "https://www.ihatelovepdf.com"
                }
            ],
            "alumnusOf": {
                "@type": "EducationalOrganization",
                "name": "ITS Engineering College, Greater Noida (AKTU)",
                "url": "https://its.edu.in"
            },
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Delhi",
                "addressRegion": "Delhi",
                "addressCountry": "IN"
            },
            "knowsAbout": [
                "Full-Stack Development",
                "Frontend Development",
                "Backend Engineering",
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "Express.js",
                "PostgreSQL",
                "MongoDB",
                "Prisma ORM",
                "REST APIs",
                "Docker",
                "WebSockets",
                "Tailwind CSS",
                "WebAssembly"
            ],
            "knowsLanguage": ["English", "Hindi"]
        },
        {
            "@type": "ProfilePage",
            "@id": "https://www.shreyashsrivastava.in/#profilepage",
            "url": "https://www.shreyashsrivastava.in",
            "name": "Shreyash Srivastava - Portfolio & Professional Profile",
            "mainEntity": {
                "@id": "https://www.shreyashsrivastava.in/#person"
            }
        },
        {
            "@type": "WebSite",
            "@id": "https://www.shreyashsrivastava.in/#website",
            "url": "https://www.shreyashsrivastava.in",
            "name": "Shreyash Srivastava Portfolio",
            "description": "Official portfolio of Shreyash Srivastava, full-stack developer, product builder, and founder of Zenith District from Delhi, India.",
            "publisher": {
                "@id": "https://www.shreyashsrivastava.in/#person"
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
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
                />
            </head>
            <body suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#f1f0eb] text-[#242620]`}>
                <ThemeProvider
                    attribute="data-theme"
                    defaultTheme="light"
                    enableSystem={false}
                    forcedTheme="light"
                    disableTransitionOnChange
                >
                    <div className="min-h-screen bg-[#f1f0eb]">
                        {children}
                    </div>
                </ThemeProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
