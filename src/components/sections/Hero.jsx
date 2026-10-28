'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion'
import Image from 'next/image'

const NAME_LETTERS = ['s', 'h', 'r', 'e', 'y', 'a', 's', 'h']
const CAT_PHRASES = [
  'meow',
  'mrrp?',
  'prrr',
  'hey that tickles!',
  'boop',
  'comfy here',
  'the y is home btw',
  'curious visitor!',
]

export default function Hero({ showApp }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const heroRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  // CAT POSITIONING ON LETTERS
  const letterRefs = useRef([])
  const nameWrapperRef = useRef(null)
  const [catTargetIdx, setCatTargetIdx] = useState(4) // default to 'y' (index 4)
  const [catX, setCatX] = useState(0)
  const [catSpeech, setCatSpeech] = useState('i live in the y btw')
  const [isJumping, setIsJumping] = useState(false)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const rawBgY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0px', '0px'] : ['0px', '90px'])
  const rawTextY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0px', '0px'] : ['0px', '-32px'])
  const rawPolaroidsY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0px', '0px'] : ['0px', '-56px'])

  const bgY = useSpring(rawBgY, { stiffness: 120, damping: 24 })
  const textY = useSpring(rawTextY, { stiffness: 120, damping: 24 })
  const polaroidsY = useSpring(rawPolaroidsY, { stiffness: 120, damping: 24 })

  // Function to move cat to letter index immediately
  const moveToLetter = (idx) => {
    if (idx < 0 || idx >= NAME_LETTERS.length) return
    const targetEl = letterRefs.current[idx]
    const wrapperEl = nameWrapperRef.current
    if (targetEl && wrapperEl) {
      const targetRect = targetEl.getBoundingClientRect()
      const wrapperRect = wrapperEl.getBoundingClientRect()
      if (targetRect.width > 0) {
        const offsetLeft = targetRect.left - wrapperRect.left + targetRect.width / 2 - 20
        setCatX(offsetLeft)
      }
    }
    setCatTargetIdx(idx)
    setIsJumping(true)
    const phrase =
      idx === 4
        ? 'home sweet y'
        : idx === 5
        ? 'the a is comfier'
        : CAT_PHRASES[Math.floor(Math.random() * CAT_PHRASES.length)]
    setCatSpeech(phrase)
    setTimeout(() => setIsJumping(false), 380)
  }

  // Update cat position relative to letter index on mount and resize
  useEffect(() => {
    const updateCatPosition = () => {
      const targetEl = letterRefs.current[catTargetIdx]
      const wrapperEl = nameWrapperRef.current
      if (targetEl && wrapperEl) {
        const targetRect = targetEl.getBoundingClientRect()
        const wrapperRect = wrapperEl.getBoundingClientRect()
        if (targetRect.width > 0) {
          const offsetLeft = targetRect.left - wrapperRect.left + targetRect.width / 2 - 20
          setCatX(offsetLeft)
        }
      }
    }

    updateCatPosition()
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(updateCatPosition)
    }
    const timer = setTimeout(updateCatPosition, 100)
    const timer2 = setTimeout(updateCatPosition, 500)
    window.addEventListener('resize', updateCatPosition)
    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
      window.removeEventListener('resize', updateCatPosition)
    }
  }, [catTargetIdx])

  // GLIDE TRACKING ACROSS NAME LETTERS
  const handleNameMouseMove = (e) => {
    let closestIdx = -1
    let minDistance = Infinity
    letterRefs.current.forEach((el, idx) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      if (e.clientX >= r.left && e.clientX <= r.right) {
        closestIdx = idx
      } else {
        const center = (r.left + r.right) / 2
        const dist = Math.abs(e.clientX - center)
        if (dist < minDistance) {
          minDistance = dist
          closestIdx = idx
        }
      }
    })
    if (closestIdx !== -1 && closestIdx !== catTargetIdx) {
      moveToLetter(closestIdx)
    }
  }

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full min-h-[calc(100vh-80px)] flex flex-col justify-between pt-6 pb-12 px-6 sm:px-12 md:px-16 overflow-hidden select-none"
    >
      {/* PERSISTENT LIGHT WATERMARK MOUNTAIN BACKGROUND (MATCHING SAMAYMAURYA.COM HERO) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <motion.div style={{ y: bgY }} className="relative w-full h-full">
          <Image
            src="/assets/mountain-bg.png"
            alt="Mountain ridge watermark background"
            fill
            priority
            className="object-cover object-top mix-blend-multiply filter grayscale contrast-[0.95] brightness-[1.18] opacity-[0.22]"
          />
          {/* Subtle gradient wash to melt seamlessly into #f1f0eb at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f1f0eb]/30 to-[#f1f0eb]" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-[1340px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        {/* LEFT COLUMN: HERO TYPOGRAPHY & MANIFESTO */}
        <motion.div style={{ y: textY }} className="lg:col-span-7 flex flex-col space-y-6 pt-4">
          {/* TOP TAG */}
          <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.14em] text-[#6f7168]">
            FULL-STACK DEVELOPER · PRODUCT BUILDER · FOUNDER
          </div>

          {/* HEY, I'M + WAVY UNDERLINE */}
          <div className="relative inline-block w-fit">
            <span className="font-serif italic font-normal text-4xl sm:text-5xl md:text-6xl text-[#242620]">
              hey, I'm
            </span>
            <div className="mt-1">
              <svg className="w-24 sm:w-28 h-3 text-[#0066ff]" viewBox="0 0 110 12" fill="none">
                <path
                  d="M2 6 Q 14 0, 26 6 T 50 6 T 74 6 T 98 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* MASSIVE NAME + INTERACTIVE HOPPING CAT MASCOT + ELECTRIC ARC PERIOD */}
          <div
            ref={nameWrapperRef}
            onMouseMove={handleNameMouseMove}
            onPointerMove={handleNameMouseMove}
            className="relative flex items-baseline py-2 cursor-pointer"
          >
            <div className="text-6xl sm:text-8xl md:text-9xl font-sans font-bold tracking-tight text-[#242620] leading-none flex items-baseline">
              {NAME_LETTERS.map((letter, idx) => (
                <span
                  key={idx}
                  id={`hero-letter-${idx}`}
                  ref={(el) => (letterRefs.current[idx] = el)}
                  onMouseEnter={() => moveToLetter(idx)}
                  onPointerEnter={() => moveToLetter(idx)}
                  onClick={() => moveToLetter(idx)}
                  className={`relative cursor-pointer transition-colors duration-150 inline-block px-1 select-none ${
                    catTargetIdx === idx ? 'text-[#0066ff]' : 'hover:text-[#0066ff]'
                  }`}
                >
                  {letter}
                </span>
              ))}

              {/* THE SIGNATURE ARC BLUE PERIOD WITH INTERACTIVE SMILE */}
              <span
                id="hero-arc-dot"
                onMouseEnter={() => {
                  setIsJumping(true)
                  setCatSpeech("that's my favorite dot!")
                  setTimeout(() => setIsJumping(false), 380)
                }}
                className="group relative w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full bg-[#0066ff] inline-flex items-center justify-center ml-1 sm:ml-2 mb-1 sm:mb-2 transition-transform duration-200 hover:scale-110 hover:-rotate-12 cursor-pointer shadow-sm"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#ffffff] opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <circle cx="8" cy="9" r="1.3" fill="currentColor" />
                  <circle cx="16" cy="9" r="1.3" fill="currentColor" />
                  <path d="M7 14 Q 12 18, 17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </div>

            {/* CUTE CAT MASCOT JUMPING ACROSS LETTERS ON HOVER */}
            <motion.div
              animate={{
                x: catX,
                y: isJumping ? -22 : 0,
                rotate: isJumping ? (catTargetIdx % 2 === 0 ? 8 : -8) : 0,
                scale: isJumping ? 1.08 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 340,
                damping: 24,
                mass: 0.8,
              }}
              onMouseEnter={() => {
                const otherIndices = [0, 1, 2, 3, 4, 5, 6, 7].filter((i) => i !== catTargetIdx)
                const nextIdx = otherIndices[Math.floor(Math.random() * otherIndices.length)]
                moveToLetter(nextIdx)
              }}
              onClick={() => {
                const nextIdx = (catTargetIdx + 1) % NAME_LETTERS.length
                moveToLetter(nextIdx)
              }}
              className="absolute -top-8 sm:-top-10 left-0 flex flex-col items-center cursor-pointer z-30 group select-none"
              title="Click or hover me!"
            >
              <span className="font-hand text-xs sm:text-sm text-[#0066ff] font-semibold -mb-1 whitespace-nowrap bg-[#ffffff]/90 px-1.5 py-0.5 rounded shadow-xs border border-[#0066ff]/20 group-hover:scale-105 transition-transform">
                {catSpeech}
              </span>
              <svg className="w-9 h-9 sm:w-10 sm:h-10 text-[#0066ff] drop-shadow-xs" viewBox="0 0 40 40" fill="none">
                {/* Cat Body */}
                <ellipse cx="20" cy="24" rx="12" ry="11" fill="#f7d0b5" stroke="#242620" strokeWidth="1.2" />
                {/* Ears */}
                <polygon points="11,15 15,8 18,14" fill="#f7d0b5" stroke="#242620" strokeWidth="1.2" />
                <polygon points="22,14 25,8 29,15" fill="#f7d0b5" stroke="#242620" strokeWidth="1.2" />
                {/* Inner Ears */}
                <polygon points="12,14 15,10 17,14" fill="#60a5fa" opacity="0.6" />
                <polygon points="23,14 25,10 28,14" fill="#60a5fa" opacity="0.6" />
                {/* Eyes */}
                <circle cx="16" cy="22" r="1.5" fill="#242620" />
                <circle cx="24" cy="22" r="1.5" fill="#242620" />
                {/* Eye Sparkles */}
                <circle cx="15.5" cy="21.5" r="0.5" fill="#ffffff" />
                <circle cx="23.5" cy="21.5" r="0.5" fill="#ffffff" />
                {/* Nose & Mouth */}
                <polygon points="20,24 18.5,25.5 21.5,25.5" fill="#0066ff" />
                <path d="M18.5 25.5 Q 17 27, 16 26" stroke="#242620" strokeWidth="1" fill="none" strokeLinecap="round" />
                <path d="M21.5 25.5 Q 23 27, 24 26" stroke="#242620" strokeWidth="1" fill="none" strokeLinecap="round" />
                {/* Cheeks */}
                <circle cx="13" cy="24" r="1.5" fill="#60a5fa" opacity="0.6" />
                <circle cx="27" cy="24" r="1.5" fill="#60a5fa" opacity="0.6" />
                {/* Whiskers */}
                <line x1="12" y1="23" x2="6" y2="22" stroke="#242620" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="12" y1="25" x2="6" y2="26" stroke="#242620" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="28" y1="23" x2="34" y2="22" stroke="#242620" strokeWidth="0.8" strokeLinecap="round" />
                <line x1="28" y1="25" x2="34" y2="26" stroke="#242620" strokeWidth="0.8" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>

          {/* LOWER MANIFESTO STATEMENT */}
          <div className="pt-6 sm:pt-8 space-y-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal text-[#242620] tracking-tight leading-[1.14]">
              I engineer systems{' '}
              <span className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-[#242620]">
                that never flinch.
              </span>
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#6f7168] pt-2 max-w-lg leading-relaxed">
              I'm <strong className="text-[#242620] font-medium">Shreyash Srivastava</strong>, a full-stack engineer and systems architect based in Delhi, India. I build high-throughput web applications, resilient backend architectures, and clean interfaces designed to execute with zero friction.
            </p>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: 3 OVERLAPPING POLAROID PHOTOS */}
        <motion.div style={{ y: polaroidsY }} className="lg:col-span-5 relative flex items-center justify-center lg:justify-end pr-4 sm:pr-8 py-8">
          <div className="relative w-full max-w-[380px] sm:max-w-[420px] h-[360px] sm:h-[400px]">
            {/* POLAROID 1 */}
            <motion.div
              whileHover={{ rotate: -2, scale: 1.05, zIndex: 30 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="absolute top-2 left-2 sm:left-4 w-[190px] sm:w-[220px] bg-[#ffffff] p-2.5 pb-7 shadow-md border border-[#d3d3c8] rounded-sm -rotate-6 z-10 cursor-pointer"
            >
              <div className="relative aspect-square w-full bg-[#efeee9] overflow-hidden">
                <Image
                  src="/assets/landningpageshreyashpic1.jpeg"
                  alt="Shreyash working"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-serif italic text-xs text-[#242620] mt-2 text-center">
                turning architecture sketches into running code.
              </p>
            </motion.div>

            {/* POLAROID 2 */}
            <motion.div
              whileHover={{ rotate: 1, scale: 1.05, zIndex: 30 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="absolute top-10 right-2 sm:right-4 w-[190px] sm:w-[220px] bg-[#ffffff] p-2.5 pb-7 shadow-lg border border-[#d3d3c8] rounded-sm rotate-4 z-20 cursor-pointer"
            >
              <div className="relative aspect-square w-full bg-[#efeee9] overflow-hidden">
                <Image
                  src="/assets/landningpageshreyashpic2.png"
                  alt="Delhi, India roots"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-serif italic text-xs text-[#242620] mt-2 text-center">
                delhi, india · building systems from the ground up.
              </p>
            </motion.div>

            {/* HAND-DRAWN ANNOTATION WITH ARROW */}
            <div className="absolute -bottom-2 left-16 sm:left-24 font-hand text-xl text-[#242620] -rotate-3 flex items-center gap-1.5 z-20 pointer-events-none">
              <svg className="w-8 h-8 text-[#0066ff]" viewBox="0 0 32 32" fill="none">
                <path
                  d="M6 24 C 12 16, 20 18, 26 8 M 20 8 L 26 8 L 26 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>that's me</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FOOTER BAR OF HERO */}
      <div className="relative z-10 max-w-[1340px] w-full mx-auto border-t border-[#d3d3c8] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] animate-pulse" />
          <span className="font-mono text-xs text-[#6f7168]">
            AVAILABLE FOR PRODUCT COLLABORATIONS &amp; SDE ROLES
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono text-[#6f7168]">
          <span>FOUNDER @ ZENITH DISTRICT</span>
          <span>·</span>
          <span>B.TECH CSE GRADUATE</span>
        </div>
      </div>
    </section>
  )
}
