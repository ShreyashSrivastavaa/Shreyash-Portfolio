'use client'

import React, { useRef, useEffect, useCallback } from 'react'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import projectsData from '@/data/projects.json'

// Curated 6 core featured projects in priority order
const ORDERED_FEATURED_IDS = [
  'ihatelovepdf',
  'weddinginvite',
  'gitfc',
  'zymeal',
  'swiperide',
  'savethesystem',
]

const FEATURED_PROJECTS = ORDERED_FEATURED_IDS.map((id) =>
  projectsData.find((p) => p.id === id)
).filter(Boolean)

const MORE_PROJECTS = projectsData.filter(
  (p) => !ORDERED_FEATURED_IDS.includes(p.id)
)

const TOTAL_CARDS = FEATURED_PROJECTS.length + 1

// Three.js world units - calibrated to 76% viewport height with clear headroom & footroom
const CARD_WIDTH = 5.35
const CARD_HEIGHT = 3.01
const CARD_SPACING = 6.2
const MAX_OFFSET = (TOTAL_CARDS - 1) * CARD_SPACING

// Bold, editorial copywriting matching reference hierarchy
const EDITORIAL_PROJECT_DATA = {
  ihatelovepdf: {
    heroHeadline:
      'Zero server file uploads, client-side WebAssembly OCR, and 45 tools built for 100% private document processing.',
    heroSubtext:
      'A privacy-first web toolkit replacing slow, paywalled online converters with instant in-browser WebAssembly execution.',
    brandMark: 'Client-Side · Utility',
    brandBadge: '45-TOOL SUITE',
  },
  weddinginvite: {
    heroHeadline:
      'WhatsApp-first wedding guest list and RSVP platform built for Indian weddings.',
    heroSubtext:
      'A simple way for couples and families to share invites on WhatsApp, collect RSVPs, and track headcounts without per-message costs.',
    brandMark: 'Web App · Events',
    brandBadge: 'RSVP PLATFORM',
  },
  savethesystem: {
    heroHeadline:
      'Interactive browser simulator for debugging high-traffic server outages.',
    heroSubtext:
      'A hands-on training sandbox where engineers practice incident triage, inspecting logs, and configuring rate limiters under simulated stress.',
    brandMark: 'Systems Design · Simulator',
    brandBadge: 'INCIDENT LAB',
  },
  gitfc: {
    heroHeadline:
      'Turn your GitHub commits, PRs, and top languages into a custom EA FC-style trading card.',
    heroSubtext:
      'A fun web app that connects to the GitHub API, calculates your dev stats, and renders high-res cards directly in your browser.',
    brandMark: 'Developer Tools · Web App',
    brandBadge: 'STAT CARD GENERATOR',
  },
  zymeal: {
    heroHeadline:
      'Real-time cafeteria food ordering with live order tracking over WebSockets.',
    heroSubtext:
      'A full-stack app for diners and kitchen staff to browse menus, place orders, and follow food preparation live without refreshing.',
    brandMark: 'Full-Stack · WebSockets',
    brandBadge: 'LIVE FOOD ORDERING',
  },
  swiperide: {
    heroHeadline:
      'Real-time ride-hailing backend API with fast geospatial driver matching.',
    heroSubtext:
      'Matches riders with nearby drivers in milliseconds using Redis coordinate caching, MongoDB 2DSphere indexes, and WebSocket trip updates.',
    brandMark: 'Backend Architecture · APIs',
    brandBadge: 'RIDE-HAILING API',
  },
}

