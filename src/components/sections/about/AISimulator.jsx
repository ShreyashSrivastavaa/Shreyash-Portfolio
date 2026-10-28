'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { SoundFX, unlockAudio } from '@/lib/SoundEngine'

const PRESET_QUESTIONS = [
  {
    q: 'who is shreyash?',
    a: 'Shreyash Srivastava is a backend-focused full-stack developer based in Delhi, India. With a Computer Science engineering background and software development internship experience, he designs scalable REST APIs, relational schemas, and responsive web applications engineered for deterministic behavior.',
  },
  {
    q: 'what does he actually work on?',
    a: 'Distributed systems and practical web software: client-side WebAssembly computation (I Hate Love PDF), real-time WebSocket state synchronization (ZyMeal), API integrations (GitFC), and relational data modeling with PostgreSQL and Prisma.',
  },
  {
    q: 'designer or developer?',
    a: 'A developer with acute product intelligence. He architects from the database layer upward, ensuring schema integrity and API reliability, while treating the frontend interface as a precise, low-friction control panel for the user.',
  },
  {
    q: "what's he like outside work?",
    a: 'Beyond writing code, he follows cricket and football analytics, explores tactical gaming mechanics, and tests emerging technology stacks and digital product prototypes.',
  },
  {
    q: 'what music is he into?',
    a: "His playlist spans tracks like Humnava Mere, Barbaad, Kabhi Jo Badal Barse, Ehsaas, and Majboor. You can listen directly in the 'not UR type' music tab on this portfolio or open his YouTube Music playlist.",
  },
  {
    q: 'how do I reach him?',
    a: 'Directly via email at shreyashsr2004@gmail.com, on LinkedIn (linkedin.com/in/shreyashsrivastavaa), or across his open-source repositories on GitHub (github.com/ShreyashSrivastavaa).',
  },
]

export default function AISimulator({ variant = 'claude' }) {
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [customInput, setCustomInput] = useState('')
  const scrollRef = useRef(null)

  const isClaude = variant === 'claude'

  // Typewriter streaming effect
  useEffect(() => {
    if (!isTyping) return
    const interval = setInterval(() => {
      setMessages((prev) => {
        const last = prev[prev.length - 1]
        if (!last || last.role !== 'assistant') return prev
        if (last.shown >= last.text.length) {
          setIsTyping(false)
          return prev
        }
        const nextSpace = last.text.indexOf(' ', last.shown + 1)
        const nextIdx = nextSpace === -1 ? last.text.length : nextSpace
        return [
          ...prev.slice(0, -1),
          { ...last, shown: nextIdx },
        ]
      })
    }, 28)

    return () => clearInterval(interval)
  }, [isTyping])

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const askQuestion = (item) => {
    if (isTyping) return
    unlockAudio()
    SoundFX.click()
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: item.q, shown: item.q.length },
      { role: 'assistant', text: item.a, shown: 0 },
    ])
    setIsTyping(true)
  }

  const handleCustomSubmit = (e) => {
    e.preventDefault()
    if (!customInput.trim() || isTyping) return
    unlockAudio()
    SoundFX.click()
    const query = customInput.trim()
    setCustomInput('')

    const matched = PRESET_QUESTIONS.find((p) =>
      query.toLowerCase().includes(p.q.slice(0, 7)) ||
      p.q.toLowerCase().includes(query.toLowerCase())
    ) || {
      a: `Shreyash Srivastava is a full-stack developer and product builder based in Delhi, India. For inquiries, project collaborations, or questions, reach him directly at shreyashsr2004@gmail.com!`,
    }

    setMessages((prev) => [
      ...prev,
      { role: 'user', text: query, shown: query.length },
      { role: 'assistant', text: matched.a, shown: 0 },
    ])
    setIsTyping(true)
  }

  return (
    <div className="w-full flex flex-col justify-between min-h-[480px] max-w-3xl mx-auto px-4 py-4 select-none">
      {/* CHAT / CONTENT AREA */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-5 pb-4 max-h-[360px] no-scrollbar">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center pt-6 sm:pt-10 space-y-4">
            {/* BRAND STAR / LOGO */}
            {isClaude ? (
              <span className="text-3xl text-[#d97757] font-serif select-none">✳</span>
            ) : null}

            {/* HEADLINE */}
            {isClaude ? (
              <h3 className="text-3xl sm:text-5xl font-serif text-[#242620] tracking-tight">
                Evening, curious visitor
              </h3>
            ) : (
              <h3 className="text-3xl sm:text-4xl font-sans font-bold text-[#242620] tracking-tight">
                What would you like to know about Shreyash?
              </h3>
            )}

            {/* SUBTEXT */}
            <p className="font-sans text-xs sm:text-sm text-[#6f7168] max-w-md">
              {isClaude
                ? 'Ask about Shreyash’s engineering background, projects, or work.'
                : 'Select a question below to learn more about Shreyash.'}
            </p>

            {/* QUESTION PILLS MATCHING SCREENSHOT 1 & 2 */}
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl pt-4">
              {PRESET_QUESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => askQuestion(item)}
                  className="px-4 py-2 rounded-full bg-[#ffffff] border border-[#d3d3c8] text-xs font-sans text-[#242620] hover:border-[#0066ff] hover:text-[#0066ff] hover:shadow-sm transition-all cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                >
                  {item.q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  m.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#242620] text-white rounded-br-sm shadow-sm'
                      : 'bg-white border border-[#d3d3c8] text-[#242620] rounded-bl-sm shadow-sm'
                  }`}
                >
                  {m.text.slice(0, m.shown)}
                  {m.role === 'assistant' && m.shown < m.text.length && (
                    <span className="inline-block w-1.5 h-3.5 ml-1 bg-[#0066ff] animate-pulse align-middle" />
                  )}
                </div>
              </div>
            ))}

            {/* Mini pill bar to keep prompting */}
            {!isTyping && (
              <div className="flex flex-wrap gap-1.5 pt-3 justify-center">
                {PRESET_QUESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => askQuestion(item)}
                    className="px-3 py-1 rounded-full bg-white/80 border border-[#d3d3c8] text-[11px] text-[#6f7168] hover:text-[#0066ff] hover:border-[#0066ff] transition-all"
                  >
                    {item.q}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* BOTTOM INPUT BAR MATCHING SCREENSHOT 1 & 2 */}
      <div className="pt-2">
        <form
          onSubmit={handleCustomSubmit}
          className="relative flex items-center w-full bg-white border border-[#d3d3c8] rounded-2xl p-2 sm:p-2.5 shadow-sm focus-within:border-[#0066ff] focus-within:shadow-md transition-all"
        >
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder={isClaude ? 'Reply to Claude...' : 'Ask anything'}
            className="flex-1 bg-transparent px-3 text-xs sm:text-sm font-sans text-[#242620] placeholder-[#8e9087] outline-none"
          />
          <button
            type="submit"
            disabled={!customInput.trim() || isTyping}
            aria-label="Send message"
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              customInput.trim() && !isTyping
                ? 'bg-[#0066ff] text-white hover:bg-[#0052d4] cursor-pointer shadow-sm'
                : isClaude
                ? 'bg-[#0066ff]/20 text-[#0066ff] cursor-default'
                : 'bg-zinc-200 text-zinc-400 cursor-default'
            }`}
          >
            <ArrowUp size={16} strokeWidth={2.5} />
          </button>
        </form>

        <p className="font-hand text-sm text-[#0066ff] text-left mt-2 ml-3 italic select-none">
          pick a question above or ask anything about Shreyash
        </p>
      </div>
    </div>
  )
}
