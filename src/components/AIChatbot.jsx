'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send } from 'lucide-react'

const SMART_RESPONSES = {
  greeting: "Welcome. I'm Shreyash's portfolio intelligence interface. Query me on his system architecture, technical stack, production projects, or availability.",
  skills: "Shreyash's engineering stack:\n• Languages: JavaScript, TypeScript, Java, SQL, HTML, CSS\n• Frontend: React.js, Next.js, Tailwind CSS\n• Backend: Node.js, Express.js, Next.js Route Handlers, REST APIs\n• Databases & ORM: PostgreSQL, MongoDB, Prisma ORM\n• Tools & Infra: Docker, Redis, Nginx, Git, GitHub, Postman, Vercel\n• Engineering: Low-latency API integration, JWT authentication, and Zod schema validation.",
  projects: "Core production systems engineered by Shreyash:\n1. I Hate Love PDF (https://www.ihatelovepdf.com/) : In-browser document manipulation engine with PDF conversion, compression, and client-side OCR.\n2. DiyaVerse (https://diyaverse.vercel.app/) : Interactive virtual diya platform and synchronized global community canvas.\n3. GitFC (https://gitfc.vercel.app/) : Algorithmic developer trading card engine powered by GitHub commit telemetry.\n4. ZyMeal (https://zymeal.vercel.app/) : Automated institutional cafeteria ordering and workflow orchestration.\n5. SwipeRide (https://swipe-ride.vercel.app/) : Real-time mobility dispatch and ride-sharing prototype.\n6. Nexus : Multi-depot supply chain tracking architecture and vendor SLA monitoring.\n7. Zenith District : Digital engineering lab shipping custom web platforms and software tools.\n8. SaveTheSystem (https://savethesystem.site/) : Interactive distributed outage and incident response simulator.",
  work: "Shreyash Srivastava is a full-stack engineer and backend systems architect based in Delhi, India. He holds a B.Tech in Computer Science from ITS Engineering College and brings production software engineering experience.",
  contact: "Direct contact channel: shreyashsr2004@gmail.com. Verified professional networks: LinkedIn (linkedin.com/in/shreyashsrivastavaa) and GitHub (github.com/ShreyashSrivastavaa).",
  availability: "Shreyash is currently open for full-stack development roles, backend engineering opportunities, and product collaborations.",
  about: "Shreyash Srivastava is a full-stack developer and product builder based in Delhi, India. He combines practical engineering skills with product-oriented thinking to turn ideas into functional, dependable web applications.",
  outside: "Outside of engineering, Shreyash follows cricket and football, enjoys gaming, and spends time exploring new digital product concepts.",
  music: "Shreyash's current playlist features tracks like Humnava Mere, Barbaad, Kabhi Jo Badal Barse, Ehsaas, and Majboor. You can listen right on the portfolio in the 'not UR type' tab or check his YouTube Music playlist (https://music.youtube.com/playlist?list=PLE7bgzqIqeWI&si=p5W_86Fv2m9OLwKl).",
  role: "He positions himself primarily as a developer with a strong interest in product thinking and user experience, caring equally about robust code architecture and how intuitive the software is for real users.",
  pdf: "I Hate Love PDF (https://www.ihatelovepdf.com/) is a client-side document toolkit featuring PDF processing, conversion, compression, and OCR running locally in the browser.",
  fallback: "Shreyash Srivastava is a full-stack developer and product builder based in Delhi, India. Feel free to explore his projects or send an email to shreyashsr2004@gmail.com.",
}

