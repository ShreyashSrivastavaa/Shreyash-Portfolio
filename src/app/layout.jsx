import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "../components/theme-provider.jsx";
import Footer from "../components/footer.jsx";
import Navbar from "../components/navbar.jsx";
import { UIProvider } from "../context/ui-context.jsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    metadataBase: new URL('https://shreyash-portfolio.vercel.app'),
    title: "Shreyash | Software Engineer & Full-Stack Architect",
    description: "Engineering high-impact systems like S.A.F.E. – AI-powered scam detection. Final-year CSE student focused on security, scalability, and performance.",
    keywords: ["Software Engineer", "Full-Stack Developer", "Next.js", "React", "AI", "S.A.F.E", "Phishing Detection", "System Architecture", "Security Engineer", "Prisma", "PostgreSQL", "Docker", "Redis", "Express.js", "Node.js"],
    authors: [{ name: "Shreyash" }],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://shreyash-portfolio.vercel.app", // Replace with actual URL if known
        title: "Shreyash | Software Engineer",
        description: "Engineering a Safer, Scalable Web. Creator of S.A.F.E. AI.",
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
            </body>
        </html>
    );
}
