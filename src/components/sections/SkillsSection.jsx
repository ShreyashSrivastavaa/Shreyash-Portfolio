'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, ShieldCheck, Cpu, Code2, Layers } from 'lucide-react';
import skillsData from '@/data/skills.json';

export default function SkillsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const iconMap = {
    Terminal: <Terminal size={22} color="var(--accent-red)" />,
    Database: <Database size={22} color="var(--text-sand)" />,
    ShieldCheck: <ShieldCheck size={22} color="var(--accent-red)" />,
    Brain: <Layers size={22} color="var(--text-sand)" />,
    Code2: <Code2 size={22} color="var(--accent-red)" />,
    Cpu: <Cpu size={22} color="var(--text-sand)" />,
  };

  const categories = skillsData.skillCategories || [];
  const coreSkills = skillsData.coreSkills || [];

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        paddingTop: isMobile ? '80px' : '120px',
        paddingBottom: isMobile ? '80px' : '120px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* SECTION WATERMARK */}
      <span className="section-watermark" aria-hidden="true">SKILLS</span>

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
        {/* HEADER */}
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
            TECHNICAL STACK
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
            <span style={{ color: 'var(--text-sand)' }}>Tools & Technologies</span>
            <br />
            <span
              style={{
                color: 'transparent',
                WebkitTextStroke: '2px rgba(255,255,255,0.55)',
              }}
            >
              Core Engineering Skills
            </span>
          </h2>
        </motion.div>

        {/* SKILL CATEGORIES GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '64px',
          }}
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              className="glass-card"
              style={{
                padding: '24px',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    padding: '10px',
                    borderRadius: '12px',
                    background: 'rgba(230, 57, 70, 0.1)',
                  }}
                >
                  {iconMap[cat.icon] || <Cpu size={22} color="var(--accent-red)" />}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-sand)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                  {cat.title}
                </h3>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      background: 'rgba(230, 57, 70, 0.08)',
                      border: '1px solid rgba(230, 57, 70, 0.2)',
                      color: 'var(--text-secondary)',
                      transition: 'var(--transition-fast)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* PROFICIENCY BARS SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '24px' }}
        >
          <h3
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--text-sand)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Core Competencies & Proficiency
          </h3>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '20px' : '36px',
          }}
        >
          {coreSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  fontSize: '13px',
                }}
              >
                <span style={{ color: 'var(--text-sand)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                  {skill.name}
                </span>
                <span style={{ color: 'var(--accent-red)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {skill.percentage}%
                </span>
              </div>
              <div
                style={{
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: '999px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: visible ? `${skill.percentage}%` : '0%',
                    background: 'linear-gradient(90deg, var(--accent-red), var(--accent-crimson))',
                    borderRadius: '999px',
                    transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: `${i * 0.1}s`,
                    boxShadow: '0 0 12px var(--accent-red-glow)',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
