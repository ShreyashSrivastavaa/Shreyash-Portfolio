'use client';

import React from 'react';
import { useScrollPosition } from '../context/scroll-context';

export default function ScrollProgressBar() {
    const { scrollProgress } = useScrollPosition();

    return (
        <div
            className="fixed top-0 left-0 h-[3px] bg-accent z-[9999] transition-all duration-75 linear"
            style={{ width: `${scrollProgress * 100}%` }}
        />
    );
}
