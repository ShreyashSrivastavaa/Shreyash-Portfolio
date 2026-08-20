'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Terminal, Sparkles } from 'lucide-react';
import Image from 'next/image';
import TextType from '@/components/band/TextType';
import DraggableAvatar from '@/components/ui/DraggableAvatar';

export default function Hero({ showApp }) {
  const [startAnim, setStartAnim] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 992);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const heroPlayed = sessionStorage.getItem('heroPlayed');

    if (heroPlayed === 'true') {
      setStartAnim(true);
      return;
    }

    const delay = 1200;

    const textTimer = setTimeout(() => {
      setStartAnim(true);
      sessionStorage.setItem('heroPlayed', 'true');
    }, delay);

    return () => clearTimeout(textTimer);
  }, []);

  const statsData = [
    { number: '1+', label: 'Years Experience' },
    { number: '8+', label: 'Projects Shipped' },
    { number: '40+', label: 'GitHub Repos' },
    { number: '2+', label: 'Roles & Internships' }
  ];

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '110px',
        paddingBottom: '60px',
      }}
    >
      {/* BG NAME WATERMARK */}
      <div className="hero-bg-name-wrapper" aria-hidden="true">
        <span className="bg-name-line">SHREYASH</span>
        <span className="bg-name-line">SRIVASTAVA</span>
      </div>

      {/* AMBIENT GLOW ORBS */}
      <div className="hero-ambient-red" />
      <div className="hero-ambient-crimson" />

      {/* LEFT OVERLAY */}
      <div className="hero-bg-overlay-left" />
      <div className="hero-bg-overlay-bottom" />

      {/* HERO CONTENT CONTAINER */}
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: isMobile ? '24px' : '60px',
          paddingRight: isMobile ? '24px' : '60px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.15fr 0.85fr',
            gap: isMobile ? '32px' : '40px',
            alignItems: 'flex-start',
          }}
        >
          {/* LEFT: TEXT CONTENT */}
          <div>
            {/* AVAILABLE BADGE */}
            <motion.div
              initial={false}
              animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: '20px' }}
            >
              <span className="available-badge">
                <span className="badge-dot" />
                Former Backend SDE Intern @ JBH Tech Innovation (6 Months)
              </span>
            </motion.div>

            {/* MAIN HEADLINE */}
            <motion.div
              initial={false}
              animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{ marginBottom: '18px' }}
            >
              <h1
                style={{
                  fontSize: 'clamp(34px, 5.5vw, 64px)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                Hi, I'm <span style={{ color: 'var(--text-sand)' }}>Shreyash Srivastava</span>
                <br />
                <span className="text-shimmer">
                  Backend Engineer & Full-Stack Developer.
                </span>
              </h1>
            </motion.div>

            {/* TYPEWRITER SUBTITLE */}
            <motion.div
              initial={false}
              animate={startAnim ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{ marginBottom: '22px' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: isMobile ? '14px' : '16px',
                  color: 'var(--accent-red)',
                }}
              >
                <Terminal size={18} color="var(--accent-red)" />
                <TextType
                  text={[
                    'Backend SDE | Full-Stack Developer',
                    'Node.js • PostgreSQL • Prisma • Redis',
                    'B.Tech CSE @ ITS Engineering College (2026)',
                    'Microservices & Event-Driven Systems'
                  ]}
                  typingSpeed={70}
                  pauseDuration={1800}
                  showCursor
                  cursorCharacter="_"
                  deletingSpeed={40}
                />
              </div>
            </motion.div>

            {/* DESCRIPTION */}
            <motion.div
              initial={false}
              animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              style={{ marginBottom: '32px', maxWidth: '580px' }}
            >
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  margin: 0,
                }}
              >
                Specializing in Node.js, Express, NestJS, PostgreSQL, Prisma, Redis, RabbitMQ, and Docker.
                Crafting high-throughput APIs, clean database architectures, and production systems with sub-second performance.
              </p>
            </motion.div>

            {/* CTA BUTTONS */}
            <motion.div
              initial={false}
              animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}
            >
              <a
                href="#portfolio"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 28px',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, var(--accent-red) 0%, var(--accent-crimson) 100%)',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-heading)',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px var(--accent-red-glow)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 12px 30px var(--accent-red-glow)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 24px var(--accent-red-glow)'
                }}
              >
                View Projects <ArrowRight size={16} />
              </a>

              <a
                href="#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '999px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-sand)',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-heading)',
                  textDecoration: 'none',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                  e.currentTarget.style.borderColor = 'var(--border-hover)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <Mail size={16} /> Contact Me
              </a>

              <a
                href="https://drive.google.com/file/d/1Uwuk1fc6j7idN7o6-coz9A8sOyV0TDfA/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hire-me"
              >
                <Download size={16} style={{ marginRight: '6px' }} /> Resume
              </a>
            </motion.div>
          </div>

          {/* RIGHT: DRAGGABLE INSTA-DP CIRCLE AVATAR (TOP RIGHT) */}
          <motion.div
            initial={false}
            animate={startAnim ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: isMobile ? 'center' : 'flex-end',
              alignItems: 'flex-start',
              paddingTop: isMobile ? '0' : '0px',
            }}
          >
            {/* Ambient Radial Glow Backdrop */}
            <div
              style={{
                position: 'absolute',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(230, 57, 70, 0.22) 0%, rgba(193, 18, 31, 0.06) 55%, transparent 75%)',
                filter: 'blur(40px)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />

            <DraggableAvatar />
          </motion.div>
        </div>

        {/* STATS STRIP */}
        <motion.div
          initial={false}
          animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="stats-strip"
          style={{
            marginTop: '40px',
            padding: '24px 28px',
            borderRadius: '20px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: isMobile ? '20px' : '0',
          }}
        >
          {statsData.map((stat, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="stat-item">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
              {idx < statsData.length - 1 && !isMobile && <div className="stat-divider" />}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
