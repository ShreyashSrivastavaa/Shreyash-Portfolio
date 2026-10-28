'use client'

import React from 'react'

export default function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        backgroundColor: '#f1f0eb',
      }}
      aria-hidden="true"
    >
      {/* Subtle Arc Blue Radial Gradient Tint */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(130% 62% at 50% 100%, rgba(0, 102, 255, 0.04), rgba(0, 102, 255, 0) 62%), radial-gradient(38vw 38vw at 50% 40%, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0) 68%)',
        }}
      />

      {/* Subtle Dot Matrix Texture */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(rgba(36, 38, 32, 0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  )
}
