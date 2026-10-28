'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Coffee,
  Heart,
  Sparkles,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  Code2,
  Zap,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollToTop from '@/components/ScrollToTop'

const TIERS = [
  {
    amount: '$3',
    name: 'Espresso Shot',
    desc: 'Quick burst of caffeine to fuel a late-night commit.',
    url: 'https://buymeacoffee.com/shreyashsrivastavaa',
    popular: false,
  },
  {
    amount: '$5',
    name: 'Flat White',
    desc: 'Keeps the domains alive and servers spinning smoothly.',
    url: 'https://buymeacoffee.com/shreyashsrivastavaa',
    popular: true,
  },
  {
    amount: '$10',
    name: 'Roaster’s Choice',
    desc: 'Funds new experiments in WebAssembly, WebSockets, & AI.',
    url: 'https://buymeacoffee.com/shreyashsrivastavaa',
    popular: false,
  },
]

const PERKS = [
  {
    icon: <ShieldCheck className="text-emerald-500" size={18} />,
    title: '100% Free & Ad-Free Tools',
    desc: 'Keeping suites like IHateLovePDF (45 client-side utilities) completely private with zero annoying banner ads.',
  },
  {
    icon: <Zap className="text-[#0066ff]" size={18} />,
    title: 'Server & Domain Hosting',
    desc: 'Covering Vercel bandwidth, Redis instances, and domain renewals across 17+ active web apps.',
  },
  {
    icon: <Code2 className="text-blue-500" size={18} />,
    title: 'Open Source Development',
    desc: 'Building reusable templates, developer tools, and free utilities that developers around the world use.',
  },
]

export default function BuyMeACoffeePage() {
  const [selectedTier, setSelectedTier] = useState(1)
  const bmcUrl = 'https://buymeacoffee.com/shreyashsrivastavaa'

  return (
    <div className="min-h-screen bg-[#f1f0eb] text-[#242620] selection:bg-[#0066ff]/20 selection:text-[#242620]">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main className="max-w-[1000px] mx-auto px-6 sm:px-12 pt-12 pb-24">
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#6f7168] hover:text-[#242620] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>back to portfolio</span>
          </Link>
        </div>

        {/* HERO SECTION */}
        <section className="text-center max-w-2xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066ff]/10 border border-[#0066ff]/25 text-[#0066ff] text-xs font-mono">
            <Coffee size={14} />
            <span>SUPPORT MY WORK</span>
          </div>

          <h1 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-[#242620] leading-tight">
            Buy me a coffee & fuel the next indie experiment.
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#6f7168] leading-relaxed">
            I’m Shreyash Srivastava. I design and build free, privacy-first web utilities, multiplayer browser games, and open-source tools with zero paywalls. If any of my work has saved you time or helped you build, a coffee means the world.
          </p>

          <div className="pt-2">
            <a
              href={bmcUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FFDD00] text-[#000000] font-sans font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border border-black/10"
            >
              <Coffee size={18} />
              <span>Support on Buy Me a Coffee</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        {/* TIERS SELECTION */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#8e9087]">
              CHOOSE A COFFEE TIER
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIERS.map((tier, idx) => {
              const isSelected = selectedTier === idx
              return (
                <div
                  key={tier.name}
                  onClick={() => setSelectedTier(idx)}
                  className={`relative p-6 rounded-2xl bg-white border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#0066ff] shadow-xl ring-2 ring-[#0066ff]/20 -translate-y-1'
                      : 'border-[#d3d3c8] shadow-sm hover:border-[#8e9087] hover:-translate-y-0.5'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#0066ff] text-white font-mono text-[10px] uppercase font-bold tracking-wider shadow-sm">
                      Most Popular
                    </span>
                  )}

                  <div>
                    <div className="flex items-baseline justify-between mb-3">
                      <h3 className="font-sans font-bold text-lg text-[#242620]">
                        {tier.name}
                      </h3>
                      <span className="font-mono font-bold text-2xl text-[#0066ff]">
                        {tier.amount}
                      </span>
                    </div>

                    <p className="font-sans text-xs text-[#6f7168] leading-relaxed mb-6">
                      {tier.desc}
                    </p>
                  </div>

                  <a
                    href={tier.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 rounded-xl font-sans font-semibold text-xs text-center flex items-center justify-center gap-1.5 transition-colors ${
                      isSelected
                        ? 'bg-[#242620] text-white hover:bg-[#0066ff]'
                        : 'bg-[#f1f0eb] text-[#242620] hover:bg-[#e5e4de]'
                    }`}
                  >
                    <span>Give {tier.amount}</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              )
            })}
          </div>
        </section>

        {/* WHERE YOUR SUPPORT GOES */}
        <section className="mt-20 p-8 sm:p-10 rounded-3xl bg-white border border-[#d3d3c8] shadow-sm">
          <div className="max-w-xl mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#0066ff]">
              TRANSPARENCY & IMPACT
            </span>
            <h2 className="font-sans font-bold text-2xl text-[#242620] mt-1">
              Where your coffee support goes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PERKS.map((perk) => (
              <div key={perk.title} className="space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#f1f0eb] flex items-center justify-center border border-[#d3d3c8]">
                  {perk.icon}
                </div>
                <h4 className="font-sans font-semibold text-sm text-[#242620]">
                  {perk.title}
                </h4>
                <p className="font-sans text-xs text-[#6f7168] leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#e6e5df] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#6f7168]">
              <Heart size={14} className="text-[#0066ff] fill-[#0066ff]" />
              <span>Every contribution keeps the indie web independent.</span>
            </div>

            <a
              href={bmcUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#0066ff] hover:underline"
            >
              <span>Visit buymeacoffee.com/shreyashsrivastavaa</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </section>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  )
}
