'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { SoundFX, unlockAudio } from '@/lib/SoundEngine'

// Curated playlist inspired by samaymaurya.com "not UR type" Indian indie track list
const TRACKS = [
  { id: '1', title: 'Humara Ho Gaya', artist: 'Osho Jain · feat. Sanchi', duration: '3:24', color: '#c9945a' },
  { id: '2', title: 'Dil Mere', artist: 'The Local Train', duration: '3:48', color: '#3b7a50' },
  { id: '3', title: 'When We Feel Young', artist: 'When Chai Met Toast', duration: '3:15', color: '#2f5bd3' },
  { id: '4', title: 'Pahadon Mein', artist: 'Salman Elahi', duration: '2:56', color: '#0066ff' },
  { id: '5', title: 'Rab Raakha', artist: 'The Yellow Diary', duration: '4:12', color: '#8f5f30' },
  { id: '6', title: 'Gul', artist: 'Anuv Jain', duration: '3:38', color: '#9b59b6' },
  { id: '7', title: 'Roz Roz', artist: 'The Yellow Diary & Shilpa Rao', duration: '3:45', color: '#1abcfe' },
]

export default function VinylPlayer() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const timerRef = useRef(null)

  const currentTrack = TRACKS[currentIdx]

  const togglePlay = () => {
    unlockAudio()
    SoundFX.clunk()
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    unlockAudio()
    SoundFX.rewind()
    setCurrentIdx((prev) => (prev + 1) % TRACKS.length)
    setCurrentTime(0)
  }

  const handlePrev = () => {
    unlockAudio()
    SoundFX.rewind()
    setCurrentIdx((prev) => (prev - 1 + TRACKS.length) % TRACKS.length)
    setCurrentTime(0)
  }

  const selectTrack = (idx) => {
    unlockAudio()
    SoundFX.click()
    setCurrentIdx(idx)
    setCurrentTime(0)
    setIsPlaying(true)
  }

  // Simulated playback time increment
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => (prev + 1) % 210)
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [isPlaying])

  return (
    <div className="w-full max-w-4xl mx-auto py-2">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* LEFT COLUMN: PHYSICAL VINYL TURNTABLE CARD */}
        <div className="md:col-span-6 flex flex-col items-center">
          <div
            onClick={togglePlay}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                togglePlay()
              }
            }}
            aria-label={isPlaying ? `Pause ${currentTrack.title}` : `Play ${currentTrack.title}`}
            className="group relative w-64 sm:w-72 aspect-square bg-[#dcdad3] rounded-[22%] cursor-pointer p-4 shadow-[0_24px_50px_rgba(36,38,32,0.18),0_6px_16px_rgba(36,38,32,0.1),inset_0_1px_rgba(255,255,255,0.7)] hover:-translate-y-1 transition-all select-none"
          >
            {/* VINYL DISC (Slides out & spins when playing) */}
            <motion.div
              initial={false}
              animate={
                isPlaying
                  ? { top: '-32%', left: '14%', width: '72%', height: '72%', borderRadius: '50%' }
                  : { top: '0%', left: '0%', width: '100%', height: '100%', borderRadius: '22%' }
              }
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="absolute bg-[#181818] overflow-hidden shadow-[0_14px_30px_rgba(0,0,0,0.35)]"
            >
              {/* Spinning Disc Surface */}
              <div
                className={`w-full h-full relative ${
                  isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                }`}
              >
                {/* Grooves Texture */}
                <span
                  className="absolute inset-0 rounded-full opacity-60 pointer-events-none"
                  style={{
                    background:
                      'repeating-radial-gradient(circle, transparent 0 3px, rgba(255,255,255,0.06) 3px 4px)',
                  }}
                />

                {/* Center Label Hole */}
                <span
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/4 rounded-full flex items-center justify-center shadow-inner"
                  style={{
                    background: currentTrack.color,
                  }}
                >
                  <span className="w-3 h-3 rounded-full bg-[#f1f0eb] border border-black/30" />
                </span>
              </div>
            </motion.div>

            {/* SLEEVE COVER ART OVERLAY */}
            <motion.div
              animate={{ opacity: isPlaying ? 0 : 1 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 rounded-[22%] bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white pointer-events-none"
            >
              <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest uppercase bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-white/90">
                VINYL EDITION · 33 RPM
              </div>
              <p className="text-xs uppercase font-sans tracking-wider text-white/80 font-medium">
                {currentTrack.artist}
              </p>
              <h4 className="font-serif text-2xl font-normal leading-tight text-white">
                {currentTrack.title}
              </h4>

              {/* Floating Play Icon */}
              <div className="absolute bottom-5 right-5 w-11 h-11 rounded-full bg-white text-[#242620] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Play size={18} fill="#242620" className="ml-0.5" />
              </div>
            </motion.div>
          </div>

          {/* PLAYER CONTROLS UNDER VINYL */}
          <div className="mt-6 flex items-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous track"
              className="w-9 h-9 rounded-full bg-white border border-[#d3d3c8] text-[#242620] flex items-center justify-center hover:border-[#0066ff] transition-colors"
            >
              <SkipBack size={15} />
            </button>
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="w-12 h-12 rounded-full bg-[#242620] text-white flex items-center justify-center hover:bg-[#0066ff] transition-colors shadow-md"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} fill="white" className="ml-0.5" />}
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next track"
              className="w-9 h-9 rounded-full bg-white border border-[#d3d3c8] text-[#242620] flex items-center justify-center hover:border-[#0066ff] transition-colors"
            >
              <SkipForward size={15} />
            </button>
          </div>

          <p className="mt-2 text-xs font-hand text-[#6f7168]">
            {isPlaying ? '♪ needle dropped : spinning now' : 'click sleeve to play'}
          </p>
        </div>

        {/* RIGHT COLUMN: TRACKLIST & NOW PLAYING METRICS */}
        <div className="md:col-span-6 space-y-4">
          <div className="border-b border-[#d3d3c8] pb-3">
            <span className="text-[11px] font-mono tracking-widest text-[#0066ff] uppercase block">
              INDIE SELECTION · 7 TRACKS
            </span>
            <h3 className="font-serif text-3xl font-normal text-[#242620] mt-1">
              not UR type <span className="italic text-[#0066ff]">playlist.</span>
            </h3>
            <p className="text-xs font-sans text-[#6f7168] mt-1">
              Indian indie anthems, mountain road trips, and late-night coding flow.
            </p>
          </div>

          {/* Track List */}
          <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
            {TRACKS.map((t, idx) => {
              const isActive = idx === currentIdx
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => selectTrack(idx)}
                  className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between text-xs transition-all ${
                    isActive
                      ? 'bg-white shadow-sm border-l-4 border-[#0066ff] pl-3'
                      : 'hover:bg-white/60 text-[#6f7168]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-[#a0a0a0] w-4">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className={`font-medium ${isActive ? 'text-[#242620]' : 'text-[#3b3d36]'}`}>
                        {t.title}
                      </p>
                      <p className="text-[11px] text-[#6f7168]">{t.artist}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isActive && isPlaying && (
                      <span className="flex items-end gap-[1px] h-3">
                        <span className="w-0.5 h-3 bg-[#0066ff] animate-[pulse_0.7s_infinite_alternate]" />
                        <span className="w-0.5 h-2 bg-[#0066ff] animate-[pulse_0.9s_infinite_alternate_0.2s]" />
                        <span className="w-0.5 h-2.5 bg-[#0066ff] animate-[pulse_0.6s_infinite_alternate_0.4s]" />
                      </span>
                    )}
                    <span className="font-mono text-[10px] text-[#a0a0a0]">{t.duration}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
