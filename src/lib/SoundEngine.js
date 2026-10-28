'use client'

/**
 * Web Audio API Sound Synthesizer Engine
 * Faithfully adapted from samaymaurya.com architecture.
 * Synthesizes all UI acoustics in real time : zero external audio files needed.
 */

let audioCtx = null
let masterGain = null
let isAudioUnlocked = false
let isSoundEnabled = true

const SOUND_PRESETS = {
  modern: { pitch: 1.0, length: 1.0, gain: 1.0 },
  soft: { pitch: 0.85, length: 1.2, gain: 0.75 },
  arcade: { pitch: 1.3, length: 0.8, gain: 1.1 },
}

let currentStyle = 'modern'
let currentVolume = 65 // 0 to 100
const listeners = new Set()

export function getSoundState() {
  return {
    enabled: isSoundEnabled,
    volume: currentVolume,
    style: currentStyle,
  }
}

export function subscribeSoundState(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function notifyListeners() {
  const state = getSoundState()
  listeners.forEach((l) => l(state))
}

export function initAudio() {
  if (typeof window === 'undefined') return null
  if (audioCtx) return audioCtx

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return null

    audioCtx = new AudioContextClass()

    masterGain = audioCtx.createGain()
    masterGain.gain.value = isSoundEnabled ? (currentVolume / 100) * 0.45 : 0

    // Dynamics compressor to ensure crisp, gentle audio without clipping
    const compressor = audioCtx.createDynamicsCompressor()
    compressor.threshold.value = -3
    compressor.knee.value = 0
    compressor.ratio.value = 20
    compressor.attack.value = 0.002
    compressor.release.value = 0.1

    masterGain.connect(compressor)
    compressor.connect(audioCtx.destination)
  } catch (err) {
    console.warn('AudioContext initialization failed:', err)
  }

  return audioCtx
}

export function unlockAudio() {
  isAudioUnlocked = true
  const ctx = initAudio()
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }
}

export function setSoundEnabled(enabled) {
  isSoundEnabled = enabled
  if (enabled && currentVolume === 0) {
    currentVolume = 65
  }
  if (masterGain && audioCtx) {
    masterGain.gain.setValueAtTime(
      enabled ? (currentVolume / 100) * 0.45 : 0,
      audioCtx.currentTime
    )
  }
  try {
    localStorage.setItem('portfolio_sound', enabled ? 'on' : 'off')
  } catch {}
  notifyListeners()
}

export function setSoundVolume(volume) {
  currentVolume = Math.max(0, Math.min(100, volume))
  if (masterGain && audioCtx && isSoundEnabled) {
    masterGain.gain.setValueAtTime((currentVolume / 100) * 0.45, audioCtx.currentTime)
  }
  notifyListeners()
}

export function setSoundStyle(style) {
  if (SOUND_PRESETS[style]) {
    currentStyle = style
    notifyListeners()
  }
}

function playTone(freq, { dur = 0.08, gain = 0.03, type = 'sine', to = freq, delay = 0 } = {}) {
  if (!isSoundEnabled || currentVolume === 0 || typeof window === 'undefined') return
  const ctx = initAudio()
  if (!ctx || ctx.state !== 'running' && ctx.state !== 'suspended') return

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }

  const preset = SOUND_PRESETS[currentStyle] || SOUND_PRESETS.modern
  freq *= preset.pitch
  to *= preset.pitch
  dur *= preset.length
  gain *= preset.gain

  const startTime = ctx.currentTime + delay
  const osc = ctx.createOscillator()
  const env = ctx.createGain()

  osc.type = currentStyle === 'arcade' ? 'square' : type
  osc.frequency.setValueAtTime(freq, startTime)
  osc.frequency.exponentialRampToValueAtTime(Math.max(to, 1), startTime + dur)

  env.gain.setValueAtTime(0.0001, startTime)
  env.gain.exponentialRampToValueAtTime(gain, startTime + 0.006)
  env.gain.exponentialRampToValueAtTime(0.0001, startTime + dur)

  osc.connect(env)
  env.connect(masterGain)

  osc.start(startTime)
  osc.stop(startTime + dur + 0.02)
}

