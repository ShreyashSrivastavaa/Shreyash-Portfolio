'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function ScrollAvatar() {
    const [visible, setVisible] = useState(false);

    // Only show after scrolling past the hero (~400px)
    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -10 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    onClick={scrollToAbout}
                    title="Back to About"
                    aria-label="Scroll back to About section"
                    className="
                        fixed bottom-6 left-6 z-[9996]
                        w-12 h-12
                        rounded-[2px]
                        border border-border
                        overflow-hidden
                        hover:border-accent
                        hover:shadow-[0_0_12px_rgba(0,255,136,0.35)]
                        transition-all duration-200
                        group
                        cursor-pointer
                        bg-bg-primary
                    "
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Image
                        src="/profile-2.jpg"
                        alt="Shreyash"
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    {/* Green corner pip — shows it's clickable */}
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-accent rounded-full" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
