'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Database, ShieldCheck, Cpu, Code2, Layers } from 'lucide-react';
import skillsData from '@/data/skills.json';

export default function SkillsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
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
    Terminal: <Terminal size={22} color="#60A5FA" />,
    Database: <Database size={22} color="#34D399" />,
    ShieldCheck: <ShieldCheck size={22} color="#A78BFA" />,
    Brain: <Layers size={22} color="#F472B6" />,
    Code2: <Code2 size={22} color="#FBBF24" />,
    Cpu: <Cpu size={22} color="#38BDF8" />,
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
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingLeft: isMobile ? '24px' : '60px',
          paddingRight: isMobile ? '24px' : '60px',
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
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: '#60A5FA',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            TECHNICAL STACK
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
            Tools, Technologies & <br />
            <span style={{ color: '#A78BFA' }}>Core Engineering Skills</span>
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
              style={{
                padding: '24px',
                borderRadius: '20px',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(16px)',
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
                    background: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {iconMap[cat.icon] || <Cpu size={22} color="#60A5FA" />}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#F8FAFC', margin: 0 }}>
                  {cat.title}
                </h3>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '12px',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.25)',
                      color: '#93C5FD',
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
              color: '#F8FAFC',
              fontFamily: "'Inter', sans-serif",
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
                <span style={{ color: '#F1F5F9', fontWeight: 600, fontFamily: "'JetBrains Mono', monospace" }}>
                  {skill.name}
                </span>
                <span style={{ color: '#60A5FA', fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                  {skill.percentage}%
                </span>
              </div>
              <div
                style={{
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '999px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: visible ? `${skill.percentage}%` : '0%',
                    background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #A78BFA)',
                    borderRadius: '999px',
                    transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: `${i * 0.1}s`,
                    boxShadow: '0 0 12px rgba(59, 130, 246, 0.5)',
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
