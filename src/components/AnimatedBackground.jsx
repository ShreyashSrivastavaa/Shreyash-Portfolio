'use client'

import React, { useEffect, useRef } from 'react'

const AnimatedBackground = () => {
  const canvasRef = useRef(null)

  // Canvas: particles + red-tinted connections
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let rafId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // cover full scroll height
    }
    resize()
    window.addEventListener('resize', resize)

    const PARTICLE_COUNT = 70
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.2 + 0.2,
      alpha: Math.random() * 0.18 + 0.04,
      red: Math.random() > 0.75, // some particles red-tinted
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0)           p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0)            p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.red
          ? `rgba(230, 57, 70, ${p.alpha * 1.4})`
          : `rgba(255, 255, 255, ${p.alpha})`
        ctx.fill()
      })

      // Lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            const opacity = 0.035 * (1 - dist / 110)
            const isRed = particles[i].red || particles[j].red
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = isRed
              ? `rgba(230, 57, 70, ${opacity * 1.8})`
              : `rgba(255, 255, 255, ${opacity})`
            ctx.lineWidth = 0.6
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
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.7 }}
      />

      {/* Gradient blobs — red-tinted */}
      <div className="absolute inset-0">
        {/* Top-left — crimson */}
        <div
          className="absolute top-[-80px] left-[-80px] rounded-full blur-[120px]"
          style={{
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(193,18,31,0.14) 0%, transparent 70%)',
          }}
        />
        {/* Top-right — faint warm */}
        <div
          className="absolute top-20 right-[-60px] rounded-full blur-[100px]"
          style={{
            width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 70%)',
          }}
        />
        {/* Mid — subtle deep red */}
        <div
          className="absolute top-[45%] left-[30%] rounded-full blur-[140px]"
          style={{
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(120,0,20,0.12) 0%, transparent 70%)',
          }}
        />
        {/* Bottom-right */}
        <div
          className="absolute bottom-[-40px] right-[-40px] rounded-full blur-[110px]"
          style={{
            width: 450, height: 450,
            background: 'radial-gradient(circle, rgba(193,18,31,0.1) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Ultra-fine grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial vignette at center */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, transparent 0%, rgba(5,5,8,0.5) 100%)',
        }}
      />
    </div>
  )
}

export default AnimatedBackground
