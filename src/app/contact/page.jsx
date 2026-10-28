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
  Clock,
  Globe,
  Briefcase,
  Coffee
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
    icon: <Github size={15} />,
    label: 'GitHub',
    sub: '@ShreyashSrivastavaa',
    href: 'https://github.com/ShreyashSrivastavaa',
  },
  {
    icon: <Linkedin size={15} />,
    label: 'LinkedIn',
    sub: 'shreyashsrivastavaa',
    href: 'https://www.linkedin.com/in/shreyashsrivastavaa',
  },
  {
    icon: <Coffee size={15} />,
    label: 'Buy Me a Coffee',
    sub: 'buymeacoffee.com/shreyashsrivastavaa',
    href: 'https://buymeacoffee.com/shreyashsrivastavaa',
  },
  {
    icon: <ExternalLink size={15} />,
    label: 'Zenith District',
    sub: 'zenithdistrict.com',
    href: 'https://zenithdistrict.com',
  },
]

const quickFacts = [
  { icon: <Clock size={13} />, label: 'Response turnaround', value: '< 24 Hours' },
  { icon: <Globe size={13} />, label: 'Timezone', value: 'IST (UTC +5:30)' },
  { icon: <Briefcase size={13} />, label: 'Availability', value: 'Full-Stack Roles & Ventures' },
]

export default function ContactPage() {
  const [copied, setCopied] = useState(false)
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
        text: 'Please complete all required fields.',
        icon: 'error',
        background: '#ffffff',
        color: '#242620',
        confirmButtonColor: '#0066ff',
      })
      return
    }

    setLoading(true)

    try {
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
        'fedf8580-5bc1-4a76-93cb-64eea1dc6edf'

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
          subject: `Portfolio Contact Inquiry from ${form.name}`,
          from_name: form.name,
        }),
      })

      const result = await response.json()

      if (result.success) {
        Swal.fire({
          title: 'Message Sent!',
          text: "Thanks for reaching out! I've received your note and will get back to you soon.",
          icon: 'success',
          background: '#ffffff',
          color: '#242620',
          confirmButtonColor: '#0066ff',
        })
        setForm({ name: '', email: '', message: '' })
      } else {
        throw new Error(result.message || 'Failed to send message')
      }
    } catch (error) {
      Swal.fire({
        title: 'Submission Error',
        text: error.message || 'Could not send message. Please email me directly at shreyashsr2004@gmail.com.',
        icon: 'error',
        background: '#ffffff',
        color: '#242620',
        confirmButtonColor: '#0066ff',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f1f0eb] text-[#242620] relative overflow-hidden">
      <CustomCursor />
      <ScrollProgress />
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar />

        <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 pt-12 pb-20">
          {/* TOP SECTION BAR */}
          <div className="flex items-center justify-between mb-4">
            <span className="section-numeral">06 / GET IN TOUCH</span>
            <span className="font-mono text-xs text-[#6f7168]">
              STATUS: OPEN FOR NEW OPPORTUNITIES
            </span>
          </div>

          <div className="max-w-4xl mb-12">
            <h1 className="text-4xl sm:text-6xl font-sans font-bold text-[#242620] tracking-tight">
              start a{' '}
              <span className="font-serif italic font-normal text-[#242620]">
                conversation
              </span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#6f7168] mt-3 leading-relaxed max-w-2xl">
              Have an open engineering role, a software project idea, or just want to connect? Drop a message below or email me directly.
            </p>
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT 5 COLS: INBOX & SOCIALS */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              {/* Email Card */}
              <div className="samay-card p-6 bg-[#ffffff] space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#f1f0eb]">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#242620]">
                    Direct Inbox
                  </span>
                  <span className="text-[11px] font-mono text-[#22c55e]">● ACTIVE</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f1f0eb] border border-[#d3d3c8]">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Mail size={16} className="text-[#0066ff] flex-shrink-0" />
                    <span className="font-mono text-xs text-[#242620] truncate">
                      {emailAddress}
                    </span>
                  </div>

                  <button
                    onClick={copyEmail}
                    className="px-3 py-1.5 rounded-full text-xs font-sans font-semibold bg-[#ffffff] border border-[#d3d3c8] hover:border-[#242620] text-[#242620] transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check size={12} className="text-[#22c55e]" />
                        <span className="text-[#22c55e]">copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Quick Facts */}
                <div className="divide-y divide-[#f1f0eb] pt-2">
                  {quickFacts.map((fact, i) => (
                    <div
                      key={i}
                      className="py-2.5 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 text-[#6f7168]">
                        {fact.icon}
                        <span>{fact.label}</span>
                      </div>
                      <span className="font-sans text-[11px] text-[#242620] font-semibold">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Platforms */}
              <div className="samay-card p-6 bg-[#ffffff] space-y-3">
                <div className="pb-2 border-b border-[#f1f0eb] text-xs font-bold uppercase tracking-wider text-[#242620]">
                  Where to Find Me
                </div>

                <div className="divide-y divide-[#f1f0eb]">
                  {socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 flex items-center justify-between group text-xs hover:text-[#0066ff] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-[#242620] group-hover:text-[#0066ff] transition-colors">
                          {link.icon}
                        </span>
                        <div>
                          <div className="font-sans font-bold text-[#242620] group-hover:text-[#0066ff] transition-colors">
                            {link.label}
                          </div>
                          <div className="font-mono text-[11px] text-[#6f7168]">
                            {link.sub}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={14}
                        className="text-[#6f7168] group-hover:text-[#0066ff]"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT 7 COLS: FORM */}
            <div className="lg:col-span-7 samay-card p-6 sm:p-8 bg-[#ffffff]">
              <div className="flex items-center justify-between pb-3 border-b border-[#f1f0eb] mb-6">
                <span className="font-sans font-bold text-sm uppercase tracking-wider text-[#242620]">
                  Send a Message
                </span>
                <span className="font-hand text-lg text-[#0066ff]">
                  say hey anytime
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-sans font-semibold text-[#242620] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    placeholder="e.g. Alex Morgan"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="samay-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold text-[#242620] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    placeholder="e.g. alex@example.com"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="samay-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold text-[#242620] mb-1.5">
                    Message Details
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    placeholder="Tell me about your team, your project idea, or what you're looking to build..."
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="samay-input resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-pill-accent py-3.5 flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <Send size={14} />
                    <span>{loading ? 'sending...' : 'send message ↗'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </main>
  )
}
