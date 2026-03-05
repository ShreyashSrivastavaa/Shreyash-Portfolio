'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function DynamicProfileImage() {
    // 1. Setup Scroll Tracking
    // We'll track the scroll progress of the entire window
    const { scrollY } = useScroll();

    // Global Visibility: Floating DP is hidden at top and fades in as user scrolls away from Hero
    const globalOpacity = useTransform(scrollY, [0, 150, 300], [0, 0, 1]);
    const pointerEvents = useTransform(scrollY, [0, 250], ["none", "auto"]);

    // 2. Define Transformations
    // These values map scroll position (0 to 400px) to visual properties

    // Scale and Dimensions
    // Starts large (~380px width) and shrinks to standard DP size (48px)
    const size = useTransform(scrollY, [0, 400], [380, 48]);
    const aspectRatio = useTransform(scrollY, [0, 400], [0.8, 1]);

    // Shape (Border Radius)
    // Starts with 2.5rem and goes to 50% (circle)
    const borderRadius = useTransform(scrollY, [0, 400], ["2.5rem", "50%"]);

    // Positioning
    // At scroll 0, it's aligned with the right column.
    // As we scroll, it stays in the top-right corner but shrinks.
    const y = useTransform(scrollY, [0, 400], [0, 12]);
    const x = useTransform(scrollY, [0, 400], [0, 12]);

    // Image Cross-fade
    // Transition from original to scrolled profile image
    const opacityOriginal = useTransform(scrollY, [0, 200], [1, 0]);
    const opacityScrolled = useTransform(scrollY, [0, 200], [0, 1]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="fixed inset-x-0 top-0 pointer-events-none z-50 flex justify-center lg:justify-end">
            <div className="max-w-7xl w-full relative h-screen">
                <motion.div
                    onClick={scrollToTop}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        width: size,
                        height: useTransform(size, (s) => s / (aspectRatio.get() || 1)),
                        borderRadius: borderRadius,
                        top: y,
                        right: x,
                        position: 'absolute',
                        opacity: globalOpacity,
                        pointerEvents: pointerEvents,
                    }}
                    className="overflow-hidden border border-white/10 glass dark:glass-dark shadow-2xl mt-24 mr-4 lg:mr-24 lg:mt-32 cursor-pointer group"
                >
                    <motion.img
                        src="/profile.png"
                        alt="Shreyash Srivastava"
                        style={{ opacity: opacityOriginal }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <motion.img
                        src="/profile-scrolled.png"
                        alt="Shreyash Srivastava - Scrolled"
                        style={{ opacity: opacityScrolled }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <motion.div
                        style={{ opacity: useTransform(scrollY, [0, 200], [0.8, 0]) }}
                        className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent pointer-events-none"
                    />
                </motion.div>
            </div>
        </div>
    );
}
