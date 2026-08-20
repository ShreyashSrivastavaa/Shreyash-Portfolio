'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Github, Linkedin, Terminal } from 'lucide-react';
import TextType from '@/components/band/TextType';

export default function Hero({ showApp }) {
  const [startAnim, setStartAnim] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
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
    { number: '15+', label: 'GitHub Repos' },
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
        paddingTop: '100px',
        paddingBottom: '60px',
      }}
    >
      {/* BACKGROUND GRADIENT & GLOW */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

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
        <div style={{ maxWidth: '820px' }}>
          {/* AVAILABLE BADGE */}
          <motion.div
            initial={false}
            animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: '20px' }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '999px',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                color: '#60A5FA',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10B981',
                  boxShadow: '0 0 10px #10B981',
                }}
              />
              Backend SDE Intern @ JBH Tech Innovation
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
                fontSize: 'clamp(36px, 6.5vw, 72px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#F8FAFC',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Hi, I'm <span style={{ color: '#60A5FA' }}>Shreyash</span> (Ramboo)
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Building Scalable Backends.
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
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: isMobile ? '14px' : '17px',
                color: '#A78BFA',
              }}
            >
              <Terminal size={18} color="#60A5FA" />
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
            style={{ marginBottom: '32px', maxWidth: '620px' }}
          >
            <p
              style={{
                fontSize: '15px',
                color: '#94A3B8',
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
            style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '48px' }}
          >
            <a
              href="#portfolio"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 28px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.35)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(59, 130, 246, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.35)'
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
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#F8FAFC',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Mail size={16} /> Contact Me
            </a>

            <a
              href="https://drive.google.com/file/d/1Uwuk1fc6j7idN7o6-coz9A8sOyV0TDfA/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '999px',
                background: 'transparent',
                border: '1px solid rgba(167, 139, 250, 0.3)',
                color: '#A78BFA',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(167, 139, 250, 0.1)'
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Download size={16} /> Resume
            </a>
          </motion.div>

          {/* STATS STRIP */}
          <motion.div
            initial={false}
            animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
              gap: '20px',
              padding: '24px 28px',
              borderRadius: '20px',
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {statsData.map((stat, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontSize: '26px',
                    fontWeight: 800,
                    color: '#60A5FA',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {stat.number}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#94A3B8',
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: '0.05em',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
