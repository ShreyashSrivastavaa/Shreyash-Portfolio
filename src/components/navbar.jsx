'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, Github, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useScrollPosition } from '../context/scroll-context';

const NavLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY, activeSection } = useScrollPosition();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleScroll = (e, href) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const id = href.substring(1);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
                window.history.pushState(null, '', href);
            }
            setIsOpen(false);
        }
    };

    if (!mounted) return null;

    const isSticky = scrollY > 10;

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isSticky
                ? 'bg-bg-primary/85 backdrop-blur-md border-b border-border'
                : 'bg-transparent border-b border-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="shrink-0 font-mono font-bold text-xl text-accent hover:glow-accent transition-all cursor-pointer"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        SS
                    </motion.div>

                    {/* Center: Nav Links */}
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-8">
                            {NavLinks.map((link) => {
                                const isActive = activeSection === link.id;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => handleScroll(e, link.href)}
                                        className={`font-mono text-xs uppercase tracking-widest transition-colors ${isActive
                                            ? 'text-accent underline underline-offset-8 decoration-2'
                                            : 'text-text-muted hover:text-text-primary'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Icons & Toggle */}
                    <div className="flex items-center gap-2">
                        <div className="hidden md:flex items-center gap-2 mr-2">
                            <Link
                                href="https://github.com/ShreyashSrivastavaa"
                                target="_blank"
                                className="p-2 border border-border hover:border-accent hover:text-accent transition-all text-text-muted h-9 w-9 flex items-center justify-center rounded-sm"
                            >
                                <Github size={18} />
                            </Link>
                            <Link
                                href="https://linkedin.com/in/shreyashsrivastavaa"
                                target="_blank"
                                className="p-2 border border-border hover:border-accent hover:text-accent transition-all text-text-muted h-9 w-9 flex items-center justify-center rounded-sm"
                            >
                                <Linkedin size={18} />
                            </Link>
                        </div>

                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 border border-border hover:border-accent hover:text-accent transition-all text-text-muted h-9 w-9 flex items-center justify-center rounded-sm"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={theme}
                                    initial={{ opacity: 0, rotate: -20 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    exit={{ opacity: 0, rotate: 20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                </motion.div>
                            </AnimatePresence>
                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-accent border border-border rounded-sm h-9 w-9 flex items-center justify-center"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-bg-surface border-b border-border shadow-2xl"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-4">
                            {NavLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleScroll(e, link.href)}
                                    className={`block font-mono text-sm uppercase tracking-widest ${activeSection === link.id ? 'text-accent' : 'text-text-muted'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex gap-4 pt-4 border-t border-border">
                                <Link href="https://github.com/ShreyashSrivastavaa" target="_blank" className="text-text-muted hover:text-accent">
                                    <Github size={20} />
                                </Link>
                                <Link href="https://linkedin.com/in/shreyashsrivastavaa" target="_blank" className="text-text-muted hover:text-accent">
                                    <Linkedin size={20} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
