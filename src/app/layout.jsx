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
    title: "Shreyash Srivastava | Backend Engineer & Full-Stack Developer",
    description: "Backend Software Engineer & former SDE Intern at JBH Tech Innovation (6 Months). Expert in Node.js, NestJS, PostgreSQL, Docker. Building scalable systems and high-throughput APIs.",
    keywords: [
        "Shreyash Srivastava",
        "Backend Developer",
        "Backend Engineer",
        "Full-Stack Developer",
        "Backend SDE India",
        "NestJS Developer",
        "Node.js Engineer",
        "PostgreSQL Developer",
        "REST API Developer",
        "Microservices Architecture",
        "IHateLovePDF"
    ],
    authors: [{ name: "Shreyash Srivastava", url: "https://shreyashsrivastava.vercel.app" }],
    creator: "Shreyash Srivastava",
    publisher: "Shreyash Srivastava",
    alternates: {
        canonical: 'https://shreyashsrivastava.vercel.app/',
    },
    icons: {
        icon: '/app-logo.png?v=3',
        shortcut: '/app-logo.png?v=3',
        apple: '/app-logo.png?v=3',
    },
    manifest: '/site.webmanifest',
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://shreyashsrivastava.vercel.app",
        title: "Shreyash Srivastava | Backend Engineer & Full-Stack Developer",
        description: "Backend SDE @ JBH Tech Innovation. Expert in Node.js, NestJS, PostgreSQL, Docker. Building scalable systems and high-throughput APIs.",
        siteName: "Shreyash Srivastava Portfolio",
        images: [
            {
                url: "/shreyash-hero.png",
                width: 1200,
                height: 630,
                alt: "Shreyash Srivastava - Backend Engineer & Full-Stack Developer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Shreyash Srivastava | Backend Engineer & Full-Stack Developer",
        description: "Building scalable backends and high-throughput APIs. Node.js, NestJS, PostgreSQL expert.",
        images: ["/shreyash-hero.png"],
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
    other: {
        'geo.region': 'IN-DL',
        'geo.position': '28.7041;77.1025',
        'ICBM': '28.7041,77.1025',
    },
};

const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": "https://shreyashsrivastava.vercel.app/#person",
            "name": "Shreyash Srivastava",
            "url": "https://shreyashsrivastava.vercel.app",
            "image": "https://shreyashsrivastava.vercel.app/profile.png",
            "description": "Backend Engineer and Full-Stack Developer specializing in scalable systems, REST APIs, NestJS, PostgreSQL, and microservices architecture.",
            "email": "shreyashsr2004@gmail.com",
            "sameAs": [
                "https://github.com/ShreyashSrivastava15",
                "https://github.com/ShreyashSrivastavaa",
                "https://linkedin.com/in/shreyashsrivastavaa"
            ],
            "jobTitle": "Backend SDE Intern",
            "worksFor": {
                "@type": "Organization",
                "name": "JBH Tech Innovation"
            },
            "workLocation": {
                "@type": "Place",
                "name": "Faridabad, India"
            },
            "knowsAbout": [
                "Backend Development",
                "Full-Stack Development",
                "Node.js",
                "NestJS",
                "TypeScript",
                "PostgreSQL",
                "Prisma ORM",
                "REST APIs",
                "Docker",
                "Microservices",
                "RabbitMQ",
                "Redis"
            ]
        },
        {
            "@type": "WebSite",
            "@id": "https://shreyashsrivastava.vercel.app/#website",
            "url": "https://shreyashsrivastava.vercel.app",
            "name": "Shreyash Srivastava Portfolio",
            "description": "Portfolio showcasing full-stack and backend development projects built with Node.js, NestJS, React, and modern web technologies.",
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
