"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code, Award, Globe, FileText, ArrowUpRight } from "lucide-react";
import projectsData from "@/data/projects.json";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 35, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: 70, rotate: 2 },
  show: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const pop = {
  hidden: { opacity: 0, scale: 0.92, y: 25 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollToPortfolio = () => {
    const el = document.getElementById("portfolio");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (isMobile === null) return null;

  const projectCount = projectsData.length;

  const stats = [
    { icon: <Code size={16} />, value: String(projectCount), title: "PROJECTS" },
    { icon: <Globe size={16} />, value: "100%", title: "CLIENT SATISFACTION" },
    { icon: <Award size={16} />, value: "2+", title: "YEARS EXP" },
  ];

  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        padding: isMobile ? "60px 24px 30px" : "80px 60px 30px 120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Watermark */}
      <span className="section-watermark-left" aria-hidden="true">
        ABOUT ME
      </span>

      {/* Ambient Glow Orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-100px",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ width: "100%", position: "relative", zIndex: 1 }}>
        {/* TOP: Photo (left) + Text (right) — reversed from Himanshu's layout for dev identity */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px",
          }}
        >
          {/* PORTRAIT CARD — Real "A-OK" Photo */}
          {!isMobile && (
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false }}
              style={{
                flexShrink: 0,
                width: "44%",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  position: "relative",
                  borderRadius: 26,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow:
                    "0 0 0 1px rgba(230,57,70,0.15), 0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(193,18,31,0.2)",
                  width: "100%",
                  maxWidth: 400,
                  aspectRatio: "3/4",
                }}
              >
                {/* The real photo — use cover since image already has bokeh bg */}
                <img
                  src="/shreyash-bg-clean.png"
                  alt="Shreyash Srivastava"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                  }}
                />

                {/* Subtle bottom vignette to blend into section */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    height: "25%",
                    background: "linear-gradient(to top, rgba(5,3,5,0.6) 0%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />

                {/* "S-OK" tag — top right */}
                <div
                  style={{
                    position: "absolute",
                    top: 16, right: 16,
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    color: "rgba(255,255,255,0.28)",
                    userSelect: "none",
                  }}
                >
                  S-OK
                </div>
              </div>
            </motion.div>
          )}

          {/* TEXT COLUMN */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-80px" }}
            style={{ maxWidth: 560, width: "100%" }}
          >
            <motion.div variants={fadeUp} style={{ marginBottom: 16 }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--text-muted)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                ABOUT ME
              </span>
            </motion.div>

            <motion.div variants={fadeUp} style={{ marginBottom: 8 }}>
              <h2
                style={{
                  fontSize: isMobile ? 32 : "clamp(32px, 5vw, 46px)",
                  fontWeight: 800,
                  lineHeight: 1.03,
                  fontFamily: "var(--font-heading)",
                }}
              >
                <span style={{ color: "var(--text-sand)" }}>Crafting Systems</span>
                <br />
                <span
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1.5px rgba(255,255,255,0.7)",
                  }}
                >
                  Request by Request
                </span>
              </h2>
            </motion.div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.1, delay: 0.2 },
                },
              }}
              style={{
                marginTop: 16,
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.85,
                maxWidth: isMobile ? "100%" : 490,
              }}
            >
              I'm Shreyash Srivastava, a freelance backend engineer based in Noida, India.
              I've spent 2+ years refining the craft of high-performance API design, scalable
              microservices, and modern client-side web tools — working with startups and
              creators who refuse to settle for average.
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.1, delay: 0.35 },
                },
              }}
              style={{
                marginTop: 12,
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.85,
                maxWidth: isMobile ? "100%" : 490,
              }}
            >
              My philosophy is simple: every endpoint is intentional, every response
              serves the system, and every millisecond of latency is earned.
              I don't just write code — I architect experiences.
            </motion.p>

            {/* Quote */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.94 },
                show: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.9, delay: 0.45 },
                },
              }}
              style={{
                marginTop: 20,
                padding: "12px 20px",
                borderRadius: 12,
                border: "1px solid rgba(230,57,70,0.2)",
                borderLeft: "3px solid var(--accent-red)",
                background: "rgba(230,57,70,0.06)",
                fontSize: 13,
                fontStyle: "italic",
                color: "var(--text-sand)",
                display: "inline-block",
                width: "fit-content",
                maxWidth: "100%",
              }}
            >
              "Architecting high-performance digital systems with clean code and sub-millisecond efficiency."
            </motion.div>

            {/* BUTTONS */}
            <motion.div
              variants={fadeUp}
              style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}
            >
              <a
                href="https://drive.google.com/file/d/1Uwuk1fc6j7idN7o6-coz9A8sOyV0TDfA/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 20px",
                  borderRadius: 10,
                  border: "1px solid white",
                  background: "white",
                  color: "black",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "var(--font-heading)",
                  textDecoration: "none",
                  transition: "var(--transition)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
                  e.currentTarget.style.opacity = "0.92";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <FileText size={14} />
                View Resume
              </a>

              <button
                onClick={scrollToPortfolio}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 20px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.3)",
                  background: "transparent",
                  color: "white",
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "var(--font-heading)",
                  cursor: "pointer",
                  transition: "var(--transition)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                }}
              >
                <ArrowUpRight size={14} />
                View Projects
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* STATS CARDS */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: 18,
            marginTop: 48,
          }}
        >
          {stats.map((item, i) => (
            <motion.div
              key={i}
              variants={pop}
              whileHover={{ scale: 1.03, y: -4 }}
              style={{
                position: "relative",
                padding: 22,
                borderRadius: 18,
                border: "1px solid var(--border)",
                borderLeft: "3px solid var(--accent-red)",
                background: "var(--bg-card)",
                cursor: "pointer",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(230,57,70,0.4)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(230,57,70,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.borderLeftColor = "var(--accent-red)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  border: "1px solid rgba(230,57,70,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 10,
                  color: "var(--accent-red)",
                }}
              >
                {item.icon}
              </div>

              <div
                style={{
                  position: "absolute",
                  top: 18,
                  right: 18,
                  fontSize: 22,
                  fontWeight: 800,
                  color: "var(--text-sand)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {item.value}
              </div>

              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {item.title}
              </div>

              <div
                onClick={scrollToPortfolio}
                style={{ position: "absolute", bottom: 16, right: 16, cursor: "pointer", color: "var(--text-muted)" }}
              >
                <ArrowUpRight size={15} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
