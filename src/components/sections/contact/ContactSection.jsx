'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Send, Copy, Check, ExternalLink, ArrowUpRight, MessageSquare, Clock, Globe } from 'lucide-react'
import Swal from 'sweetalert2'

const socialLinks = [
  {
    icon: <Github size={16} />,
    label: 'GitHub',
    sub: '@ShreyashSrivastavaa',
    href: 'https://github.com/ShreyashSrivastavaa',
  },
  {
    icon: <Linkedin size={16} />,
    label: 'LinkedIn',
    sub: 'shreyashsrivastavaa',
    href: 'https://www.linkedin.com/in/shreyashsrivastavaa',
  },
  {
    icon: <ExternalLink size={16} />,
    label: 'Existing Portfolio',
    sub: 'shreyashsrivastava.vercel.app',
    href: 'https://shreyashsrivastava.vercel.app',
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
        background: '#050508',
        color: '#f0ece8',
        confirmButtonColor: '#e63946',
      })
      return
    }

    setLoading(true)

    try {
      // Free Web3Forms API integration
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'fedf8580-5bc1-4a76-93cb-64eea1dc6edf'

      if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
        // Fallback demo notice if key is not configured yet
        await new Promise((r) => setTimeout(r, 1000))
        Swal.fire({
          title: '⚙️ Setup Required',
          text: 'To receive real emails in your Gmail inbox, add your free Web3Forms Access Key in .env.local as NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY!',
          icon: 'info',
          background: '#050508',
          color: '#f0ece8',
          confirmButtonColor: '#e63946',
        })
        setForm({ name: '', email: '', message: '' })
        return
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio Contact Form Submission from ${form.name}`,
          from_name: form.name,
        }),
      })

      const result = await response.json()

      if (result.success) {
        Swal.fire({
          title: '🚀 Message Sent!',
          text: "Thanks for reaching out! I've received your email and will respond within 24 hours.",
          icon: 'success',
          background: '#050508',
          color: '#f0ece8',
          confirmButtonColor: '#e63946',
        })
        setForm({ name: '', email: '', message: '' })
      } else {
        throw new Error(result.message || 'Failed to send email')
      }
    } catch (error) {
      Swal.fire({
        title: 'Submission Error',
        text: error.message || 'Something went wrong. Please try emailing directly.',
        icon: 'error',
        background: '#050508',
        color: '#f0ece8',
        confirmButtonColor: '#e63946',
      })
    } finally {
      setLoading(false)
    }
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
      {/* SECTION WATERMARK */}
      <span className="section-watermark" aria-hidden="true">CONTACT</span>

      {/* GLOW ORBS */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 70%)',
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
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--accent-red)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            GET IN TOUCH
          </span>
          <h2
            style={{
              fontSize: 'clamp(32px, 5.5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.05,
              marginTop: '10px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            <span style={{ color: 'var(--text-sand)' }}>Let's Build</span>{' '}
            <span
              style={{
                color: 'transparent',
                WebkitTextStroke: '2px rgba(255,255,255,0.55)',
              }}
            >
              Something Extraordinary.
            </span>
          </h2>
          <p
            style={{
              color: 'var(--text-secondary)',
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
              className="glass-card"
              style={{
                borderRadius: '24px',
                padding: '24px',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-red)',
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
                  background: 'rgba(230, 57, 70, 0.08)',
                  border: '1px solid rgba(230, 57, 70, 0.2)',
                  borderRadius: '16px',
                  marginBottom: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail size={18} color="var(--accent-red)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-sand)' }}>
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
                    background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                    border: `1px solid ${copied ? '#10B981' : 'var(--border)'}`,
                    color: copied ? '#34D399' : 'var(--text-secondary)',
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
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '12px' }}>
                      {fact.icon}
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{fact.label}</span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-sand)', fontWeight: 600 }}>{fact.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Grid */}
            <div
              className="glass-card"
              style={{
                borderRadius: '24px',
                padding: '24px',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-red)',
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
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--border)',
                      borderRadius: '14px',
                      textDecoration: 'none',
                      color: 'var(--text-sand)',
                      transition: 'var(--transition)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: 'var(--accent-red)' }}>{link.icon}</span>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-sand)' }}>{link.label}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                          {link.sub}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight size={15} color="var(--text-muted)" />
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
            className="glass-card"
            style={{
              borderRadius: '24px',
              padding: '32px',
            }}
          >
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-sand)', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
              Send Me a Message
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Fill out the details below and I'll get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: focused === 'name' ? 'var(--accent-red)' : 'var(--text-muted)',
                    letterSpacing: '0.1em',
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s ease',
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  placeholder="Your Name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  className="premium-input"
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: focused === 'email' ? 'var(--accent-red)' : 'var(--text-muted)',
                    letterSpacing: '0.1em',
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s ease',
                  }}
                >
                  Email
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

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    color: focused === 'message' ? 'var(--accent-red)' : 'var(--text-muted)',
                    letterSpacing: '0.1em',
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s ease',
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
                  className="premium-input"
                  style={{ resize: 'none' }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, var(--accent-red) 0%, var(--accent-crimson) 100%)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '14px',
                  fontFamily: 'var(--font-heading)',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 20px var(--accent-red-glow)',
                  transition: 'var(--transition)',
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
