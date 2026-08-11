'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react'
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
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: 26,
        border: `1px solid ${hovered ? 'rgba(230,57,70,0.3)' : 'rgba(255,255,255,0.08)'}`,
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered
          ? '0 0 0 1px rgba(230,57,70,0.1), 0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(230,57,70,0.1)'
          : '0 4px 24px rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Inner top gradient shimmer */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 1,
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Image */}
      <div style={{
        width: '100%', height: 192,
        overflow: 'hidden',
        position: 'relative',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {image ? (
          <>
            <motion.img
              src={image}
              alt={title}
              animate={{ scale: hovered ? 1.07 : 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Image overlay */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(5,5,8,0.7) 0%, transparent 60%)',
              }}
            />
          </>
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, rgba(230,57,70,0.06) 0%, rgba(5,5,8,0.4) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 900,
              color: 'transparent', WebkitTextStroke: '1px rgba(230,57,70,0.2)',
            }}>
              {title.charAt(0)}
            </span>
          </div>
        )}

        {/* Live badge */}
        {live_url && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            padding: '4px 10px', borderRadius: 999,
            background: 'rgba(5,5,8,0.8)',
            border: '1px solid rgba(230,57,70,0.35)',
            fontSize: 10, fontFamily: 'var(--font-mono)',
            color: 'var(--accent-red)', backdropFilter: 'blur(10px)',
            letterSpacing: '0.08em',
          }}>
            LIVE
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 16, fontWeight: 700, lineHeight: 1.3,
          color: 'var(--text-sand)', marginBottom: 8,
        }}>
          {title}
        </h3>

        <p style={{
          fontSize: 13, color: 'var(--text-secondary)',
          lineHeight: 1.7, marginBottom: 14,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {description}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '3px 10px', borderRadius: 999,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  fontSize: 10, fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)', letterSpacing: '0.04em',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {live_url ? (
            <motion.a
              href={live_url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 3 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontSize: 12, fontWeight: 600,
                color: 'var(--accent-red)',
                textDecoration: 'none',
                fontFamily: 'var(--font-heading)',
              }}
            >
              <ExternalLink size={13} />
              Live Demo
            </motion.a>
          ) : (
            <span style={{
              fontSize: 11, color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)', letterSpacing: '0.06em',
            }}>
              BACKEND API
            </span>
          )}

          {id && (
            <motion.button
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push(`/portfolio/${id}`)}
              style={{
                padding: '7px 16px', borderRadius: 999,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'var(--text-secondary)',
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'var(--transition)',
                fontFamily: 'var(--font-heading)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(230,57,70,0.12)'
                e.currentTarget.style.borderColor = 'rgba(230,57,70,0.35)'
                e.currentTarget.style.color = 'var(--text-sand)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              Details
              <ArrowRight size={12} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
