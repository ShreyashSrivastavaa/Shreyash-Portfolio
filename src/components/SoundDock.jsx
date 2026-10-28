'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  getSoundState,
  subscribeSoundState,
  setSoundEnabled,
  setSoundVolume,
  setSoundStyle,
  unlockAudio,
  SoundFX,
} from '@/lib/SoundEngine'

export default function SoundDock() {
  const [soundState, setSoundState] = useState({
    enabled: true,
    volume: 65,
    style: 'modern',
  })
  const [isOpen, setIsOpen] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const dockRef = useRef(null)

  useEffect(() => {
    setSoundState(getSoundState())
    const unsubscribe = subscribeSoundState(setSoundState)

    // Unlock audio on initial user touch or click
    const handleFirstInteraction = () => {
      unlockAudio()
      window.removeEventListener('pointerdown', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }
    window.addEventListener('pointerdown', handleFirstInteraction)
    window.addEventListener('keydown', handleFirstInteraction)

    // Global touch / click sound listener for every touch on screen
    const handleGlobalTouch = (e) => {
      if (
        e.target.closest('[data-sfx="none"]') ||
        e.target.closest('input') ||
        e.target.closest('textarea') ||
        e.target.closest('select')
      ) {
        return
      }
      unlockAudio()
      SoundFX.touch()
    }
    window.addEventListener('pointerdown', handleGlobalTouch, { passive: true })

    // Close on click outside
    const handleClickOutside = (e) => {
      if (dockRef.current && !dockRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('pointerdown', handleClickOutside)

    // Compact on mobile or deep scroll
    const handleScroll = () => {
      if (window.scrollY > 400 && window.innerWidth < 640) {
        setIsCompact(true)
      } else {
        setIsCompact(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      unsubscribe()
      window.removeEventListener('pointerdown', handleFirstInteraction)
      window.removeEventListener('pointerdown', handleGlobalTouch)
      window.removeEventListener('keydown', handleFirstInteraction)
      document.removeEventListener('pointerdown', handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleSound = () => {
    unlockAudio()
    const next = !soundState.enabled
    setSoundEnabled(next)
    if (next) {
      SoundFX.pop()
    }
  }

  const handlePreview = () => {
    unlockAudio()
    SoundFX.chord()
  }

  return (
    <div
      ref={dockRef}
      className="fixed left-4 sm:left-7 bottom-4 sm:bottom-7 z-[900] select-none"
      data-sfx="none"
    >
      {/* SETTINGS POPUP MODAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-[calc(100%+12px)] left-0 w-[270px] sm:w-[290px] bg-[#f1f0eb] border border-[#d3d3c8] rounded-2xl p-4 shadow-[0_12px_40px_rgba(36,38,32,0.18)] text-[#242620]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#d3d3c8]">
              <h3 className="font-serif text-xl font-normal leading-none">
                sound acoustics
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-[#242620]/5 hover:bg-[#242620]/10 text-xs font-mono transition-colors"
                aria-label="Close sound settings"
              >
                ✕
              </button>
            </div>

            {/* Volume Slider */}
            <div className="py-3">
              <div className="flex items-center justify-between text-xs font-medium font-sans mb-1.5">
                <span>Volume</span>
                <span className="font-mono text-[11px] text-[#6f7168]">
                  {soundState.volume}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={soundState.volume}
                onChange={(e) => setSoundVolume(Number(e.target.value))}
                className="w-full accent-[#0066ff] cursor-pointer h-1.5 bg-[#d3d3c8] rounded-lg appearance-none"
              />
            </div>

            {/* Sound Style Presets */}
            <div className="py-2">
              <span className="block text-xs font-medium font-sans mb-2">
                Acoustic style
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {['modern', 'soft', 'arcade'].map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => {
                      setSoundStyle(style)
                      unlockAudio()
                      SoundFX.touch()
                    }}
                    className={`py-1.5 px-2 text-xs font-sans capitalize rounded-lg border transition-all ${
                      soundState.style === style
                        ? 'border-[#0066ff] bg-[#0066ff]/10 text-[#003bb0] font-semibold'
                        : 'border-[#d3d3c8] bg-white text-[#6f7168] hover:text-[#242620]'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Music Sounds for Every Touch */}
            <div className="py-2.5 border-t border-[#d3d3c8]">
              <div className="flex items-center justify-between text-xs font-medium font-sans mb-1.5">
                <span>Touch music sounds</span>
                <span className="font-mono text-[10px] text-[#0066ff]">3 notes</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: 'Sound 1', note: 'C5 ♫', idx: 0 },
                  { label: 'Sound 2', note: 'E5 ♫', idx: 1 },
                  { label: 'Sound 3', note: 'G5 ♫', idx: 2 },
                ].map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => {
                      unlockAudio()
                      SoundFX.touch(s.idx)
                    }}
                    className="py-1.5 px-2 text-center text-xs font-sans rounded-lg border border-[#d3d3c8] bg-white text-[#242620] hover:border-[#0066ff] hover:text-[#0066ff] active:scale-95 transition-all cursor-pointer shadow-sm"
                  >
                    <span className="block font-medium text-[11px] leading-tight">{s.label}</span>
                    <span className="block font-mono text-[10px] text-[#6f7168]">{s.note}</span>
                  </button>
                ))}
              </div>
              <p className="font-mono text-[10px] text-[#6f7168] mt-1.5 leading-tight">
                Plays on every touch across the screen when sound is on.
              </p>
            </div>

            {/* Footer */}
            <div className="pt-3 mt-2 border-t border-[#d3d3c8] flex items-center justify-between text-[11px] text-[#6f7168]">
              <span>Real-time Web Audio API</span>
              <button
                type="button"
                onClick={handlePreview}
                disabled={!soundState.enabled || soundState.volume === 0}
                className="px-2.5 py-1 rounded-full bg-white border border-[#d3d3c8] text-[#242620] hover:border-[#0066ff] disabled:opacity-40 transition-colors font-sans"
              >
                preview ↗
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DOCK PILL BUTTON */}
      <div className="inline-flex items-center bg-[#f1f0eb]/90 backdrop-blur-md border border-[#242620]/15 rounded-full shadow-[0_3px_12px_rgba(36,38,32,0.1)] text-[#242620] overflow-hidden transition-all">
        {/* Toggle Button */}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={soundState.enabled ? 'Turn sound off' : 'Turn sound on'}
          className={`h-8 px-3 inline-flex items-center gap-2 text-[11px] font-sans font-medium uppercase tracking-wider transition-colors hover:bg-white ${
            soundState.enabled && soundState.volume > 0 ? 'text-[#242620]' : 'text-[#6f7168]'
          }`}
        >
          {/* Animated EQ Bars */}
          <span className="flex items-end gap-[2px] h-3 w-3 shrink-0">
            <span
              className={`w-[2px] rounded-[1px] transition-all ${
                soundState.enabled && soundState.volume > 0
                  ? 'h-3 bg-[#0066ff] animate-[pulse_0.7s_infinite_alternate]'
                  : 'h-1 bg-[#6f7168]'
              }`}
            />
            <span
              className={`w-[2px] rounded-[1px] transition-all ${
                soundState.enabled && soundState.volume > 0
                  ? 'h-2 bg-[#0066ff] animate-[pulse_0.9s_infinite_alternate_0.2s]'
                  : 'h-1 bg-[#6f7168]'
              }`}
            />
            <span
              className={`w-[2px] rounded-[1px] transition-all ${
                soundState.enabled && soundState.volume > 0
                  ? 'h-3 bg-[#0066ff] animate-[pulse_0.6s_infinite_alternate_0.4s]'
                  : 'h-1 bg-[#6f7168]'
              }`}
            />
            <span
              className={`w-[2px] rounded-[1px] transition-all ${
                soundState.enabled && soundState.volume > 0
                  ? 'h-1.5 bg-[#0066ff] animate-[pulse_0.8s_infinite_alternate_0.1s]'
                  : 'h-1 bg-[#6f7168]'
              }`}
            />
          </span>

          {/* Text Label */}
          {!isCompact && (
            <span className="whitespace-nowrap">
              sound {soundState.enabled ? (soundState.volume === 0 ? '0%' : 'on') : 'off'}
            </span>
          )}
        </button>

        {/* Gear / Settings Toggle */}
        <button
          type="button"
          onClick={() => {
            unlockAudio()
            setIsOpen(!isOpen)
            SoundFX.click()
          }}
          aria-label="Customize sound settings"
          aria-expanded={isOpen}
          className="h-8 w-8 flex items-center justify-center border-l border-[#242620]/15 hover:bg-white text-[#6f7168] hover:text-[#242620] transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
