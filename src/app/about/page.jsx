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
  ArrowRight,
  Server,
  Database,
  Cpu,
  Layers,
  ArrowUpRight
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

export default function AboutPage() {
  const resumeUrl = 'https://drive.google.com/file/d/1DdV6JomHJOz0zidCsnwO5KFINzlq4QJO/view?usp=sharing'

  const engineeringPrinciples = [
    {
      num: '01',
      title: 'Full-Stack Web Engineering',
      desc: 'Building responsive user interfaces with Next.js, React, and Tailwind CSS, backed by dependable Node.js and Express APIs.'
    },
    {
      num: '02',
      title: 'Relational & Document Data',
      desc: 'Structuring normalized schemas, atomic transactions, and queries across PostgreSQL and MongoDB using Prisma ORM.'
    },
    {
      num: '03',
      title: 'Real-Time Communication',
      desc: 'Implementing live state updates with Socket.io WebSockets and structured event handling for interactive applications.'
    },
    {
      num: '04',
      title: 'Type Safety & Validation',
      desc: 'Enforcing strict runtime payload validation with Zod, JWT-based authentication middleware, and clean API contracts.'
    }
  ]

  return (
    <main className="min-h-screen bg-[#f1f0eb] text-[#242620] relative overflow-hidden">
      <CustomCursor />
      <ScrollProgress />
      <AnimatedBackground />

      <div className="relative z-10">
        <Navbar />

        {/* HERO BANNER */}
        <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 pt-12 pb-16">
          {/* TOP SECTION BAR */}
          <div className="flex items-center justify-between mb-4">
            <span className="section-numeral">02 / ABOUT ME</span>
            <span className="font-mono text-xs text-[#6f7168]">
              DELHI, INDIA
            </span>
          </div>

          <div className="max-w-4xl mb-12">
            <h1 className="text-4xl sm:text-6xl font-sans font-bold text-[#242620] tracking-tight">
              about{' '}
              <span className="font-serif italic font-normal text-[#242620]">
                Shreyash Srivastava
              </span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#6f7168] mt-3 leading-relaxed max-w-2xl">
              Developer, product builder, and founder from Delhi. Building websites, testing ideas, and shipping things into production.
            </p>
          </div>

          {/* MAIN BIO & PROFILE CARD */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
            {/* LEFT: BIO & STORY */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="samay-card p-6 sm:p-8 bg-[#ffffff] space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#f1f0eb]">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#242620]">
                    Background &amp; Story
                  </span>
                  <span className="font-hand text-lg text-[#0066ff]">architecting &amp; shipping</span>
                </div>

                <p className="font-sans text-base text-[#555852] leading-relaxed">
                  I'm <strong className="text-[#242620] font-semibold">Shreyash Srivastava</strong>. Full-stack engineer and backend architect based in Delhi, India. I don't build software to pad a repository. I engineer deterministic systems: high-throughput APIs, resilient data structures, and web applications that run fast and never flinch under load.
                </p>

                <p className="font-sans text-base text-[#555852] leading-relaxed">
                  I hold a B.Tech in Computer Science and Engineering from ITS Engineering College (affiliated with AKTU), backed by real-world production engineering experience. My focus: low-latency backend architectures, relational data models, and high-precision frontend execution.
                </p>

                <p className="font-sans text-base text-[#555852] leading-relaxed">
                  My goal: engineer high-leverage software architectures and sovereign product engines through <strong className="text-[#242620] font-semibold">Zenith District</strong> that solve complex real-world operational bottlenecks. I don't follow industry hype cycles: I design resilient systems from first principles, eliminate latency and state inconsistencies, and refine every layer until the platform runs with deterministic precision.
                </p>

                <p className="font-sans text-base text-[#555852] leading-relaxed">
                  My working stack includes JavaScript, TypeScript, React, Next.js, Node.js, Express, PostgreSQL, MongoDB, Prisma ORM, and Docker. If a system has race conditions, unoptimized queries, or state inconsistencies, I eliminate them.
                </p>
              </div>

              {/* ACTION PILLS */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-primary shadow-sm"
                >
                  <FileText size={14} />
                  <span>resume (pdf)</span>
                </a>

                <Link
                  href="/experience"
                  className="btn-pill-secondary"
                >
                  <Briefcase size={14} />
                  <span>work history</span>
                </Link>

                <Link
                  href="/projects"
                  className="btn-pill-secondary"
                >
                  <Code size={14} />
                  <span>explore projects</span>
                </Link>
              </div>
            </div>

            {/* RIGHT: PHOTO & QUICK STATS */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <div className="samay-card p-5 sm:p-6 bg-[#ffffff]">
                <div className="relative aspect-[4/4.5] w-full bg-gradient-to-b from-[#e6e5df] to-[#dcdad3] rounded-xl overflow-hidden flex items-end justify-center mb-5">
                  <Image
                    src="/profile-transparent.png"
                    alt="Shreyash Srivastava"
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover object-top scale-105"
                  />
                </div>

                <h3 className="font-sans font-bold text-2xl text-[#242620]">Shreyash Srivastava</h3>
                <p className="font-sans text-xs uppercase tracking-wider text-[#6f7168] mt-1 mb-4">
                  Full-Stack Developer, Product Builder &amp; Founder
                </p>

                <div className="w-full grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#f1f0eb] border border-[#d3d3c8] text-left text-xs">
                  <div>
                    <div className="text-[10px] font-sans uppercase tracking-widest text-[#6f7168]">Location</div>
                    <div className="font-semibold text-[#242620] mt-0.5">Delhi, India</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-sans uppercase tracking-widest text-[#6f7168]">Graduation</div>
                    <div className="font-semibold text-[#242620] mt-0.5">B.Tech CSE Graduate</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-sans uppercase tracking-widest text-[#6f7168]">Experience</div>
                    <div className="font-semibold text-[#242620] mt-0.5">Founder &amp; ~6 Mo SDE Intern</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-sans uppercase tracking-widest text-[#6f7168]">Status</div>
                    <div className="font-semibold text-[#0066ff] mt-0.5">Available for Roles</div>
                  </div>
                </div>

                {/* Social Connect */}
                <div className="pt-4 mt-4 border-t border-[#f1f0eb] flex items-center justify-between text-xs">
                  <span className="font-sans font-medium text-[#6f7168]">
                    Verified Profiles
                  </span>
                  <div className="flex gap-2">
                    <a
                      href="https://github.com/ShreyashSrivastavaa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#f1f0eb] border border-[#d3d3c8] flex items-center justify-center text-[#242620] hover:bg-[#0066ff] hover:text-[#ffffff] hover:border-[#0066ff] transition-all"
                    >
                      <Github size={13} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/shreyashsrivastavaa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#f1f0eb] border border-[#d3d3c8] flex items-center justify-center text-[#242620] hover:bg-[#0066ff] hover:text-[#ffffff] hover:border-[#0066ff] transition-all"
                    >
                      <Linkedin size={13} />
                    </a>
                    <a
                      href="mailto:shreyashsr2004@gmail.com"
                      className="w-8 h-8 rounded-full bg-[#f1f0eb] border border-[#d3d3c8] flex items-center justify-center text-[#242620] hover:bg-[#0066ff] hover:text-[#ffffff] hover:border-[#0066ff] transition-all"
                    >
                      <Mail size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ENGINEERING PRINCIPLES */}
          <div className="mb-16">
            <div className="mb-8">
              <span className="section-numeral">
                SYSTEM PHILOSOPHY
              </span>
              <h2 className="text-3xl font-sans font-bold text-[#242620] mt-1">
                Core Architectural Principles
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {engineeringPrinciples.map((item) => (
                <div
                  key={item.num}
                  className="samay-card p-6 flex flex-col justify-between min-h-[220px] bg-[#ffffff]"
                >
                  <div>
                    <div className="font-mono text-xs text-[#0066ff] mb-2">
                      PRIN. {item.num}
                    </div>
                    <h3 className="font-sans font-bold text-lg text-[#242620] mb-2">{item.title}</h3>
                    <p className="font-sans text-xs text-[#6f7168] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EDUCATION & HACKATHONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Education */}
            <div className="samay-card bg-[#ffffff] p-6 sm:p-8">
              <div className="flex items-center justify-between pb-3 border-b border-[#f1f0eb] mb-6">
                <h3 className="font-sans font-bold text-2xl text-[#242620]">Education &amp; Degree</h3>
                <span className="font-mono text-xs text-[#6f7168]">B.TECH CSE</span>
              </div>

              {experienceData.education.map((edu, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="font-sans font-bold text-xl text-[#242620]">{edu.degree}</div>
                  <div className="font-sans text-xs font-semibold uppercase tracking-wider text-[#0066ff]">
                    {edu.institution} ({edu.period})
                  </div>
                  <p className="font-sans text-xs text-[#6f7168] leading-relaxed pt-2">{edu.details}</p>
                </div>
              ))}
            </div>

            {/* Hackathons */}
            <div className="samay-card bg-[#ffffff] p-6 sm:p-8">
              <div className="flex items-center justify-between pb-3 border-b border-[#f1f0eb] mb-6">
                <h3 className="font-sans font-bold text-2xl text-[#242620]">Hackathons & Honors</h3>
                <span className="font-mono text-xs text-[#6f7168]">AWARDS</span>
              </div>

              <div className="space-y-3">
                {experienceData.achievementsList.map((ach, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#f1f0eb] border border-[#d3d3c8] space-y-1">
                    <div className="text-xs font-sans font-semibold text-[#242620] flex items-center justify-between">
                      <span>{ach.title}</span>
                      <span className="font-mono text-[10px] text-[#0066ff]">{ach.issuer}</span>
                    </div>
                    <p className="font-sans text-xs text-[#6f7168]">{ach.detail}</p>
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