function getSmartReply(message) {
  const msg = message.toLowerCase().trim()

  if (/\b(pdf|ihatelovepdf|compress|merge|convert|ocr)\b/.test(msg)) return SMART_RESPONSES.pdf
  if (/\b(project|projects|work|built|made|portfolio|showcase|app|apps|gitfc|zymeal|nexus|diyaverse|savethesystem)\b/.test(msg)) return SMART_RESPONSES.projects
  if (/\b(skill|skills|tech|stack|know|language|framework|tools|backend|node|postgres|prisma|docker|react|next|typescript|sql)\b/.test(msg)) return SMART_RESPONSES.skills
  if (/\b(contact|hire|email|reach|freelance|touch|mail|linkedin|github)\b/.test(msg)) return SMART_RESPONSES.contact
  if (/\b(available|availability|free|busy|schedule|open|hiring|job|role)\b/.test(msg)) return SMART_RESPONSES.availability
  if (/\b(outside|hobby|hobbies|free time|cricket|football|gaming|interests)\b/.test(msg)) return SMART_RESPONSES.outside
  if (/\b(music|song|songs|spotify|playlist|listen)\b/.test(msg)) return SMART_RESPONSES.music
  if (/\b(designer|developer|design)\b/.test(msg)) return SMART_RESPONSES.role
  if (/\b(about|who|experience|background|bio|education|college|aktu|zenith|jbh|internship)\b/.test(msg)) return SMART_RESPONSES.work
  if (/^\b(hi|hello|hey|sup|yo|greetings)\b/i.test(msg)) return SMART_RESPONSES.greeting

  return SMART_RESPONSES.fallback
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hey! I'm Shreyash's portfolio assistant. Ask me anything about his projects, tech stack, or what he's working on." },
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

    setTimeout(() => {
      const reply = getSmartReply(text)
      setMessages((prev) => [...prev, { role: 'bot', text: reply }])
      setTyping(false)
    }, 400)
  }

  return (
    <>
      {/* ARCHITECTURAL FAB BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          bottom: 28,
          left: 28,
          padding: '10px 16px',
          background: '#ffffff',
          border: '1px solid #000000',
          color: '#000000',
          fontSize: 12,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          cursor: 'pointer',
          zIndex: 600,
          boxShadow: 'none',
        }}
        aria-label={open ? 'Close assistant' : 'Open system assistant'}
      >
        {open ? <X size={14} /> : <MessageSquare size={14} />}
        <span>{open ? 'CLOSE [ × ]' : 'ASSISTANT [ + ]'}</span>
      </button>

      {/* ARCHITECTURAL CHAT PANEL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              bottom: 84,
              left: 28,
              width: 380,
              maxWidth: 'calc(100vw - 56px)',
              height: 480,
              maxHeight: 'calc(100vh - 120px)',
              background: '#ffffff',
              border: '1px solid #000000',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 599,
              boxShadow: 'none',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid #000000',
                background: '#f4ede6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, background: '#001060', display: 'inline-block' }} />
                <span style={{ fontSize: 11, fontWeight: 600, fontFamily: "'Inter', sans-serif", letterSpacing: '0.08em', textTransform: 'uppercase', color: '#000000' }}>
                  SYSTEM ASSISTANT
                </span>
              </div>
              <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: '#55524e' }}>
                ACTIVE
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
                gap: 12,
                background: '#f4ede6',
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '88%',
                    padding: '10px 12px',
                    background: msg.role === 'user' ? '#000000' : '#ffffff',
                    color: msg.role === 'user' ? '#ffffff' : '#000000',
                    border: '1px solid #000000',
                    fontSize: 12,
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.6,
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
                    padding: '8px 12px',
                    background: '#ffffff',
                    border: '1px solid #000000',
                    fontSize: 11,
                    fontFamily: "'DM Mono', monospace",
                    color: '#55524e',
                  }}
                >
                  TYPING...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div
              style={{
                padding: '12px 14px',
                borderTop: '1px solid #000000',
                background: '#ffffff',
                display: 'flex',
                gap: 8,
              }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about projects, stack, experience..."
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  border: '1px solid #000000',
                  background: '#ffffff',
                  color: '#000000',
                  fontSize: 12,
                  fontFamily: "'Inter', sans-serif",
                  outline: 'none',
                }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                style={{
                  padding: '8px 14px',
                  background: input.trim() ? '#000000' : '#cccccc',
                  color: '#ffffff',
                  border: '1px solid #000000',
                  fontSize: 11,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  cursor: input.trim() ? 'pointer' : 'default',
                }}
              >
                <Send size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
