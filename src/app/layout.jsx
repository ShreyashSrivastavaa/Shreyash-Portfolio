import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "../components/theme-provider.jsx";
import Footer from "../components/footer.jsx";
import Navbar from "../components/navbar.jsx";
import { UIProvider } from "../context/ui-context.jsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    metadataBase: new URL('https://shreyashsrivastava.vercel.app'),
    title: "Shreyash Srivastava — Backend Engineer",
    description: "Final-year CS student and SDE Intern building scalable backend systems, REST APIs, and data-driven applications.",
    keywords: ["Software Engineer", "Full-Stack Developer", "Next.js", "React", "AI", "S.A.F.E", "Phishing Detection", "System Architecture", "Security Engineer", "Prisma", "PostgreSQL", "Docker", "Redis", "Express.js", "Node.js"],
    authors: [{ name: "Shreyash" }],
    icons: {
        icon: '/app-logo.png?v=3',
        shortcut: '/app-logo.png?v=3',
        apple: '/app-logo.png?v=3',
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://shreyashsrivastava.vercel.app",
        title: "Shreyash | Software Engineer",
        description: "Engineering a Safer, Scalable Web. Part of the Team that created S.A.F.E.- AI-powered scam detection.",
        siteName: "Shreyash Portfolio",
        images: [
            {
                url: "/og-image.webp",
                width: 1200,
                height: 630,
                alt: "Shreyash Portfolio - Software Engineer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Shreyash | Software Engineer",
        description: "Engineering high-impact platforms for a safer web.",
        images: ["/og-image.webp"],
    },
    robots: {
        index: true,
        follow: true,
    },
};


import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} antialiased`}>
                <ThemeProvider
                    attribute="data-theme"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <UIProvider>
                        <Navbar />
                        <main className="pt-16">
                            {children}
                        </main>
                        <Footer />
                    </UIProvider>
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
}

