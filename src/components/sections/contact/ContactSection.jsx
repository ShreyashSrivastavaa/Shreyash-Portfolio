'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Mail, Github, Linkedin, Send, Copy, Check, ExternalLink, ArrowUpRight, MessageSquare, Clock, Globe } from 'lucide-react'
import Swal from 'sweetalert2'

const socialLinks = [
  {
    icon: <Github size={16} />,
    label: 'GitHub',
    sub: '@ShreyashSrivastavaa',
    href: 'https://github.com/ShreyashSrivastavaa',
    color: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.1)',
    hoverBorder: 'rgba(255,255,255,0.25)',
  },
  {
    icon: <Linkedin size={16} />,
    label: 'LinkedIn',
    sub: 'shreyashsrivastavaa',
    href: 'https://www.linkedin.com/in/shreyashsrivastavaa',
    color: 'rgba(10,102,194,0.12)',
    borderColor: 'rgba(10,102,194,0.25)',
    hoverBorder: 'rgba(10,102,194,0.5)',
  },
  {
    icon: <ExternalLink size={16} />,
    label: 'IHateLovePDF',
    sub: 'ihatelovepdf.com',
    href: 'https://www.ihatelovepdf.com/',
    color: 'rgba(230,57,70,0.1)',
    borderColor: 'rgba(230,57,70,0.25)',
    hoverBorder: 'rgba(230,57,70,0.55)',
    red: true,
  },
]

const quickFacts = [
  { icon: <Clock size={14} />, label: 'Response time', value: '< 24 hours' },
  { icon: <Globe size={14} />, label: 'Timezone', value: 'IST (UTC +5:30)' },
  { icon: <MessageSquare size={14} />, label: 'Open to', value: 'Freelance & Full-time' },
]

