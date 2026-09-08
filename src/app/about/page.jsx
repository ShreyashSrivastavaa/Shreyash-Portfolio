'use client'

import { motion } from 'framer-motion'
import {
  Briefcase,
  GraduationCap,
  Award,
  Code,
  FileText,
  Github,
  Linkedin,
  Mail,
  Terminal,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Server,
  Database,
  Cpu,
  Layers
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'
import AnimatedBackground from '@/components/AnimatedBackground'
import experienceData from '@/data/experience.json'
import projectsData from '@/data/projects.json'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function AboutPage() {
  const resumeUrl = 'https://drive.google.com/file/d/1DdV6JomHJOz0zidCsnwO5KFINzlq4QJO/view?usp=sharing'

  const engineeringPrinciples = [
    {
      icon: <Server size={20} className="text-[#e63946]" />,
      title: 'High-Throughput Microservices',
      desc: 'Architecting scalable Node.js & NestJS services handling 50k+ daily payloads with sub-second response latencies.'
    },
    {
      icon: <Database size={20} className="text-[#e63946]" />,
      title: 'Relational & Distributed Data',
      desc: 'Optimized schema design, atomic transactions, row-level locking, and Redis caching for zero-bottleneck data layers.'
    },
    {
      icon: <Cpu size={20} className="text-[#e63946]" />,
      title: 'Event-Driven Concurrency',
      desc: 'Asynchronous task processing with RabbitMQ message queues and WebSocket channels for real-time sync.'
    },
    {
      icon: <Layers size={20} className="text-[#e63946]" />,
      title: 'Enterprise Multi-Tenancy & Security',
      desc: 'Tenant schema isolation, JWT rotation, fine-grained RBAC, and Zod edge validation for rock-solid security.'
    }
  ]

  return (
    <main className="min-h-screen bg-[#050508] text-[#f0ece8] relative overflow-hidden">
      <CustomCursor />
      <ScrollProgress />
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar />

        {/* HERO BANNER */}
        <section className="w-full max-w-[1200px] mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs font-mono text-[#e63946] tracking-[0.25em] uppercase font-semibold">
              ENGINEERING PROFILE
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[#f0ece8] mt-3 mb-6 tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e63946] to-[#ff4d5a]">Shreyash Srivastava</span>
            </h1>
            <p className="text-base sm:text-lg text-[#f0ece8]/75 leading-relaxed font-light">
              Software Development Engineer specializing in backend systems, distributed architectures, database optimization, and high-performance full-stack web applications.
            </p>
          </motion.div>

          {/* MAIN BIO & PROFILE CARD */}
          <div className="grid lg:grid-cols-12 gap-10 items-start mb-20">
            {/* LEFT: BIO & STORY */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="lg:col-span-7 flex flex-col gap-6"
            >
              <motion.div variants={fadeUp} className="glass-card p-8 rounded-3xl border border-white/10 space-y-5">
                <div className="flex items-center gap-2 text-xs font-mono text-[#e63946] uppercase tracking-widest font-bold">
                  <Terminal size={15} />
                  <span>THE BACKGROUND</span>
                </div>
                <p className="text-sm sm:text-base text-[#f0ece8]/85 leading-relaxed">
                  I am a <strong className="text-white font-semibold">Backend and Full-Stack Software Engineer</strong> working on freelance client projects, after completing a 6-month backend internship at <strong className="text-white font-semibold">JBH Tech Innovation</strong>. I am currently completing my <strong className="text-white font-semibold">B.Tech in Computer Science and Engineering</strong> at ITS Engineering College, Greater Noida (AKTU), graduating in 2026.
                </p>
                <p className="text-sm sm:text-base text-[#f0ece8]/85 leading-relaxed">
                  Over the past few years, I have built and shipped multiple real-world systems, including client-side WebAssembly tools, hospital management workflows, and real-time food delivery platforms.
                </p>
                <p className="text-sm sm:text-base text-[#f0ece8]/85 leading-relaxed">
                  My core stack revolves around Node.js, NestJS, PostgreSQL, Prisma, Redis, and Docker. I focus on keeping services simple to maintain, designing normalized database schemas, and writing endpoints that perform well under load.
                </p>
              </motion.div>

              {/* ACTION LINKS */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#e63946] to-[#c1121f] text-white font-semibold text-xs shadow-lg shadow-red-500/20 hover:scale-[1.02] transition-transform"
                >
                  <FileText size={15} />
                  <span>Download Full Resume (PDF)</span>
                </a>

                <Link
                  href="/experience"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#121218] border border-white/10 text-white font-semibold text-xs hover:border-white/20 transition-colors"
                >
                  <Briefcase size={15} />
                  <span>View Work History</span>
                  <ArrowRight size={14} className="text-[#e63946]" />
                </Link>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#121218] border border-white/10 text-white font-semibold text-xs hover:border-white/20 transition-colors"
                >
                  <Code size={15} />
                  <span>Explore Projects</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* RIGHT: PHOTO & QUICK STATS */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              {/* Profile Card */}
              <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-col items-center text-center">
                <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-[#e63946] shadow-xl shadow-red-500/20 mb-5 bg-[#0a0a0f]">
                  <Image
                    src="/profile-transparent.png"
                    alt="Shreyash Srivastava"
                    width={144}
                    height={144}
                    className="w-full h-full object-cover object-top scale-110"
                  />
                </div>
                <h3 className="text-xl font-bold font-heading text-white">Shreyash Srivastava</h3>
                <p className="text-xs font-mono text-[#e63946] mt-1 mb-4">Backend SDE & Full-Stack Architect</p>
                <div className="w-full grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-left">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-mono text-[#f0ece8]/50 uppercase">Location</div>
                    <div className="text-xs font-semibold text-white mt-0.5">Delhi NCR, India</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-mono text-[#f0ece8]/50 uppercase">Graduation</div>
                    <div className="text-xs font-semibold text-white mt-0.5">2026 (B.Tech CSE)</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-mono text-[#f0ece8]/50 uppercase">Experience</div>
                    <div className="text-xs font-semibold text-white mt-0.5">Freelance Engineer</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] font-mono text-[#f0ece8]/50 uppercase">Status</div>
                    <div className="text-xs font-semibold text-emerald-400 mt-0.5">Available for Roles</div>
                  </div>
                </div>
              </div>

              {/* Social Connect */}
              <div className="glass-card p-6 rounded-3xl border border-white/10 flex items-center justify-between">
                <div className="text-xs font-mono text-[#f0ece8]/60 uppercase tracking-wider">Social Channels</div>
                <div className="flex gap-2">
                  <a
                    href="https://github.com/ShreyashSrivastavaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#e63946] text-white transition-colors"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/shreyashsrivastavaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#e63946] text-white transition-colors"
                  >
                    <Linkedin size={16} />
                  </a>
                  <a
                    href="mailto:shreyashsr2004@gmail.com"
                    className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#e63946] text-white transition-colors"
                  >
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ENGINEERING PRINCIPLES */}
          <div className="mb-20">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-mono text-[#e63946] tracking-[0.25em] uppercase font-semibold">
                SYSTEM PHILOSOPHY
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white mt-2">
                Core Architectural Principles
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {engineeringPrinciples.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-[#e63946]/40 transition-all"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#e63946]/10 flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-base font-bold font-heading text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-[#f0ece8]/70 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* EDUCATION & HACKATHONS SUMMARY */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Education */}
            <div className="glass-card p-8 rounded-3xl border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-white">Education & Academia</h3>
                  <p className="text-xs font-mono text-[#f0ece8]/50">Foundational Engineering</p>
                </div>
              </div>

              {experienceData.education.map((edu, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="text-base font-semibold text-white">{edu.degree}</div>
                  <div className="text-xs font-mono text-[#e63946]">{edu.institution} ({edu.period})</div>
                  <p className="text-xs text-[#f0ece8]/75 leading-relaxed pt-2">{edu.details}</p>
                </div>
              ))}
            </div>

            {/* Hackathons */}
            <div className="glass-card p-8 rounded-3xl border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#e63946]/10 text-[#e63946] flex items-center justify-center">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-white">Hackathons & Honors</h3>
                  <p className="text-xs font-mono text-[#f0ece8]/50">Competitive Problem Solving</p>
                </div>
              </div>

              <div className="space-y-4">
                {experienceData.achievementsList.map((ach, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>{ach.title}</span>
                      <span className="text-[10px] font-mono text-amber-400">{ach.issuer}</span>
                    </div>
                    <p className="text-xs text-[#f0ece8]/70">{ach.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <ScrollToTop />
      </div>
    </main>
  )
}
