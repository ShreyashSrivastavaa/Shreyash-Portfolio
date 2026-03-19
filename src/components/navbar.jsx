'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, Github, Linkedin, Eye, EyeOff, Zap, ZapOff, Monitor, Terminal as TerminalIcon } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useVersion } from '../context/version-context.jsx';

const NavLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const { version, toggleVersion, highReadability, toggleReadability } = useVersion();
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
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
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
            version === 'v2' 
                ? 'bg-black/80 border-b border-cyan-500/30 backdrop-blur-md' 
                : 'glass dark:glass-dark'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <motion.div
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="shrink-0 cursor-pointer flex items-center gap-2"
                    >
                        <span className={`font-bold text-2xl ${
                            version === 'v2' 
                                ? 'text-cyan-400 [text-shadow:0_0_10px_rgba(34,211,238,0.5)] font-mono' 
                                : 'gradient-text'
                        }`}>
                            {version === 'v2' ? '> SHREYASH' : 'Shreyash Srivastava'}
                        </span>
                    </motion.div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6 items-center">
                            {NavLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleScroll(e, link.href)}
                                    className={`transition-colors font-medium px-3 py-2 rounded-md ${
                                        version === 'v2'
                                            ? 'text-cyan-400/70 hover:text-cyan-400 hover:bg-cyan-500/10 font-mono text-sm'
                                            : 'hover:text-primary'
                                    }`}
                                >
                                    {version === 'v2' ? `/${link.name.toLowerCase()}` : link.name}
                                </Link>
                            ))}
                            
                            <div className="flex items-center gap-4 border-l border-white/10 pl-6 ml-2">
                                {/* Version Toggle */}
                                <div 
                                    onClick={toggleVersion}
                                    className="relative flex items-center p-1 bg-foreground/10 rounded-full cursor-pointer w-16 h-8 group overflow-hidden"
                                >
                                    <motion.div 
                                        animate={{ x: version === 'v1' ? 0 : 32 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        className={`w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                                            version === 'v2' ? 'bg-cyan-500 text-black' : 'bg-primary text-white'
                                        }`}
                                    >
                                        <span className="text-[10px] font-bold">{version.toUpperCase()}</span>
                                    </motion.div>
                                    <div className="absolute inset-0 flex justify-between items-center px-2 text-[10px] font-bold text-foreground/40 pointer-events-none">
                                        <span>V1</span>
                                        <span>V2</span>
                                    </div>
                                </div>

                                {/* Accessibility Toggle (V2 Only) */}
                                {version === 'v2' && (
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={toggleReadability}
                                        className={`p-2 rounded-lg transition-all ${
                                            highReadability 
                                                ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(34,211,238,0.5)]' 
                                                : 'bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20'
                                        }`}
                                        title={highReadability ? "Disable High Readability" : "Enable High Readability"}
                                    >
                                        {highReadability ? <Eye size={18} /> : <EyeOff size={18} />}
                                    </motion.button>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 15 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className={`p-2 rounded-lg transition-all ${
                                        version === 'v2'
                                            ? 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-400/20'
                                            : 'bg-primary/10 text-primary hover:bg-primary/20'
                                    }`}
                                >
                                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                </motion.button>
                            </div>

                            <motion.div
                                style={{ opacity, scale, x: xDp }}
                                onClick={scrollToTop}
                                className={`w-9 h-9 rounded-full overflow-hidden border-2 cursor-pointer group shrink-0 ml-2 ${
                                    version === 'v2' ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'border-primary/20 shadow-lg'
                                }`}
                            >
                                <Image
                                    src="/profile.png"
                                    alt="Shreyash Srivastava"
                                    width={36}
                                    height={36}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                                />
                            </motion.div>
                        </div>
                    </div>

                    <div className="md:hidden flex items-center gap-3">
                        {/* Mobile Toggle Pills */}
                        <div 
                            onClick={toggleVersion}
                            className="relative flex items-center p-1 bg-foreground/10 rounded-full cursor-pointer w-14 h-7"
                        >
                            <motion.div 
                                animate={{ x: version === 'v1' ? 0 : 28 }}
                                className={`w-5 h-5 rounded-full flex items-center justify-center z-10 ${
                                    version === 'v2' ? 'bg-cyan-500 text-black' : 'bg-primary text-white'
                                }`}
                            >
                                <span className="text-[8px] font-bold">{version.toUpperCase()}</span>
                            </motion.div>
                        </div>

                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`p-2 rounded-lg transition-all ${
                                version === 'v2' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-primary/10 text-primary'
                            }`}
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
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


        </nav>
    );
}
