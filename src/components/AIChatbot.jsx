'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SMART_RESPONSES = {
  greeting: "Hey there! 👋 Welcome to Shreyash's portfolio. Ask me about his work, skills, or availability!",
  skills: "Shreyash specializes in **Next.js, Three.js, TypeScript, Python, and AI/ML**. He's also experienced with Node.js, MongoDB, Docker, and WebAssembly.",
  projects: "His flagship project is **IHateLovePDF** — a privacy-first PDF toolkit at ihatelovepdf.com. He's also built immersive 3D portfolios and AI developer tools.",
  contact: "Shreyash is currently accepting new projects! 🎯 Use the Contact section below or email shreyash.srivastava.dev@gmail.com.",
  price: "Pricing depends on project scope and timeline. Reach out via the contact form for a custom quote! 💰",
  availability: "Shreyash is **available for new projects** and typically responds within 24 hours. 📅",
  about: "Shreyash is a Full-Stack Developer & Creative Coder who builds immersive digital experiences. 3+ years shipping production apps.",
  pdf: "**IHateLovePDF** runs 100% client-side — no server uploads, unlimited file size, and blazing fast. Try it at ihatelovepdf.com! 📄",
  fallback: "Great question! I'd recommend checking the relevant section on the portfolio, or reach out through the contact form. Shreyash would love to chat! 🤝",
}

function getSmartReply(message) {
  const msg = message.toLowerCase()
  if (/^(hi|hello|hey|sup|yo|hola|namaste)/.test(msg)) return SMART_RESPONSES.greeting
  if (/skill|tech|stack|know|language/.test(msg)) return SMART_RESPONSES.skills
  if (/project|work|portfolio|built|made/.test(msg)) return SMART_RESPONSES.projects
  if (/contact|hire|email|reach|freelance/.test(msg)) return SMART_RESPONSES.contact
  if (/price|cost|rate|budget|charge|how much/.test(msg)) return SMART_RESPONSES.price
  if (/available|free|busy|schedule|when/.test(msg)) return SMART_RESPONSES.availability
  if (/about|who|tell me/.test(msg)) return SMART_RESPONSES.about
  if (/pdf|ihatelovepdf|compress|merge/.test(msg)) return SMART_RESPONSES.pdf
  return SMART_RESPONSES.fallback
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! 👋 I'm Shreyash's AI assistant. Ask me anything about his work!" },
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

    // Try backend first, fall back to local
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
      // Backend not available — use local
    }

    if (!reply) reply = getSmartReply(text)

    // Simulate typing delay
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400))

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
