'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export default function DraggableAvatar() {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div
      drag
      dragSnapToOrigin={true}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      whileDrag={{ scale: 1.1, zIndex: 100 }}
      style={{
        position: 'relative',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* INSTAGRAM DP STYLE GRADIENT RING */}
      <div
        style={{
          position: 'relative',
          padding: '4px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #e63946 0%, #ff758c 50%, #c1121f 100%)',
          boxShadow: '0 0 25px rgba(230, 57, 70, 0.4), 0 10px 30px rgba(0,0,0,0.6)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* INNER DARK CIRCLE WITH PROFILE PHOTO */}
        <div
          style={{
            position: 'relative',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            overflow: 'hidden',
            background: 'radial-gradient(circle at center, #1a1e29 0%, #050508 100%)',
            border: '2px solid #050508',
          }}
        >
          <Image
            src="/profile-transparent.png"
            alt="Shreyash Srivastava - Backend Engineer & Full-Stack Developer"
            fill
            sizes="180px"
            priority
            style={{
              objectFit: 'cover',
              objectPosition: 'top center',
              transform: 'scale(1.15) translateY(6px)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* ONLINE STATUS BADGE */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#10B981',
            border: '3px solid #050508',
            boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
          }}
        />
      </div>
    </motion.div>
  )
}
