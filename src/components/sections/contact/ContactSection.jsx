'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Send, Copy, Check } from 'lucide-react'
import Swal from 'sweetalert2'

export default function ContactSection() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const emailAddress = 'shreyash.srivastava.dev@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      Swal.fire({
        title: 'Error',
        text: 'Please fill out all fields.',
        icon: 'error',
        background: '#111',
        color: '#fff',
        confirmButtonColor: '#333',
      })
      return
    }

    Swal.fire({
      title: 'Message Sent!',
      text: 'Thank you for reaching out. I will get back to you soon!',
      icon: 'success',
      background: '#111',
      color: '#fff',
      confirmButtonColor: '#fff',
      customClass: { confirmButton: 'text-black' }
    })

    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section
      id="contact"
      className="w-full max-w-[1250px] mx-auto px-6 md:px-12 py-24 text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <span className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase">
          GET IN TOUCH
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
          Let's Work Together
        </h2>
        <p className="text-white/60 max-w-lg mx-auto text-sm md:text-base">
          Have a project in mind or interested in collaboration? Feel free to reach out directly or send a message below.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 items-start">
        {/* LEFT COLUMN - INFO & SOCIALS */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-[26px] border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl flex flex-col gap-6"
        >
          <div>
            <h3 className="text-xl font-semibold mb-2">Direct Contact</h3>
            <p className="text-xs text-white/50 leading-relaxed">
              Prefer direct email? Copy my address or click below.
            </p>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Mail size={16} />
              </div>
              <span className="text-xs font-mono text-white/80 truncate">
                {emailAddress}
              </span>
            </div>

            <button
              onClick={copyEmail}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer shrink-0 ml-2"
              title="Copy Email"
            >
              {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            </button>
          </div>

          <div className="pt-4 border-t border-white/10">
            <h4 className="text-xs font-mono text-white/40 tracking-wider uppercase mb-4">
              Social Links
            </h4>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/ShreyashSrivastavaa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/10 transition text-xs text-white/80 hover:text-white"
              >
                <Github size={15} />
                GitHub
              </a>

              <a
                href="https://linkedin.com/in/shreyashsrivastava"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/10 transition text-xs text-white/80 hover:text-white"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>

              <a
                href="https://www.ihatelovepdf.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition text-xs text-red-400 font-medium"
              >
                IHateLovePDF ↗
              </a>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN - CONTACT FORM */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="rounded-[26px] border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl flex flex-col gap-4"
        >
          <div>
            <label className="block text-xs font-mono text-white/60 mb-2">
              YOUR NAME
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-white/60 mb-2">
              YOUR EMAIL
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-white/60 mb-2">
              MESSAGE
            </label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Hello Shreyash, I'd like to discuss..."
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <Send size={15} />
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  )
}