// ─────────────────────────────────────────────────────────────
// 1. HIGH-RESOLUTION 2D CANVAS TEXTURE GENERATOR
// ─────────────────────────────────────────────────────────────
function drawCardToCanvas(canvas, project, index, editorial, imageEl, logoEl) {
  const ctx = canvas.getContext('2d')
  const W = 2048
  const H = 1152
  canvas.width = W
  canvas.height = H

  // 1. Base White Card Background
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, W, H)

  // Border
  ctx.strokeStyle = '#d3d3c8'
  ctx.lineWidth = 4
  ctx.strokeRect(2, 2, W - 4, H - 4)

  // 2. Left Column (Editorial Headline & Content)
  const leftW = 1040
  const padL = 76
  const padT = 80

  const monoFont =
    '600 22px ui-monospace, "SF Mono", "Cascadia Code", "JetBrains Mono", Menlo, Consolas, monospace'
  const sansBoldFont =
    'bold 48px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif'
  const sansRegularFont =
    '400 26px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif'
  const sansMediumFont =
    '600 24px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif'

  // Panel Header
  ctx.font = monoFont
  ctx.fillStyle = '#8e9087'
  const indexStr = String(index + 1).padStart(2, '0')
  const shortTitle = (project.title || '').split(':')[0]
  ctx.fillText(`${indexStr} / FEATURED WORK   •   ${shortTitle}`, padL, padT)

  // Badge Pill
  const badgeText = editorial.brandBadge || 'PRODUCTION'
  ctx.font = '600 18px ui-monospace, "SF Mono", Menlo, monospace'
  const badgeWidth = ctx.measureText(badgeText).width + 32
  const badgeX = padL
  const badgeY = padT + 30
  const badgeH = 36

  ctx.fillStyle = 'rgba(0, 102, 255, 0.1)'
  ctx.beginPath()
  ctx.roundRect(badgeX, badgeY, badgeWidth, badgeH, 6)
  ctx.fill()
  ctx.strokeStyle = 'rgba(0, 102, 255, 0.35)'
  ctx.lineWidth = 2
  ctx.stroke()

  ctx.fillStyle = '#0066ff'
  ctx.fillText(badgeText, badgeX + 16, badgeY + 25)

  // Brand Mark
  ctx.font = monoFont
  ctx.fillStyle = '#6f7168'
  ctx.fillText(
    editorial.brandMark || 'Zenith District',
    badgeX + badgeWidth + 24,
    badgeY + 26
  )

  // Editorial Bold Headline
  ctx.fillStyle = '#242620'
  ctx.font = sansBoldFont
  const headline = editorial.heroHeadline
  const maxTextW = leftW - padL - 40

  function wrapText(text, maxWidth) {
    const words = (text || '').split(' ')
    const lines = []
    let currentLine = words[0] || ''

    for (let i = 1; i < words.length; i++) {
      const word = words[i]
      const width = ctx.measureText(currentLine + ' ' + word).width
      if (width < maxWidth) {
        currentLine += ' ' + word
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    }
    lines.push(currentLine)
    return lines
  }

  const headlineLines = wrapText(headline, maxTextW)
  let textY = badgeY + 100
  const lineH = 62
  headlineLines.slice(0, 4).forEach((line) => {
    ctx.fillText(line, padL, textY)
    textY += lineH
  })

  // Subtext
  ctx.fillStyle = '#6f7168'
  ctx.font = sansRegularFont
  const subtextLines = wrapText(editorial.heroSubtext, maxTextW)
  textY += 20
  const sublineH = 40
  subtextLines.slice(0, 3).forEach((line) => {
    ctx.fillText(line, padL, textY)
    textY += sublineH
  })

  // CTA Button Pill: "view case study →"
  const btnX = padL
  const btnY = H - 150
  const btnW = 280
  const btnH = 64
  ctx.fillStyle = '#242620'
  ctx.beginPath()
  ctx.roundRect(btnX, btnY, btnW, btnH, 32)
  ctx.fill()

  ctx.fillStyle = '#ffffff'
  ctx.font = sansMediumFont
  ctx.fillText('view case study  →', btnX + 38, btnY + 41)

  // Tech Tags
  let tagX = btnX + btnW + 24
  const techList = project.tech?.slice(0, 3) || ['TypeScript', 'React', 'Next.js']
  ctx.font = '500 20px ui-monospace, "SF Mono", monospace'

  techList.forEach((tag) => {
    const tw = ctx.measureText(tag).width + 32
    const th = 48
    const ty = btnY + 8

    ctx.fillStyle = '#f1f0eb'
    ctx.beginPath()
    ctx.roundRect(tagX, ty, tw, th, 8)
    ctx.fill()

    ctx.strokeStyle = '#d3d3c8'
    ctx.lineWidth = 1.5
    ctx.stroke()

    ctx.fillStyle = '#6f7168'
    ctx.fillText(tag, tagX + 16, ty + 31)
    tagX += tw + 14
  })

  // Divider Line between columns
  ctx.strokeStyle = '#e6e5df'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(leftW, 60)
  ctx.lineTo(leftW, H - 60)
  ctx.stroke()

  // 3. Right Column: High-Res Mockup Image
  const imgBoxX = leftW + 48
  const imgBoxY = 60
  const imgBoxW = W - leftW - 96
  const imgBoxH = H - 120

  ctx.fillStyle = '#f6f6f2'
  ctx.beginPath()
  ctx.roundRect(imgBoxX, imgBoxY, imgBoxW, imgBoxH, 20)
  ctx.fill()
  ctx.strokeStyle = '#dcdcd2'
  ctx.lineWidth = 2
  ctx.stroke()

  if (imageEl && imageEl.complete && imageEl.naturalWidth > 0) {
    ctx.save()
    ctx.beginPath()
    ctx.roundRect(imgBoxX + 16, imgBoxY + 16, imgBoxW - 32, imgBoxH - 32, 14)
    ctx.clip()

    const imgRatio = imageEl.naturalWidth / imageEl.naturalHeight
    const boxRatio = (imgBoxW - 32) / (imgBoxH - 32)
    let dw, dh, dx, dy

    if (imgRatio > boxRatio) {
      dh = imgBoxH - 32
      dw = dh * imgRatio
      dx = imgBoxX + 16 - (dw - (imgBoxW - 32)) / 2
      dy = imgBoxY + 16
    } else {
      dw = imgBoxW - 32
      dh = dw / imgRatio
      dx = imgBoxX + 16
      dy = imgBoxY + 16 - (dh - (imgBoxH - 32)) / 2
    }

    ctx.drawImage(imageEl, dx, dy, dw, dh)
    ctx.restore()
  } else {
    // Elegant fallback graphic with project identity
    ctx.fillStyle = '#242620'
    ctx.font = sansBoldFont
    ctx.textAlign = 'center'
    ctx.fillText(project.title || 'Engineering Project', imgBoxX + imgBoxW / 2, imgBoxY + imgBoxH / 2 - 20)

    ctx.fillStyle = '#0066ff'
    ctx.font = '600 24px ui-monospace, "SF Mono", monospace'
    ctx.fillText(project.category || 'FEATURED WORK', imgBoxX + imgBoxW / 2, imgBoxY + imgBoxH / 2 + 35)
    ctx.textAlign = 'left'
  }

  // Floating pill: "open study ↗"
  const pillW = 160
  const pillH = 44
  const pillX = imgBoxX + imgBoxW - pillW - 32
  const pillY = imgBoxY + imgBoxH - pillH - 32

  ctx.fillStyle = 'rgba(20, 18, 18, 0.88)'
  ctx.beginPath()
  ctx.roundRect(pillX, pillY, pillW, pillH, 22)
  ctx.fill()

  ctx.fillStyle = '#ffffff'
  ctx.font = '600 17px system-ui, -apple-system, sans-serif'
  ctx.fillText('open study  ↗', pillX + 26, pillY + 28)
}

