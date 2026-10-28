'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

export default function WorkOutroStage() {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Beat 1: "that's all from my side."
  const beat1Opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.4, 0.5],
    shouldReduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0]
  )
  const beat1Y = useTransform(
    scrollYProgress,
    [0, 0.1, 0.4, 0.5],
    shouldReduceMotion ? ['0px', '0px', '0px', '0px'] : ['30px', '0px', '0px', '-30px']
  )

  // Beat 2: "now back to building."
  const beat2Opacity = useTransform(
    scrollYProgress,
    [0.52, 0.65, 0.9, 1],
    shouldReduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 1]
  )
  const beat2Y = useTransform(
    scrollYProgress,
    [0.52, 0.65, 0.9, 1],
    shouldReduceMotion ? ['0px', '0px', '0px', '0px'] : ['34px', '0px', '0px', '0px']
  )

  return (
    <section
      ref={containerRef}
      suppressHydrationWarning
      className="relative w-full h-[200vh] bg-[#f1f0eb]"
      aria-label="Portfolio sign-off"
    >
      <div
        suppressHydrationWarning
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center px-6 text-center select-none"
      >
        
        {/* BEAT 1 */}
        <motion.div
          style={{ opacity: beat1Opacity, y: beat1Y }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none"
        >
          <p className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#242620] tracking-tight">
            that's all from my side.
          </p>
        </motion.div>

        {/* BEAT 2 */}
        <motion.div
          style={{ opacity: beat2Opacity, y: beat2Y }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none"
        >
          <p className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#242620] tracking-tight">
            now back to{' '}
            <span className="font-serif italic font-normal text-[#0066ff]">
              building.
            </span>
          </p>
          <p className="font-hand text-lg sm:text-2xl text-[#6f7168] mt-4 -rotate-1">
            scroll down to say hey or grab the resume ↓
          </p>
        </motion.div>

      </div>
    </section>
  )
}