export const MUSIC_NOTES = [
  { name: 'Sound 1', note: 'C5', freq: 523.25, harmonic: 1046.5, label: 'Warm Root' },
  { name: 'Sound 2', note: 'E5', freq: 659.25, harmonic: 1318.5, label: 'Melodic Third' },
  { name: 'Sound 3', note: 'G5', freq: 783.99, harmonic: 1568.0, label: 'Sparkle Fifth' },
]

let touchIndex = 0
let lastTouchSoundTime = 0

export function playMusicNote(index = null, { dur = 0.12, gain = 0.038, delay = 0 } = {}) {
  if (!isSoundEnabled || currentVolume === 0 || typeof window === 'undefined') return
  const ctx = initAudio()
  if (!ctx || (ctx.state !== 'running' && ctx.state !== 'suspended')) return
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }

  const noteIdx = typeof index === 'number' ? Math.abs(index) % MUSIC_NOTES.length : touchIndex
  if (typeof index !== 'number') {
    touchIndex = (touchIndex + 1) % MUSIC_NOTES.length
  }

  const selected = MUSIC_NOTES[noteIdx]
  const preset = SOUND_PRESETS[currentStyle] || SOUND_PRESETS.modern
  const freq = selected.freq * preset.pitch
  const harmonicFreq = selected.harmonic * preset.pitch
  const duration = dur * preset.length
  const volumeGain = gain * preset.gain

  const startTime = ctx.currentTime + delay

  // Fundamental note oscillator
  const osc1 = ctx.createOscillator()
  const gainNode1 = ctx.createGain()
  osc1.type = currentStyle === 'arcade' ? 'square' : currentStyle === 'soft' ? 'sine' : 'triangle'
  osc1.frequency.setValueAtTime(freq, startTime)

  gainNode1.gain.setValueAtTime(0.0001, startTime)
  gainNode1.gain.exponentialRampToValueAtTime(volumeGain, startTime + 0.006)
  gainNode1.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

  osc1.connect(gainNode1)
  gainNode1.connect(masterGain)
  osc1.start(startTime)
  osc1.stop(startTime + duration + 0.02)

  // Subtle acoustic overtone for warmth
  if (currentStyle !== 'arcade') {
    const osc2 = ctx.createOscillator()
    const gainNode2 = ctx.createGain()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(harmonicFreq, startTime)

    const overtoneGain = volumeGain * 0.25
    gainNode2.gain.setValueAtTime(0.0001, startTime)
    gainNode2.gain.exponentialRampToValueAtTime(overtoneGain, startTime + 0.004)
    gainNode2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.65)

    osc2.connect(gainNode2)
    gainNode2.connect(masterGain)
    osc2.start(startTime)
    osc2.stop(startTime + duration * 0.65 + 0.02)
  }

  return noteIdx
}

let lastHoverTime = 0
let lastScrollSoundTime = 0

export const SoundFX = {
  touch(soundIndex = null) {
    const now = performance.now()
    if (now - lastTouchSoundTime < 50) return
    lastTouchSoundTime = now
    return playMusicNote(soundIndex)
  },
  chord() {
    playMusicNote(0, { dur: 0.14, gain: 0.035, delay: 0 })
    playMusicNote(1, { dur: 0.14, gain: 0.035, delay: 0.055 })
    playMusicNote(2, { dur: 0.18, gain: 0.04, delay: 0.11 })
  },
  hover() {
    const now = performance.now()
    if (now - lastHoverTime < 160) return
    lastHoverTime = now
    playTone(660, { dur: 0.055, gain: 0.016, type: 'sine' })
  },
  click() {
    const now = performance.now()
    if (now - lastTouchSoundTime < 50) return
    lastTouchSoundTime = now
    return playMusicNote()
  },
  pop() {
    playTone(420, { dur: 0.09, gain: 0.03, type: 'sine', to: 880 })
  },
  clunk() {
    playTone(160, { dur: 0.07, gain: 0.05, type: 'square', to: 70 })
  },
  rewind() {
    playTone(300, { dur: 0.3, gain: 0.008, type: 'sawtooth', to: 900 })
  },
  whoosh() {
    const now = performance.now()
    if (now - lastScrollSoundTime < 1200) return
    lastScrollSoundTime = now
    playTone(392, { dur: 0.24, gain: 0.008, type: 'sine' })
  },
  end() {
    playTone(392, { dur: 0.28, gain: 0.003, type: 'sine' })
    playTone(262, { dur: 0.46, gain: 0.004, type: 'sine', delay: 0.18 })
  },
}
