'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, Github, Linkedin, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ArchitectureModal from './architecture-modal';
import { useUI } from '../context/ui-context.jsx';

const NavLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const { isArchModalOpen, openArchModal, closeArchModal } = useUI();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <nav className="fixed top-0 w-full z-50 glass dark:glass-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="shrink-0 font-bold text-2xl gradient-text cursor-pointer"
                    >
                        Shreyash Srivastava
                    </motion.div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {NavLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
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
                                    onClick={() => setIsOpen(false)}
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
