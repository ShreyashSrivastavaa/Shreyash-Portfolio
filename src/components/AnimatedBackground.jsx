'use client'

import React, { useEffect, useRef } from 'react'

/**
 * Enhanced background with:
 * - Animated gradient blobs (color-shifting)
 * - Subtle grid overlay
 * - Canvas particle system (optimized)
 */
const AnimatedBackground = () => {
  const blobRefs = useRef([])
  const canvasRef = useRef(null)

  // ——— Blob parallax ———
  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.pageYOffset

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return
        const xOffset = Math.sin(scroll / 120 + index * 0.6) * 100
        const yOffset = Math.cos(scroll / 120 + index * 0.6) * 35
        blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`
        blob.style.transition = 'transform 1.2s ease-out'
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ——— Canvas particles ———
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let rafId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const PARTICLE_COUNT = 60
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.25 + 0.05,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`
        ctx.fill()
      })

      // Lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.04 * (1 - dist / 120)})`
            ctx.stroke()
          }
        }
      }

      rafId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.6,
        }}
      />

      {/* Gradient blobs */}
      <div className="absolute inset-0">
        <div
          ref={(ref) => { blobRefs.current[0] = ref }}
          className="absolute top-10 left-10 w-40 h-40 md:w-56 md:h-56 rounded-full blur-[90px] opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.8), rgba(200,200,255,0.3))',
          }}
        />
        <div
          ref={(ref) => { blobRefs.current[1] = ref }}
          className="absolute top-10 right-10 w-40 h-40 md:w-56 md:h-56 rounded-full blur-[100px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(180,180,220,0.7), rgba(120,120,180,0.2))',
          }}
        />
        <div
          ref={(ref) => { blobRefs.current[2] = ref }}
          className="absolute bottom-10 left-10 w-44 h-44 md:w-60 md:h-60 rounded-full blur-[110px] opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(200,200,240,0.6), rgba(160,160,200,0.2))',
          }}
        />
        <div
          ref={(ref) => { blobRefs.current[3] = ref }}
          className="absolute bottom-10 right-10 w-40 h-40 md:w-56 md:h-56 rounded-full blur-[100px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.7), rgba(220,220,255,0.2))',
          }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:26px_26px]" />
    </div>
  )
}

export default AnimatedBackground
