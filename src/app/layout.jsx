import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "../components/theme-provider";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { UIProvider } from "../context/ui-context";
import { ScrollProvider } from "../context/scroll-context";
import ScrollProgressBar from "../components/scroll-progress-bar";
import CommandPalette from "../components/command-palette";
import ScrollAvatar from "../components/scroll-avatar";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const metadata = {
    metadataBase: new URL('https://shreyashsrivastava.vercel.app'),
    title: "Shreyash Srivastava — Backend Engineer",
    description: "Final-year CS student and SDE Intern building scalable backend systems, REST APIs, and data-driven applications.",
    keywords: ["Software Engineer", "Backend Developer", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "REST API", "System Architecture", "Security Engineer"],
    authors: [{ name: "Shreyash Srivastava" }],
    icons: {
        icon: '/profile.png',
        shortcut: '/profile.png',
        apple: '/profile.png',
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://shreyashsrivastava.vercel.app",
        title: "Shreyash Srivastava — Backend Engineer",
        description: "Final-year CS student and SDE Intern building scalable backend systems, REST APIs, and data-driven applications.",
        siteName: "Shreyash Portfolio",
        images: [
            {
                url: "/profile.png",
                width: 1080,
                height: 1080,
                alt: "Shreyash Srivastava — Backend Engineer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Shreyash Srivastava — Backend Engineer",
        description: "Final-year CS student and SDE Intern building scalable backend systems, REST APIs, and data-driven applications.",
        images: ["/profile.png"],
    },
};

export default function RootLayout({
    children,
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-bg-primary text-text-primary selection:bg-accent selection:text-bg-primary`}>
                <ThemeProvider
                    attribute="data-theme"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <UIProvider>
                        <ScrollProvider>
                            <CommandPalette>
                                <ScrollProgressBar />
                                <ScrollAvatar />
                                <Navbar />
                                <main className="pt-16 min-h-screen">
                                    {children}
                                </main>
                                <Footer />
                            </CommandPalette>
                        </ScrollProvider>
                    </UIProvider>
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
}

