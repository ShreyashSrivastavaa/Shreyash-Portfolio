'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { FileText, Github, ArrowUpRight, ArrowRight, Check, Sparkles, Terminal, Code2, Database, Cpu, ShieldCheck, Plus, Disc, MessageSquare, Compass, Mountain, Music, Play, Pause, SkipBack, SkipForward, Volume2, X } from 'lucide-react'
import skillsData from '@/data/skills.json'
import experienceData from '@/data/experience.json'
import AISimulator from '@/components/sections/about/AISimulator'
import { SoundFX, unlockAudio } from '@/lib/SoundEngine'

const INITIAL_TABS = [
  { id: 'claude', label: 'Claude', icon: '✳', url: 'claude.ai/new' },
  { id: 'chatgpt', label: 'ChatGPT', icon: '🤖', url: 'chatgpt.com' },
  { id: 'about', label: 'about me', icon: '🤠', url: 'shreyash.me/about' },
  { id: 'worklog', label: 'work log', icon: '📁', url: 'shreyash.me/work-log' },
  { id: 'journeys', label: 'travel journeys', icon: '🏔️', url: 'shreyash.me/journeys' },
  { id: 'playlist', label: 'not UR type', icon: '📻', url: 'shreyash.me/playlist' },
  { id: 'gallery', label: 'gallery', icon: '📷', url: 'shreyash.me/gallery' },
  { id: 'scale', label: 'a million rps', icon: '⚡', url: 'shreyash.me/scale' },
]

const EXTRA_TABS_MENU = [
  { id: 'stack', label: 'tech stack', icon: '⚡', desc: 'Technical skills & stack' },
  { id: 'process', label: 'methodology', icon: '⚙️', desc: '4-phase product engineering' },
]

const PLAYLIST_TRACKS = [
  { id: 1, title: 'Humnava Mere', artist: 'Jubin Nautiyal', duration: '3:30', cover: 'https://i.ytimg.com/vi/TmRgK-pXH9c/hqdefault.jpg' },
  { id: 2, title: 'Barbaad (Saiyaara)', artist: 'Jubin Nautiyal & The Rish', duration: '3:30', cover: 'https://i.ytimg.com/vi/0v5eHPfy5Lk/hqdefault.jpg' },
  { id: 3, title: 'Deewaana Deewaana (Tere Ishk Mein)', artist: 'A.R. Rahman', duration: '3:30', cover: 'https://i.ytimg.com/vi/IGti1RTS1wc/hqdefault.jpg' },
  { id: 4, title: 'Kabhi Jo Badal Barse', artist: 'Arijit Singh', duration: '3:30', cover: 'https://i.ytimg.com/vi/RazuWp5kSHk/hqdefault.jpg' },
  { id: 5, title: 'Ehsaas', artist: 'Faheem Abdullah & Vaibhav Pani', duration: '3:30', cover: 'https://i.ytimg.com/vi/EvzNDQLwCqw/hqdefault.jpg' },
  { id: 6, title: 'Majboor', artist: 'Sheheryar Rehan & Zoha Waseem', duration: '3:30', cover: 'https://i.ytimg.com/vi/zaFGQEIcetM/hqdefault.jpg' },
  { id: 7, title: 'Aarzu', artist: 'Noor, Khan & Madhurxo', duration: '3:30', cover: 'https://i.ytimg.com/vi/M5OCLifZK1w/hqdefault.jpg' },
  { id: 8, title: 'Sitaare (Ikkis)', artist: 'Arijit Singh', duration: '3:30', cover: 'https://i.ytimg.com/vi/nDjloeIB3Pc/hqdefault.jpg' },
  { id: 9, title: 'Haareya', artist: 'Arijit Singh & Sachin-Jigar', duration: '3:30', cover: 'https://i.ytimg.com/vi/TyMUY2CDrjc/hqdefault.jpg' },
  { id: 10, title: 'Ishq Mubarak (Tum Bin 2)', artist: 'Arijit Singh', duration: '3:30', cover: 'https://i.ytimg.com/vi/V1oczq_8L0E/hqdefault.jpg' },
  { id: 11, title: 'Mann Mera', artist: 'Gajendra Verma', duration: '3:30', cover: 'https://i.ytimg.com/vi/1onhvVnL8B8/hqdefault.jpg' },
  { id: 12, title: 'Toota Jo Kabhi Tara', artist: 'Atif Aslam & Sumedha K', duration: '3:30', cover: 'https://i.ytimg.com/vi/tGkVxa9rA0U/hqdefault.jpg' },
  { id: 13, title: 'Labon Ko (Bhool Bhulaiyaa)', artist: 'KK & Pritam', duration: '3:30', cover: 'https://i.ytimg.com/vi/-FP2Cmc7zj4/hqdefault.jpg' },
  { id: 14, title: 'Hua Hain Aaj Pehli Baar', artist: 'Armaan Malik & Palak Muchhal', duration: '3:30', cover: 'https://i.ytimg.com/vi/DGVJtAHzzDQ/hqdefault.jpg' },
]

