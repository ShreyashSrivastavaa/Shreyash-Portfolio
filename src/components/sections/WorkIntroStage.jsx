'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import dynamic from 'next/dynamic'

// Dynamic import with SSR disabled for Three.js WebGL canvas
const VRHeadsetCanvas = dynamic(() => import('@/components/3d/VRHeadsetCanvas'), {
  ssr: false,
  loading: () => null,
})

// Progressive blur-reveal line component matching samaymaurya.com
function BlurLine({ children, progress, start, end, className = '' }) {
  const shouldReduceMotion = useReducedMotion()
  const opacity = useTransform(progress, [start, end], shouldReduceMotion ? [1, 1] : [0.12, 1])
  const blurVal = useTransform(progress, [start, end], shouldReduceMotion ? [0, 0] : [14, 0])
  const filter = useTransform(blurVal, (v) => `blur(${v}px)`)
  const y = useTransform(progress, [start, end], shouldReduceMotion ? ['0px', '0px'] : ['14px', '0px'])

  return (
    <motion.div
      style={{ opacity, filter, y }}
      className={`will-change-[filter,opacity,transform] ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function WorkIntroStage() {
  const containerRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const [modelProgress, setModelProgress] = useState(0)

  // Synchronize 3D model: starts as Beat 2 clears (scroll 0.58 to 0.95)
  useEffect(() => {
    const update = (latest) => {
      const mapped = Math.max(0, Math.min(1, (latest - 0.59) / 0.36))
      setModelProgress(mapped)
    }
    if (scrollYProgress) {
      update(scrollYProgress.get())
    }
    return scrollYProgress.on('change', update)
  }, [scrollYProgress])

  // Overall Stage Exits & Opacities
  // Beat 1: "welcome to my" & "work section."
  const beat1ExitOpacity = useTransform(scrollYProgress, [0.26, 0.32], [1, 0])
  const beat1ExitY = useTransform(scrollYProgress, [0.26, 0.32], ['0px', '-35px'])
  const beat1ExitBlur = useTransform(scrollYProgress, [0.26, 0.32], ['blur(0px)', 'blur(12px)'])

  // Beat 2: "but first —" & "put these on." (Completely separate from VR glasses!)
  const beat2ContainerOpacity = useTransform(scrollYProgress, [0.32, 0.36, 0.52, 0.58], [0, 1, 1, 0])
  const beat2ContainerY = useTransform(scrollYProgress, [0.32, 0.36, 0.52, 0.58], ['30px', '0px', '0px', '-35px'])
  const beat2ExitBlur = useTransform(scrollYProgress, [0.52, 0.58], ['blur(0px)', 'blur(12px)'])

  // Underline drawing for "work section."
  const underlinePathLength = useTransform(scrollYProgress, [0.14, 0.22], [0, 1])

  // Scroll hint opacity
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05, 0.12], [1, 1, 0])

  // 3D VR Glasses Canvas: ENTERS AT 0.58, STAYS SOLID & PROMINENT ACROSS VAST SCROLL RANGE
  const modelOpacity = useTransform(scrollYProgress, [0.57, 0.63, 0.96, 0.99], [0, 1, 1, 0])

  // Beat 3: "let's go look inside." (Placed at the bottom, away from glasses!)
  const beat3Opacity = useTransform(scrollYProgress, [0.74, 0.80, 0.91, 0.95], shouldReduceMotion ? [0, 0, 0, 0] : [0, 1, 1, 0])
  const beat3Blur = useTransform(scrollYProgress, [0.74, 0.80], ['blur(10px)', 'blur(0px)'])

  // Expanding Dark Iris Transition into Void (#141212)
  const irisScale = useTransform(scrollYProgress, [0.93, 0.99], shouldReduceMotion ? [0, 0] : [0, 5])

  return (
    <section
      ref={containerRef}
      suppressHydrationWarning
      className="relative w-full h-[560vh] bg-[#f1f0eb]"
      aria-label="Introduction to featured work"
    >
      {/* STICKY 100VH STAGE */}
      <div
        suppressHydrationWarning
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center px-6 text-center select-none"
      >
        
        {/* BEAT 1: "welcome to my work section." WITH PROGRESSIVE BLUR REVEAL */}
        <motion.div
          style={{
            opacity: beat1ExitOpacity,
            y: beat1ExitY,
            filter: beat1ExitBlur,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none z-10 space-y-2 sm:space-y-4"
        >
          {/* Line 1: "welcome to my" (de-blurs on scroll 0.02 -> 0.15) */}
          <BlurLine
            progress={scrollYProgress}
            start={0.02}
            end={0.15}
            className="flex items-center justify-center"
          >
            <h2 className="font-sans font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#242620] tracking-tight leading-[0.95]">
              welcome to my
            </h2>
          </BlurLine>

          {/* Line 2: "work section." (de-blurs on scroll 0.15 -> 0.28) */}
          <BlurLine
            progress={scrollYProgress}
            start={0.15}
            end={0.28}
            className="relative flex flex-col items-center justify-center"
          >
            <h2 className="font-serif italic font-normal text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#0066ff] tracking-tight leading-[0.95]">
              work section.
            </h2>

            {/* Hand-drawn accent underline */}
            <div className="mt-4 sm:mt-6 w-[240px] sm:w-[380px] md:w-[460px] h-4">
              <svg
                viewBox="0 0 400 20"
                fill="none"
                className="w-full h-full text-[#0066ff]"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M4 14 Q 80 4, 160 12 T 320 8 T 396 14"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{ pathLength: underlinePathLength }}
                />
              </svg>
            </div>
          </BlurLine>
        </motion.div>

        {/* BEAT 2: "but first... put these on." */}
        <motion.div
          style={{
            opacity: beat2ContainerOpacity,
            y: beat2ContainerY,
            filter: beat2ExitBlur,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-none z-10 space-y-2 sm:space-y-4"
        >
          {/* Line 1: "but first..." */}
          <BlurLine
            progress={scrollYProgress}
            start={0.34}
            end={0.43}
            className="flex items-center justify-center"
          >
            <p className="font-sans font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#242620] tracking-tight leading-[0.95]">
              but first...
            </p>
          </BlurLine>

          {/* Line 2: "put these on." (de-blurs on scroll 0.42 -> 0.51) */}
          <BlurLine
            progress={scrollYProgress}
            start={0.42}
            end={0.51}
            className="flex items-center justify-center"
          >
            <p className="font-sans font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#242620] tracking-tight leading-[0.95]">
              put these on.
            </p>
          </BlurLine>
        </motion.div>

        {/* 3D WHITE VR HEADSET: RISES ONLY AFTER TEXT HAS CLEARED! */}
        {!shouldReduceMotion && (
          <motion.div
            style={{ opacity: modelOpacity }}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          >
            <div className="w-full h-full max-w-[1200px] max-h-[800px] flex items-center justify-center">
              <VRHeadsetCanvas progress={modelProgress} />
            </div>
          </motion.div>
        )}

        {/* BEAT 3: "let's go look inside." (AT BOTTOM OF VIEWPORT, UNDER THE GLASSES!) */}
        <motion.p
          style={{
            opacity: beat3Opacity,
            filter: beat3Blur,
          }}
          className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 font-sans text-xl sm:text-2xl text-[#6f7168] pointer-events-none z-20"
        >
          let's go look inside.
        </motion.p>

        {/* SCROLL HINT */}
        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-hand text-lg sm:text-xl text-[#6f7168] flex items-center gap-1.5 pointer-events-none z-10"
        >
          <span>keep scrolling</span>
          <span className="inline-block animate-bounce text-[#0066ff]">↓</span>
        </motion.p>

        {/* BEAT 4: EXPANDING DARK IRIS ENGULFING VIEWPORT INTO #141212 */}
        <motion.div
          data-progress-iris
          aria-hidden="true"
          style={{ scale: irisScale }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmax] h-[60vmax] rounded-full bg-[#141212] z-30"
        />

        {/* BOTTOM RIGHT: SKIP TO WORK → (Matching Screenshot 1) */}
        <a
          href="#portfolio"
          className="absolute bottom-8 right-6 sm:right-10 z-20 font-mono text-[11px] uppercase tracking-wider text-[#6f7168] underline decoration-[#d3d3c8] underline-offset-4 transition-colors hover:text-[#242620]"
        >
          SKIP TO WORK →
        </a>


      </div>
    </section>
  )
}
