'use client';

import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PortfolioCard({
  title,
  description,
  index,
  id,
  image,
  live_url,
  tags,
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const handleCardClick = () => {
    if (id) {
      router.push(`/projects/${id}`);
    }
  };

  return (
    <motion.div
      onClick={handleCardClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative rounded-2xl border border-white/10 bg-[#050508]/60 backdrop-blur-md overflow-hidden cursor-pointer flex flex-col h-full min-h-[380px] transition-all duration-300 hover:border-white/20 hover:shadow-2xl"
    >
      {/* ── IMAGE CONTAINER ── */}
      <div className="w-full h-[200px] overflow-hidden relative flex-shrink-0 bg-[#050508]">
        {image ? (
          <>
            <motion.img
              src={image}
              alt={title}
              animate={{ scale: hovered ? 1.03 : 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full object-cover block"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-80" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
            <span className="font-heading text-4xl font-bold text-[#f0ece8]/40">
              {title.charAt(0)}
            </span>
          </div>
        )}

        {/* LIVE BADGE */}
        {live_url && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#050508]/80 border border-white/10 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-mono text-[#f0ece8]/80 tracking-wider font-semibold">
              LIVE
            </span>
          </div>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        <div className="text-[10px] font-mono text-[#f0ece8]/40 uppercase tracking-widest">
          PROJECT 0{index + 1}
        </div>

        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-[#f0ece8] group-hover:text-white transition-colors leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-[#f0ece8]/65 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Inline Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-[#f0ece8]/40 mt-auto pt-4">
            {tags.slice(0, 3).map((tag, idx) => (
              <span key={tag} className="inline-flex items-center gap-1.5">
                {idx > 0 && <span>·</span>}
                <span className="text-[#f0ece8]/60">{tag}</span>
              </span>
            ))}
          </div>
        )}

        {/* ── ACTION ROW ── */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-2">
          {live_url ? (
            <a
              href={live_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f0ece8]/80 hover:text-white transition-colors font-heading"
            >
              <ExternalLink size={12} />
              <span>Live Demo</span>
            </a>
          ) : (
            <span className="text-[10px] font-mono text-[#f0ece8]/40 uppercase tracking-widest">
              Case Study
            </span>
          )}

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#f0ece8] group-hover:translate-x-0.5 transition-transform font-heading">
            <span>Read Case Study</span>
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
