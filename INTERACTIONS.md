# Samay Maurya Portfolio — Complete Interaction & Motion Specification (INTERACTIONS.md)

This specification defines every interactive state machine, gesture, motion timeline, and synthesized audio contract on [https://samaymaurya.com/](https://samaymaurya.com/). All timings, curves, spring constants, and audio synthesis equations are extracted directly from the compiled runtime.

---

## 1. Architectural Overview & Motion Core

The website uses a hybrid motion architecture combining:
1. **Framer Motion (`motion/react`)** for component transitions, layout projections (`layoutId`), gesture tracking, and spring physics.
2. **Lenis (`@studio-freight/lenis` v1.3.26)** for smooth inertia-based scrolling (`lerp: 0.1`, `duration: 1.2s`).
3. **Web Audio API** for real-time synthesized micro-interaction acoustics.
4. **WebGL2 / HTML-in-Canvas** for 3D curved surface projections of DOM nodes.
5. **CSS Variables (`--stage-vh`, `--enter`, `--about-reveal`)** driven by scroll positions to synchronize complex multi-stage pinned views.

---

## 2. Loader Sequence & Entrance State Machine

### 2.1 State Timeline
The site boots with a high-fidelity typographic blueprint reveal on an orange background (`--color-accent`: `#e25531`).

```
0.00s: [BOOT]
       - <body> gets `is-loading` class (overflow: hidden)
       - Loader displays full-screen grid with crawling SVG fractal noise texture
       - Blueprint guide lines begin staggering in via stroke-dashoffset:
         • Baseline: M20 280H980 (delay: 0.05s)
         • x-height: M60 172H940 (delay: 0.16s)
         • Descender: M100 350H760 (delay: 0.28s)
         • Vertical guide 1: M176 70V380 (delay: 0.20s)
         • Vertical guide 2: M452 100V372 (delay: 0.32s)
         • Vertical guide 3: M708 110V400 (delay: 0.44s)
         • Diagonal guide: M110 372L580 84 (delay: 0.38s)
       - Blueprint typographic labels fade in: "baseline", "x-height", "descender"

0.05s - 1.80s: [COUNT-UP & PATH DRAW]
       - Outline of "samay" text draws via `stroke-dasharray: 1400`
       - Monospace counter progresses from `000%` to `100%` using ease: `[0.76, 0, 0.24, 1]`
       - The solid dot ("loader-dot") scales into place at 100%

1.80s - 2.20s: [EXIT & CURTAIN REVEAL]
       - Counter hits 100%
       - Entire loader container shifts upward `translateY(-100%)` with cubic-bezier(0.76, 0, 0.24, 1)
       - `html.is-loading` class removed
       - Sound engine plays `Ch.pop()`
       - Hero elements trigger entrance cascade
```

### 2.2 Crawl Texture Animation
```css
@keyframes texture-crawl {
  0%   { transform: translate(0, 0); }
  20%  { transform: translate(-2%, 1.5%); }
  40%  { transform: translate(1.5%, -2%); }
  60%  { transform: translate(-1%, 2.5%); }
  80%  { transform: translate(2.5%, 0.5%); }
  100% { transform: translate(0, 0); }
}
```

---

## 3. Web Audio Synthesizer & Sound Dock System

The sound engine requires **no audio files**; all acoustics are synthesized on demand via the Web Audio API.

### 3.1 Audio Synthesis Engine Implementation
```javascript
let audioCtx = null;
let masterGain = null;
let isAudioUnlocked = false;
let isSoundEnabled = true; // Stored in localStorage: 'on' | 'off'

const SOUND_PRESETS = {
  modern: { pitch: 1.0, length: 1.0, gain: 1.0 },
  soft:   { pitch: 0.85, length: 1.2, gain: 0.8 },
  arcade: { pitch: 1.3, length: 0.8, gain: 1.1 }
};

let currentStyle = 'modern';
let currentVolume = 65; // 0 - 100

function initAudio() {
  if (audioCtx) return audioCtx;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContextClass();
  
  masterGain = audioCtx.createGain();
  masterGain.gain.value = (currentVolume / 100) * 0.5;

  const compressor = audioCtx.createDynamicsCompressor();
  compressor.threshold.value = -3;
  compressor.knee.value = 0;
  compressor.ratio.value = 20;
  compressor.attack.value = 0.002;
  compressor.release.value = 0.1;

  masterGain.connect(compressor);
  compressor.connect(audioCtx.destination);
  return audioCtx;
}

function playTone(freq, { dur = 0.08, gain = 0.03, type = 'sine', to = freq, delay = 0 } = {}) {
  if (!isSoundEnabled || currentVolume === 0) return;
  const ctx = initAudio();
  if (ctx.state === 'suspended') ctx.resume();

  const preset = SOUND_PRESETS[currentStyle];
  freq *= preset.pitch;
  to *= preset.pitch;
  dur *= preset.length;
  gain *= preset.gain;

  const startTime = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const env = ctx.createGain();

  osc.type = currentStyle === 'arcade' ? 'square' : type;
  osc.frequency.setValueAtTime(freq, startTime);
  osc.frequency.exponentialRampToValueAtTime(Math.max(to, 1), startTime + dur);

  env.gain.setValueAtTime(0.0001, startTime);
  env.gain.exponentialRampToValueAtTime(gain, startTime + 0.006);
  env.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);

  osc.connect(env);
  env.connect(masterGain);

  osc.start(startTime);
  osc.stop(startTime + dur + 0.02);
}

export const SoundFX = {
  hover() {
    playTone(660, { dur: 0.055, gain: 0.016, type: 'sine' });
  },
  click() {
    playTone(900, { dur: 0.05, gain: 0.03, type: 'triangle', to: 520 });
  },
  pop() {
    playTone(420, { dur: 0.09, gain: 0.03, type: 'sine', to: 880 });
  },
  clunk() {
    playTone(160, { dur: 0.07, gain: 0.05, type: 'square', to: 70 });
  },
  rewind() {
    playTone(300, { dur: 0.3, gain: 0.006, type: 'sawtooth', to: 900 });
  },
  whoosh() {
    playTone(392, { dur: 0.24, gain: 0.008, type: 'sine' });
  },
  end() {
    playTone(392, { dur: 0.28, gain: 0.003, type: 'sine' });
    playTone(262, { dur: 0.46, gain: 0.004, type: 'sine', delay: 0.18 });
  }
};
```

### 3.2 Floating Sound Pill Dock
* **Position**: `fixed; bottom: clamp(14px, 2vw, 28px); left: clamp(14px, 2vw, 28px); z-index: 900;`
* **Styling**: Translucent glass pill (`backdrop-filter: blur(10px); background: rgba(241, 240, 235, 0.85); border: 1px solid rgba(36,38,32,0.15); border-radius: 999px;`)
* **Components**:
  1. Main button: 4 vertical EQ bars animating with staggered keyframes when sound is active, plus label `"sound on" / "sound off" / "sound 0%"`.
  2. Gear button: Opens the popup settings panel.
* **Compact Mode (on scroll or mobile)**:
  - Label collapses (`max-width: 0; opacity: 0;`).
  - Gear button hides.
  - Dock shrinks to circular 28 × 28 px icon.
* **Settings Modal**:
  - `sound-settings`: Popup card with volume range slider, style selector (Modern, Soft, Arcade), and "Preview ↗" button.

---

## 4. Hero Section Interactions

1. **Wordmark & Peeking Cat**:
   - The large `samay.` title is accompanied by a vector cat (`_V`) positioned on top of the `m-a-y` letters.
   - When the cursor moves near the wordmark, the cat's ears twitch and the handwritten note `"oh hey, you're back"` subtly wiggles.
2. **Polaroid Stack Hover**:
   - Three photos rendered with default rotations (`-7°`, `+3°`, `-4°`).
   - On cursor hover over any polaroid:
     - Hovered photo elevates to `z-index: 10`.
     - Scales up to `1.08`.
     - Rotation straightens toward `0°` (`transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)`).
     - Plays `SoundFX.hover()`.
3. **Interactive Keyword Annotation**:
   - The word `work` in *"I also like making them work."* has an animated SVG circle outline (`p_`) that draws around it once the hero enters view.
   - Micro badges: "Dashboards", "mobile apps", and "AR/VR" have icon hover reveals.

---

## 5. Work Section Transition (3D Headset Departure)

This section creates an editorial chapter transition between the intro and the case studies.

* **Scroll Stage**: Container height `360vh` (`calc(360 * var(--stage-vh))`), with sticky child `height: 100vh; top: 0`.
* **Two Beats Progression**:
  - **Beat 1 (`0% - 45%` scroll)**:
    - Text: *"welcome to my work section."*
    - Word-by-word reveal: opacity `0 → 1`, blur `6px → 0px`, translateY `0.18em → 0em`.
    - Underline expands across *"work section."*
  - **Beat 2 (`50% - 95%` scroll)**:
    - Text: *"but first — put these on."*
    - Center stage displays the 3D VR Headset model (`MiniHeadset`).
    - Scroll progress drives model 3D rotation:
      - `rotation.y = scrollProgress * Math.PI * 2`
      - `rotation.x = Math.sin(scrollProgress * Math.PI) * 0.35`
      - `scale = 0.6 + scrollProgress * 0.8`
    - "SKIP TO WORK →" button pinned at bottom right allows instant jump to `#work`.

---

## 6. Featured Work 3D Folding Gallery

* **Layout**: Horizontal full-bleed cards gallery with WebGL2 curved projection.
* **Cards Array (`Qh`)**:
  1. **Expense Approvals** (Juspay × Visa) — Mobile UX
  2. **Work Assist AR Genie App** (AR Genie) — AR Glasses / Spatial
  3. **Straight Through Processing** (Juspay × Mastercard) — AI Automation
  4. **Airbnb Vision OS** (Concept) — Vision Pro Spatial Experience
  5. **Gitgyan** — AI Integration & Full-stack dev
  6. **Exportify Connect** — Global export management software
* **Interaction Contract**:
  - Horizontal drag / swipe gesture or mouse wheel scrolling.
  - As a card moves toward the left or right screen edge, its vertices deform along the Z-axis in WebGL2, folding inward like the pages of a luxury paper magazine.
  - Clicking any card opens the detailed modal overlay (`/work/:slug`) with an expansion transition.

---

## 7. Interactive Browser Window ("yes, I have too many tabs open")

This is the central signature component of the portfolio. It simulates a fully functional macOS Chrome browser window pinned inside the page.

### 7.1 Pinned Scroll Container
* Height: `calc(5 * 75vh + 100vh)` (each tab has dedicated scroll track height).
* Pinned sticky viewport at `top: 0`.
* As the user scrolls vertically through the page, the active tab advances sequentially:
  - Scroll `0% - 20%`: Tab 1 (`about`)
  - Scroll `20% - 40%`: Tab 2 (`work`)
  - Scroll `40% - 60%`: Tab 3 (`travel`)
  - Scroll `60% - 80%`: Tab 4 (`playlist`)
  - Scroll `80% - 100%`: Tab 5 (`gallery`)
* Users can also directly click any tab header to switch tabs without scrolling.

### 7.2 Browser Chrome Header
* **Window controls**: macOS traffic lights (red, yellow, green circles).
* **Tab Group Badge**: Orange pill `"samay"`.
* **5 Core Tabs**:
  - `🙂 about me` → `/about`
  - `🗂️ work log` → `/work-log`
  - `🏔️ travel journeys` → `/journeys`
  - `📼 not UR type` → `/playlist` (displays animated mini equalizer when music is playing!)
  - `📷 gallery` → `/gallery`
* **New Tab Button (`+`)**:
  - Clicking `+` opens a mock modal/dropdown to open simulated web applications:
    1. `Portfolio v12 — Figma`
    2. `Payments dashboard — Figma`
    3. `Claude AI` (interactive chat)
    4. `ChatGPT` (interactive chat)
    5. `AR glasses flows — Figma`
* **Address Bar (URL Bar)**:
  - Displays lock icon + `samay.me › [active-tab-path]`.
  - When switching tabs, the path animates vertically with `initial: { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 }`.
  - Right side shows circular avatar image.

### 7.3 Detailed Tab Contents & Interactions

#### Tab 1: "about me"
* **Polaroid Card**: Tilted portrait with figcaption `"designer who codes"`.
* **Nameplate**: Large `"samay."` with orange dot and hand-drawn arrow `"that's me"`.
* **Interactive Inline Story Badges**:
  - `Figma Tile`: Hover reveals micro Figma handles.
  - `3D Headset Tile`: Houses a tiny live Three.js rotating VR headset canvas!
  - `AI Agents Box`: Illustrated brown kraft cardboard parcel. Hovering causes Claude and ChatGPT icons to spring upward out of the box (`transform: translate(...) scale(1.4); transition: transform 0.56s cubic-bezier(0.34, 1.5, 0.64, 1)`).
* **Personality Traits Chips**:
  - `solo traveller` (Green): Hover animates compass needle (`rotate: 200deg`).
  - `someday, k2` (Blue): Hover raises flag stroke.
  - `24×7 music on` (Orange): Hover triggers animated equalizer rects (`animation: chip-eq`).

#### Tab 2: "work log"
* Numbered rows (`01`, `02`, `03`) for Juspay, AR Genie, and PositoCabs.
* Hovering over any row highlights with `background: rgba(255, 255, 255, 0.55)`.
* "Current" role has active accent badge `"now"`.
* Footer link: `"the serious bit, in one PDF → [open resume ↗]"`.

#### Tab 3: "travel journeys"
* Left column: Interactive destination list (Spiti Valley 2022, Kasol & Parvati 2023, Himachal 2025).
* Right column: Stacked Polaroid photo album.
* Clicking any trip:
  - Left indicator slides into place with accent border.
  - Photos in stack re-render with spring physics:
    `initial: { opacity: 0, y: 30, rotate: [-6, 5, -3, 4][i] * 2, scale: 0.9 }`
    `animate: { opacity: 1, y: 0, rotate: [-6, 5, -3, 4][i], scale: 1 }`
  - Red circular ink stamp with year and location ("SPITI 2022") stamps down at `rotate(-14deg)`.

#### Tab 4: "not UR type" (Interactive Vinyl Turntable)
* **Vinyl Player Sleeve**:
  - Click to play/pause (or press Space / Enter).
  - When playing:
    - The vinyl record disc slides out from the left sleeve:
      `animate: { top: "-34%", left: "14%", width: "72%", height: "72%", borderRadius: "50%" }`.
    - Record disc begins continuous 360° spin (`animation: 5s linear infinite vinyl-spin`).
    - Sound engine plays physical mechanical `"clunk"` on needle drop!
    - YouTube audio stream starts playing the selected track.
* **Tracklist & Controls**:
  - 65+ Indian indie tracks (Anuv Jain, The Local Train, Taba Chake, When Chai Met Toast, Prateek Kuhad).
  - Scrubbable progress bar with current timestamp and total duration.
  - Previous / Next track buttons with mechanical `"rewind"` audio effect.

#### Tab 5: "gallery"
* 13 curated photographs from travels, food, street life, and work.
* Masonry grid with staggered column heights.
* Hovering any photo elevates it with soft shadow and `scale(1.02)`.

#### Simulated Extra Tabs: Claude & ChatGPT
* When opened, renders a high-fidelity Claude or ChatGPT interface.
* Users can click prompt suggestions:
  - *"who is samay?"*
  - *"what does he actually build?"*
  - *"designer or developer?"*
  - *"what's he like outside work?"*
  - *"how do I reach him?"*
* Typewriter streaming response effect: Output text streams word by word at `34ms` intervals.

---

## 8. Mountain Summit Outro & Topographic Footer

1. **Outro Text Reveal**:
   - Pinned stage: *"that's all from my side. now i'm going to the mountains."*
2. **K2 Mountain Silhouette**:
   - Massive vector landscape showing elevation lines up to the 8,611 m summit of K2.
   - Death Zone marker line at 8,000 m.
   - Summit flag with coordinate label.
3. **Pencil Progress Indicator**:
   - Fixed to the right edge of the viewport.
   - Features a pencil icon that moves vertically down a guide rail.
   - Text indicator shows numeric percentage (`0%` to `100%`).
   - Dynamically calculates background luminance: if over dark sections (like the featured work gallery), the pencil and text invert to pure white; over light paper backgrounds, they return to dark charcoal.
