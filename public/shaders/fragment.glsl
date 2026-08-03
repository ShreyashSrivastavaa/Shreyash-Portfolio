// ═══════════════════════════════════════════════════════════
// FRAGMENT SHADER — Iridescent Holographic + Liquid Metal
// Shreyash Srivastava Portfolio — Legendary Edition
// ═══════════════════════════════════════════════════════════

uniform float uTime;
uniform vec3  uColorA;      // Primary: #7C3AED
uniform vec3  uColorB;      // Accent:  #06D6A0
uniform vec3  uColorC;      // Gold:    #F5C842
uniform vec3  uColorD;      // Hot:     #FA4169
uniform float uIntensity;
uniform float uBassIntensity;
uniform float uChromaticAberration;
uniform int   uMode;        // 0=iridescent, 1=liquid, 2=wireframe, 3=xray

varying vec3  vNormal;
varying vec3  vPosition;
varying vec3  vWorldPosition;
varying float vDisplacement;
varying float vFresnel;
varying vec2  vUv;

// ——— HSV conversion ———
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

// ——— Noise for surface detail ———
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise2D(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(cameraPosition - vWorldPosition);

  // ═══════ MODE 0: IRIDESCENT HOLOGRAPHIC ═══════
  if (uMode == 0) {
    // Rainbow iridescent based on view angle and position
    float hue = dot(normal, viewDir) * 0.5 + 0.5;
    hue += uTime * 0.05;
    hue += vPosition.x * 0.15 + vPosition.y * 0.1;
    hue = fract(hue);

    vec3 iridescent = hsv2rgb(vec3(hue, 0.7, 0.95));

    // Blend with brand colors
    float t1 = sin(uTime * 0.4 + vPosition.x * 2.0) * 0.5 + 0.5;
    float t2 = cos(uTime * 0.35 + vPosition.y * 1.8) * 0.5 + 0.5;
    float t3 = sin(uTime * 0.3 + vPosition.z * 2.2) * 0.5 + 0.5;

    vec3 brandColor = mix(uColorA, uColorB, t1);
    brandColor = mix(brandColor, uColorC, t2 * 0.35);
    brandColor = mix(brandColor, uColorD, t3 * 0.15);

    vec3 color = mix(brandColor, iridescent, 0.45);

    // Fresnel rim glow
    color += vec3(0.8, 0.6, 1.0) * vFresnel * 0.8;

    // Displacement highlight
    float dispGlow = smoothstep(0.0, 0.15, vDisplacement);
    color += uColorB * dispGlow * 0.6;

    // Neon edge glow
    float edgeFactor = pow(vFresnel, 1.5);
    vec3 neonGlow = mix(uColorA, uColorB, sin(uTime * 0.8) * 0.5 + 0.5);
    color += neonGlow * edgeFactor * 1.2;

    // Bass-reactive pulse
    color += uColorD * uBassIntensity * 0.4 * sin(uTime * 6.0 + vPosition.x * 4.0);

    // Chromatic aberration simulation
    float aberration = uChromaticAberration * 0.02;
    color.r += sin(vUv.x * 40.0 + uTime * 2.0) * aberration;
    color.b -= cos(vUv.y * 40.0 + uTime * 1.5) * aberration;

    float alpha = 0.92 + vFresnel * 0.08;
    gl_FragColor = vec4(color * uIntensity, alpha);
  }

  // ═══════ MODE 1: LIQUID METAL ═══════
  else if (uMode == 1) {
    // Metallic reflection simulation
    vec3 reflected = reflect(-viewDir, normal);
    float metallic = dot(reflected, vec3(0.0, 1.0, 0.0)) * 0.5 + 0.5;

    // Liquid ripple pattern
    float ripple = sin(vPosition.x * 8.0 + uTime * 2.0)
                 * cos(vPosition.y * 6.0 + uTime * 1.7)
                 * sin(vPosition.z * 7.0 + uTime * 1.3);
    ripple = ripple * 0.5 + 0.5;

    vec3 metalColor = mix(vec3(0.85, 0.85, 0.9), vec3(0.2, 0.2, 0.3), metallic);
    metalColor = mix(metalColor, uColorA, ripple * 0.3);

    // Specular highlights
    vec3 halfDir = normalize(viewDir + vec3(0.5, 1.0, 0.3));
    float specular = pow(max(dot(normal, halfDir), 0.0), 64.0);
    metalColor += vec3(1.0) * specular * 1.5;

    // Fresnel for metallic edges
    metalColor += vec3(0.6, 0.7, 1.0) * vFresnel * 0.5;

    gl_FragColor = vec4(metalColor * uIntensity, 0.95);
  }

  // ═══════ MODE 2: WIREFRAME GLOW ═══════
  else if (uMode == 2) {
    // Edge detection via barycentric-like approach
    float edgeDist = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
    float wireThickness = 0.02;
    float wire = 1.0 - smoothstep(0.0, wireThickness, edgeDist);

    vec3 wireColor = mix(uColorA, uColorB, sin(uTime * 0.5 + vPosition.y * 2.0) * 0.5 + 0.5);
    wireColor *= 1.5; // Extra glow

    vec3 fillColor = vec3(0.02, 0.03, 0.06);
    vec3 color = mix(fillColor, wireColor, wire);

    // Fresnel glow
    color += uColorA * vFresnel * 0.4;

    gl_FragColor = vec4(color * uIntensity, 0.3 + wire * 0.7);
  }

  // ═══════ MODE 3: X-RAY ═══════
  else if (uMode == 3) {
    float intensity = pow(vFresnel, 1.2);
    vec3 xrayColor = mix(uColorB * 0.3, uColorA, intensity);

    // Internal structure lines
    float lines = sin(vPosition.x * 20.0 + uTime) * sin(vPosition.y * 20.0 + uTime * 0.7);
    lines = smoothstep(0.9, 1.0, abs(lines));
    xrayColor += uColorC * lines * 0.3;

    float alpha = 0.15 + intensity * 0.7;
    gl_FragColor = vec4(xrayColor * uIntensity, alpha);
  }
}
