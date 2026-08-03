'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SMART_RESPONSES = {
  greeting: "Hey there! 👋 Welcome to Shreyash's portfolio. Ask me anything about his projects, skills, or availability!",
  skills: "Shreyash specializes in **Next.js, React, Three.js, TypeScript, Python (FastAPI/Flask), and Node.js/Express**. He also works with MongoDB, PostgreSQL, Docker, and AI integrations.",
  projects: "Shreyash has built several standout projects:\n1. **IHateLovePDF** (ihatelovepdf.com) — A privacy-first, 100% client-side PDF utility suite.\n2. **3D Interactive Portfolios** — Immersive WebGL & Three.js digital experiences.\n3. **Full-Stack SaaS Applications** — High-performance backends with real-time analytics.",
  work: "Shreyash is a Full-Stack & Backend Engineer with 3+ years of experience building modern web apps, scalable microservices, and creative 3D web experiences. Check out his projects above!",
  contact: "You can reach Shreyash directly at **shreyashsr2004@gmail.com** ✉️ or via LinkedIn & GitHub in the Contact section below!",
  price: "Project pricing depends on scope and complexity. Feel free to send details via the contact form or email **shreyashsr2004@gmail.com** for a custom quote!",
  availability: "Shreyash is currently **open for full-time opportunities and freelance projects**! 🚀",
  about: "Shreyash Srivastava is a passionate Full-Stack Engineer and Creative Coder who loves bridging code with design and performance.",
  pdf: "**IHateLovePDF** (https://www.ihatelovepdf.com/) is Shreyash's flagship privacy-focused PDF toolkit. All processing is done locally in your browser with zero server uploads! 📄",
  fallback: "Shreyash is a Full-Stack & Backend Engineer skilled in Next.js, Node.js, Python, and Three.js. You can email him at **shreyashsr2004@gmail.com** or browse his projects below! 🤝",
}

function getSmartReply(message) {
  const msg = message.toLowerCase().trim()

  if (/\b(pdf|ihatelovepdf|compress|merge|convert)\b/.test(msg)) return SMART_RESPONSES.pdf
  if (/\b(project|projects|work|built|made|portfolio|showcase|app|apps)\b/.test(msg)) return SMART_RESPONSES.projects
  if (/\b(skill|skills|tech|stack|know|language|framework|tools)\b/.test(msg)) return SMART_RESPONSES.skills
  if (/\b(contact|hire|email|reach|freelance|touch|mail)\b/.test(msg)) return SMART_RESPONSES.contact
  if (/\b(price|cost|rate|budget|charge|quote)\b/.test(msg)) return SMART_RESPONSES.price
  if (/\b(available|availability|free|busy|schedule|open|hiring)\b/.test(msg)) return SMART_RESPONSES.availability
  if (/\b(about|who|experience|background|bio)\b/.test(msg)) return SMART_RESPONSES.about
  if (/^\b(hi|hello|hey|sup|yo|hola|namaste|greetings)\b/i.test(msg)) return SMART_RESPONSES.greeting

  return SMART_RESPONSES.fallback
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! 👋 I'm Shreyash's AI assistant. Ask me anything about his work, skills, or projects!" },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const handleSend = async () => {
    const text = input.trim()
    if (!text) return

    setMessages((prev) => [...prev, { role: 'user', text }])
    setInput('')
    setTyping(true)

    let reply
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      if (res.ok) {
        const data = await res.json()
        reply = data.reply
      }
    } catch {
      // Backend offline fallback
    }

    if (!reply) reply = getSmartReply(text)

    await new Promise((r) => setTimeout(r, 400 + Math.random() * 300))

    setTyping(false)
    setMessages((prev) => [...prev, { role: 'bot', text: reply }])
  }

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: 32,
          left: 32,
          width: 52,
          height: 52,
          borderRadius: 16,
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid var(--border)',
          backdropFilter: 'blur(12px)',
          color: 'white',
          fontSize: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 600,
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
        aria-label={open ? 'Close chat' : 'Open AI chat'}
      >
        {open ? '✕' : '💬'}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              bottom: 96,
              left: 32,
              width: 360,
              maxWidth: 'calc(100vw - 64px)',
              height: 460,
              maxHeight: 'calc(100vh - 150px)',
              background: 'rgba(12, 12, 12, 0.95)',
              border: '1px solid var(--border)',
              borderRadius: 22,
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 599,
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#06D6A0',
                  boxShadow: '0 0 8px #06D6A0',
                }}
              />
              <span style={{ fontWeight: 600, fontSize: 14 }}>AI Assistant</span>
              <span
                style={{
                  marginLeft: 'auto',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: 'var(--text-muted)',
                }}
              >
                online
              </span>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    padding: '10px 14px',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.role === 'user' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {msg.text}
                </div>
              ))}

              {typing && (
                <div
                  style={{
                    alignSelf: 'flex-start',
                    padding: '10px 16px',
                    borderRadius: '16px 16px 16px 4px',
                    background: 'rgba(255,255,255,0.05)',
                    fontSize: 13,
                    color: 'var(--text-muted)',
                  }}
                >
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    typing...
                  </motion.span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              style={{
                padding: '12px 16px',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                gap: 8,
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about skills, projects..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: '1px solid var(--border)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'white',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                style={{
                  padding: '10px 16px',
                  borderRadius: 12,
                  background: input.trim() ? 'white' : 'rgba(255,255,255,0.08)',
                  color: input.trim() ? 'black' : 'var(--text-muted)',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: input.trim() ? 'pointer' : 'default',
                  transition: 'all 0.2s',
                }}
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
