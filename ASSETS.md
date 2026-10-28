# Samay Maurya Portfolio — Complete Asset Inventory & Asset Architecture (ASSETS.md)

This document provides the definitive, production-ready asset catalogue for reproducing [https://samaymaurya.com/](https://samaymaurya.com/). All asset paths, dimensions, fallbacks, typography sources, 3D models, SVG specifications, and audio definitions have been extracted and verified directly from the live application bundle.

---

## 1. Typography Assets (Google Fonts & Web Fonts)

The website loads typography via Google Fonts preconnect CDN:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&family=Caveat:wght@500;600&display=swap"
  rel="stylesheet"
/>
```

| Font Family | Weights | Styles | Purpose in UI | Fallbacks |
|---|---|---|---|---|
| **DM Sans** | 400, 500, 600, 700, 800, 900 | Normal | Primary UI, wordmarks, body, badges, tabs, labels, numbers | `system-ui, -apple-system, sans-serif` |
| **Instrument Serif** | 400 | Normal, Italic | Editorial titles, section headings, featured quotes, company names in worklog, italic accents | `Georgia, "Times New Roman", serif` |
| **Caveat** | 500, 600 | Normal (Handwritten) | Informal micro-copy, arrows, handwritten notes, polaroid captions, tab tooltips | `"Bradley Hand", "Segoe Print", cursive` |
| **Monospace System** | 400 | Normal | Code snippets, technical specs, tab URLs | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` |

---

## 2. Interactive 3D Models & WebGL Shaders

### 2.1 Lowpoly VR Headset (Three.js / React Three Fiber)
* **Model Name**: Lowpoly VR Glasses
* **Original Creator**: taigo (Sketchfab)
* **License**: Creative Commons Attribution (CC BY 4.0)
* **Original URL**: `https://sketchfab.com/3d-models/lowpoly-vr-glasses-c37e201c0f4a49deb2415b4949e011e7`
* **Format**: GLTF / GLB binary (`/models/headset.glb` or code-split bundle `MiniHeadset-CBAFVOEd.js`)
* **Mesh & Materials**: Low-poly white VR visor shell with matte finish, dark front glass faceplate with specular gloss, grey stretch headstrap with adjustment buckles, dual eye lenses on inner face.
* **Usage**:
  1. Floating 3D element in the Work Departure transition ("welcome to my work section... but first — put these on.") with scroll-driven yaw, pitch, and scale.
  2. Miniature 3D interactive icon inside the About tab inline bio badge (`.say-tile--headset`).

### 2.2 Featured Work 3D Bending Canvas (WebGL2 / HTML-in-Canvas)
* **Shader Technology**: Custom WebGL2 vertex & fragment deformation shader
* **Blink API Hook**: `HTMLInCanvas` (`CanvasRenderingContext2D.drawElementImage` & `requestPaint()`)
* **Fallback**: 2D Canvas rendering context with manual affine card folding and edge blur
* **Parameters**:
  - `perspective`: 700
  - `ease`: 240
  - `smoothing`: 0.1
  - `edgeBlur`: 3.25
  - `direction`: `'in'`
* **Vertex Deformation**: Calculates cylindrical Z-bend across normalized X coordinates to simulate curved paper / cards folding away from the viewport as the user drags or scrolls horizontally.

---

## 3. Brand & Client Logos

All logos are crisp SVGs or transparent high-density PNGs stored in `/brands/`:

| Identifier | Source Path | Format | Display Dimensions | Purpose & Context |
|---|---|---|---|---|
| `logo-juspay` | `/brands/juspay.png` | PNG (transp.) | 36 × 36 px (contain) | Work experience banner, Expense Approvals, STP |
| `logo-visa` | `/brands/visa.svg` | SVG | Height 20 px | Partner wordmark in Expense Approvals header |
| `logo-mastercard` | `/brands/mastercard.svg` | SVG | 32 × 24 px | Partner badge in Straight Through Processing |
| `logo-ar-genie` | `/brands/ar-genie.png` | PNG | 36 × 36 px | Experience banner, AR Glasses project |
| `logo-positocabs` | `/brands/positocabs.png` | PNG | 36 × 36 px | Experience banner, PositoCabs role |
| `logo-airbnb` | `/brands/airbnb.svg` | SVG | Height 24 px | Vision OS concept card header |
| `logo-figma` | Inline SVG | SVG (5-color) | 16 × 24 px | Figma tab favicon, inline bio tile |
| `logo-google` | Inline SVG | SVG (4-color) | 14 × 14 px | Google tab favicon in mock browser |
| `logo-claude` | Inline SVG | SVG (`✳`) | 16 × 16 px | Claude tab favicon & chat avatar |
| `logo-chatgpt` | Inline SVG | SVG | 16 × 16 px | ChatGPT tab favicon & chat avatar |

---

## 4. Photography & Visual Assets

### 4.1 Hero Polaroid Stack
Photos are styled as white-bordered physical Polaroid prints with drop-shadows and subtle counter-rotations.

| Asset ID | Path | Aspect Ratio | Observed Tilt | Hand-lettered Caption |
|---|---|---|---|---|
| `hero-photo-1` | `/hero/photo-1.jpg` | 4:5 | `-7°` | "usually thinking about an interaction." |
| `hero-photo-2` | `/hero/photo-2.jpg` | 4:5 | `+3°` | "roots: dehradun." |
| `hero-photo-3` | `/hero/photo-3.jpg` | 4:5 | `-4°` | "happiest a little higher up." |
| `hero-cat-peek` | Inline SVG / Vector | ~1:1 | `0°` | Peeking cat with "oh hey, you're back" |

*Fallbacks for development*: `https://picsum.photos/seed/samay-a/600/750`, `https://picsum.photos/seed/samay-b/600/750`, `https://picsum.photos/seed/samay-c/600/750`.

### 4.2 Browser "About Me" Tab Photo
* **Path**: `/about/photos/me-portrait.jpg`
* **Styling**: `transform: rotate(-3deg); padding: 10px 10px 44px; background: #fff; box-shadow: 0 18px 40px rgba(36,38,32,0.15)`
* **Figcaption**: "designer who codes" in `--color-accent` Caveat script.

### 4.3 Travel Journeys Polaroid Albums (`/about/photos/`)
Organized by trip location with multi-photo stacked depth:

#### Spiti Valley (2022) — `id: spiti`
- `spiti-bike.jpg`: Samay with his bike beside a Spiti road sign
- `spiti-chicham.jpg`: Chicham bridge over a deep gorge
- `spiti-peaks.jpg`: Snow peaks above the valley
- `spiti-canyon.jpg`: Eroded canyon walls in Spiti
- `spiti-postbox.jpg`: The red post box at Hikkim (world's highest)
- `spiti-stupa.jpg`: A painted stupa against blue sky

#### Kasol & Parvati Valley (2023) — `id: parvati`
- `parvati-night.jpg`: Hillside town lit up at night
- `parvati-valley.jpg`: Looking down the Parvati valley
- `parvati-lights.jpg`: Lights across the valley after dark
- `parvati-dusk.jpg`: Mountains at dusk

#### Himachal (2025) — `id: himachal`
- `himachal-snowline.jpg`: Samay wrapped in a shawl against snowy peaks
- `himachal-river.jpg`: Samay beside a frozen riverbank
- `himachal-look.jpg`: Looking out over the snow
- `himachal-stay.jpg`: Getting ready at the homestay

### 4.4 Browser "Gallery" Tab (`Hg` Grid)
Photos arranged in a dynamic masonry/grid with selected `tall: true` items spanning 2 rows:
1. `g-fog.jpg` (tall): Fog rolling through the hills
2. `g-momos.jpg`: A plate of hot steamed momos
3. `g-valley.jpg`: Valley view from Mussoorie
4. `g-headphones.jpg`: Samay with headphones smiling
5. `g-forest.jpg` (tall): Green forest trail
6. `g-city.jpg`: City street at night
7. `g-sunset.jpg`: Sunset over mountain hills
8. `g-cat.jpg`: A curious stray cat
9. `g-temple.jpg` (tall): Illuminated hill temple at night
10. `g-thukpa.jpg`: Warm thukpa and momos
11. `g-desk.jpg`: Samay at his workspace desk
12. `g-hill-town.jpg` (tall): Stone steps leading up to a hill town
13. `g-sushi.jpg`: Fresh sushi platter

---

## 5. Case Study & Project Assets

### 5.1 Featured Work Covers
* **Expense Approvals**: `/case-studies/expense-approvals/cover.png` (High-res mobile mockups of card approval UI)
* **AR Genie AR Glasses**: `/case-studies/ar-genie-glasses/cover.gif` (Animated HUD interface showing remote industrial assist)
* **Straight Through Processing (Juspay)**: `/case-studies/stp-juspay/cover.png` (Web dashboard table & AI automation flow)
* **Airbnb Vision OS**: `/case-studies/airbnb-vision-os/3.webp` (Spatial visionOS window floating in landscape)
* **Gitgyan**: `https://cdn.prod.website-files.com/669c2e1aea76cfd53b1c3b8f/6a0b6436f0d14345bf66cec3_Gitgyan-cover.jpg`
* **Exportify Connect**: `https://cdn.prod.website-files.com/669c2e1aea76cfd53b1c3b8f/677ecffc167f17d1ed313a20_Cover%20(1).png`

### 5.2 Expense Approvals Case Study Iteration Media
* `/case-studies/expense-approvals/iteration1-no-context.png` (390 × 803 px)
* `/case-studies/expense-approvals/iteration1-binary-actions.png` (459 × 803 px)
* `/case-studies/expense-approvals/iteration1-context-late.png` (390 × 803 px)
* `/case-studies/expense-approvals/iteration2-later.png` (411 × 681 px)
* `/case-studies/expense-approvals/iteration2-two-views.png` (338 × 696 px)
* `/case-studies/expense-approvals/iteration2-hidden-action.png` (364 × 748 px)
* `/case-studies/expense-approvals/final-card-annotated.png`

### 5.3 More Work / Side Projects Covers (`/more-work/`)
* `vriksh.webp`: VRIKSH Plant care assistant
* `industrial-ar.webp` & `industrial-ar.mp4`: Transforming Industrial Workflows with AR
* `ar-genie-website.webp`: AR Genie marketing website
* `accurate-associates.webp`: Accurate & Associates legal portal
* `swasth-sathi.webp`: Swasth Sathi health platform
* `ar-fmcg.webp`: Augmented Reality in FMCG retail

---

## 6. Music & Vinyl Assets

### 6.1 Vinyl Record Visuals
* Generated via CSS & SVG layered rendering:
  - Outer card sleeve: `background: #dcdad3; border-radius: 22%`
  - Vinyl disc: `background: #1b1b1b; border-radius: 50%`
  - Grooves texture: `repeating-radial-gradient(circle, transparent 0 3px, rgba(0,0,0,0.12) 3px 4px)`
  - Center label hole: `radial-gradient(circle, #e8e6e0 0 18%, #c9c7c0 19% 22%, rgba(241,240,235,0.85) 23% 60%, #bdbbb5 61% 64%, #e2e0da 65%)`
* **Album Art Thumbnails**: Fetched dynamically via YouTube thumbnails CDN:
  - Standard: `https://i.ytimg.com/vi/${track.id}/mqdefault.jpg`
  - High-res: `https://i.ytimg.com/vi/${track.id}/maxresdefault.jpg`
* **YouTube Playlist ID**: `PLWx7Fxr7oZE3XICF4S1xPT5dYOAan3mi4`
* **YouTube Web Player URL**: `https://music.youtube.com/playlist?list=PLWx7Fxr7oZE3XICF4S1xPT5dYOAan3mi4`

---

## 7. Interactive Audio & Sound FX (Web Audio API)

No external heavy WAV/MP3 files are required for UI sound effects! The website synthesizes all sound effects natively using the Web Audio API with zero network latency.

| Sound Effect | Waveform | Frequency Range | Envelope Duration | Trigger |
|---|---|---|---|---|
| `Ch.hover()` | Sine | 660 Hz steady | 55 ms | Hovering over nav links, tabs, cards |
| `Ch.click()` | Triangle | 900 Hz → 520 Hz | 50 ms | Button clicks, tab activations |
| `Ch.pop()` | Sine | 420 Hz → 880 Hz | 90 ms | Opening new tabs, toggling chips |
| `Ch.clunk()` | Square + Filtered Noise | 160 Hz → 70 Hz (Square) + 3 kHz → 1.8 kHz noise | 70 ms | Vinyl play/pause toggle |
| `Ch.rewind()` | Sawtooth + Bandpass Sweep | 300 Hz → 900 Hz + 1.2 kHz → 5 kHz | 350 ms | Vinyl previous/next track skip |
| `Ch.scroll()` / `whoosh` | Sine | 392 Hz (G4) | 240 ms | Major section transitions |
| `Ch.end()` | Dual Sine Harmonic | 392 Hz (280ms) + 262 Hz (C4, 460ms) | 460 ms | Page bottom / arrival at mountain summit |

---

## 8. SVG Vector Assets & Hand-Drawn Elements

All vector annotations and custom cursors are defined as lightweight SVGs:

1. **Custom Cursors**:
   - Default: `/cursor-mountain.svg` (mountain silhouette with hotspot at `4 6`)
   - Pointer / Hover: `/cursor-mountain-hover.svg` (accent-colored mountain with hotspot at `4 6`)
2. **Hero Squiggle (`OB`)**: Hand-drawn wavy underline under "hey, I'm"
3. **Hero Polaroid Arrow**: Curved dashed arrow pointing to photo stack with "that's me" label
4. **Hero Cat Illustration (`_V`)**: Adorable illustrated cat with twitching ears peeking over the "samay." wordmark
5. **K2 Mountain Ridge Vector**: Detailed topographic silhouette in footer showing base camp, ridge line, and 8,000 m Death Zone cutoff (`M0 352l150-12 150-22...`)
6. **Paper Grain Noise Overlay**:
   ```svg
   <svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
     <filter id='n'>
       <feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/>
       <feColorMatrix type='saturate' values='0'/>
     </filter>
     <rect width='100%' height='100%' filter='url(#n)'/>
   </svg>
   ```
