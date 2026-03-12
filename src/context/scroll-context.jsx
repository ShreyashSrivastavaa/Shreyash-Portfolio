'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ScrollContext = createContext({
    scrollY: 0,
    scrollProgress: 0,
    activeSection: '',
});

export const ScrollProvider = ({ children }) => {
    const [scrollY, setScrollY] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('');
    const observer = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? currentScrollY / totalHeight : 0;

            setScrollY(currentScrollY);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        // Intersection Observer for active section
        const options = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Detect section when it's in the middle of the screen
            threshold: 0,
        };

        observer.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, options);

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.current.observe(section));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (observer.current) {
                sections.forEach((section) => observer.current.unobserve(section));
            }
        };
    }, []);

    return (
        <ScrollContext.Provider value={{ scrollY, scrollProgress, activeSection }}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScrollPosition = () => useContext(ScrollContext);
