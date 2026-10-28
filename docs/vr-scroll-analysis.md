# Featured Work: WebGL Cylindrical Curved-Surface Gallery Analysis & Technical Specification

> **Reference Target**: [https://samaymaurya.com/#work](https://samaymaurya.com/#work)  
> **Document Purpose**: Reverse-engineered WebGL cylindrical shader architecture, curved geometry, and interaction physics.  
> **Author**: Senior Creative Frontend Engineer  

---

## 1. Reference Architecture & Library Confirmation (STEP 1)

### OBSERVED
* **Canvas Layering**: `samaymaurya.com` utilizes a full-viewport WebGL `<canvas>` surface layer (pinned behind UI chrome with high-DPR hardware acceleration).
* **Curved Surface & Bent Mesh**: Each featured project card is NOT a flat CSS element; it is rendered as a **subdivided 3D plane mesh** that is continuously bent around a cylindrical radius.
* **Surface Warping**: As a card enters or leaves the center focus zone, its left and right edges visibly curve backward away from the camera. The internal artwork, typography, and background physically warp around the cylinder curve.
* **Velocity Distortion & Blur**: Moving the cylinder quickly introduces horizontal motion blur and dynamic surface distortion (uniforms `uVelocity`, `uOffset`, `uBend`) that settle back into pin-sharp focus when scrolling stops.
* **DOM Accessibility Integration**: Real DOM elements are maintained in the background with accessible semantic HTML, keyboard focus management (`Tab`), and screen reader links, synchronized with the active 3D card.

### INFERRED
* **Underlying 3D Library**: Three.js (`three` is already present in `package.json` at `^0.185.1`) with custom `ShaderMaterial` and dense `PlaneGeometry` (~64 × 32 subdivisions).
* **No New Dependencies**: Three.js is already installed in the repository, making it the ideal, zero-dependency addition for maximum stability and performance.

---

## 2. WebGL Mathematical Formulation & Shader Pipeline

### A. Cylindrical Geometry & Vertex Shader
Let:
* $R$ be the cylinder radius in Three.js world units ($R \approx 4.5 - 5.5$).
* $x_{\text{world}} = \text{position.x} + \text{cardIndex} \times \text{cardSpacing} - uOffset$.
* $\theta = \frac{x_{\text{world}}}{R}$.

The vertex transformation in the custom vertex shader:
$$\begin{aligned}
x' &= R \cdot \sin(\theta) \\
z' &= R \cdot (\cos(\theta) - 1.0) \\
y' &= \text{position.y} - \text{sign}(x_{\text{world}}) \cdot \left(\frac{x_{\text{world}}}{R}\right)^2 \times 0.08
\end{aligned}$$

**Velocity Bulge & Normal Skewing**:
$$z' \mathrel{+}= \sin(\text{uv.x} \cdot \pi) \cdot uVelocity \times 0.15$$

### B. Fragment Shader: Multi-Tap Blur, Chromatic Offset & Rounded SDF
* **Multi-Tap Gaussian Blur**:
  Samples 7 taps along the horizontal axis with sample step proportional to distance from center and scroll velocity:
  $$\text{blurStep} = |x_{\text{world}}| \times 0.0035 + |uVelocity| \times 0.012$$
* **Edge Vignette & Fade**:
  $$\text{alpha} = \text{clamp}(1.0 - (|x_{\text{world}}| / \text{maxVisible}) \times 0.65, 0.0, 1.0)$$
* **Rounded Corner SDF Mask**:
  Discards pixels outside corner radius $r$:
  $$\text{dist} = \text{length}(\max(|p| - (b - r), 0.0)) - r$$

---

## 3. Interaction & Accessibility Contract

1. **Raycasting & Pointer Events**: 
   A raycaster tests the WebGL plane meshes. Clicking the center card opens its case study (`/projects/${project.id}`). Hovering shows a pointer cursor and highlights the card.
2. **Hidden Accessible DOM Tree**:
   Underneath the canvas, real DOM `<article>` elements with `<a>` links and full textual content are preserved. Keyboard `Tab` navigation shifts focus directly to the card links, and focus events update `uOffset` to smoothly center the focused card.
3. **Progress HUD & Section Bounds**:
   The vertical pen marker and percentage counter on the right rail sync 1:1 with `uOffset / totalTravel`.
4. **Reduced Motion**:
   Under `prefers-reduced-motion: reduce`, the cylindrical bending curvature ($R \to \infty$) and velocity blur are disabled.
