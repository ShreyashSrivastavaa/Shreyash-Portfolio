"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import App from "@/components/band/App";
import TextType from "@/components/band/TextType";

const skills = ["Node.js", "Express.js", "MongoDB", "TypeScript", "React", "Next.js", "REST APIs", "Redis"];

export default function Hero({ showApp }) {
  const [startAnim, setStartAnim] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const heroPlayed = sessionStorage.getItem("heroPlayed");

    if (heroPlayed === "true") {
      setStartAnim(true);
      return;
    }

    const delay = 2600;

    const textTimer = setTimeout(() => {
      setStartAnim(true);
    }, delay);

    const appTimer = setTimeout(() => {
      sessionStorage.setItem("heroPlayed", "true");
    }, delay + 1000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(appTimer);
    };
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── FULL-BLEED PHOTO BACKGROUND ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <picture>
          {/* Desktop / Laptop — wide landscape shot */}
          <source
            srcSet="/bg-laptop-clean.png"
            media="(min-width: 768px)"
          />
          {/* Mobile — portrait crop */}
          <img
            src="/bg-phone-clean.png"
            alt="Hero Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              display: "block",
            }}
          />
        </picture>

        {/* Overlays */}
        <div className="hero-bg-overlay-left" />
        <div className="hero-bg-overlay-bottom" />
        <div className="hero-ambient-red" />
        <div className="hero-ambient-crimson" />

        {/* Background Name Watermark */}
        {!isMobile && (
          <div className="hero-bg-name-wrapper">
            <span className="bg-name-line">SHREYASH</span>
            <span className="bg-name-line">SRIVASTAVA</span>
          </div>
        )}
      </div>

      {/* ── APP LAYER (3D / Interactive) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 40,
          pointerEvents: showApp ? "auto" : "none",
        }}
      >
        {showApp && <App />}
      </div>

      {/* ── HERO CONTENT ── */}
      <div
        className={isMobile ? "px-6" : ""}
        style={{
          width: "100%",
          maxWidth: isMobile ? "100%" : 680,
          marginLeft: isMobile ? 0 : "clamp(40px, 8vw, 120px)",
          position: "relative",
          zIndex: 10,
          paddingTop: 80,
          paddingBottom: 80,
        }}
      >
        {/* Available Badge */}
        <motion.div
          initial={false}
          animate={
            startAnim
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 22 }}
        >
          <span className="available-badge">
            <span className="badge-dot" />
            Available for New Projects
          </span>
        </motion.div>

        {/* HEADLINE — Poster Style */}
        <motion.div
          initial={false}
          animate={
            startAnim
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 40, filter: "blur(12px)" }
          }
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ marginBottom: 20 }}
        >
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(32px, 6vw, 68px)",
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.01em",
              color: "var(--text-sand)",
            }}
          >
            I DON'T JUST
            <br />
            <span style={{ color: "var(--text-sand)" }}>BUILD </span>
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "2px rgba(255,255,255,0.85)",
              }}
            >
              BACKENDS.
            </span>
            <br />
            <span style={{ color: "var(--text-sand)" }}>I BUILD </span>
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "2px rgba(255,255,255,0.85)",
              }}
            >
              SYSTEMS.
            </span>
          </h1>
        </motion.div>

        {/* Typewriter Subtitle */}
        <motion.div
          initial={false}
          animate={startAnim ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{ marginBottom: 18 }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 15,
              color: "var(--text-secondary)",
              letterSpacing: "0.1em",
            }}
          >
            <TextType
              text={["Shreyash Srivastava", "Backend Architect", "Web Developer", "Happy Coding!"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor
              cursorCharacter="_"
              deletingSpeed={50}
              cursorBlinkDuration={0.5}
            />
          </span>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={false}
          animate={
            startAnim
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 40, scale: 0.97 }
          }
          transition={{ duration: 1, delay: 0.5 }}
          style={{ marginBottom: 28, maxWidth: 480 }}
        >
          <p
            style={{
              fontSize: 14,
              color: "var(--text-secondary)",
              lineHeight: 1.8,
            }}
          >
            I transform raw requirements into cinematic digital products — crafting
            high-performance APIs, clean microservices, and modern web apps that
            leave a lasting impression — request by request.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={false}
          animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}
        >
          <a
            href="#portfolio"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              borderRadius: 9999,
              background: "rgba(10,10,10,0.85)",
              color: "var(--text-sand)",
              border: "1px solid rgba(244,228,208,0.25)",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "var(--font-heading)",
              textDecoration: "none",
              transition: "var(--transition)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(30,30,30,0.9)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(10,10,10,0.85)";
              e.currentTarget.style.color = "var(--text-sand)";
              e.currentTarget.style.borderColor = "rgba(244,228,208,0.25)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            View Projects →
          </a>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              borderRadius: 9999,
              background: "rgba(255,255,255,0.08)",
              color: "var(--text-sand)",
              border: "1px solid rgba(244,228,208,0.2)",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "var(--font-heading)",
              textDecoration: "none",
              transition: "var(--transition)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.16)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Contact Me
          </a>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={false}
          animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="stats-strip"
        >
          <div className="stat-item">
            <span className="stat-number">2+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">10+</span>
            <span className="stat-label">Projects Shipped</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={false}
        animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          bottom: 38,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0], opacity: [1, 0.65, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Scroll
          </span>
          <span style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1 }}>↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
