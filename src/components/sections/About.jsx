'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Award, GraduationCap, Briefcase, FileText, ArrowUpRight, Github, Linkedin, ExternalLink } from 'lucide-react';
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

  const scrollToPortfolio = () => {
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (isMobile === null) return null;

  const projectCount = projectsData.length;

  const stats = [
    { icon: <Briefcase size={18} />, value: "SDE Intern", title: "JBH TECH INNOVATION" },
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
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: isMobile ? '24px' : '60px',
          paddingRight: isMobile ? '24px' : '60px',
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
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: '#60A5FA',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            ABOUT ME
          </span>
          <h2
            style={{
              fontSize: isMobile ? '32px' : '44px',
              fontWeight: 800,
              lineHeight: 1.1,
              marginTop: '8px',
              color: '#F8FAFC',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Architecting Scalable Systems <br />
            <span style={{ color: '#A78BFA' }}>Driven by Code & Precision.</span>
          </h2>
        </motion.div>

        {/* CONTENT GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '32px' : '60px',
            alignItems: 'start',
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
            <motion.p variants={fadeUp} style={{ fontSize: '15px', color: '#CBD5E1', lineHeight: 1.85, margin: 0 }}>
              I am <strong>Shreyash Srivastava (Ramboo)</strong>, a dedicated Backend Software Development Engineer currently serving as a <strong>Backend SDE Intern at JBH Tech Innovation</strong> in Faridabad. I am pursuing my <strong>B.Tech in Computer Science & Engineering at ITS Engineering College, Greater Noida (AKTU)</strong>, graduating in 2026.
            </motion.p>

            <motion.p variants={fadeUp} style={{ fontSize: '15px', color: '#94A3B8', lineHeight: 1.85, margin: 0 }}>
              My engineering focus lies in architecting fault-tolerant microservices, high-throughput REST APIs, relational PostgreSQL databases with Prisma ORM, real-time WebSockets with Socket.io, and asynchronous message queues with RabbitMQ and Redis.
            </motion.p>

            <motion.div
              variants={fadeUp}
              style={{
                padding: '16px 20px',
                borderRadius: '16px',
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderLeft: '4px solid #3B82F6',
              }}
            >
              <p style={{ fontSize: '14px', color: '#F1F5F9', fontStyle: 'italic', margin: 0 }}>
                "Every API endpoint should be clean, resilient, and optimized for sub-millisecond performance."
              </p>
            </motion.div>

            {/* QUICK LINK CTAS */}
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '10px' }}>
              <a
                href="https://github.com/ShreyashSrivastava15"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#F8FAFC',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
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
                  background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <FileText size={15} /> Download CV
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT: STAT CARDS & HIGHLIGHTS */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '16px',
            }}
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.02 }}
                style={{
                  padding: '24px',
                  borderRadius: '20px',
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(16px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    background: 'rgba(59, 130, 246, 0.15)',
                    color: '#60A5FA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#F8FAFC' }}>{stat.value}</div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#94A3B8',
                      fontFamily: "'JetBrains Mono', monospace",
                      marginTop: '2px',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {stat.title}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