// 7th Card: Archive & Complete Inventory (High-legibility 2-column layout)
function drawArchiveCard(canvas, moreProjects) {
  const ctx = canvas.getContext('2d')
  const W = 2048
  const H = 1152
  canvas.width = W
  canvas.height = H

  ctx.fillStyle = '#181616'
  ctx.fillRect(0, 0, W, H)

  ctx.strokeStyle = '#2d2b2b'
  ctx.lineWidth = 4
  ctx.strokeRect(2, 2, W - 4, H - 4)

  const padX = 90
  const padY = 56
  const items = moreProjects || []
  const totalCount = FEATURED_PROJECTS.length + items.length

  // Header Bar
  ctx.font = 'bold 22px ui-monospace, "SF Mono", monospace'
  ctx.fillStyle = '#0066ff'
  ctx.fillText(`ARCHIVE / COMPLETE INVENTORY   •   ALL ${totalCount} PROJECTS LIVE`, padX, padY + 12)

  ctx.font = 'bold 54px system-ui, -apple-system, sans-serif'
  ctx.fillStyle = '#f1f0eb'
  ctx.fillText('All Other Projects & Tools', padX, padY + 70)

  ctx.font = '400 24px system-ui, -apple-system, sans-serif'
  ctx.fillStyle = '#a0a0a0'
  ctx.fillText(
    `Browse all ${items.length} additional systems, utilities, and applications — click any box to open:`,
    padX,
    padY + 112
  )

  // 2-Column Balanced Grid (5 rows x 2 cols = 10 items perfectly filled!)
  const cols = 2
  const gapX = 36
  const gapY = 16
  const startY = padY + 144
  const colW = (W - padX * 2 - gapX) / cols // 916px wide!
  const rowH = 144 // Generous 144px per card!

  items.forEach((proj, idx) => {
    const col = idx % cols
    const row = Math.floor(idx / cols)
    const x = padX + col * (colW + gapX)
    const y = startY + row * (rowH + gapY)

    // Card background
    ctx.fillStyle = '#201e1e'
    ctx.beginPath()
    ctx.roundRect(x, y, colW, rowH, 16)
    ctx.fill()

    ctx.strokeStyle = '#323030'
    ctx.lineWidth = 2
    ctx.stroke()

    // Title (Huge, readable 30px bold font)
    ctx.fillStyle = '#f1f0eb'
    ctx.font = 'bold 30px system-ui, -apple-system, sans-serif'
    let title = proj.title || proj.name || 'Project'
    if (title.includes(':')) {
      title = title.split(':')[0]
    }
    if (title.length > 28) {
      title = title.slice(0, 26) + '...'
    }
    ctx.fillText(title, x + 28, y + 46)

    // Tech Stack (Clear 20px font)
    ctx.fillStyle = '#a0a0a0'
    ctx.font = '500 20px ui-monospace, "SF Mono", monospace'
    const techText = proj.tech?.slice(0, 3).join('  •  ') || 'Full-Stack'
    ctx.fillText(techText, x + 28, y + 84)

    // Category Badge Pill
    const catText = proj.category ? proj.category.toUpperCase() : 'WEB APP'
    ctx.font = '600 14px ui-monospace, "SF Mono", monospace'
    const catW = ctx.measureText(catText).width + 24
    ctx.fillStyle = 'rgba(0, 102, 255, 0.12)'
    ctx.beginPath()
    ctx.roundRect(x + 28, y + 102, catW, 26, 6)
    ctx.fill()
    ctx.strokeStyle = 'rgba(0, 102, 255, 0.35)'
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.fillStyle = '#0066ff'
    ctx.fillText(catText, x + 40, y + 120)

    // Right Arrow Button Circle
    const arrowX = x + colW - 48
    const arrowY = y + rowH / 2
    ctx.fillStyle = '#2b2929'
    ctx.beginPath()
    ctx.arc(arrowX, arrowY, 22, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = '#444'
    ctx.lineWidth = 1.5
    ctx.stroke()

    ctx.fillStyle = '#0066ff'
    ctx.font = 'bold 22px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('→', arrowX, arrowY + 7)
    ctx.textAlign = 'left'
  })

  // Bottom CTA Button (Prominent 64px height with 22px bold font)
  const btnY = H - 86
  const btnH = 64
  ctx.fillStyle = '#0066ff'
  ctx.beginPath()
  ctx.roundRect(padX, btnY, W - padX * 2, btnH, 32)
  ctx.fill()

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 22px system-ui, -apple-system, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText(`VIEW COMPLETE ${totalCount}-PROJECT ARCHIVE (SEARCH, FILTERS & DETAILS)   ↗`, W / 2, btnY + 40)
  ctx.textAlign = 'left'
}

// ─────────────────────────────────────────────────────────────
// 2. GLSL SHADERS - FLICKER-FREE INWARD VR CONCAVE PERSPECTIVE
// ─────────────────────────────────────────────────────────────
const vertexShader = `
  precision highp float;
  uniform float uOffset;
  uniform float uVelocity;
  uniform float uCardIndex;
  uniform float uCardSpacing;

  varying vec2 vUv;
  varying float vWorldX;

  void main() {
    vUv = uv;

    // True horizontal coordinate relative to camera center along travel line
    float worldX = position.x + (uCardIndex * uCardSpacing) - uOffset;
    vWorldX = worldX;

    // Card center horizontal distance from screen center
    float cardCenterX = (uCardIndex * uCardSpacing) - uOffset;
    float distFromCenter = abs(cardCenterX);

    // ─────────────────────────────────────────────────────────────
    // ADAPTIVE CURVATURE ENGINE:
    // Side se aaye tabh curvy | Center mei flat | Left mei jaaye tabh curvy
    // When centered (distFromCenter < 0.6), curveWeight is 0.0 -> 100% FLAT.
    // As it moves to sides (distFromCenter > 0.6), curveWeight smoothly reaches 1.0 -> CURVY!
    // ─────────────────────────────────────────────────────────────
    float curveWeight = smoothstep(0.45, 4.4, distFromCenter);

    float R = 8.2;
    float clampedX = clamp(worldX, -6.8, 6.8);
    float rawBentZ = R - sqrt(max(0.01, R * R - clampedX * clampedX));
    float bentZ = rawBentZ * curveWeight;

    // VR lens barrel distortion: active only in periphery when card curves on sides
    float rawBarrel = (clampedX * clampedX) / (R * R) * 0.14;
    float barrel = 1.0 + rawBarrel * curveWeight;
    float bentY = position.y * barrel;

    // Gentle velocity spring response (flat when centered)
    bentZ -= sin(uv.x * 3.14159265) * uVelocity * 0.05 * curveWeight;

    vec3 transformed = vec3(worldX, bentY, bentZ);
    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  precision highp float;
  uniform sampler2D uTexture;
  uniform vec2 uCardSize;
  uniform float uRadiusCorner;

  varying vec2 vUv;
  varying float vWorldX;

  // Antialiased rounded corner SDF
  float roundedBoxSDF(vec2 p, vec2 b, float r) {
    vec2 d = abs(p) - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
  }

  void main() {
    vec2 p = (vUv - 0.5) * uCardSize;
    vec2 b = uCardSize * 0.5;
    float dist = roundedBoxSDF(p, b, uRadiusCorner);

    if (dist > 0.0) {
      discard;
    }

    float cornerAlpha = 1.0 - smoothstep(-0.02, 0.0, dist);

    // Crystal-clear single-sample texture (zero multi-tap jitter/shimmer!)
    vec4 color = texture2D(uTexture, vUv);

    // Subtle depth darkening for distant peripheral cards to focus center
    float depthFade = clamp(1.0 - abs(vWorldX) * 0.065, 0.52, 1.0);
    color.rgb *= depthFade;

    gl_FragColor = vec4(color.rgb, color.a * cornerAlpha);
  }
`

// ─────────────────────────────────────────────────────────────
// 3. MAIN WEBGL COMPONENT (STABLE, SINGLE-INITIALIZATION)
// ─────────────────────────────────────────────────────────────
export default function CurvedWorkGalleryWebGL({
  containerRef,
  onProgressChange,
  currentCardIndex,
  onCardChange,
}) {
  const canvasRef = useRef(null)
  const router = useRouter()

  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const materialsRef = useRef([])
  const meshesRef = useRef([])

  const currentOffsetRef = useRef(0)
  const targetOffsetRef = useRef(0)
  const velocityRef = useRef(0)
  const animFrameRef = useRef(null)
  const isOffscreenRef = useRef(false)

  const raycasterRef = useRef(new THREE.Raycaster())
  const mouseRef = useRef(new THREE.Vector2())

  // Keep callback refs stable to avoid any useEffect re-triggering
  const onProgressChangeRef = useRef(onProgressChange)
  onProgressChangeRef.current = onProgressChange

  const onCardChangeRef = useRef(onCardChange)
  onCardChangeRef.current = onCardChange

  // INITIALIZE THREE.JS EXACTLY ONCE
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const width = window.innerWidth
    const height = window.innerHeight

    // 1. Scene & Camera (FOV 38, Position at Z = 5.8)
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50)
    camera.position.set(0, 0, 5.8)
    camera.lookAt(0, 0, 0.0)
    cameraRef.current = camera

    // 2. Renderer with High DPR and Antialiasing
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x141212, 1)
    renderer.debug.checkShaderErrors = false
    rendererRef.current = renderer

    // 3. Geometry: 64x32 segments for silky-smooth inward curvature
    const geometry = new THREE.PlaneGeometry(CARD_WIDTH, CARD_HEIGHT, 64, 32)

    // 4. Create Card Textures & Meshes
    const materials = []
    const meshes = []

    for (let i = 0; i < TOTAL_CARDS; i++) {
      const cardCanvas = document.createElement('canvas')

      if (i < FEATURED_PROJECTS.length) {
        const proj = FEATURED_PROJECTS[i]
        const editorial = EDITORIAL_PROJECT_DATA[proj.id] || {
          heroHeadline: proj.tagline || proj.description,
          heroSubtext: proj.description,
          brandMark: 'Engineering Project',
          brandBadge: 'PRODUCTION',
        }

        const imgSrc = proj.image_urls?.[0] || proj.image_url || null
        const logoSrc = proj.logo_url || null

        // Initial draw
        drawCardToCanvas(cardCanvas, proj, i, editorial, null, null)
        const texture = new THREE.CanvasTexture(cardCanvas)
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter

        // Preload and redraw immediately on load or from cache
        if (imgSrc) {
          const img = new Image()
          const logoImg = logoSrc ? new Image() : null

          const updateTexture = () => {
            drawCardToCanvas(cardCanvas, proj, i, editorial, img, logoImg)
            texture.needsUpdate = true
          }

          img.onload = updateTexture
          img.src = imgSrc

          if (logoImg) {
            logoImg.onload = updateTexture
            logoImg.src = logoSrc
            if (logoImg.complete && logoImg.naturalWidth > 0) {
              updateTexture()
            }
          }

          if (img.complete && img.naturalWidth > 0) {
            updateTexture()
          }
        }

        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uTexture: { value: texture },
            uOffset: { value: 0.0 },
            uVelocity: { value: 0.0 },
            uCardIndex: { value: i },
            uCardSpacing: { value: CARD_SPACING },
            uCardSize: { value: new THREE.Vector2(CARD_WIDTH, CARD_HEIGHT) },
            uRadiusCorner: { value: 0.22 },
          },
          transparent: true,
          side: THREE.DoubleSide,
        })

        const mesh = new THREE.Mesh(geometry, material)
        mesh.userData = { projectId: proj.id, index: i }
        scene.add(mesh)
        materials.push(material)
        meshes.push(mesh)
      } else {
        // Archive Card
        drawArchiveCard(cardCanvas, MORE_PROJECTS)
        const texture = new THREE.CanvasTexture(cardCanvas)
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter

        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: {
            uTexture: { value: texture },
            uOffset: { value: 0.0 },
            uVelocity: { value: 0.0 },
            uCardIndex: { value: i },
            uCardSpacing: { value: CARD_SPACING },
            uCardSize: { value: new THREE.Vector2(CARD_WIDTH, CARD_HEIGHT) },
            uRadiusCorner: { value: 0.22 },
          },
          transparent: true,
          side: THREE.DoubleSide,
        })

        const mesh = new THREE.Mesh(geometry, material)
        mesh.userData = { isArchive: true, index: i }
        scene.add(mesh)
        materials.push(material)
        meshes.push(mesh)
      }
    }

    materialsRef.current = materials
    meshesRef.current = meshes

    // 5. Render Loop (FLICKER-FREE, PURE LERP)
    let lastReportedIndex = -1

    const render = () => {
      animFrameRef.current = requestAnimationFrame(render)

      if (isOffscreenRef.current) return

      // Smooth inertial glide
      const prev = currentOffsetRef.current
      currentOffsetRef.current += (targetOffsetRef.current - currentOffsetRef.current) * 0.082
      const delta = currentOffsetRef.current - prev

      velocityRef.current = Math.max(-0.2, Math.min(0.2, delta))

      const curOffset = currentOffsetRef.current
      const curVel = velocityRef.current

      // Update uniforms for all meshes (no popping or sudden culling)
      for (let i = 0; i < TOTAL_CARDS; i++) {
        materials[i].uniforms.uOffset.value = curOffset
        materials[i].uniforms.uVelocity.value = curVel
      }

      // Report active card index cleanly when it changes
      const activeIdx = Math.max(0, Math.min(TOTAL_CARDS - 1, Math.round(curOffset / CARD_SPACING)))
      if (activeIdx !== lastReportedIndex) {
        lastReportedIndex = activeIdx
        onCardChangeRef.current?.(activeIdx)
      }

      const progress = Math.max(0, Math.min(1, curOffset / MAX_OFFSET))
      onProgressChangeRef.current?.(progress)

      try {
        renderer.render(scene, camera)
      } catch (e) {
        // Suppress frame render hiccups
      }
    }

    animFrameRef.current = requestAnimationFrame(render)

    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      geometry.dispose()
      materials.forEach((m) => {
        m.uniforms.uTexture.value?.dispose()
        m.dispose()
      })
      renderer.dispose()
    }
  }, []) // Empty dependency array: mounted once!

  // ─────────────────────────────────────────────────────────────
  // 4. SCROLL SYNC - PURE CONTAINER SCROLL (NO FIGHTING SNAP)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef?.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const scrollHeight = container.offsetHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const scrolled = Math.max(0, Math.min(scrollHeight, -rect.top))
      const progress = scrolled / scrollHeight
      targetOffsetRef.current = progress * MAX_OFFSET
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [containerRef])

  // Pause rendering when section is completely offscreen
  useEffect(() => {
    const container = containerRef?.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isOffscreenRef.current = !entry.isIntersecting
      },
      { rootMargin: '100px 0px' }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [containerRef])

  // Track pointer down position to differentiate clicks from drags
  const pointerDownPosRef = useRef({ x: 0, y: 0 })

  // Mathematical ray-plane hit test that accounts for card positions & curvature
  const getCardAtPointer = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current
    const camera = cameraRef.current
    if (!canvas || !camera) return null

    const rect = canvas.getBoundingClientRect()
    const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1
    const ndcY = -((clientY - rect.top) / rect.height) * 2 + 1

    const raycaster = raycasterRef.current
    raycaster.setFromCamera({ x: ndcX, y: ndcY }, camera)
    const ray = raycaster.ray

    // Intersect plane Z = 0
    if (Math.abs(ray.direction.z) < 1e-5) return null
    const t = (0 - ray.origin.z) / ray.direction.z
    if (t < 0) return null

    const hitX = ray.origin.x + t * ray.direction.x
    const hitY = ray.origin.y + t * ray.direction.y

    const curOffset = currentOffsetRef.current
    const halfW = CARD_WIDTH / 2
    const halfH = CARD_HEIGHT / 2

    // Check vertical bounds
    if (Math.abs(hitY) > halfH + 0.15) return null

    // Gather candidate cards visible on screen
    const candidates = []
    for (let i = 0; i < TOTAL_CARDS; i++) {
      const cardCenterX = i * CARD_SPACING - curOffset
      if (Math.abs(cardCenterX) < 7.0) {
        candidates.push({
          index: i,
          cardCenterX,
          distFromCenter: Math.abs(cardCenterX),
        })
      }
    }

    // Sort front-most (closest to screen center) first
    candidates.sort((a, b) => a.distFromCenter - b.distFromCenter)

    for (const cand of candidates) {
      const localX = hitX - cand.cardCenterX
      const localY = hitY

      if (Math.abs(localX) <= halfW && Math.abs(localY) <= halfH) {
        const u = Math.max(0, Math.min(1, (localX + halfW) / CARD_WIDTH))
        const v = Math.max(0, Math.min(1, (localY + halfH) / CARD_HEIGHT))

        const isArchive = cand.index >= FEATURED_PROJECTS.length
        const project = !isArchive ? FEATURED_PROJECTS[cand.index] : null

        return {
          cardIndex: cand.index,
          cardCenterX: cand.cardCenterX,
          distFromCenter: cand.distFromCenter,
          isArchive,
          project,
          u,
          v,
        }
      }
    }

    return null
  }, [])

  // Raycast Click Handler
  const handlePointerDown = (e) => {
    pointerDownPosRef.current = { x: e.clientX, y: e.clientY }
  }

  const handlePointerUp = (e) => {
    const dx = Math.abs(e.clientX - pointerDownPosRef.current.x)
    const dy = Math.abs(e.clientY - pointerDownPosRef.current.y)
    // Ignore drags / swipes
    if (dx > 12 || dy > 12) return

    const hit = getCardAtPointer(e.clientX, e.clientY)
    if (!hit) return

    // If an off-center side card was clicked, bring it into center focus
    if (hit.distFromCenter > 2.2) {
      scrollToCard(hit.cardIndex)
      return
    }

    // Centered card clicked: open the case study
    if (hit.project?.id) {
      router.push(`/projects/${hit.project.id}`)
    } else if (hit.isArchive) {
      const W = 2048
      const H = 1152
      const cx = hit.u * W
      const cy = (1 - hit.v) * H

      const padX = 90
      const padY = 56
      const cols = 2
      const gapX = 36
      const gapY = 16
      const startY = padY + 144
      const colW = (W - padX * 2 - gapX) / cols
      const rowH = 144

      // Check if user clicked inside project grid
      const maxRows = Math.ceil(MORE_PROJECTS.length / cols)
      if (
        cx >= padX &&
        cx <= W - padX &&
        cy >= startY &&
        cy <= startY + maxRows * (rowH + gapY)
      ) {
        const col = Math.floor((cx - padX) / (colW + gapX))
        const row = Math.floor((cy - startY) / (rowH + gapY))
        const idx = row * cols + col
        if (idx >= 0 && idx < MORE_PROJECTS.length) {
          const target = MORE_PROJECTS[idx]
          router.push(`/projects/${target.id}`)
          return
        }
      }
      router.push('/projects')
    }
  }

  // Raycast Hover Cursor
  const handlePointerMove = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const hit = getCardAtPointer(e.clientX, e.clientY)
    canvas.style.cursor = hit ? 'pointer' : 'default'
  }

  // Focus-to-scroll accessibility
  const scrollToCard = useCallback(
    (index) => {
      const container = containerRef?.current
      if (!container) return
      const targetOff = index * CARD_SPACING
      targetOffsetRef.current = targetOff

      const scrollHeight = container.offsetHeight - window.innerHeight
      const targetScrollTop =
        container.getBoundingClientRect().top +
        window.scrollY +
        (targetOff / MAX_OFFSET) * scrollHeight

      window.scrollTo({ top: targetScrollTop, behavior: 'smooth' })
    },
    [containerRef]
  )

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Fullscreen Three.js WebGL Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        className="absolute inset-0 w-full h-full z-10 block"
      />

      {/* Accessible DOM Tree for SEO, Screen Readers, and Tab Navigation */}
      <div className="absolute inset-0 pointer-events-none opacity-0 flex items-center justify-center overflow-hidden z-0">
        {FEATURED_PROJECTS.map((proj, idx) => (
          <article key={proj.id} className="pointer-events-auto p-4">
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
            <Link
              href={`/projects/${proj.id}`}
              onFocus={() => scrollToCard(idx)}
              aria-label={`View case study for ${proj.title}`}
            >
              view case study
            </Link>
          </article>
        ))}
        <article className="pointer-events-auto p-4">
          <h3>More work</h3>
          {MORE_PROJECTS.map((proj) => (
            <Link
              key={proj.id}
              href={`/projects/${proj.id}`}
              aria-label={`View case study for ${proj.title}`}
            >
              {proj.title}
            </Link>
          ))}
          <Link
            href="/projects"
            onFocus={() => scrollToCard(FEATURED_PROJECTS.length)}
            aria-label={`View all ${projectsData.length} projects in full archive`}
          >
            All {projectsData.length} projects
          </Link>
        </article>
      </div>
    </div>
  )
}
