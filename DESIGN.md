# Samay Maurya Portfolio — Implementation-Ready Design System & Technical Specification (DESIGN.md)

> **Document Classification**: Reverse-Engineered Design Specification & Re-implementation Blueprint  
> **Target Reference**: [https://samaymaurya.com/](https://samaymaurya.com/)  
> **Reference Domain**: `samaymaurya.com`  
> **Inspection Date**: October 2026  
> **Primary Technology Stack**: React 19, Tailwind CSS v4, Framer Motion, Lenis Smooth Scroll, Web Audio API, WebGL2 / Canvas 2D, Three.js (Fiber).

---

## 1. Project Overview

This document specifies the complete reverse-engineered architecture of the award-winning personal portfolio website of **Samay Maurya** (`samaymaurya.com`), a Product Designer & Design Engineer based in Dehradun / Mumbai, India (currently at Juspay, formerly at AR Genie and PositoCabs).

The portfolio stands out as a world-class demonstration of modern web craftsmanship. It integrates:
- An tactile **"editorial paper" design language** reminiscent of high-end design monographs, mountaineering expedition logs, and studio print work.
- An interactive **simulated macOS Chrome browser** window embedded into the page flow with tab-switching, extra application tabs (Figma, Claude, ChatGPT), dynamic address bar, and state persistence.
- A **3D WebGL2 bending canvas** that curls featured case study cards around a cylindrical curve as they scroll.
- A **real-time Web Audio API synthesizer** generating physical tactile sound effects (clicks, pops, clunks, rewinds, and sweeps) without external audio files.
- An interactive **vinyl turntable audio player** connected to a 65-track Indian indie playlist with spinning records and needle-drop physical feedback.
- A **topographic mountaineering finale** honoring K2 (8,611 m) with elevation contour lines and the 8,000 m "Death Zone" threshold.

---

## 2. Reference URLs and Inspection Method

### 2.1 URLs & Endpoints
* **Primary Live Production URL**: `https://samaymaurya.com/`
* **Canonical URL**: `https://samaymaurya.com/`
* **Static Assets Base**: `https://samaymaurya.com/assets/`
* **Compiled Bundles Inspected**:
  - Script: `/assets/index-D4qHWswt.js` (React 19 + Framer Motion + Three.js chunks)
  - Stylesheet: `/assets/index-BG6IEhsy.css` (Tailwind CSS v4 + custom design tokens)
  - Secondary chunks: `/assets/MiniHeadset-CBAFVOEd.js` (R3F 3D VR Headset)

### 2.2 Inspection Methodology
1. **Live Browser Headless Execution**: Explored dynamic viewports (`1440 × 900`, `1366 × 768`, `768 × 1024`, `390 × 844`), captured DOM states, recorded scroll trajectories, and validated responsive reflows.
2. **Static Asset & Bundle Analysis**: Full AST inspection of the production JavaScript and CSS bundles, extracting 100% of the data structures, array constants, easing curves, audio frequencies, and component models.
3. **WebGL & Canvas Disassembly**: Inspected the WebGL2 cylindrical bending shader and HTML-in-Canvas origin trial hooks.

---

## 3. Global Design Principles

1. **Tactile Physicality**: Digital UI mimics tactile physical mediums — coarse paper stock with subtle fractal noise (`paper-grain`), tilted Polaroid photographs, ink stamps, physical record discs sliding from cardboard sleeves, and mechanical click acoustics.
2. **Editorial Serifs Meet Modern Monospace**: Classical editorial elegance (`Instrument Serif`) paired with functional engineering clarity (`DM Sans` and `ui-monospace`) and personal informal annotations (`Caveat`).
3. **Scroll as Chapter Progression**: Scrolling is not merely movement down an axis; it drives progressive reveal stages, sticky viewports, 3D rotations, and chapter changes.
4. **Micro-Interaction Delight**: Playful surprises throughout — cats peeking over wordmarks, AI icons popping out of cardboard boxes on hover, spinning vinyl records, and interactive browser tabs.

---

## 4. Site Map and Route Inventory

The site operates as a Single Page Application (SPA) with client-side modal routing for deep-dive case studies:

```
/ (Home Page)
├── #hero (Hero stage, wordmark, polaroids)
├── #experiences (Juspay, AR Genie, PositoCabs partner bar)
├── #work-departure (3D VR headset scroll transition)
├── #work (Featured Work 3D bending card gallery)
├── #more-work (Side projects & client archive list)
├── #about (Simulated browser window with 5 tabs)
│    ├── Tab: about me (Bio, interactive tiles, traits)
│    ├── Tab: work log (Career timeline, resume link)
│    ├── Tab: travel journeys (Spiti, Kasol, Himachal photo stacks)
│    ├── Tab: not UR type (Interactive vinyl player, 65 tracks)
│    └── Tab: gallery (Photography masonry)
├── #outro (Mountain sign-off transition)
└── #footer (K2 summit topography, resume, email, socials)

Modal Routes (Render as overlays on top of background location):
├── /work/expense-approvals/* (Comprehensive mobile UX case study)
├── /work/stp-juspay/* (AI automation virtual card case study)
├── /work/ar-genie-glasses/* (Industrial AR glasses HUD case study)
├── /work/airbnb-vision-os/* (Apple Vision Pro spatial concept)
└── /work/:slug (Generic case study fallback)

404 Route:
└── * (Not Found: "This case study doesn't exist yet. ← Back home")
```

---

## 5. Global Layout and Container System

### 5.1 Stage Sizing & Viewport Units
To avoid mobile address bar jumping, heights are normalized using dynamic viewport units:
```css
:root {
  --stage-vh: 1vh;
}
@supports (height: 1svh) {
  :root {
    --stage-vh: 1svh;
  }
}
```

### 5.2 Container Dimensions
* **Global Max Width**: `1280px` (`max-w-7xl` or custom `1280px` centered via `margin: 0 auto;`).
* **Text / Case Study Max Width**: `max-w-3xl` (`48rem` / `768px`) and `max-w-[65ch]`.
* **Horizontal Gutters**:
  - Desktop (`≥1024px`): `clamp(24px, 5.5vw, 96px)`
  - Tablet (`≥768px`): `40px` (`sm:px-10`)
  - Mobile (`<768px`): `16px` to `24px` (`px-6`)
* **Vertical Section Rhythm**:
  - Hero: `min-height: 100vh`
  - Work Departure Stage: `calc(360 * var(--stage-vh))`
  - Featured Work Stage: `min-height: 100vh`
  - Browser Window Stage: `calc(5 * 75 * var(--stage-vh) + 100 * var(--stage-vh))`
  - Outro Stage: `calc(168 * var(--stage-vh))`

---

## 6. Color Tokens

The color palette is built on a warm, tactile Japanese paper ("washi") palette contrasted against deep typographic ink and vibrant international orange:

```css
:root {
  /* Paper & Surface Tones */
  --color-paper: #f1f0eb;         /* Main creamy paper canvas background */
  --color-paper-raised: #ffffff;  /* Card surface, polaroid border, active tab */
  --color-line: #d3d3c8;          /* Subtle paper dividers, borders, tab lines */
  --color-note: #ead56f;          /* Post-it / warm highlight tone */

  /* Typographic Ink Tones */
  --color-ink: #242620;           /* Primary text, dense black-olive charcoal */
  --color-ink-dim: #6f7168;       /* Secondary body, kickers, timestamps, labels */

  /* Dark Room / Void Register (Used in dark gallery & modal cards) */
  --color-void: #141212;          /* True dark background */
  --color-void-line: #2a2a2a;     /* Dark mode border */
  --color-fog: #ffffff;           /* Crisp white on dark */
  --color-fog-dim: #a0a0a0;       /* Muted grey on dark */
  --color-fog-faint: rgba(255, 255, 255, 0.45);

  /* Signature Accents */
  --color-accent: #e25531;        /* Vibrant cinnabar orange: dots, highlights, loader */
  --color-accent-ink: #b53c1f;    /* Deepened orange for hover states & links */

  /* Browser & Trait Category Tones */
  --tab-blue: #2f5bd3;            /* Mountain peak trait, blue tabs */
  --tab-green: #4f9d69;           /* Solo traveler trait, green badges */
}
```

---

## 7. Typography System

### 7.1 Font Declarations
```css
--font-sans: "DM Sans", system-ui, -apple-system, sans-serif;
--font-serif: "Instrument Serif", Georgia, serif;
--font-hand: "Caveat", "Bradley Hand", "Segoe Print", cursive;
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

### 7.2 Type Scale Hierarchy

| Style Token | Font Family | Size (Desktop) | Size (Mobile) | Line Height | Weight / Style | Purpose |
|---|---|---|---|---|---|---|
| **Editorial Display** | `Instrument Serif` | `clamp(56px, 7.4vw, 124px)` | `clamp(40px, 8vw, 56px)` | `0.95` | 400 Regular | "yes, I have too many tabs open", section titles |
| **Hero Wordmark** | `DM Sans` | `clamp(56px, 6vw, 96px)` | `48px` | `0.90` | 600 SemiBold | `samay.` main hero name |
| **Section Headings** | `Instrument Serif` | `clamp(34px, 3.6vw, 56px)` | `28px` | `0.98` | 400 Regular + Italic | "where I've been building", "the hills are where I reset" |
| **Section Label** | `DM Sans` | `12px` | `11px` | `1.50` | 500 Medium, `letter-spacing: 1.7px; text-transform: uppercase` | "PRODUCT DESIGNER & DESIGN ENGINEER", "EXPERIENCES" |
| **Handwritten Notes** | `Caveat` | `clamp(20px, 2.2vw, 34px)` | `18px - 22px` | `1.00` | 500/600, rotated `-4°` to `-6°` | "oh hey, you're back", "that's me", polaroid captions |
| **Body Primary** | `DM Sans` | `16px - 19px` | `15px` | `1.65 - 1.72` | 450 Regular | Tab bios, project narratives, modal reading copy |
| **Tab / UI Labels** | `DM Sans` | `12px - 13px` | `12px` | `1.20` | 500 Medium | Browser tabs, toolbar URL, buttons |
| **Numbers / Tabular** | `DM Sans` | `12px - 14px` | `11px` | `1.00` | 500 Medium, `font-feature-settings: "tnum" 1` | Worklog indexes (`01`, `02`), percentage tracker (`100%`) |

---

## 8. Spacing and Sizing Tokens

* Spacing step multiplier: `0.25rem` (`4px`)
* Standard spacing scales:
  - `p-1`: `4px`
  - `p-2`: `8px`
  - `p-3`: `12px`
  - `p-4`: `16px`
  - `p-6`: `24px`
  - `p-8`: `32px`
  - `p-10`: `40px`
  - `p-14`: `56px`
  - `p-16`: `64px`
  - `p-20`: `80px`
  - `p-24`: `96px`
* Border Radius tokens:
  - `rounded-sm`: `4px`
  - `rounded-md`: `6px`
  - `rounded-lg`: `12px` (used for browser chrome window)
  - `rounded-xl`: `18px` (used for sound settings popup)
  - `rounded-full`: `9999px` (pills, badges, dock buttons)

---

## 9. Borders, Shadows, Gradients, and Visual Effects

### 9.1 Paper Grain Texture Overlay
Applied globally to body and card panels via `:before` pseudo-element:
```css
.paper-grain {
  isolation: isolate;
  position: relative;
}
.paper-grain:before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

### 9.2 Elevation Shadows
```css
/* Physical Polaroid Print Shadow */
box-shadow: 0 18px 40px rgba(36, 38, 32, 0.15), 0 2px 6px rgba(36, 38, 32, 0.08);

/* Simulated Browser Chrome Window Shadow */
box-shadow: 0 50px 90px rgba(36, 38, 32, 0.24), 0 12px 30px rgba(36, 38, 32, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.3);

/* Translucent Floating Dock Pill Shadow */
box-shadow: 0 10px 24px rgba(36, 38, 32, 0.12), 0 2px 6px rgba(36, 38, 32, 0.06);

/* Vinyl Record Player Card */
box-shadow: 0 30px 60px rgba(36, 38, 32, 0.18), 0 8px 18px rgba(36, 38, 32, 0.12), inset 0 1px rgba(255, 255, 255, 0.7);
```

### 9.3 Custom Mountain Cursor
```css
:root {
  --cursor-default: url(/cursor-mountain.svg) 4 6, auto;
  --cursor-pointer: url(/cursor-mountain-hover.svg) 4 6, pointer;
}
html, body {
  cursor: var(--cursor-default);
}
a, button, [role="button"], summary, label {
  cursor: var(--cursor-pointer);
}
```

---

## 10. Header and Navigation

* **Position**: Static / Absolute at top of `#hero`.
* **Desktop Layout**: Single flex row spanning full width with padding `clamp(16px, 4vw, 40px)`.
* **Left / Center Navigation Group**:
  - `work`: Smooth scrolls to `#work`.
  - `about me`: Smooth scrolls to `#about`.
  - `resume ↓`: Direct download link to `/resume.pdf` with download icon.
* **Right CTA**:
  - `say hey ↗`: `mailto:mauryasamay4@gmail.com` with top-right arrow icon.

---

## 11. Section-by-Section Layout Details

### Section 1: Hero (`#hero`)
* **Header Eyebrow**: `PRODUCT DESIGNER & DESIGN ENGINEER` (uppercase, letter-spaced).
* **Title Row**:
  - "hey, I'm" in `Instrument Serif` italic with orange squiggle SVG underline (`OB`).
  - Huge "samay." wordmark in `DM Sans` with `--color-accent` dot.
  - Vector cat illustration peeking over the letters.
* **Right Polaroid Stack**:
  - 3 white Polaroid cards tilted at `-7°`, `+3°`, and `-4°`.
  - Curved hand-drawn arrow with Caveat note `"that's me"`.
* **Foot Row**:
  - Statement: "I design products. I also like making them *work*." (with circular hand-drawn SVG annotation).
  - Sub-blurb: "Dashboards, mobile apps & the occasional detour into AR/VR."

### Section 2: Experiences Banner (`#experiences`)
* **Kicker**: `EXPERIENCES`
* **Logos**:
  - **Juspay**: Logo + orange pill badge `CURRENTLY HERE`.
  - **AR Genie**: Logo + wordmark.
  - **PositoCabs**: Logo + wordmark.

### Section 3: Work Departure Stage (`#work-departure`)
* Pinned stage `height: 360vh`.
* **Beat 1**: Blurred reveal of *"welcome to my work section."*
* **Beat 2**: Reveal of *"but first — put these on."* with interactive 3D VR Headset model rotating in response to scroll.
* Pinned button: `"SKIP TO WORK →"`.

### Section 4: Featured Work (`#work`)
* **Section Heading**: `01 / FEATURED WORK`
* **Horizontal Bending Gallery**:
  - 6 featured case studies:
    1. **Expense Approvals** (Juspay × Visa)
    2. **Work assist AR Genie app for AR Glasses** (AR Genie)
    3. **Straight Through Processing** (Juspay × Mastercard)
    4. **Airbnb Vision OS** (Vision Pro Spatial Concept)
    5. **Gitgyan** (AI Integration)
    6. **Exportify Connect** (Global Export Software)
  - Cards project onto WebGL2 cylindrical bending canvas.

### Section 5: Side Projects / More Work (`#more-work`)
* Clean typographic archive list of 14 projects with company tags, client links, and video/cover previews.

### Section 6: Interactive Browser Window (`#about`)
* Pinned container `height: 475vh`.
* Browser window mock with macOS traffic lights, orange `"samay"` tab group pill, 5 interactive tabs (`about me`, `work log`, `travel journeys`, `not UR type`, `gallery`), plus `+` button opening Figma and AI chat simulators.

### Section 7: Outro Stage (`#outro`)
* Pinned transition: *"that's all from my side. now i'm going to the mountains."*

### Section 8: Mountaineering Footer (`#footer`)
* Massive vector ridge silhouette of K2 (8,611 m) with 8,000 m Death Zone cutoff.
* Statement: *"someday, k2. 8,611 metres, and the mountain's long-held reputation: roughly one climber lost for every four who have stood on top. Which is precisely why it won't leave me alone."*
* Direct links: Resume, `mauryasamay4@gmail.com`, LinkedIn, YouTube, X.
* Colophon with 3D model attribution.

---

## 12. Component Inventory & Specifications

```
src/
├── components/
│   ├── layout/
│   │   ├── Navigation.jsx            # Top hero navigation bar
│   │   ├── Footer.jsx                # K2 mountain topographic footer
│   │   └── PencilProgress.jsx        # Vertical right-rail progress indicator
│   ├── hero/
│   │   ├── HeroSection.jsx           # Main hero stage & wordmark
│   │   ├── PolaroidStack.jsx         # 3 interactive tilted polaroids
│   │   ├── CatPeek.jsx               # Peeking vector cat illustration
│   │   └── SoundDock.jsx             # Floating audio pill & settings modal
│   ├── work/
│   │   ├── ExperienceBar.jsx         # Juspay, AR Genie, PositoCabs bar
│   │   ├── WorkDepartureStage.jsx    # "welcome to my work section" + 3D Headset
│   │   ├── FeaturedWorkGallery.jsx   # Horizontal bending canvas gallery
│   │   ├── BendingCanvas.jsx         # WebGL2 / 2D Canvas folding engine
│   │   ├── ProjectCard.jsx           # Individual case study card
│   │   └── MoreWorkList.jsx          # Secondary project archive table
│   ├── browser/
│   │   ├── BrowserWindow.jsx         # macOS browser frame & address bar
│   │   ├── BrowserTabs.jsx           # Tab strip with tab groups & '+' button
│   │   ├── TabAbout.jsx              # About tab with interactive inline badges
│   │   ├── TabWorkLog.jsx            # Numbered career log & resume CTA
│   │   ├── TabTravel.jsx             # Spiti, Kasol, Himachal photo albums
│   │   ├── TabPlaylist.jsx           # Vinyl turntable & 65-track indie player
│   │   ├── TabGallery.jsx            # Photography masonry grid
│   │   ├── TabSimulatorFigma.jsx     # Figma artboard canvas simulation
│   │   └── TabSimulatorAI.jsx        # Claude / ChatGPT typewriter chat simulator
│   ├── 3d/
│   │   └── VRHeadsetCanvas.jsx       # Three.js R3F Canvas for Lowpoly VR glasses
│   ├── modal/
│   │   ├── CaseStudyModal.jsx        # Modal route wrapper with background freeze
│   │   └── CaseStudyDetail.jsx       # Full rich case study renderer
│   └── audio/
│       └── SoundEngine.js            # Web Audio API synthesizer singleton
```

---

## 13. Scroll Behavior & Animation Timelines

| Section | Scroll Range / Trigger | Visual Effect | Physics / Curves |
|---|---|---|---|
| **Loader** | Initial page mount (0 - 2.2s) | Blueprint lines draw, count-up `0% → 100%`, curtain slides up | Ease: `cubic-bezier(0.76, 0, 0.24, 1)` |
| **Hero → Experience** | `scrollY: 0 → 100vh` | Hero parallax fade out, Experience bar docks | Lerp: `0.1` (Lenis) |
| **Work Departure** | `scrollY: 100vh → 460vh` | Beat 1 text reveals with blur; Beat 2 reveals 3D VR Headset rotating 360° | Scroll-linked progress interpolation |
| **Featured Work** | Pinned or horizontal drag | Cards fold into cylindrical curve at viewport edges | WebGL2 vertex shader: perspective 700 |
| **Browser Window** | `scrollY: 560vh → 1035vh` | Browser window pins; scrolling increments active tab (1 → 5) | Spring: stiffness 200, damping 20 |
| **Outro → Footer** | Bottom 200vh | Text reveals; K2 mountain vector ascends | Ease-out cubic-bezier(0.22, 1, 0.36, 1) |

---

## 14. Responsive Behavior and Breakpoints

* **Desktop (`≥1024px`)**:
  - Full simulated browser window pinned with multi-tab scroll synchronization.
  - Horizontal bending WebGL2 cards gallery.
  - Custom mountain cursor tracking.
  - Sound dock with expanded pill label.
* **Tablet (`768px - 1023px`)**:
  - Browser window width adapts to `100%` with reduced side margins (`40px`).
  - Featured work cards scale down proportionally (`width: min(90vw, 720px)`).
  - Sound dock switches to compact circular mode.
* **Mobile (`<768px`)**:
  - Horizontal swipe replaces scroll-pinned tab progression.
  - Browser tabs strip becomes scrollable with hidden close buttons.
  - Custom cursors disabled (`cursor: auto`).
  - 3D Headset canvas switches to static lightweight SVG or pre-rendered fallback if WebGL performance is constrained.
  - Sound dock collapses to unobtrusive 28px bottom icon.

---

## 15. Implementation Blueprint for AI Coding Agent

### 15.1 Dependencies Required
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    "framer-motion": "^12.0.0",
    "@studio-freight/lenis": "^1.3.26",
    "three": "^0.170.0",
    "@react-three/fiber": "^9.0.0",
    "@react-three/drei": "^10.0.0",
    "lucide-react": "^0.470.0"
  },
  "devDependencies": {
    "tailwindcss": "^4.0.0",
    "vite": "^6.0.0"
  }
}
```

### 15.2 Step-by-Step Build Order
1. **Foundation (`index.css`)**: Declare CSS custom properties (`--color-paper`, `--color-ink`, `--color-accent`), font imports, and `.paper-grain` overlay.
2. **Sound Engine (`SoundEngine.js`)**: Implement the Web Audio API synthesis singleton (`SoundFX.hover`, `click`, `pop`, `clunk`, `rewind`).
3. **Loader Component (`Loader.jsx`)**: Build the blueprint SVG paths, counter, and exit animation.
4. **Hero & Experience (`HeroSection.jsx`, `ExperienceBar.jsx`)**: Lay out typography, peeking cat, tilted polaroid stack, and partner logos.
5. **Work Departure & 3D Headset (`WorkDepartureStage.jsx`, `VRHeadsetCanvas.jsx`)**: Set up sticky container and R3F canvas for rotating headset.
6. **Featured Work & Bending Canvas (`FeaturedWorkGallery.jsx`, `BendingCanvas.jsx`)**: Implement cards and WebGL2 cylindrical vertex shader.
7. **Interactive Browser (`BrowserWindow.jsx`)**: Implement tabs bar, address bar, and 5 tab views (About, Worklog, Travel, Playlist, Gallery).
8. **Turntable Vinyl Player (`TabPlaylist.jsx`)**: Build disc ejection animation and YouTube player integration.
9. **Mountain Footer (`Footer.jsx`)**: Draw K2 topographic vector and contact links.
10. **Lenis Integration**: Wrap application in Lenis smooth scroller.

---

## 16. Visual Fidelity Acceptance Criteria

- [ ] Canvas background matches creamy `#f1f0eb` with visible subtle fractal noise grain.
- [ ] Typography renders exact font faces (`DM Sans`, `Instrument Serif`, `Caveat`).
- [ ] Hero polaroids have exact tilts (`-7°`, `+3°`, `-4°`) with smooth hover leveling.
- [ ] Sound pill toggles audio on/off, settings modal works, and UI clicks synthesize physical tones.
- [ ] VR Headset 3D model rotates smoothly with scroll in the departure section.
- [ ] Featured work cards bend smoothly along the Z-axis when scrolling horizontally.
- [ ] Simulated browser window pins cleanly, and all 5 tabs render complete content.
- [ ] Vinyl record slides out of sleeve and spins with needle-drop sound effect.
- [ ] K2 mountain ridge in footer displays clean elevation geometry and Death Zone threshold.
- [ ] Right-rail pencil progress indicator tracks scroll percentage from 000% to 100%.
