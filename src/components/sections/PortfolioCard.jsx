'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PortfolioCard({
  title,
  description,
  index,
  id,
  image,
  live_url,
}) {
  const router = useRouter()

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: index % 2 === 0 ? -40 : 40,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.06,
      }}
      whileHover={{ y: -4 }}
      className="group relative rounded-[26px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl flex flex-col min-h-[290px]"
    >
      <div className="w-full h-40 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] mb-3 relative">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full bg-white/[0.03]" />
        )}
      </div>

      <h3 className="text-[17px] font-semibold mb-2 leading-tight text-white">
        {title}
      </h3>

      <p className="text-[13px] text-white/60 leading-relaxed line-clamp-2 min-h-[38px] mb-2">
        {description}
      </p>

      <div className="mt-auto pt-3 flex items-center justify-between">
        {live_url ? (
          <a
            href={live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[13px] text-red-400 font-medium hover:text-red-300 transition-all"
          >
            Live Demo
            <ArrowUpRight size={14} />
          </a>
        ) : (
          <div className="text-[13px] text-white/35">
            Backend API
          </div>
        )}

        {id && (
          <button
            onClick={() => router.push(`/portfolio/${id}`)}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center gap-2 text-[13px] text-white cursor-pointer"
          >
            Details
            <ArrowRight size={13} />
          </button>
        )}
      </div>
    </motion.div>
  )
}
