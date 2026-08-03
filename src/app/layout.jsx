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
    title: "Shreyash Srivastava — Full-Stack & Backend Engineer",
    description: "Backend Engineer building scalable systems, REST APIs, and client-first web apps like IHateLovePDF.",
    keywords: ["Software Engineer", "Full-Stack Developer", "Next.js", "React", "Node.js", "Express.js", "MongoDB", "TypeScript", "IHateLovePDF"],
    authors: [{ name: "Shreyash Srivastava" }],
    icons: {
        icon: '/app-logo.png?v=3',
        shortcut: '/app-logo.png?v=3',
        apple: '/app-logo.png?v=3',
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://shreyashsrivastava.vercel.app",
        title: "Shreyash Srivastava | Software Engineer",
        description: "Full-Stack & Backend Engineer building high-performance scalable web systems.",
        siteName: "Shreyash Portfolio",
    },
    twitter: {
        card: "summary_large_image",
        title: "Shreyash Srivastava | Software Engineer",
        description: "Full-Stack & Backend Engineer building high-performance scalable web systems.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
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
