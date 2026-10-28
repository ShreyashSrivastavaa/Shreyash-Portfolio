'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// Section selectors to map stops along the page exploration track
const SECTION_SELECTORS = ['#portfolio', '#about', '#contact']

export default function ScrollProgress() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const pencilRef = useRef(null)
  const numberRef = useRef(null)

  const [progress, setProgress] = useState(0)
  const [percent, setPercent] = useState(0)
  const [isDark, setIsDark] = useState(false)
  const [isArrived, setIsArrived] = useState(false)
  const [stops, setStops] = useState([])

  // Function to determine if element at coordinate has a dark background
  const checkIsDark = useCallback((x, y) => {
    if (typeof document === 'undefined') return false
    
    // Check for expanding dark iris in WorkIntroStage
    const iris = document.querySelector('[data-progress-iris]')
    if (iris) {
      const r = iris.getBoundingClientRect()
      const radius = r.width / 2
      if (
        x >= r.left &&
        x <= r.right &&
        y >= r.top &&
        y <= r.bottom &&
        radius > 0 &&
        Math.hypot(x - r.left - radius, y - r.top - radius) < radius
      ) {
        return true
      }
    }

    let el = document.elementFromPoint(x, y)
    if (!el) return false

    // Direct check for dark portfolio section
    if (el.closest('#portfolio') || el.closest('[data-dark-section]')) {
      return true
    }

    // Traverse upwards and check background color luminance
    while (el && el !== document.documentElement) {
      const bg = window.getComputedStyle(el).backgroundColor
      const match = bg.match(/[\d.]+/g)
      if (match && match.length >= 3) {
        const [r, g, b, a] = match.map(Number)
        const alpha = a !== undefined ? a : 1
        if (alpha >= 0.7) {
          // Standard perceived luminance calculation
          const lum = r * 0.2126 + g * 0.7152 + b * 0.0722
          return lum < 140
        }
      }
      el = el.parentElement
    }
    return false
  }, [])

  // Calculate stop positions for key sections
  const updateStops = useCallback(() => {
    if (typeof document === 'undefined') return
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    if (docHeight <= 0) return

    const newStops = SECTION_SELECTORS.map((sel) => {
      const el = document.querySelector(sel)
      if (!el) return null
      const top = el.getBoundingClientRect().top + window.scrollY
      return Math.min(1, Math.max(0, top / docHeight))
    }).filter((val) => val !== null)

    setStops(newStops)
  }, [])

  // Main scroll update handler
  useEffect(() => {
    let animId = null

    const handleUpdate = () => {
      const scrollTop = Math.max(0, window.scrollY)
      const docHeight = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      )

      const rawProgress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0
      const arrived = docHeight > 0 && docHeight - scrollTop <= 2
      const pct = arrived ? 100 : Math.floor(rawProgress * 100)

      setProgress(rawProgress)
      setPercent(pct)
      setIsArrived(arrived)

      if (trackRef.current && pencilRef.current) {
        const trackRect = trackRef.current.getBoundingClientRect()
        const trackHeight = trackRect.height
        const travel = rawProgress * trackHeight

        pencilRef.current.style.transform = `translateY(${travel.toFixed(2)}px)`

        // Contrast check
        const pencilPointX = trackRect.left + trackRect.width / 2
        const pencilPointY = trackRect.top + travel
        const dark = checkIsDark(pencilPointX, pencilPointY)
        setIsDark(dark)
      }

      animId = null
    }

    const onScroll = () => {
      if (!animId) {
        animId = requestAnimationFrame(handleUpdate)
      }
    }

    const onResize = () => {
      updateStops()
      handleUpdate()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    updateStops()
    handleUpdate()

    const ro = new ResizeObserver(() => {
      updateStops()
      handleUpdate()
    })
    ro.observe(document.body)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
      if (animId) cancelAnimationFrame(animId)
    }
  }, [checkIsDark, updateStops])

  // Scrubbing handler: click or drag along rail to jump/scroll to that page point
  const handleTrackClick = (e) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const pct = Math.max(0, Math.min(1, clickY / rect.height))
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({
      top: pct * docHeight,
      behavior: 'smooth',
    })
  }

  return (
    <div
      ref={containerRef}
      className="pencil-progress"
      data-dark={isDark ? 'true' : 'false'}
      data-arrived={isArrived ? 'true' : 'false'}
      role="progressbar"
      aria-label="Page exploration progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-valuetext={
        isArrived
          ? '100% explored. Page complete.'
          : `${percent}% explored, ${100 - percent}% remaining`
      }
    >
      <div className="pencil-progress-art" aria-hidden="true">
        {/* INTERACTIVE TRACK */}
        <div
          ref={trackRef}
          className="pencil-progress-track"
          onClick={handleTrackClick}
          title="Click to jump to scroll position"
        >
          {/* Base gray guide line */}
          <span className="pencil-progress-guide" />

          {/* Active orange drawn progress line */}
          <span
            className="pencil-progress-stroke"
            style={{
              transform: `scaleY(${progress})`,
            }}
          />

          {/* Section tick marks */}
          {stops.map((stopPct, idx) => (
            <span
              key={idx}
              className="pencil-progress-stop"
              data-passed={progress >= stopPct ? 'true' : 'false'}
              style={{ top: `${(stopPct * 100).toFixed(1)}%` }}
            />
          ))}

          {/* The signature drifting drafting pencil */}
          <div ref={pencilRef} className="pencil-progress-pencil">
            <svg
              viewBox="0 0 28 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
              strokeLinejoin="round"
            >
              <path
                className="pencil-progress-body"
                d="m22 3 5 1.5-7.8 25.1-5-1.5Z"
              />
              <path
                className="pencil-progress-cap"
                d="m22 3 5 1.5-.9 2.8-5-1.5Z"
              />
              <path
                className="pencil-progress-seam"
                d="m23.9 7.6-6.1 19.6"
              />
              <path
                className="pencil-progress-tip"
                d="m14.2 28.1 5 1.5L14 37Z"
              />
              <path
                className="pencil-progress-graphite"
                d="m14.1 33.4 2.1.6L14 37Z"
              />
            </svg>
          </div>
        </div>

        {/* 100% completion checkmark */}
        <svg
          className="pencil-progress-finish"
          viewBox="0 0 28 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path pathLength="1" d="m10 5 3 3 5-6" />
        </svg>

        {/* Live numerical percentage display (14%, 22%, etc.) */}
        <span ref={numberRef} className="pencil-progress-number">
          {percent}%
        </span>
      </div>
    </div>
  )
}
