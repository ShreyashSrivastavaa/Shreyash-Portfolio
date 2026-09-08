'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SMART_RESPONSES = {
  greeting: "Hey there! 👋 Welcome to Shreyash's portfolio. Ask me anything about his work, skills, or availability!",
  skills: "Shreyash specializes in Node.js, Express, NestJS, PostgreSQL, Prisma ORM, Redis, RabbitMQ, Docker, Next.js, and TypeScript.",
  projects: "Shreyash has built several active projects:\n1. IHateLovePDF (ihatelovepdf.com): In-browser PDF utility suite with zero server uploads.\n2. HMS: Hospital workflow and clinical record management platform.\n3. ZyMeal (zymeal.vercel.app): Real-time food ordering app with live order tracking.\n4. GitFC (gitfc.vercel.app): EA FC style GitHub developer card generator.\n5. SwipeRide: Ride-sharing backend with geospatial driver matching.",
  work: "Shreyash completed a 6-month Backend SDE Internship at JBH Tech Innovation and is a B.Tech CSE student at ITS Engineering College (AKTU), graduating in 2026.",
  contact: "You can reach Shreyash directly at shreyashsr2004@gmail.com ✉️ or upscaletechsolution@gmail.com, or via LinkedIn & GitHub in the Contact section below!",
  price: "Project pricing depends on scope and complexity. Feel free to send details via the contact form or email shreyashsr2004@gmail.com for a custom quote!",
  availability: "Shreyash is currently open for full-time Backend SDE roles, internships, and freelance projects! 🚀",
  about: "Shreyash Srivastava is a Backend Software Engineer and former SDE Intern at JBH Tech Innovation (6 Months). He is pursuing B.Tech CSE at ITS Engineering College (AKTU), graduating in 2026.",
  pdf: "IHateLovePDF (https://www.ihatelovepdf.com/) is Shreyash's flagship privacy-focused PDF toolkit. All processing is done locally in your browser with zero server uploads! 📄",
  fallback: "Shreyash is a Backend SDE & Full-Stack Engineer skilled in Node.js, Express, NestJS, PostgreSQL, Prisma, Redis, RabbitMQ, and Docker. You can email him at shreyashsr2004@gmail.com or browse his projects below! 🤝",
}

function cleanText(text) {
  if (!text) return ''
  return text.replace(/\*\*/g, '').replace(/\*/g, '')
}

function getSmartReply(message) {
  const msg = message.toLowerCase().trim()

  if (/\b(pdf|ihatelovepdf|compress|merge|convert)\b/.test(msg)) return SMART_RESPONSES.pdf
  if (/\b(project|projects|work|built|made|portfolio|showcase|app|apps|gitfc|swiperide|quickbite)\b/.test(msg)) return SMART_RESPONSES.projects
  if (/\b(skill|skills|tech|stack|know|language|framework|tools|backend|node|postgres|redis|docker)\b/.test(msg)) return SMART_RESPONSES.skills
  if (/\b(contact|hire|email|reach|freelance|touch|mail)\b/.test(msg)) return SMART_RESPONSES.contact
  if (/\b(price|cost|rate|budget|charge|quote)\b/.test(msg)) return SMART_RESPONSES.price
  if (/\b(available|availability|free|busy|schedule|open|hiring|job|role)\b/.test(msg)) return SMART_RESPONSES.availability
  if (/\b(about|who|experience|background|bio|education|college|aktu)\b/.test(msg)) return SMART_RESPONSES.about
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
      // Backend fallback
    }

    if (!reply) reply = getSmartReply(text)

    await new Promise((r) => setTimeout(r, 300 + Math.random() * 200))

    setTyping(false)
    setMessages((prev) => [...prev, { role: 'bot', text: cleanText(reply) }])
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
          background: 'rgba(230, 57, 70, 0.15)',
          border: '1px solid rgba(230, 57, 70, 0.4)',
          backdropFilter: 'blur(12px)',
          color: 'var(--accent-red)',
          fontSize: 22,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 600,
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(230,57,70,0.2)',
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
              background: 'rgba(5, 5, 8, 0.96)',
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
                  background: 'var(--accent-red)',
                  boxShadow: '0 0 8px var(--accent-red)',
                }}
              />
              <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-sand)', fontFamily: 'var(--font-heading)' }}>
                AI Assistant
              </span>
              <span
                style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--font-mono)',
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
                    background: msg.role === 'user' ? 'rgba(230, 57, 70, 0.2)' : 'rgba(255,255,255,0.04)',
                    border: msg.role === 'user' ? '1px solid rgba(230, 57, 70, 0.4)' : '1px solid rgba(255,255,255,0.06)',
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: msg.role === 'user' ? '#FFFFFF' : 'var(--text-secondary)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {cleanText(msg.text)}
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
                  color: 'var(--text-sand)',
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
                  background: input.trim() ? 'linear-gradient(135deg, var(--accent-red), var(--accent-crimson))' : 'rgba(255,255,255,0.08)',
                  color: input.trim() ? '#FFFFFF' : 'var(--text-muted)',
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