export default function ContactSection() {
  const [copied, setCopied] = useState(false)
  const [focused, setFocused] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const emailAddress = 'shreyashsr2004@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      Swal.fire({
        title: 'Missing Fields',
        text: 'Please fill out all fields.',
        icon: 'error',
        background: '#0c0c10',
        color: '#f0ece8',
        confirmButtonColor: '#e63946',
        customClass: { confirmButton: 'swal-btn' },
      })
      return
    }

    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)

    Swal.fire({
      title: '🚀 Message Sent!',
      text: "I'll get back to you within 24 hours.",
      icon: 'success',
      background: '#0c0c10',
      color: '#f0ece8',
      confirmButtonColor: '#e63946',
      customClass: { confirmButton: 'swal-btn' },
    })

    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 0 80px',
      }}
    >
      {/* Section watermark */}
      <span className="section-watermark" aria-hidden="true" style={{ opacity: 0.6 }}>
        CONTACT
      </span>

      {/* Ambient glow orbs */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(230,57,70,0.07) 0%, transparent 70%)',
        filter: 'blur(80px)', transform: 'translateX(-50%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '-100px',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(193,18,31,0.08) 0%, transparent 70%)',
        filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <div
        style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: 1200,
          margin: '0 auto', padding: '0 clamp(24px, 6vw, 80px)',
        }}
      >
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: 'var(--accent-red)', letterSpacing: '0.25em',
            textTransform: 'uppercase', display: 'block', marginBottom: 16,
          }}>
            GET IN TOUCH
          </span>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 800, lineHeight: 1.0,
            letterSpacing: '-0.02em', marginBottom: 20,
          }}>
            <span style={{ color: 'var(--text-sand)' }}>Let's Build</span>
            <br />
            <span style={{
              color: 'transparent',
              WebkitTextStroke: '2px rgba(255,255,255,0.7)',
            }}>
              Something Great
            </span>
          </h2>

          <p style={{
            color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.75,
            maxWidth: 500, margin: '0 auto',
          }}>
            Have a project, an idea, or just want to connect?
            I'm always open to meaningful conversations.
          </p>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(280px, 35%, 400px) 1fr',
          gap: 24, alignItems: 'start',
        }}>
          {/* LEFT — INFO CARD */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {/* Email card */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 22, padding: '24px',
              backdropFilter: 'blur(20px)',
            }}>
              <div style={{
                fontSize: 11, fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)', letterSpacing: '0.15em',
                textTransform: 'uppercase', marginBottom: 16,
              }}>
                Direct Contact
              </div>

              {/* Email row */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'rgba(230,57,70,0.06)',
                border: '1px solid rgba(230,57,70,0.18)',
                borderRadius: 14, marginBottom: 16,
                gap: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, overflow: 'hidden' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(230,57,70,0.14)',
                    border: '1px solid rgba(230,57,70,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, color: 'var(--accent-red)',
                  }}>
                    <Mail size={15} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 12,
                    color: 'var(--text-sand)', overflow: 'hidden',
                    textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {emailAddress}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                  onClick={copyEmail}
                  style={{
                    padding: '8px 10px', borderRadius: 10, cursor: 'pointer',
                    background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.07)',
                    border: `1px solid ${copied ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.12)'}`,
                    flexShrink: 0, transition: 'var(--transition)', outline: 'none',
                    color: copied ? '#4ade80' : 'var(--text-secondary)',
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </motion.button>
              </div>

              {/* Quick facts */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {quickFacts.map((fact, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 10,
                  }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      color: 'var(--text-muted)', fontSize: 12,
                    }}>
                      {fact.icon}
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{fact.label}</span>
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--text-sand)', fontWeight: 600 }}>
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 22, padding: '24px',
              backdropFilter: 'blur(20px)',
            }}>
              <div style={{
                fontSize: 11, fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)', letterSpacing: '0.15em',
                textTransform: 'uppercase', marginBottom: 16,
              }}>
                Find Me Online
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      background: link.color,
                      border: `1px solid ${link.borderColor}`,
                      borderRadius: 14,
                      textDecoration: 'none', cursor: 'pointer',
                      transition: 'border-color 0.25s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = link.hoverBorder
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = link.borderColor
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: link.red ? 'var(--accent-red)' : 'var(--text-secondary)' }}>
                        {link.icon}
                      </span>
                      <div>
                        <div style={{
                          fontSize: 13, fontWeight: 600,
                          color: link.red ? 'var(--accent-red)' : 'var(--text-primary)',
                        }}>
                          {link.label}
                        </div>
                        <div style={{
                          fontSize: 10, color: 'var(--text-muted)',
                          fontFamily: 'var(--font-mono)',
                        }}>
                          {link.sub}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight size={14} style={{ color: 'var(--text-muted)' }} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — PREMIUM FORM */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 26, padding: 'clamp(24px, 4vw, 44px)',
              backdropFilter: 'blur(20px)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Subtle top-left glow inside form */}
            <div style={{
              position: 'absolute', top: -60, left: -60,
              width: 200, height: 200,
              background: 'radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ marginBottom: 32 }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700,
                  color: 'var(--text-sand)', marginBottom: 6,
                }}>
                  Send a Message
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  I read every message personally.
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Name + Email row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {/* Name */}
                  <div>
                    <label style={{
                      display: 'block', fontSize: 10, fontFamily: 'var(--font-mono)',
                      color: focused === 'name' ? 'var(--accent-red)' : 'var(--text-muted)',
                      letterSpacing: '0.15em', marginBottom: 8,
                      textTransform: 'uppercase', transition: 'color 0.25s',
                    }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      placeholder="Shreyash"
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      className="premium-input"
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label style={{
                      display: 'block', fontSize: 10, fontFamily: 'var(--font-mono)',
                      color: focused === 'email' ? 'var(--accent-red)' : 'var(--text-muted)',
                      letterSpacing: '0.15em', marginBottom: 8,
                      textTransform: 'uppercase', transition: 'color 0.25s',
                    }}>
                      Your Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      placeholder="you@example.com"
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      className="premium-input"
                    />
                  </div>
                </div>

                {/* Budget / Project type (decorative options) */}
                <div>
                  <label style={{
                    display: 'block', fontSize: 10, fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)', letterSpacing: '0.15em',
                    marginBottom: 10, textTransform: 'uppercase',
                  }}>
                    Project Type
                  </label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['Backend API', 'Full-Stack App', 'AI Integration', 'Consultation', 'Other'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm({ ...form, message: form.message ? form.message : `Hi Shreyash, I'm interested in ${type} work.` })}
                        style={{
                          padding: '7px 14px', borderRadius: 999,
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'var(--text-secondary)', fontSize: 12,
                          cursor: 'pointer', transition: 'var(--transition)',
                          fontFamily: 'var(--font-body)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(230,57,70,0.4)'
                          e.currentTarget.style.color = 'var(--text-sand)'
                          e.currentTarget.style.background = 'rgba(230,57,70,0.08)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                          e.currentTarget.style.color = 'var(--text-secondary)'
                          e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={{
                    display: 'block', fontSize: 10, fontFamily: 'var(--font-mono)',
                    color: focused === 'message' ? 'var(--accent-red)' : 'var(--text-muted)',
                    letterSpacing: '0.15em', marginBottom: 8,
                    textTransform: 'uppercase', transition: 'color 0.25s',
                  }}>
                    Message
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    placeholder="Hi Shreyash, I'd love to discuss..."
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    className="premium-input"
                    style={{ resize: 'none' }}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '16px 28px',
                    borderRadius: 14,
                    background: loading
                      ? 'rgba(255,255,255,0.06)'
                      : 'linear-gradient(135deg, var(--accent-crimson) 0%, var(--accent-red) 60%, rgba(255,120,80,0.9) 100%)',
                    color: 'white',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700, fontSize: 14,
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: 10,
                    transition: 'var(--transition)',
                    boxShadow: loading ? 'none' : '0 8px 32px rgba(230,57,70,0.3), 0 2px 8px rgba(230,57,70,0.2)',
                    letterSpacing: '0.02em',
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {/* Shimmer on button */}
                  {!loading && (
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                      style={{
                        position: 'absolute', top: 0, left: 0,
                        width: '40%', height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        style={{
                          width: 16, height: 16, borderRadius: '50%',
                          border: '2px solid rgba(255,255,255,0.2)',
                          borderTopColor: 'white',
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </motion.button>

                <p style={{
                  textAlign: 'center', fontSize: 11,
                  color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.05em',
                }}>
                  🔒 Your details are never shared with anyone.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
