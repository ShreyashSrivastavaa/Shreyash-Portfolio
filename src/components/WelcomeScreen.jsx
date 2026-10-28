'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const GUIDES = [
  { d: 'M20 280H1230', delay: 0.05 }, // Baseline
  { d: 'M60 172H1180', delay: 0.16 }, // X-height
  { d: 'M100 350H950', delay: 0.28 }, // Descender
  { d: 'M140 70V380', delay: 0.2 }, // Vertical left
  { d: 'M660 100V380', delay: 0.32 }, // Vertical middle (descender of y)
  { d: 'M1040 110V400', delay: 0.44 }, // Vertical right
  { d: 'M120 372L750 78', delay: 0.38 }, // Diagonal construction line
]

const SPECS = [
  { x: 22, y: 272, text: 'baseline', delay: 0.5 },
  { x: 62, y: 164, text: 'x-height', delay: 0.6 },
  { x: 102, y: 342, text: 'descender', delay: 0.7 },
]

const LETTERS = ['s', 'h', 'r', 'e', 'y', 'a', 's', 'h']
const EASING_WHOOSH = [0.22, 1, 0.36, 1]

export default function WelcomeScreen() {
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const duration = 2400

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Smooth easeOutQuad progress
      const eased = 1 - Math.pow(1 - progress, 2)
      const current = Math.floor(eased * 100)
      setPercent(current)

      if (progress >= 1) {
        clearInterval(interval)
      }
    }, 24)

    return () => clearInterval(interval)
  }, [])

  const formattedPercent = String(percent).padStart(3, '0') + '%'

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col justify-between pt-8 pb-8 px-8 sm:pt-12 sm:pb-10 sm:px-14 md:px-16 overflow-hidden select-none pointer-events-auto"
      style={{
        backgroundColor: '#0066ff',
        color: '#f1f0eb',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* NOISE PAPER TEXTURE OVERLAY WITH ANIMATED TEXTURE CRAWL */}
      <div
        className="pointer-events-none absolute -inset-[10%] opacity-55 mix-blend-multiply bg-repeat"
        style={{
          backgroundImage: 'url(/assets/noisetexture.jpg)',
          backgroundSize: '620px',
          animation: 'texture-crawl 1.2s steps(5, end) infinite',
        }}
        aria-hidden="true"
      />

      {/* TOP ROW CORNER METADATA */}
      <div className="relative z-10 flex items-start justify-between text-xs sm:text-sm font-medium tracking-[0.16em] uppercase">
        <div className="space-y-1">
          <div className="text-[#f1f0eb] font-semibold">SHREYASH SRIVASTAVA</div>
          <div className="text-[#f1f0eb]/75 text-[11px] sm:text-xs font-normal">
            FROM DELHI TO PRODUCTION
          </div>
        </div>

        <div className="text-right space-y-1">
          <div className="text-[#f1f0eb] font-semibold">VISITOR NO. 01</div>
          <div className="text-[#f1f0eb]/75 text-[11px] sm:text-xs font-normal">
            GLAD YOU DROPPED BY
          </div>
        </div>
      </div>

      {/* CENTER BLUEPRINT ARCHITECTURAL WORDMARK STAGE */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-center py-6 sm:py-10">
        <svg
          className="w-full h-auto max-h-[58vh] overflow-visible"
          viewBox="0 0 1250 420"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* 1. BLUEPRINT GUIDE LINES WITH PATHLENGTH ANIMATION */}
          <g className="stroke-[#f1f0eb] stroke-[1px] [vector-effect:non-scaling-stroke]">
            {GUIDES.map((g, idx) => (
              <motion.path
                key={idx}
                d={g.d}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 1, 0.42] }}
                transition={{
                  pathLength: { duration: 0.9, delay: g.delay, ease: EASING_WHOOSH },
                  opacity: { duration: 2.2, delay: g.delay, times: [0, 0.1, 0.65, 1] },
                }}
              />
            ))}

            {/* Guide Circle for the Orange/Dark Dot */}
            <motion.circle
              cx="1090"
              cy="252"
              r="34"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: EASING_WHOOSH }}
            />
          </g>

          {/* 2. BLUEPRINT SPEC LABELS (X-HEIGHT, BASELINE, DESCENDER) */}
          {SPECS.map((s, idx) => (
            <motion.text
              key={idx}
              x={s.x}
              y={s.y}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0.65] }}
              transition={{ duration: 1.8, delay: s.delay, times: [0, 0.15, 0.7, 1] }}
              className="font-sans uppercase text-[12px] sm:text-[13px] tracking-[0.14em] fill-[#f1f0eb]/80 select-none"
            >
              {s.text}
            </motion.text>
          ))}

          {/* 3. WORDMARK OUTLINE STROKES DRAWING IN FIRST */}
          <motion.text
            x="140"
            y="280"
            initial={{ strokeDashoffset: 1800, opacity: 1 }}
            animate={{ strokeDashoffset: 0, opacity: [1, 1, 0] }}
            transition={{
              strokeDashoffset: { duration: 1.1, delay: 0.45, ease: 'easeInOut' },
              opacity: { duration: 1.85, delay: 0.45, times: [0, 0.8, 1] },
            }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '200px',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              fill: 'none',
              stroke: '#f1f0eb',
              strokeWidth: '1.4px',
              strokeDasharray: '1800',
              vectorEffect: 'non-scaling-stroke',
            }}
          >
            shreyash
          </motion.text>

          {/* 4. LETTERS GETTING FILLED WITH SOLID COLOR ONE BY ONE */}
          <text
            x="140"
            y="280"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '200px',
              fontWeight: 700,
              letterSpacing: '-0.035em',
              fill: '#f1f0eb',
            }}
          >
            {LETTERS.map((letter, idx) => (
              <motion.tspan
                key={idx}
                initial={{ fillOpacity: 0 }}
                animate={{ fillOpacity: 1 }}
                transition={{
                  duration: 0.28,
                  delay: 1.05 + idx * 0.09,
                  ease: 'easeOut',
                }}
              >
                {letter}
              </motion.tspan>
            ))}
          </text>

          {/* 5. SIGNATURE SOLID DOT LANDING WITH SPRING AT THE END */}
          <motion.circle
            cx="1090"
            cy="252"
            r="28"
            fill="#242620"
            initial={{ scale: 0, y: -80 }}
            animate={{ scale: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 420,
              damping: 16,
              delay: 1.85,
            }}
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center',
            }}
          />
        </svg>
      </div>

      {/* BOTTOM ROW: HUGE PERCENT COUNTER & ROLE */}
      <div className="relative z-10 flex items-end justify-between">
        {/* HUGE PERCENT COUNTER */}
        <div
          className="font-sans font-bold text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#f1f0eb] leading-none"
          style={{ fontFeatureSettings: '"tnum" 1' }}
        >
          {formattedPercent}
        </div>

        {/* BOTTOM RIGHT ROLE */}
        <div className="text-right text-xs sm:text-sm font-medium uppercase tracking-[0.14em] text-[#f1f0eb]/90 pb-2">
          FULL-STACK DEVELOPER &amp; FOUNDER
        </div>
      </div>

      {/* TEXTURE CRAWL KEYFRAMES */}
      <style jsx global>{`
        @keyframes texture-crawl {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2%, 1.5%);
          }
          40% {
            transform: translate(1.5%, -2%);
          }
          60% {
            transform: translate(-1%, 2.5%);
          }
          80% {
            transform: translate(2.5%, 0.5%);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </div>
  )
}
