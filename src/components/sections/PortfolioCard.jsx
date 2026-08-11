'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function PortfolioCard({
  title,
  description,
  index,
  id,
  image,
  live_url,
  tags,
}) {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 22,
        border: `1px solid ${hovered ? 'rgba(230,57,70,0.28)' : 'rgba(255,255,255,0.07)'}`,
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        boxShadow: hovered
          ? '0 0 0 1px rgba(230,57,70,0.08), 0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(230,57,70,0.08)'
          : '0 2px 16px rgba(0,0,0,0.25)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 360,
      }}
    >
      {/* Top shimmer line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 1,
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)',
        pointerEvents: 'none',
      }} />

      {/* ── IMAGE ── */}
      <div style={{
        width: '100%', height: 190,
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
        background: 'rgba(255,255,255,0.03)',
      }}>
        {image ? (
          <>
            <motion.img
              src={image}
              alt={title}
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <motion.div
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(5,5,8,0.55) 0%, transparent 55%)',
              }}
            />
          </>
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(230,57,70,0.06) 0%, rgba(5,5,8,0.5) 100%)',
          }}>
            <span style={{
              fontFamily: 'var(--font-heading)', fontSize: 48, fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(230,57,70,0.25)',
            }}>
              {title.charAt(0)}
            </span>
          </div>
        )}

        {/* LIVE badge */}
        {live_url && (
          <div style={{
            position: 'absolute', top: 10, right: 10,
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '4px 10px', borderRadius: 999,
            background: 'rgba(5,5,8,0.82)',
            border: '1px solid rgba(230,57,70,0.4)',
            backdropFilter: 'blur(10px)',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--accent-red)',
              boxShadow: '0 0 6px rgba(230,57,70,0.8)',
              display: 'inline-block',
            }} />
            <span style={{
              fontSize: 9, fontFamily: 'var(--font-mono)',
              color: 'var(--accent-red)', letterSpacing: '0.1em',
            }}>LIVE</span>
          </div>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div style={{
        padding: '18px 20px 20px',
        display: 'flex', flexDirection: 'column',
        flex: 1,
        gap: 10,
      }}>
        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 15, fontWeight: 700, lineHeight: 1.3,
          color: 'var(--text-sand)',
          margin: 0,
        }}>
          {title}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: 13, color: 'var(--text-secondary)',
          lineHeight: 1.65, margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {description}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} style={{
                padding: '3px 9px', borderRadius: 999,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                fontSize: 10, fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)', letterSpacing: '0.03em',
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ── ACTION ROW — pinned to bottom ── */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: 12,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          {live_url ? (
            <motion.a
              href={live_url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontSize: 12, fontWeight: 600,
                color: 'var(--accent-red)',
                textDecoration: 'none',
                fontFamily: 'var(--font-heading)',
              }}
            >
              <ExternalLink size={12} />
              Live Demo
            </motion.a>
          ) : (
            <span style={{
              fontSize: 10, color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              Backend API
            </span>
          )}

          {id && (
            <motion.button
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => router.push(`/portfolio/${id}`)}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '6px 14px', borderRadius: 8,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--text-secondary)',
                fontSize: 12, fontWeight: 600,
                fontFamily: 'var(--font-heading)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(230,57,70,0.1)'
                e.currentTarget.style.borderColor = 'rgba(230,57,70,0.3)'
                e.currentTarget.style.color = 'var(--text-sand)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              Details
              <ArrowRight size={11} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
