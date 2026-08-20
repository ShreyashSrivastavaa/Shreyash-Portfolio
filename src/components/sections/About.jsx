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
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile === null) return null;

  const projectCount = projectsData.length;

  const stats = [
    { icon: <Briefcase size={18} />, value: "6-Mo Intern", title: "JBH TECH INNOVATION" },
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
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '48px' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--accent-red)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            ABOUT ME
          </span>
          <h2
            style={{
              fontSize: isMobile ? '32px' : '48px',
              fontWeight: 800,
              lineHeight: 1.05,
              marginTop: '10px',
              fontFamily: 'var(--font-heading)',
            }}
          >
            <span style={{ color: 'var(--text-sand)' }}>Architecting</span>{' '}
            <span
              style={{
                color: 'transparent',
                WebkitTextStroke: '2px rgba(255,255,255,0.55)',
              }}
            >
              Scalable Systems
            </span>
          </h2>
        </motion.div>

        {/* CONTENT GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '32px' : '60px',
            alignItems: 'center',
          }}
        >
          {/* LEFT: BIO & DETAILS */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <motion.p variants={fadeUp} style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.85, margin: 0 }}>
              I am <strong style={{ color: 'var(--text-sand)' }}>Shreyash Srivastava</strong>, a dedicated Backend Software Development Engineer and former <strong style={{ color: 'var(--text-sand)' }}>Backend SDE Intern at JBH Tech Innovation (6 Months)</strong>. I am pursuing my <strong style={{ color: 'var(--text-sand)' }}>B.Tech in Computer Science & Engineering at ITS Engineering College, Greater Noida (AKTU)</strong>, graduating in 2026.
            </motion.p>

            <motion.p variants={fadeUp} style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.85, margin: 0 }}>
              My engineering focus lies in architecting fault-tolerant microservices, high-throughput REST APIs, relational PostgreSQL databases with Prisma ORM, real-time WebSockets with Socket.io, and asynchronous message queues with RabbitMQ and Redis.
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
                "Every API endpoint should be clean, resilient, and optimized for sub-millisecond performance."
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
                href="https://drive.google.com/file/d/1Uwuk1fc6j7idN7o6-coz9A8sOyV0TDfA/view?usp=drive_link"
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
