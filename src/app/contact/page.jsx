'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Github,
  Linkedin,
  Send,
  Copy,
  Check,
  ExternalLink,
  ArrowUpRight,
  MessageSquare,
  Clock,
  Globe,
  Sparkles
} from 'lucide-react'
import Swal from 'sweetalert2'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import AnimatedBackground from '@/components/AnimatedBackground'

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
    label: 'Live Portfolio',
    sub: 'shreyashsrivastava.vercel.app',
    href: 'https://shreyashsrivastava.vercel.app',
  },
]

const quickFacts = [
  { icon: <Clock size={14} />, label: 'Response time', value: '< 24 hours' },
  { icon: <Globe size={14} />, label: 'Timezone', value: 'IST (UTC +5:30)' },
  { icon: <MessageSquare size={14} />, label: 'Open to', value: 'Backend SDE & Full-Stack' },
]

export default function ContactPage() {
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
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
        'fedf8580-5bc1-4a76-93cb-64eea1dc6edf'

      if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
        await new Promise((r) => setTimeout(r, 1000))
        Swal.fire({
          title: '⚙️ Setup Notice',
          text: 'To receive real emails in your Gmail inbox, add your Web3Forms Access Key in .env.local!',
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
    <main className="min-h-screen bg-[#050508] text-[#f0ece8] relative overflow-hidden">
      <CustomCursor />
      <ScrollProgress />
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar />

        <section className="w-full max-w-[1200px] mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-20">
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs font-mono text-[#e63946] tracking-[0.25em] uppercase font-semibold">
              START A CONVERSATION
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[#f0ece8] mt-3 mb-6 tracking-tight">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e63946] to-[#ff4d5a]">Touch</span>
            </h1>
            <p className="text-base sm:text-lg text-[#f0ece8]/75 leading-relaxed font-light">
              Have a question, a project you'd like to collaborate on, or an open role? Feel free to reach out.
            </p>
          </motion.div>

          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: DIRECT CONTACT & SOCIALS */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              {/* Email Card */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10">
                <div className="text-[11px] font-mono text-[#e63946] tracking-widest uppercase font-bold mb-4">
                  Direct Inbox
                </div>

                <div className="flex items-center justify-between p-4 bg-[#e63946]/10 border border-[#e63946]/30 rounded-2xl mb-6">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Mail size={18} className="text-[#e63946] shrink-0" />
                    <span className="font-mono text-xs sm:text-sm text-white truncate">
                      {emailAddress}
                    </span>
                  </div>

                  <button
                    onClick={copyEmail}
                    className={`p-2 rounded-xl transition cursor-pointer shrink-0 border ${
                      copied
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-white/10 border-white/10 hover:bg-white/20 text-white'
                    }`}
                    title="Copy Email Address"
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                  </button>
                </div>

                {/* Quick Facts */}
                <div className="space-y-2.5">
                  {quickFacts.map((fact, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5"
                    >
                      <div className="flex items-center gap-2 text-xs font-mono text-[#f0ece8]/60">
                        {fact.icon}
                        <span>{fact.label}</span>
                      </div>
                      <span className="text-xs font-semibold text-white font-mono">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Grid */}
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10">
                <div className="text-[11px] font-mono text-[#e63946] tracking-widest uppercase font-bold mb-4">
                  Social & Code Networks
                </div>

                <div className="space-y-3">
                  {socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/25 hover:bg-white/[0.05] transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[#e63946]">{link.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-[#e63946] transition-colors">
                            {link.label}
                          </div>
                          <div className="text-[10px] font-mono text-[#f0ece8]/50">
                            {link.sub}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={15}
                        className="text-[#f0ece8]/40 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT: CONTACT FORM */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-7 glass-card p-8 sm:p-10 rounded-3xl border border-white/10"
            >
              <h2 className="text-2xl font-bold font-heading text-white mb-2">
                Send a Direct Message
              </h2>
              <p className="text-xs sm:text-sm text-[#f0ece8]/70 mb-8">
                Fill out the form below and it will dispatch directly to my inbox.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-mono text-[#f0ece8]/60 uppercase tracking-wider mb-2 font-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    placeholder="Jane Doe"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-[#f0ece8]/30 focus:outline-none focus:border-[#e63946] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#f0ece8]/60 uppercase tracking-wider mb-2 font-semibold">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    placeholder="jane@company.com"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-[#f0ece8]/30 focus:outline-none focus:border-[#e63946] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#f0ece8]/60 uppercase tracking-wider mb-2 font-semibold">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    placeholder="Tell me about your system requirements, role opportunity, or timeline..."
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder-[#f0ece8]/30 focus:outline-none focus:border-[#e63946] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#e63946] to-[#c1121f] text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-500/25 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={16} />
                  <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </main>
  )
}
