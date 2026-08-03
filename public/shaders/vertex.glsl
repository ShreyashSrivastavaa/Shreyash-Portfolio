// ═══════════════════════════════════════════════════════════
// VERTEX SHADER — Procedural Displacement + Mouse Reactivity
// Shreyash Srivastava Portfolio — Legendary Edition
// ═══════════════════════════════════════════════════════════

uniform float uTime;
uniform float uFrequency;
uniform float uAmplitude;
uniform vec2  uMouse;
uniform float uScrollProgress;
uniform float uBassIntensity;
uniform float uExplode;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;
varying float vDisplacement;
varying float vFresnel;
varying vec2 vUv;

// ——— Simplex Noise 3D ———
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g  = step(x0.yzx, x0.xyz);
  vec3 l  = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
  + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// ——— FBM (Fractal Brownian Motion) ———
float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 4; i++) {
    value += amplitude * snoise(p * frequency);
    frequency *= 2.2;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;

  // ——— Multi-layered displacement ———
  float slowTime = uTime * 0.3;

  // Layer 1: Large organic breathing
  float noise1 = fbm(position * uFrequency + slowTime * 0.4);

  // Layer 2: Medium detail ripples
  float noise2 = snoise(position * uFrequency * 2.5 + uTime * 0.7) * 0.3;

  // Layer 3: Fine surface detail
  float noise3 = snoise(position * uFrequency * 6.0 + uTime * 1.2) * 0.08;

  // Layer 4: Mouse-reactive displacement
  float mouseInfluence = 1.0 - smoothstep(0.0, 2.0, length(position.xy - uMouse * 2.0));
  float mouseDisp = mouseInfluence * 0.35 * sin(uTime * 3.0 + length(position) * 4.0);

  // Layer 5: Bass-reactive pulse
  float bassPulse = uBassIntensity * 0.4 * sin(position.x * 3.0 + position.y * 2.0 + uTime * 8.0);

  // Layer 6: Scroll-driven warp
  float scrollWarp = uScrollProgress * 0.2 * snoise(position * 1.5 + uTime * 0.2);

  // Combine all displacement layers
  float totalDisplacement = (noise1 + noise2 + noise3 + mouseDisp + bassPulse + scrollWarp) * uAmplitude;

  // Explode mode: push vertices outward
  float explodeOffset = uExplode * position * 3.0;

  vDisplacement = totalDisplacement;

  vec3 displaced = position + normal * totalDisplacement;
  displaced += normal * explodeOffset;

  // Compute world position for fresnel
  vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
  vWorldPosition = worldPos.xyz;

  // Fresnel factor
  vec3 worldNormal = normalize(mat3(modelMatrix) * normal);
  vec3 viewDir = normalize(cameraPosition - worldPos.xyz);
  vFresnel = pow(1.0 - max(dot(worldNormal, viewDir), 0.0), 3.0);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
