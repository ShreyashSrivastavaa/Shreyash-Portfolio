'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const outerRef = useRef(null)
  const dotRef = useRef(null)
  const trailRefs = useRef([])
  const mousePos = useRef({ x: 0, y: 0 })
  const outerPos = useRef({ x: 0, y: 0 })
  const trailPositions = useRef([])
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const TRAIL_COUNT = 7
    trailPositions.current = Array(TRAIL_COUNT).fill(null).map(() => ({ x: 0, y: 0 }))

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-hover], .project-card-wrap, .skill-badge-wrap, .testimonial-card-wrap')
      setIsHovering(!!target)
    }

    let rafId
    const animate = () => {
      // Outer ring — smooth follow
      outerPos.current.x += (mousePos.current.x - outerPos.current.x) * 0.12
      outerPos.current.y += (mousePos.current.y - outerPos.current.y) * 0.12
      if (outerRef.current) {
        outerRef.current.style.left = `${outerPos.current.x}px`
        outerRef.current.style.top = `${outerPos.current.y}px`
      }

      // Trail dots
      trailPositions.current[0].x += (mousePos.current.x - trailPositions.current[0].x) * 0.22
      trailPositions.current[0].y += (mousePos.current.y - trailPositions.current[0].y) * 0.22
      if (trailRefs.current[0]) {
        trailRefs.current[0].style.left = `${trailPositions.current[0].x}px`
        trailRefs.current[0].style.top = `${trailPositions.current[0].y}px`
      }

      for (let i = 1; i < TRAIL_COUNT; i++) {
        trailPositions.current[i].x += (trailPositions.current[i - 1].x - trailPositions.current[i].x) * 0.28
        trailPositions.current[i].y += (trailPositions.current[i - 1].y - trailPositions.current[i].y) * 0.28
        if (trailRefs.current[i]) {
          trailRefs.current[i].style.left = `${trailPositions.current[i].x}px`
          trailRefs.current[i].style.top = `${trailPositions.current[i].y}px`
        }
      }

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(rafId)
    }
  }, [isMobile])

  if (isMobile) return null

  const TRAIL_COUNT = 7

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          width: isHovering ? 56 : 34,
          height: isHovering ? 56 : 34,
          border: `1.5px solid ${isHovering ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)'}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, background 0.3s',
          background: isHovering ? 'rgba(255,255,255,0.06)' : 'transparent',
          mixBlendMode: 'difference',
        }}
      />
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: 5,
          height: 5,
          background: 'white',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Trail */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el }}
          style={{
            position: 'fixed',
            width: Math.max(2, 4 - i * 0.4),
            height: Math.max(2, 4 - i * 0.4),
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.4)',
            pointerEvents: 'none',
            zIndex: 9998,
            transform: 'translate(-50%, -50%)',
            opacity: (1 - i / TRAIL_COUNT) * 0.5,
          }}
        />
      ))}
      {/* Hide default cursor */}
      <style jsx global>{`
        * { cursor: none !important; }
      `}</style>
    </>
  )
}