function getTrackYouTubeId(track) {
  if (!track?.cover) return 'TmRgK-pXH9c'
  const match = track.cover.match(/\/vi\/([a-zA-Z0-9_-]+)\//)
  return match ? match[1] : 'TmRgK-pXH9c'
}

const GALLERY_PHOTOS = [
  {
    id: 1,
    title: 'Tea Garden Trails',
    subtitle: 'morning walk under the open Himalayan sky',
    src: '/IMG_2365.jpg',
    position: 'center 20%',
    rotation: '-1.5deg',
  },
  {
    id: 2,
    title: 'Road Trip Chai',
    subtitle: 'highway stops and steaming roadside glasses',
    src: '/IMG-20260410-WA0234.jpg',
    position: 'center 35%',
    rotation: '2deg',
  },
  {
    id: 3,
    title: 'Temple Lights & Festivities',
    subtitle: 'golden lights and night devotion at the temple',
    src: '/IMG_5989.jpg',
    position: 'center',
    rotation: '-1deg',
  },
  {
    id: 4,
    title: 'Snow & Sunsets',
    subtitle: 'crisp mountain breeze and frozen slopes',
    src: '/IMG-20260217-WA0013.jpg',
    position: 'center 15%',
    rotation: '1.5deg',
  },
  {
    id: 5,
    title: 'Misty Valleys',
    subtitle: 'fog rolling through the hills & mountain tops',
    src: '/IMG_2762.jpg',
    position: 'center',
    rotation: '-2deg',
  },
  {
    id: 6,
    title: 'Cozy Evenings',
    subtitle: 'hanging heart lights, evening coffee and calm vibes',
    src: '/IMG-20260416-WA0496.jpg',
    position: 'center 15%',
    rotation: '1.2deg',
  },
  {
    id: 7,
    title: 'Spiti Horizons',
    subtitle: 'crisp mountain air along the high-altitude pass',
    src: '/IMG-20260410-WA0176.jpg',
    position: 'center 20%',
    rotation: '-1.8deg',
  },
  {
    id: 8,
    title: 'Glacial Stream Crossing',
    subtitle: 'clear melting waters and sunlit river stones',
    src: '/IMG-20260410-WA0333.jpg',
    position: 'center 40%',
    rotation: '2.2deg',
  },
  {
    id: 9,
    title: 'Hidden Waterfall',
    subtitle: 'cascading spray deep in the cedar forest',
    src: '/IMG_1994.jpg',
    position: 'center 20%',
    rotation: '-1.2deg',
  },
  {
    id: 10,
    title: 'Dharamshala Mountain Views',
    subtitle: 'Dhauladhar snow range rising behind the stadium',
    src: '/IMG_7276.JPG',
    position: 'center',
    rotation: '1.6deg',
  },
  {
    id: 11,
    title: 'Golden Hilltop View',
    subtitle: 'watching dusk settle over the ridgeline',
    src: '/IMG-20260410-WA0200.jpg',
    position: 'center 25%',
    rotation: '-2deg',
  },
]

export default function About() {
  const containerRef = useRef(null)
  const [tabs, setTabs] = useState(INITIAL_TABS)
  const [activeTab, setActiveTab] = useState('about')
  const [activeFaq, setActiveFaq] = useState('who')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  // Playlist state
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0)
  const [isPlayingSong, setIsPlayingSong] = useState(false)
  const playerRef = useRef(null)
  const isPlayerReadyRef = useRef(false)
  const trackChangedRef = useRef(false)

  // YouTube IFrame API Initialization (Permantly mounted player for in-place pause & resume)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return
      if (playerRef.current) return

      try {
        playerRef.current = new window.YT.Player('yt-audio-streamer-iframe', {
          height: '100',
          width: '100',
          videoId: getTrackYouTubeId(PLAYLIST_TRACKS[0]),
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: () => {
              isPlayerReadyRef.current = true
            },
            onStateChange: (event) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlayingSong(true)
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlayingSong(false)
              } else if (event.data === window.YT.PlayerState.ENDED) {
                // Auto next track
                setCurrentTrackIdx((prev) => (prev + 1) % PLAYLIST_TRACKS.length)
              }
            },
          },
        })
      } catch (err) {
        console.warn('YT player init error:', err)
      }
    }

    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

      const prevReady = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        if (prevReady) prevReady()
        initPlayer()
      }
    } else {
      initPlayer()
    }
  }, [])

  // Sync track index change
  useEffect(() => {
    if (!trackChangedRef.current) {
      trackChangedRef.current = true
      return
    }
    const newVideoId = getTrackYouTubeId(PLAYLIST_TRACKS[currentTrackIdx])
    if (playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
      playerRef.current.loadVideoById(newVideoId)
      setIsPlayingSong(true)
    } else {
      const el = document.getElementById('yt-audio-streamer-iframe')
      if (el && el.contentWindow) {
        el.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'loadVideoById',
            args: [newVideoId],
          }),
          '*'
        )
        setIsPlayingSong(true)
      }
    }
  }, [currentTrackIdx])

  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start center'],
  })

  const browserScale = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [0.96, 1.0]
  )
  const browserY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0px', '0px'] : ['44px', '0px']
  )
  const browserOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [0.6, 0.95, 1.0]
  )

  const handleTabClick = (tabId) => {
    unlockAudio()
    SoundFX.click()
    setActiveTab(tabId)
  }

  const openExtraTab = (item) => {
    unlockAudio()
    SoundFX.pop()
    if (!tabs.find((t) => t.id === item.id)) {
      setTabs((prev) => [
        ...prev,
        {
          id: item.id,
          label: item.label,
          icon: item.icon,
          url: `shreyash.me › ${item.id}`,
        },
      ])
    }
    setActiveTab(item.id)
    setIsMenuOpen(false)
  }

  const closeTab = (e, tabId) => {
    e.stopPropagation()
    unlockAudio()
    SoundFX.pop()
    const newTabs = tabs.filter((t) => t.id !== tabId)
    setTabs(newTabs)
    if (activeTab === tabId) {
      setActiveTab(newTabs[0]?.id || 'about')
    }
  }

  const handleNextTab = () => {
    unlockAudio()
    SoundFX.click()
    const currentIdx = tabs.findIndex((t) => t.id === activeTab)
    const nextIdx = (currentIdx + 1) % tabs.length
    setActiveTab(tabs[nextIdx].id)
  }

  const toggleSongPlay = (e) => {
    e?.stopPropagation()
    unlockAudio()
    SoundFX.clunk()

    if (isPlayingSong) {
      // PAUSE IN PLACE: preserve playback timestamp!
      if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
        playerRef.current.pauseVideo()
      } else {
        const el = document.getElementById('yt-audio-streamer-iframe')
        el?.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
      }
      setIsPlayingSong(false)
    } else {
      // RESUME FROM EXACT CURRENT POSITION!
      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        playerRef.current.playVideo()
      } else {
        const el = document.getElementById('yt-audio-streamer-iframe')
        el?.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
      }
      setIsPlayingSong(true)
    }
  }

  const playTrack = (idx) => {
    unlockAudio()
    SoundFX.click()
    setCurrentTrackIdx(idx)
    setIsPlayingSong(true)
  }

  const nextTrack = (e) => {
    e?.stopPropagation()
    unlockAudio()
    SoundFX.rewind()
    setCurrentTrackIdx((prev) => (prev + 1) % PLAYLIST_TRACKS.length)
  }

  const prevTrack = (e) => {
    e?.stopPropagation()
    unlockAudio()
    SoundFX.rewind()
    setCurrentTrackIdx((prev) => (prev - 1 + PLAYLIST_TRACKS.length) % PLAYLIST_TRACKS.length)
  }

  const currentTabObj = tabs.find((t) => t.id === activeTab) || tabs[0]
  const currentSong = PLAYLIST_TRACKS[currentTrackIdx]

  const faqs = [
    {
      id: 'who',
      question: 'who is shreyash?',
      answer:
        'A backend-focused full-stack developer based in Delhi, India. I specialize in designing deterministic backend architectures, structured data models, and clean client interfaces that solve tangible operational problems.',
    },
    {
      id: 'stack',
      question: 'how do you work across the stack?',
      answer:
        'TypeScript and Next.js on the client; Node.js, Express, and REST APIs on the backend; PostgreSQL, MongoDB, and Prisma for relational persistence; and Docker for reproducible environments. I prioritize strict schema validation and predictable failure modes over bloated abstraction layers.',
    },
    {
      id: 'venture',
      question: 'what is zenith district?',
      answer:
        'Zenith District is my personal software workbench: an independent studio for prototyping tools, testing architectural patterns, and deploying production web utilities.',
    },
    {
      id: 'outside',
      question: 'what drives your work?',
      answer:
        'First-principles systems thinking. Passive tutorials offer diminishing returns; real engineering happens when you design a system, observe where it degrades under load, and refine it until it runs effortlessly.',
    },
  ]

  const resumeUrl = 'https://drive.google.com/file/d/1DdV6JomHJOz0zidCsnwO5KFINzlq4QJO/view?usp=sharing'

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-6 md:px-10 bg-[#f1f0eb] select-none"
      aria-label="About Shreyash Srivastava"
    >
      {/* Permanently mounted YouTube Audio Streamer - preserves exact playback timestamp on pause & resume */}
      <div
        className="absolute -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div id="yt-audio-streamer-iframe" />
      </div>

      <div className="max-w-[1240px] mx-auto">
        
        {/* SECTION HEADER */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#6f7168]">
                03 / ABOUT ME
              </span>
              <span className="font-hand text-lg text-[#0066ff] -rotate-1 hidden sm:inline">
                · context, journeys, music &amp; work
              </span>
            </div>
            <span className="font-mono text-xs text-[#6f7168]">
              DELHI, INDIA
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl sm:text-6xl font-sans font-bold text-[#242620] tracking-tight">
                a little more{' '}
                <span className="font-serif italic font-normal text-[#0066ff]">
                  about me.
                </span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#6f7168] mt-2 max-w-xl">
                "Reliable software is simple, handles failure predictably, and solves concrete operational problems."
              </p>
            </div>

            {/* Handwritten Annotation */}
            <div className="hidden md:flex items-center gap-2 text-[#8e9087] font-hand text-lg -rotate-2 select-none mb-2">
              <span>yes, I have too many tabs open</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="rotate-45 text-[#0066ff]">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* INTERACTIVE BROWSER WINDOW MOCKUP */}
        <motion.div
          style={{
            scale: browserScale,
            y: browserY,
            opacity: browserOpacity,
          }}
          className="w-full bg-[#202124] rounded-2xl overflow-hidden shadow-2xl border border-[#000000]/20 flex flex-col will-change-transform"
        >
          {/* CHROME TABS HEADER */}
          <div className="bg-[#202124] h-11 px-3 sm:px-4 flex items-center justify-between border-b border-[#35363a] gap-2 relative">
            {/* TRAFFIC LIGHT DOTS */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#28c840] inline-block" />
            </div>

            {/* TAB SELECTORS STRIP */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1 flex-1 px-2">
              {/* Dummy reference tabs matching browser feel */}
              <div className="hidden lg:flex items-center gap-1 opacity-50 shrink-0 mr-1 text-[11px] text-[#9aa0a6] select-none">
                <span className="px-2 py-1 rounded bg-[#2a2b2e] flex items-center gap-1 text-[10px] font-sans">
                  <span className="text-pink-400">❖</span> Portf..
                </span>
                <span className="px-2 py-1 rounded bg-[#2a2b2e] flex items-center gap-1 text-[10px] font-sans">
                  <span className="text-blue-400">💳</span> Pay..
                </span>
              </div>

              {/* Claude & ChatGPT interactive tabs */}
              {tabs.filter(t => ['claude', 'chatgpt'].includes(t.id)).map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <div
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg text-xs font-sans transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#35363a] text-[#ffffff] font-medium shadow-sm'
                        : 'text-[#9aa0a6] hover:text-[#e8eaed] hover:bg-[#2c2d30]'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </div>
                )
              })}

              {/* Dummy reference tab: AR gl.. */}
              <div className="hidden xl:flex items-center gap-1 opacity-50 shrink-0 mx-1 text-[11px] text-[#9aa0a6] select-none">
                <span className="px-2 py-1 rounded bg-[#2a2b2e] flex items-center gap-1 text-[10px] font-sans">
                  <span className="text-purple-400">🥽</span> AR gl..
                </span>
              </div>

              {/* Group Pill: shreyash */}
              <span className="inline-block bg-[#0066ff] text-white text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-semibold shrink-0 mx-1 shadow-sm select-none">
                shreyash
              </span>

              {/* Remaining interactive tabs: about me, work log, travel journeys, not UR type, gallery */}
              {tabs.filter(t => !['claude', 'chatgpt'].includes(t.id)).map((tab) => {
                const isActive = activeTab === tab.id
                const isCustom = !INITIAL_TABS.find((t) => t.id === tab.id)
                return (
                  <div
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg text-xs font-sans transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#35363a] text-[#ffffff] font-medium shadow-sm'
                        : 'text-[#9aa0a6] hover:text-[#e8eaed] hover:bg-[#2c2d30]'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="whitespace-nowrap">{tab.label}</span>
                    {isCustom && (
                      <button
                        type="button"
                        onClick={(e) => closeTab(e, tab.id)}
                        className="ml-1 opacity-60 hover:opacity-100 text-[10px] hover:text-red-400 p-0.5"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                )
              })}

              {/* '+' BUTTON TO OPEN EXTRA TABS */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Open a simulated tab"
                  className="w-7 h-7 rounded-full text-[#9aa0a6] hover:text-white hover:bg-[#35363a] flex items-center justify-center transition-colors text-base"
                >
                  +
                </button>

                {/* Extra tabs dropdown */}
                {isMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-[#2c2d30] border border-[#3f4146] rounded-xl shadow-2xl p-1.5 z-50 text-xs">
                    <span className="block px-2.5 py-1 text-[10px] font-mono text-[#9aa0a6] uppercase tracking-wider">
                      Open simulated tab
                    </span>
                    {EXTRA_TABS_MENU.map((extra) => (
                      <button
                        key={extra.id}
                        type="button"
                        onClick={() => openExtraTab(extra)}
                        className="w-full text-left px-2.5 py-2 rounded-lg text-white hover:bg-[#35363a] flex items-center gap-2.5 transition-colors"
                      >
                        <span className="text-sm">{extra.icon}</span>
                        <div>
                          <p className="font-medium text-white">{extra.label}</p>
                          <p className="text-[10px] text-[#9aa0a6]">{extra.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <span className="font-mono text-[11px] text-[#9aa0a6] hidden md:inline shrink-0">
              shreyashsrivastava.in
            </span>
          </div>

          {/* CHROME TOOLBAR / URL BAR */}
          <div className="bg-[#35363a] h-10 px-4 flex items-center justify-between border-b border-[#202124]/40">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-[#9aa0a6] text-xs">
                <span className="cursor-pointer hover:text-white">←</span>
                <span className="cursor-pointer hover:text-white">→</span>
                <span className="cursor-pointer hover:text-white">↻</span>
              </div>

              <div className="bg-[#202124] rounded-full px-3.5 py-1 text-xs font-mono text-[#9aa0a6] flex items-center gap-1.5 truncate min-w-[200px] sm:min-w-[280px]">
                <span className="text-[#28c840] text-xs">🔒</span>
                <span className="text-[#e8eaed]">{currentTabObj.url}</span>
              </div>
            </div>

            {/* Avatar on the right */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20">
                <img src="/profile-2.jpg" alt="Shreyash Srivastava" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* BROWSER VIEWPORT (ECRU CANVAS CONTENT) */}
          <div className="bg-[#f1f0eb] p-6 sm:p-10 min-h-[500px] text-[#242620] relative">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: ABOUT ME (MATCHING SCREENSHOT 2) */}
              {activeTab === 'about' && (
                <motion.div
                  key="about-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col justify-between min-h-[440px]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* LEFT: POLAROID PORTRAIT WITH ROTATION */}
                    <div className="lg:col-span-5 flex flex-col items-center">
                      <div className="bg-[#ffffff] p-3.5 pb-8 shadow-lg border border-[#d3d3c8] rounded-sm -rotate-2 hover:rotate-0 transition-transform duration-300 w-full max-w-[290px]">
                        <div className="relative aspect-[4/5] bg-[#efeee9] overflow-hidden rounded-sm">
                          <img
                            src="/profile-2.jpg"
                            alt="Shreyash Srivastava"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="font-hand text-lg text-[#0066ff] text-center mt-3 tracking-wide">
                          yep, that's me
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        <span className="px-3 py-1 bg-[#ffffff] border border-[#d3d3c8] rounded-full text-xs font-mono text-[#6f7168] shadow-sm">
                          full-stack developer
                        </span>
                        <span className="px-3 py-1 bg-[#ffffff] border border-[#d3d3c8] rounded-full text-xs font-mono text-[#0066ff] shadow-sm">
                          b.tech cse graduate
                        </span>
                      </div>
                    </div>

                    {/* RIGHT: NARRATIVE BIO & IDENTITY */}
                    <div className="lg:col-span-7 flex flex-col space-y-5">
                      <div>
                        <div className="inline-block font-hand text-xl text-[#0066ff] -rotate-2 mb-1">
                          hello, i'm ⤸
                        </div>
                        <h3 className="text-4xl sm:text-6xl font-sans font-bold text-[#242620] tracking-tight leading-none">
                          Shreyash{' '}
                          <span className="font-sans font-bold text-[#242620]">srivastava</span>
                          <span className="text-[#0066ff]">.</span>
                        </h3>
                        <p className="font-sans text-xs text-[#8e9087] font-mono mt-1">
                          Full-Stack Developer &amp; Product Builder · Delhi, India
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-sans text-[#6f7168]">currently building at</span>
                        <span className="inline-flex items-center gap-1.5 font-bold text-[#242620] bg-white border border-[#d3d3c8] px-3 py-1 rounded-full text-xs shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-pulse" />
                          Zenith District
                        </span>
                      </div>

                      <div className="space-y-3 font-sans text-base text-[#3d4039] leading-relaxed">
                        <p>
                          I'm <strong className="font-semibold text-[#242620]">Shreyash Srivastava</strong>. Full-stack engineer and backend architect based in <strong className="font-semibold text-[#242620]">Delhi, India</strong>. I don't build software to pad a repository. I engineer deterministic systems: high-throughput APIs, resilient data structures, and web applications that run fast and never flinch under load.
                        </p>
                        <p>
                          B.Tech in Computer Science from ITS Engineering College with production software internship experience. My focus: low-latency backend architectures, relational data models, and high-precision frontend execution. If a system has state transitions, network bottlenecks, or race conditions, I eliminate them.
                        </p>
                        <p>
                          My goal: engineer high-leverage software architectures and sovereign product engines through <strong className="font-semibold text-[#242620]">Zenith District</strong> that solve complex real-world operational bottlenecks. I don't follow industry hype cycles: I design resilient systems from first principles, eliminate latency and state inconsistencies, and refine every layer until the platform runs with deterministic precision.
                        </p>
                      </div>

                      {/* TRAIT CHIPS */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#d3d3c8] text-xs font-sans text-[#242620] shadow-sm">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>building from delhi</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#d3d3c8] text-xs font-sans text-[#242620] shadow-sm">
                          <span>🌙</span>
                          <span>night owl dev</span>
                        </div>
                        <div
                          onClick={() => handleTabClick('playlist')}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#d3d3c8] hover:border-[#0066ff] text-xs font-sans text-[#242620] shadow-sm cursor-pointer transition-colors"
                        >
                          <span className="text-[#0066ff]">ılı</span>
                          <span>24×7 music on</span>
                          <span className="text-[#0066ff] font-mono text-[10px]">→</span>
                        </div>
                      </div>

                      {/* CONTACT LINE */}
                      <p className="font-mono text-xs text-[#8e9087] pt-1">
                        building from delhi · <a href="mailto:shreyashsr2004@gmail.com" className="text-[#242620] hover:text-[#0066ff] underline">shreyashsr2004@gmail.com</a>
                      </p>

                      {/* QUICK ACTION BUTTONS */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <a
                          href={resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-pill-primary shadow-sm"
                        >
                          <FileText size={14} />
                          <span>resume (pdf)</span>
                        </a>
                        <a
                          href="https://github.com/ShreyashSrivastavaa"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-pill-secondary"
                        >
                          <Github size={14} />
                          <span>github</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM ACTION BUTTON: NEXT TAB */}
                  <div className="flex justify-end pt-8">
                    <button
                      type="button"
                      onClick={() => handleTabClick('worklog')}
                      className="inline-flex items-center gap-2 bg-[#1e1f22] text-[#f1f0eb] hover:bg-black px-4 py-2.5 rounded-full text-xs transition-colors shadow-md"
                    >
                      <span className="font-hand text-sm text-[#9aa0a6]">keep scrolling</span>
                      <span className="font-sans font-semibold">next: work log ↓</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: WORK LOG (MATCHING SCREENSHOT 3) */}
              {activeTab === 'worklog' && (
                <motion.div
                  key="worklog-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col justify-between min-h-[440px]"
                >
                  <div className="space-y-6">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-[#6f7168] block mb-1">
                        WORK LOG
                      </span>
                      <h3 className="text-3xl sm:text-5xl font-sans font-bold text-[#242620] tracking-tight">
                        where I've{' '}
                        <span className="font-serif italic font-normal text-[#0066ff]">
                          been building.
                        </span>
                      </h3>
                    </div>

                    {/* 3 CLEAN ROWS MATCHING SCREENSHOT 3 */}
                    <div className="border-t border-[#d3d3c8] mt-6 divide-y divide-[#d3d3c8]">
                      
                      {/* ROW 01: ZENITH DISTRICT */}
                      <div className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                        <div className="flex items-center gap-4 sm:gap-6">
                          <span className="font-mono text-xs text-[#8e9087]">01</span>
                          <div className="w-10 h-10 rounded-xl bg-[#242620] text-[#0066ff] flex items-center justify-center font-bold text-base shadow-sm">
                            ✦
                          </div>
                          <div>
                            <h4 className="font-sans font-bold text-xl sm:text-2xl text-[#242620] group-hover:text-[#0066ff] transition-colors">
                              Zenith District
                            </h4>
                            <p className="text-xs text-[#6f7168] mt-0.5">
                              Founder &amp; Full-Stack Builder · self-directed venture for shipping digital products
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 self-start sm:self-center pl-10 sm:pl-0">
                          <span className="font-sans text-sm text-[#555852] hidden md:inline">
                            Founder &amp; Builder
                          </span>
                          <span className="bg-[#0066ff] text-white text-[11px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            NOW
                          </span>
                        </div>
                      </div>

                      {/* ROW 02: JBH TECH INNOVATION */}
                      <div className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                        <div className="flex items-center gap-4 sm:gap-6">
                          <span className="font-mono text-xs text-[#8e9087]">02</span>
                          <div className="w-10 h-10 rounded-xl bg-white border border-[#d3d3c8] text-[#242620] flex items-center justify-center font-mono font-bold text-xs shadow-sm">
                            JBH
                          </div>
                          <div>
                            <h4 className="font-sans font-bold text-xl sm:text-2xl text-[#242620] group-hover:text-[#0066ff] transition-colors">
                              JBH Tech Innovation
                            </h4>
                            <p className="text-xs text-[#6f7168] mt-0.5">
                              Software Development Intern · ~6 months shipping frontend modules and backend APIs
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 self-start sm:self-center pl-10 sm:pl-0">
                          <span className="font-sans text-sm text-[#555852] hidden md:inline">
                            Software Intern
                          </span>
                          <span className="bg-[#e2e1db] text-[#555852] text-[11px] font-mono font-medium px-3 py-1 rounded-full uppercase tracking-wider">
                            6 MOS
                          </span>
                        </div>
                      </div>

                      {/* ROW 03: PERSONAL PROJECTS */}
                      <div className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                        <div className="flex items-center gap-4 sm:gap-6">
                          <span className="font-mono text-xs text-[#8e9087]">03</span>
                          <div className="w-10 h-10 rounded-xl bg-white border border-[#d3d3c8] text-[#242620] flex items-center justify-center shadow-sm">
                            <Code2 size={18} className="text-[#242620]" />
                          </div>
                          <div>
                            <h4 className="font-sans font-bold text-xl sm:text-2xl text-[#242620] group-hover:text-[#0066ff] transition-colors">
                              Personal Projects
                            </h4>
                            <p className="text-xs text-[#6f7168] mt-0.5">
                              20+ live web apps built across React, Next.js, Node.js, Express &amp; PostgreSQL
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 self-start sm:self-center pl-10 sm:pl-0">
                          <span className="font-sans text-sm text-[#555852] hidden md:inline">
                            Full-Stack Experiments
                          </span>
                          <span className="bg-[#e2e1db] text-[#555852] text-[11px] font-mono font-medium px-3 py-1 rounded-full uppercase tracking-wider">
                            ONGOING
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* BOTTOM ACTIONS: RESUME + NEXT TAB */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#d3d3c8]/60 mt-4">
                    <div className="flex items-center gap-3 self-start sm:self-center">
                      <span className="font-hand text-lg text-[#0066ff]">
                        the serious bit, in one PDF →
                      </span>
                      <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#1e1f22] text-[#f1f0eb] hover:bg-black px-4 py-2 rounded-full text-xs font-sans font-semibold inline-flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <span>open resume</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTabClick('journeys')}
                      className="self-end inline-flex items-center gap-2 bg-[#1e1f22] text-[#f1f0eb] hover:bg-black px-4 py-2.5 rounded-full text-xs transition-colors shadow-md"
                    >
                      <span className="font-hand text-sm text-[#9aa0a6]">keep scrolling</span>
                      <span className="font-sans font-semibold">next: travel journeys ↓</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: TRAVEL JOURNEYS (MATCHING SCREENSHOT 4) */}
              {activeTab === 'journeys' && (
                <motion.div
                  key="journeys-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col justify-between min-h-[440px]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* LEFT COLUMN: JOURNEYS LIST */}
                    <div className="lg:col-span-5 space-y-6">
                      <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-[#6f7168] block mb-1">
                          TRAVEL LOG · HIMALAYAS
                        </span>
                        <h3 className="text-3xl sm:text-5xl font-sans font-bold text-[#242620] tracking-tight">
                          the hills are{' '}
                          <span className="font-serif italic font-normal text-[#0066ff]">
                            where I reset.
                          </span>
                        </h3>
                      </div>

                      {/* JOURNEYS TIMELINE */}
                      <div className="space-y-4 pt-2">
                        {/* 2022: Spiti Valley */}
                        <div className="pl-4 border-l-2 border-[#0066ff] py-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-xs text-[#8e9087]">2022</span>
                              <h4 className="font-sans font-bold text-lg text-[#242620]">
                                Spiti Valley
                              </h4>
                            </div>
                            <span className="font-hand text-base text-[#0066ff]">solo</span>
                          </div>
                          <p className="font-sans text-xs text-[#6f7168] mt-0.5">
                            Kaza, Chicham Bridge, Key Monastery, thin air &amp; prayer flags
                          </p>
                        </div>

                        {/* 2023: Kasol & Parvati Valley */}
                        <div className="pl-4 border-l-2 border-transparent hover:border-[#d3d3c8] py-1 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-xs text-[#8e9087]">2023</span>
                              <h4 className="font-sans font-bold text-lg text-[#242620]">
                                Kasol &amp; Parvati Valley
                              </h4>
                            </div>
                            <span className="font-hand text-base text-[#0066ff]">with friends</span>
                          </div>
                          <p className="font-sans text-xs text-[#6f7168] mt-0.5">
                            Pine forests, riverside trails, and cold mountain water
                          </p>
                        </div>

                        {/* 2025: Himachal */}
                        <div className="pl-4 border-l-2 border-transparent hover:border-[#d3d3c8] py-1 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="font-mono text-xs text-[#8e9087]">2025</span>
                              <h4 className="font-sans font-bold text-lg text-[#242620]">
                                Himachal
                              </h4>
                            </div>
                            <span className="font-hand text-base text-[#0066ff]">snow trip</span>
                          </div>
                          <p className="font-sans text-xs text-[#6f7168] mt-0.5">
                            Winding passes, dusk tea stalls, and fresh snowfall
                          </p>
                        </div>
                      </div>

                      {/* Handwritten green caption */}
                      <p className="font-hand text-xl text-[#38761d] pt-4 italic">
                        a bike, thin air and the world's highest post office.
                      </p>
                    </div>

                    {/* RIGHT COLUMN: OVERLAPPING POLAROID COLLAGE */}
                    <div className="lg:col-span-7 relative flex items-center justify-center py-6">
                      <div className="relative w-full max-w-[480px] h-[340px]">
                        
                        {/* Polaroid 1: Top Left - Himachal Snow Trip */}
                        <div className="absolute top-0 left-2 w-52 bg-white p-2.5 pb-6 rounded shadow-md border border-[#d3d3c8] -rotate-6 hover:rotate-0 hover:z-20 transition-all duration-300">
                          <div className="aspect-[4/3] bg-zinc-200 overflow-hidden rounded-sm">
                            <img src="/IMG-20260410-WA0176.jpg" alt="Himachal Snow Trip" className="w-full h-full object-cover" />
                          </div>
                          <p className="font-mono text-[10px] text-[#6f7168] text-center mt-2 uppercase tracking-wider">
                            Himachal Snow '25
                          </p>
                        </div>

                        {/* Polaroid 2: Top Right - Waterfall Trek */}
                        <div className="absolute top-2 right-2 w-48 bg-white p-2.5 pb-6 rounded shadow-md border border-[#d3d3c8] rotate-6 hover:rotate-0 hover:z-20 transition-all duration-300">
                          <div className="aspect-[4/3] bg-zinc-200 overflow-hidden rounded-sm">
                            <img src="/IMG_1994.jpg" alt="Waterfall Trek" className="w-full h-full object-cover" />
                          </div>
                          <p className="font-mono text-[10px] text-[#6f7168] text-center mt-2 uppercase tracking-wider">
                            Waterfall Trek
                          </p>
                        </div>

                        {/* Polaroid 3: Bottom Left - Kasol Woods */}
                        <div className="absolute bottom-2 left-10 w-48 bg-white p-2.5 pb-6 rounded shadow-lg border border-[#d3d3c8] -rotate-2 hover:rotate-0 hover:z-20 transition-all duration-300">
                          <div className="aspect-[4/3] bg-zinc-200 overflow-hidden rounded-sm">
                            <img src="/IMG-20260410-WA0333.jpg" alt="Kasol Woods" className="w-full h-full object-cover" />
                          </div>
                          <p className="font-mono text-[10px] text-[#6f7168] text-center mt-2 uppercase tracking-wider">
                            Kasol Woods '23
                          </p>
                        </div>

                        {/* Polaroid 4: Bottom Right - Spiti Valley Peaks */}
                        <div className="absolute bottom-0 right-8 w-52 bg-white p-2.5 pb-6 rounded shadow-lg border border-[#d3d3c8] rotate-3 hover:rotate-0 hover:z-20 transition-all duration-300">
                          <div className="aspect-[4/3] bg-zinc-200 overflow-hidden rounded-sm">
                            <img src="/IMG-20260410-WA0234.jpg" alt="Spiti Valley Peaks" className="w-full h-full object-cover" />
                          </div>
                          <p className="font-mono text-[10px] text-[#6f7168] text-center mt-2 uppercase tracking-wider">
                            Spiti Valley Peaks
                          </p>
                        </div>

                        {/* Overlaid Postmark Stamp */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                          <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#0066ff] flex flex-col items-center justify-center -rotate-12 bg-[#f1f0eb]/70 backdrop-blur-[2px] shadow-sm">
                            <span className="font-mono text-[10px] font-bold text-[#0066ff] tracking-wider">
                              2022
                            </span>
                            <span className="font-mono text-[8px] text-[#0066ff] uppercase tracking-widest">
                              Spiti Valley
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>

                  {/* BOTTOM ACTION BUTTON: NEXT TAB */}
                  <div className="flex justify-end pt-8">
                    <button
                      type="button"
                      onClick={() => handleTabClick('playlist')}
                      className="inline-flex items-center gap-2 bg-[#1e1f22] text-[#f1f0eb] hover:bg-black px-4 py-2.5 rounded-full text-xs transition-colors shadow-md"
                    >
                      <span className="font-hand text-sm text-[#9aa0a6]">keep scrolling</span>
                      <span className="font-sans font-semibold">next: not UR type ↓</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: PLAYLIST · NOT UR TYPE (MATCHING SCREENSHOT 5) */}
              {activeTab === 'playlist' && (
                <motion.div
                  key="playlist-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col justify-between min-h-[440px]"
                >
                  <div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-[#6f7168] block mb-1">
                        PLAYLIST · NOT UR TYPE
                      </span>
                      <h3 className="text-3xl sm:text-5xl font-sans font-bold text-[#242620] tracking-tight">
                        music is how{' '}
                        <span className="font-serif italic font-normal text-[#0066ff]">
                          I get into flow.
                        </span>
                      </h3>
                      <p className="font-sans text-sm text-[#6f7168] mt-1">
                        {PLAYLIST_TRACKS.length} songs from my personal rotation. Tap the cover or any song.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
                      
                      {/* LEFT COLUMN: TRACKS LIST */}
                      <div className="lg:col-span-7 divide-y divide-[#d3d3c8] border-y border-[#d3d3c8] max-h-[360px] overflow-y-auto no-scrollbar pr-1">
                        {PLAYLIST_TRACKS.map((track, idx) => {
                          const isActive = currentTrackIdx === idx
                          return (
                            <div
                              key={track.id}
                              onClick={() => playTrack(idx)}
                              className={`py-2.5 px-3 flex items-center justify-between text-xs sm:text-sm font-sans cursor-pointer transition-colors ${
                                isActive
                                  ? 'bg-white/80 font-semibold text-[#242620] border-l-2 border-[#0066ff]'
                                  : 'text-[#555852] hover:bg-white/40 hover:text-[#242620]'
                              }`}
                            >
                              <div className="flex items-center gap-3 truncate">
                                {isActive ? (
                                  isPlayingSong ? (
                                    <span className="flex items-end gap-0.5 h-3 shrink-0" aria-label="Playing">
                                      <span className="w-0.5 h-2 bg-[#0066ff] rounded-full animate-pulse" />
                                      <span className="w-0.5 h-3 bg-[#0066ff] rounded-full animate-pulse delay-75" />
                                      <span className="w-0.5 h-1.5 bg-[#0066ff] rounded-full animate-pulse delay-150" />
                                    </span>
                                  ) : (
                                    <span className="text-[#0066ff] text-xs">▶</span>
                                  )
                                ) : (
                                  <span className="font-mono text-xs text-[#8e9087]">
                                    {String(idx + 1).padStart(2, '0')}
                                  </span>
                                )}
                                <span className="truncate">{track.title}</span>
                              </div>
                              <span className="text-xs text-[#8e9087] shrink-0 font-normal ml-3">
                                {track.artist}
                              </span>
                            </div>
                          )
                        })}
                      </div>

                      {/* RIGHT COLUMN: SQUIRCLE ALBUM ARTWORK PLAYER */}
                      <div className="lg:col-span-5 flex flex-col items-center">
                        <div
                          onClick={toggleSongPlay}
                          className="group relative w-64 sm:w-72 md:w-80 aspect-square rounded-[32px] overflow-hidden shadow-2xl cursor-pointer border border-black/10 select-none bg-[#181916]"
                        >
                          <img
                            src={currentSong.cover}
                            alt={currentSong.title}
                            className={`w-full h-full object-cover scale-[1.34] transition-transform duration-700 ${
                              isPlayingSong ? 'scale-[1.40]' : 'scale-[1.34] group-hover:scale-[1.38]'
                            }`}
                          />
                          
                          {/* Dark subtle overlay for legibility */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/25 p-6 sm:p-7 flex flex-col justify-between">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-white/90 bg-black/60 backdrop-blur-md self-start px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                              {isPlayingSong && (
                                <span className="flex items-end gap-0.5 h-2">
                                  <span className="w-0.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                  <span className="w-0.5 h-2.5 bg-emerald-400 rounded-full animate-pulse delay-75" />
                                  <span className="w-0.5 h-1 bg-emerald-400 rounded-full animate-pulse delay-150" />
                                </span>
                              )}
                              <span>{isPlayingSong ? 'PLAYING NOW' : 'NOW PLAYING'}</span>
                            </span>

                            <div className="pr-16 pb-1">
                              <p className="font-mono text-[11px] text-white/75 uppercase tracking-wider truncate">
                                {currentSong.artist}
                              </p>
                              <h4 className="font-sans font-bold text-white text-base sm:text-xl leading-snug mt-1 drop-shadow-md line-clamp-2">
                                {currentSong.title}
                              </h4>
                            </div>

                            {/* Floating Big Play Button */}
                            <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white text-[#242620] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                              {isPlayingSong ? (
                                <Pause size={18} fill="#242620" />
                              ) : (
                                <Play size={18} fill="#242620" className="ml-0.5" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* PLAYBACK CONTROLS */}
                        <div className="mt-5 flex items-center gap-4">
                          <button
                            type="button"
                            onClick={prevTrack}
                            aria-label="Previous track"
                            className="w-9 h-9 rounded-full bg-white border border-[#d3d3c8] text-[#242620] flex items-center justify-center hover:border-[#0066ff] hover:scale-105 transition-all shadow-sm"
                          >
                            <SkipBack size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={toggleSongPlay}
                            aria-label={isPlayingSong ? 'Pause' : 'Play'}
                            className="w-11 h-11 rounded-full bg-[#242620] text-white flex items-center justify-center hover:bg-[#0066ff] hover:scale-105 transition-all shadow-md"
                          >
                            {isPlayingSong ? <Pause size={17} /> : <Play size={17} className="ml-0.5" />}
                          </button>
                          <button
                            type="button"
                            onClick={nextTrack}
                            aria-label="Next track"
                            className="w-9 h-9 rounded-full bg-white border border-[#d3d3c8] text-[#242620] flex items-center justify-center hover:border-[#0066ff] hover:scale-105 transition-all shadow-sm"
                          >
                            <SkipForward size={15} />
                          </button>
                        </div>

                        <a
                          href="https://music.youtube.com/playlist?list=PLE7bgzqIqeWI&si=p5W_86Fv2m9OLwKl"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 font-hand text-base text-[#0066ff] hover:underline"
                        >
                          full playlist on YouTube Music ↗
                        </a>
                      </div>

                    </div>
                  </div>

                  {/* BOTTOM ACTION BUTTON: NEXT TAB */}
                  <div className="flex justify-end pt-8">
                    <button
                      type="button"
                      onClick={() => handleTabClick('gallery')}
                      className="inline-flex items-center gap-2 bg-[#1e1f22] text-[#f1f0eb] hover:bg-black px-4 py-2.5 rounded-full text-xs transition-colors shadow-md"
                    >
                      <span className="font-hand text-sm text-[#9aa0a6]">keep scrolling</span>
                      <span className="font-sans font-semibold">next: gallery ↓</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* TAB 5: GALLERY (MATCHING SCREENSHOT 6) */}
              {activeTab === 'gallery' && (
                <motion.div
                  key="gallery-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col justify-between min-h-[440px]"
                >
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
                      <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-[#6f7168] block mb-1">
                          GALLERY
                        </span>
                        <h3 className="text-3xl sm:text-5xl font-sans font-bold text-[#242620] tracking-tight">
                          bits of{' '}
                          <span className="font-serif italic font-normal text-[#0066ff]">
                            everyday.
                          </span>
                        </h3>
                      </div>
                      <span className="font-hand text-lg text-[#0066ff] self-start sm:self-auto">
                        food, fog, friends &amp; the occasional cat. tap one.
                      </span>
                    </div>

                    {/* JUMBLED GALLERY PHOTO PILE */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-6 max-h-[540px] overflow-y-auto no-scrollbar pr-2 pb-4 pt-2">
                      {GALLERY_PHOTOS.map((photo) => (
                        <motion.div
                          key={photo.id}
                          whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
                          style={{ rotate: photo.rotation || '0deg' }}
                          onClick={() => setSelectedPhoto(photo)}
                          className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-white p-1.5 shadow-md hover:shadow-2xl border border-[#d3d3c8] cursor-pointer select-none transition-all duration-300"
                        >
                          <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-100">
                            <img
                              src={photo.src}
                              alt={photo.title}
                              style={{ objectPosition: photo.position || 'center' }}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white">
                              <h5 className="font-sans font-bold text-xs">{photo.title}</h5>
                              <p className="font-sans text-[10px] text-white/80">{photo.subtitle}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* BOTTOM ACTION BUTTON: ADVANCE TO MOUNTAINS OUTRO */}
                  <div className="flex items-center justify-between pt-6 border-t border-[#d3d3c8]/60 mt-4">
                    <span className="font-hand text-sm text-[#6f7168]">
                      tap any snapshot to view large
                    </span>
                    <button
                      type="button"
                      onClick={() => handleTabClick('scale')}
                      className="inline-flex items-center gap-2 bg-[#1e1f22] text-[#f1f0eb] hover:bg-[#0066ff] px-5 py-2.5 rounded-full text-xs font-sans transition-all shadow-md group cursor-pointer"
                    >
                      <span className="font-hand text-sm text-[#9aa0a6] group-hover:text-white transition-colors">that's not all</span>
                      <span className="font-semibold">next: high-throughput ambition ⚡ →</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* TAB 6: SCALE & HIGH THROUGHPUT OUTRO */}
              {(activeTab === 'scale' || activeTab === 'mountains') && (
                <motion.div
                  key="scale-tab"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col justify-between min-h-[500px] select-none text-center py-4"
                >
                  <div className="max-w-2xl mx-auto flex flex-col items-center justify-center pt-4 sm:pt-8">
                    
                    {/* FIRST STAGE: THAT'S ALL FROM MY SIDE (WITH BLURRED FADE) */}
                    <div className="space-y-1 mb-8">
                      <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold text-[#242620] tracking-tight leading-none">
                        that's <span className="text-[#242620]">all</span>{' '}
                        <span className="text-[#8e9087]/50 blur-[2px] hover:blur-none transition-all duration-300 cursor-default">
                          from my side.
                        </span>
                      </h2>
                    </div>

                    {/* SECOND STAGE: NOW BACK TO SHIPPING AT SCALE */}
                    <div className="space-y-3 mb-6">
                      <h3 className="text-3xl sm:text-5xl md:text-6xl font-sans font-bold text-[#242620] tracking-tight leading-tight">
                        now back to <br className="sm:hidden" />
                        <span className="font-serif italic font-normal text-[#0066ff]">
                          shipping at scale.
                        </span>
                      </h3>
                    </div>

                    {/* SYSTEM TELEMETRY PINPOINT */}
                    <div className="flex flex-col items-center space-y-1 mt-2 mb-2">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-[#242620] font-semibold tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span>TARGET : 1,000,000 REQ/SEC · ZERO DOWNTIME</span>
                      </div>
                      <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#8e9087] border-t border-dashed border-[#d3d3c8] pt-1 px-4">
                        HIGH-THROUGHPUT ENGINE : DISTRIBUTED SYSTEMS · P99 SUB-MILLISECOND
                      </div>
                    </div>

                    {/* MINIMALIST ARCHITECTURAL NETWORK WAVEFORM CONTOUR */}
                    <div className="w-full max-w-xl h-36 sm:h-44 relative my-2">
                      <svg
                        viewBox="0 0 600 220"
                        fill="none"
                        className="w-full h-full overflow-visible"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient id="scale-wave-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0066ff" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="#0066ff" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>

                        {/* Shaded waveform area */}
                        <path
                          d="M0 180 C80 180, 140 160, 200 130 C260 100, 290 40, 360 35 C430 30, 480 110, 540 80 L600 60 L600 220 L0 220 Z"
                          fill="url(#scale-wave-grad)"
                        />

                        {/* Background metric grid lines */}
                        <line x1="0" y1="180" x2="600" y2="180" stroke="#d3d3c8" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
                        <line x1="0" y1="110" x2="600" y2="110" stroke="#d3d3c8" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
                        <line x1="0" y1="40" x2="600" y2="40" stroke="#0066ff" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />

                        {/* Telemetry wave line */}
                        <path
                          d="M0 180 C80 180, 140 160, 200 130 C260 100, 290 40, 360 35 C430 30, 480 110, 540 80 L600 60"
                          stroke="#242620"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        {/* Target Peak marker */}
                        <circle cx="360" cy="35" r="5" fill="#0066ff" />
                        <circle cx="360" cy="35" r="10" stroke="#0066ff" strokeWidth="1.5" opacity="0.6" />
                      </svg>
                    </div>

                    {/* WITTY INTERACTIVE DEV STAT PILLS */}
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-2 max-w-lg">
                      <span className="px-3 py-1.5 rounded-full bg-white border border-[#d3d3c8] text-xs font-sans text-[#242620] shadow-sm">
                        ⚡ 99.999% SLA availability
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-white border border-[#d3d3c8] text-xs font-sans text-[#242620] shadow-sm">
                        ☕ black coffee + clean commits
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-white border border-[#d3d3c8] text-xs font-sans text-[#242620] shadow-sm">
                        🛡️ zero unhandled exceptions
                      </span>
                    </div>

                  </div>

                  {/* BOTTOM ACTION BUTTON: LOOP BACK TO ABOUT */}
                  <div className="flex justify-center pt-8 border-t border-[#d3d3c8]/50 mt-6">
                    <button
                      type="button"
                      onClick={() => handleTabClick('about')}
                      className="inline-flex items-center gap-2 bg-[#242620] text-white hover:bg-[#0066ff] px-6 py-3 rounded-full text-xs font-sans font-semibold transition-all shadow-md cursor-pointer hover:scale-105"
                    >
                      <span>that's the entire tour : loop back to about me ↺</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* EXTRA TAB: TECH STACK */}
              {activeTab === 'stack' && (
                <motion.div
                  key="stack-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-sans font-bold text-2xl text-[#242620]">
                      technical expertise &amp; stack.
                    </h3>
                    <p className="font-sans text-sm text-[#6f7168] mt-1">
                      Production technologies across frontend, backend, databases, and deployment.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {skillsData.skillCategories.map((cat) => (
                      <div
                        key={cat.title}
                        className="bg-[#ffffff] border border-[#d3d3c8] rounded-xl p-5 shadow-sm space-y-3"
                      >
                        <span className="font-sans font-bold text-sm text-[#242620]">
                          {cat.title}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.skills.map((s) => (
                            <span
                              key={s}
                              className="font-mono text-xs text-[#242620] bg-[#f1f0eb] px-2.5 py-1 rounded-md border border-[#d3d3c8]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* EXTRA TAB: CLAUDE AI SIMULATOR */}
              {activeTab === 'claude' && (
                <motion.div
                  key="claude-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <AISimulator variant="claude" />
                </motion.div>
              )}

              {/* EXTRA TAB: CHATGPT SIMULATOR */}
              {activeTab === 'chatgpt' && (
                <motion.div
                  key="chatgpt-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <AISimulator variant="chatgpt" />
                </motion.div>
              )}

              {/* EXTRA TAB: METHODOLOGY */}
              {activeTab === 'process' && (
                <motion.div
                  key="process-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-sans font-bold text-2xl text-[#242620]">
                      how I build &amp; ship software.
                    </h3>
                    <p className="font-sans text-sm text-[#6f7168] mt-1">
                      A disciplined four-phase product engineering lifecycle from discovery to iteration.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      {
                        num: '01',
                        title: 'Discovery & Requirements',
                        desc: 'Identify real bottlenecks and concrete problems people face, isolating root requirements before writing code.',
                      },
                      {
                        num: '02',
                        title: 'System Design & Data Modeling',
                        desc: 'Design clean schemas, type-safe REST contracts, and component hierarchies engineered for predictable failure modes.',
                      },
                      {
                        num: '03',
                        title: 'Build & Edge-Case Hardening',
                        desc: 'Implement with JavaScript/TypeScript, validate inputs strictly, and write clean, maintainable logic across the stack.',
                      },
                      {
                        num: '04',
                        title: 'Deployment & Continuous Iteration',
                        desc: 'Ship to production early, test with real user data, and iterate rapidly based on measurable outcomes.',
                      },
                    ].map((step) => (
                      <div
                        key={step.num}
                        className="bg-[#ffffff] border border-[#d3d3c8] rounded-xl p-6 shadow-sm space-y-2"
                      >
                        <span className="font-mono text-xs font-bold text-[#0066ff]">
                          PHASE {step.num}
                        </span>
                        <h4 className="font-sans font-bold text-base text-[#242620]">
                          {step.title}
                        </h4>
                        <p className="font-sans text-xs text-[#6f7168] leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* CHROME FOOTER WITH PROGRESS DOTS & SHORTCUT */}
          <div className="bg-[#202124] h-12 px-5 flex items-center justify-between border-t border-[#35363a]">
            {/* PROGRESS DOTS */}
            <div className="flex items-center gap-1.5">
              {tabs.map((t) => (
                <span
                  key={t.id}
                  onClick={() => handleTabClick(t.id)}
                  className={`h-1.5 rounded-full cursor-pointer transition-all ${
                    activeTab === t.id ? 'w-6 bg-[#0066ff]' : 'w-2 bg-[#5f6368]'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNextTab}
              className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-[#f1f0eb] hover:text-[#0066ff] transition-colors"
            >
              <span>next tab</span>
              <ArrowRight size={13} className="text-[#0066ff]" />
            </button>
          </div>
        </motion.div>

        {/* LIGHTBOX MODAL FOR GALLERY PHOTOS */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center cursor-pointer"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full bg-[#202124] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              >
                <div className="relative aspect-[4/3] bg-black">
                  <img src={selectedPhoto.src} alt={selectedPhoto.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex items-center justify-between text-white">
                  <div>
                    <h4 className="font-sans font-bold text-base">{selectedPhoto.title}</h4>
                    <p className="font-sans text-xs text-white/70">{selectedPhoto.subtitle}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
