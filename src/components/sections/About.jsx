'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Award, GraduationCap, Briefcase, FileText, Github, Terminal } from 'lucide-react';
import Image from 'next/image';
import projectsData from '@/data/projects.json';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);


  const projectCount = projectsData.length;

  const stats = [
    { icon: <Briefcase size={18} />, value: "Freelance", title: "UPSCALETECHSOLUTIONS" },
    { icon: <GraduationCap size={18} />, value: "2026", title: "ITS ENGG COLLEGE (AKTU)" },
    { icon: <Code size={18} />, value: `${projectCount}+`, title: "SHIPPED PROJECTS" },
    { icon: <Award size={18} />, value: "1st", title: "CODE-O-FIESTA HACKATHON" },
  ];

  return (
    <section
      id="about"
      style={{
        paddingTop: isMobile ? '80px' : '120px',
        paddingBottom: isMobile ? '80px' : '120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* SECTION WATERMARK */}
      <span className="section-watermark" aria-hidden="true">ABOUT</span>

      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: isMobile ? '24px' : '60px',
          paddingRight: isMobile ? '24px' : '60px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--accent-red)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            WHO I AM
          </span>
          <h2
            style={{
              fontSize: isMobile ? '32px' : 'clamp(32px, 5vw, 52px)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginTop: '8px',
              fontFamily: 'var(--font-heading)',
              color: 'var(--text-primary)',
            }}
          >
            Engineering scalable systems with{' '}
            <span
              style={{
                color: 'transparent',
                WebkitBackgroundClip: 'text',
                backgroundImage: 'linear-gradient(135deg, var(--accent-red), #ff6b6b)',
              }}
            >
              precision & purpose
            </span>
          </h2>
        </motion.div>

        {/* 2-COLUMN LAYOUT: BIO LEFT, STATS & DETAILS RIGHT */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.15fr 0.85fr',
            gap: isMobile ? '36px' : '56px',
            alignItems: 'start',
          }}
        >
          {/* LEFT: EXPANDED BIO */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <motion.p variants={fadeUp} style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.85, margin: 0 }}>
              I'm <strong style={{ color: 'var(--text-sand)' }}>Shreyash Srivastava</strong>, a backend and full-stack engineer based in Greater Noida, India. Right now, I freelance with <strong style={{ color: 'var(--text-sand)' }}>UpscaleTechSolutions</strong> after finishing a 6-month backend internship at <strong style={{ color: 'var(--text-sand)' }}>JBH Tech Innovation</strong>. I am completing my <strong style={{ color: 'var(--text-sand)' }}>B.Tech in Computer Science at ITS Engineering College (AKTU)</strong>, graduating in 2026.
            </motion.p>

            <motion.p variants={fadeUp} style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.85, margin: 0 }}>
              Most of my work centers around building REST APIs, designing PostgreSQL schemas with Prisma, and setting up asynchronous message workers with RabbitMQ and Redis. When a product calls for real-time updates, I integrate Socket.io.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="service-card"
              style={{
                padding: '16px 20px',
                borderRadius: '16px',
              }}
            >
              <p style={{ fontSize: '14px', color: 'var(--text-sand)', fontStyle: 'italic', margin: 0 }}>
                "Good backend code is simple, handles failure predictably, and stays out of the user's way."
              </p>
            </motion.div>

            {/* QUICK LINK CTAS */}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '10px' }}>
              <a
                href="https://github.com/ShreyashSrivastavaa"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-sand)',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-heading)',
                  textDecoration: 'none',
                  transition: 'var(--transition)',
                }}
              >
                <Github size={15} /> GitHub Profile
              </a>

              <a
                href="https://drive.google.com/file/d/1DdV6JomHJOz0zidCsnwO5KFINzlq4QJO/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, var(--accent-red), var(--accent-crimson))',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-heading)',
                  textDecoration: 'none',
                  boxShadow: '0 6px 20px var(--accent-crimson-glow)',
                }}
              >
                <FileText size={15} /> Download CV
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT: PORTRAIT PHOTO CARD & STATS */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* STAT CARDS */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
              }}
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="glass-card"
                  style={{
                    padding: '20px',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '12px',
                      background: 'rgba(230, 57, 70, 0.15)',
                      color: 'var(--accent-red)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: 800,
                      color: 'var(--text-sand)',
                      fontFamily: 'var(--font-heading)',
                    }}>
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)',
                        marginTop: '2px',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {stat.title}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
