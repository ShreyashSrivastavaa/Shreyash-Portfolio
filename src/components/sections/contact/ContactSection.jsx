'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Send, Copy, Check, ExternalLink, ArrowUpRight, MessageSquare, Clock, Globe } from 'lucide-react'
import Swal from 'sweetalert2'

const socialLinks = [
  {
    icon: <Github size={16} />,
    label: 'GitHub',
    sub: '@ShreyashSrivastava15',
    href: 'https://github.com/ShreyashSrivastava15',
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
    label: 'Existing Portfolio',
    sub: 'shreyashsrivastava.vercel.app',
    href: 'https://shreyashsrivastava.vercel.app',
    color: 'rgba(59,130,246,0.1)',
    borderColor: 'rgba(59,130,246,0.25)',
    hoverBorder: 'rgba(59,130,246,0.55)',
  },
]

const quickFacts = [
  { icon: <Clock size={14} />, label: 'Response time', value: '< 24 hours' },
  { icon: <Globe size={14} />, label: 'Timezone', value: 'IST (UTC +5:30)' },
  { icon: <MessageSquare size={14} />, label: 'Open to', value: 'Backend SDE & Full-Stack' },
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
        text: 'Please fill out all required fields.',
        icon: 'error',
        background: '#0F172A',
        color: '#F8FAFC',
        confirmButtonColor: '#3B82F6',
      })
      return
    }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)

    Swal.fire({
      title: '🚀 Message Sent!',
      text: "Thanks for reaching out! I'll respond within 24 hours.",
      icon: 'success',
      background: '#0F172A',
      color: '#F8FAFC',
      confirmButtonColor: '#3B82F6',
    })

    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '100px',
        paddingBottom: '80px',
      }}
    >
      {/* GLOW ORBS */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: '#60A5FA',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            GET IN TOUCH
          </span>
          <h2
            style={{
              fontSize: 'clamp(32px, 5.5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginTop: '8px',
              color: '#F8FAFC',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Let's Build Something <br />
            <span style={{ color: '#A78BFA' }}>Extraordinary Together.</span>
          </h2>
          <p
            style={{
              color: '#94A3B8',
              fontSize: '15px',
              lineHeight: 1.7,
              maxWidth: '500px',
              margin: '16px auto 0',
            }}
          >
            Have a backend architecture challenge, project opportunity, or internship query? I'm always open to discussing new technical projects.
          </p>
        </motion.div>

        {/* MAIN GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'start',
          }}
        >
          {/* LEFT: DIRECT CONTACT & SOCIALS */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {/* Email Card */}
            <div
              style={{
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '24px',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontFamily: "'JetBrains Mono', monospace",
                  color: '#60A5FA',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                Direct Contact
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                  borderRadius: '16px',
                  marginBottom: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail size={18} color="#60A5FA" />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: '#F8FAFC' }}>
                    {emailAddress}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyEmail}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                    border: `1px solid ${copied ? '#10B981' : 'rgba(255, 255, 255, 0.15)'}`,
                    color: copied ? '#34D399' : '#CBD5E1',
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </motion.button>
              </div>

              {/* Quick Facts */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {quickFacts.map((fact, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', fontSize: '12px' }}>
                      {fact.icon}
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>{fact.label}</span>
                    </div>
                    <span style={{ fontSize: '12px', color: '#F8FAFC', fontWeight: 600 }}>{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Grid */}
            <div
              style={{
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '24px',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontFamily: "'JetBrains Mono', monospace",
                  color: '#60A5FA',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                Social Media & Links
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      background: link.color,
                      border: `1px solid ${link.borderColor}`,
                      borderRadius: '14px',
                      textDecoration: 'none',
                      color: '#F8FAFC',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: '#60A5FA' }}>{link.icon}</span>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#F8FAFC' }}>{link.label}</div>
                        <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: "'JetBrains Mono', monospace" }}>
                          {link.sub}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight size={15} color="#94A3B8" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '32px',
              backdropFilter: 'blur(16px)',
            }}
          >
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#F8FAFC', marginBottom: '8px' }}>
              Send Me a Message
            </h3>
            <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '24px' }}>
              Fill out the details below and I'll get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontFamily: "'JetBrains Mono', monospace",
                    color: focused === 'name' ? '#60A5FA' : '#94A3B8',
                    letterSpacing: '0.1em',
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  placeholder="Shreyash Srivastava"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: `1px solid ${focused === 'name' ? '#3B82F6' : 'rgba(255, 255, 255, 0.1)'}`,
                    color: '#F8FAFC',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontFamily: "'JetBrains Mono', monospace",
                    color: focused === 'email' ? '#60A5FA' : '#94A3B8',
                    letterSpacing: '0.1em',
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  placeholder="shreyash@example.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: `1px solid ${focused === 'email' ? '#3B82F6' : 'rgba(255, 255, 255, 0.1)'}`,
                    color: '#F8FAFC',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontFamily: "'JetBrains Mono', monospace",
                    color: focused === 'message' ? '#60A5FA' : '#94A3B8',
                    letterSpacing: '0.1em',
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                  }}
                >
                  Message
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  placeholder="Tell me about your project or opportunity..."
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: `1px solid ${focused === 'message' ? '#3B82F6' : 'rgba(255, 255, 255, 0.1)'}`,
                    color: '#F8FAFC',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'none',
                    transition: 'border-color 0.2s ease',
                  }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '14px',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
                }}
              >
                <Send size={15} />
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
