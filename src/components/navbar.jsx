'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, Github, Linkedin, Cpu } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ArchitectureModal from './architecture-modal';
import { useUI } from '../context/ui-context.jsx';

const NavLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isArchModalOpen, openArchModal, closeArchModal } = useUI();
    const { scrollY } = useScroll();

    // Perfectly synced cross-fade with the Hero image
    const opacity = useTransform(scrollY, [150, 350], [0, 1]);
    const scale = useTransform(scrollY, [150, 350], [0.4, 1]);
    const xDp = useTransform(scrollY, [150, 350], [30, 0]);

    useEffect(() => {
        const handleScrollState = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScrollState);
        return () => window.removeEventListener('scroll', handleScrollState);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
                // Update URL without jump
                window.history.pushState(null, '', href);
            }
            setIsOpen(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        window.history.pushState(null, '', '/');
        setIsOpen(false);
    };

    if (!mounted) return null;

    return (
        <nav className="fixed top-0 w-full z-50 glass dark:glass-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <motion.div
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="shrink-0 cursor-pointer"
                    >
                        <span className="font-bold text-2xl gradient-text">
                            Shreyash Srivastava
                        </span>
                    </motion.div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {NavLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleScroll(e, link.href)}
                                    className="hover:text-primary transition-colors font-medium px-3 py-2 rounded-md"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex items-center gap-4 border-l border-white/10 pl-8 ml-2">
                                <Link href="https://github.com/ShreyashSrivastavaa" target="_blank" className="text-foreground/40 hover:text-primary transition-colors">
                                    <Github size={20} />
                                </Link>
                                <Link href="https://www.linkedin.com/in/shreyashsrivastavaa" target="_blank" className="text-foreground/40 hover:text-primary transition-colors">
                                    <Linkedin size={20} />
                                </Link>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 10 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={openArchModal}
                                className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-all ml-2"
                                title="Under the Hood"
                            >
                                <Cpu size={20} />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 15 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </motion.button>

                            {/* Floating DP on the right */}
                            <motion.div
                                style={{ opacity, scale, x: xDp }}
                                onClick={scrollToTop}
                                className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg cursor-pointer group shrink-0 ml-2"
                            >
                                <Image
                                    src="/profile.png"
                                    alt="Shreyash Srivastava"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                                />
                            </motion.div>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={openArchModal}
                            className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-all"
                        >
                            <Cpu size={20} />
                        </button>
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* Mobile Floating DP */}
                        <motion.div
                            style={{ opacity, scale }}
                            onClick={scrollToTop}
                            className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg cursor-pointer shrink-0"
                        >
                            <Image
                                src="/profile.png"
                                alt="Shreyash Srivastava"
                                width={32}
                                height={32}
                                className="w-full h-full object-cover grayscale"
                            />
                        </motion.div>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-primary"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass dark:glass-dark border-t border-white/10"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {NavLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleScroll(e, link.href)}
                                    className="block px-3 py-2 rounded-md text-base font-medium hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ArchitectureModal isOpen={isArchModalOpen} onClose={closeArchModal} />
        </nav>
    );
}
