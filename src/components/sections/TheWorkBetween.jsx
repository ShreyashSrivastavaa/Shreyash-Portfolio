'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function TheWorkBetween() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Dynamic parallax rise: mountain rises from depth as user scrolls down
  const mountainY = useTransform(scrollYProgress, [0.05, 0.65], ['22%', '-4%'])
  const mountainScale = useTransform(scrollYProgress, [0.05, 0.65], [1.15, 1.0])
  const mountainOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0.15, 1])
  const clipProgress = useTransform(
    scrollYProgress,
    [0.05, 0.45],
    ['inset(30% 0% 0% 0%)', 'inset(0% 0% 0% 0%)']
  )

  return (
    <section
      ref={containerRef}
      suppressHydrationWarning
      className="relative w-full bg-[#141212] pt-20 sm:pt-28 overflow-hidden select-none"
      aria-label="The work between the case studies"
    >
      {/* ── HEADER CONTENT ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3 sm:space-y-4"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-bold text-[#f1f0eb] tracking-tight leading-[1.05]">
            the work between <br />
            the{' '}
            <span className="font-serif italic font-normal text-[#0066ff]">
              case studies.
            </span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#a0a0a0] tracking-wide font-normal max-w-xl mx-auto">
            prototypes, interface mechanics &amp; raw experiments.
          </p>
        </motion.div>
      </div>

      {/* ── SCROLL-DRIVEN MONOCHROME PANORAMIC MOUNTAIN RIDGE ── */}
      <div className="relative w-full overflow-hidden mt-8 sm:mt-12 pointer-events-none">
        <motion.div
          style={{
            y: mountainY,
            scale: mountainScale,
            opacity: mountainOpacity,
            clipPath: clipProgress,
            willChange: 'transform, opacity, clip-path',
          }}
          className="w-full"
        >
          <img
            src="/assets/mountain-ridge.jpg"
            alt="High contrast panoramic alpine mountain ridge"
            className="w-full h-auto min-h-[280px] max-h-[560px] object-cover object-top block"
          />
        </motion.div>

        {/* Seamless bottom fade into light cream #f1f0eb */}
        <div className="absolute inset-x-0 bottom-0 h-28 sm:h-44 bg-gradient-to-t from-[#f1f0eb] via-[#f1f0eb]/75 to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
