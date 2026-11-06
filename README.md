# Cyril William — Liquid Metal Edition Portfolio

A production-ready personal engineering portfolio website built for **Cyril William**, featuring a **real-time WebGL liquid metal fluid simulation** powered by Three.js and GLSL domain-warping shaders.

---

## 🌊 WebGL Liquid Metal Shader Architecture

- **Engine**: Three.js + Custom GLSL Vertex & Fragment Shaders
- **Noise Algorithms**: 3D Simplex noise functions with 3-layer domain-warped fluid current
- **Surface Dynamics**:
  - Layer 1: Macro fluid current (swirling liquid metal body)
  - Layer 2: Stretching & bending fluid ribbons
  - Layer 3: Surface capillary micro-ripples
  - Interactive mouse and touch ripple turbulence with damping
- **Optics**:
  - Chromatic dispersion on liquid ribbon flow
  - Blinn-Phong specular calculation (chrome reflection)
  - Fresnel rim lighting on fluid edges
  - Automatic procedural fallback with 65% Black, 20% Lime Green, 15% Royal Purple
- **Performance**:
  - IntersectionObserver pauses rendering when scrolled off-screen
  - Zero heavy CPU overhead, GPU-accelerated fragment shader

---

## 🎨 Visual Identity

- **Noir (#050505)**: 65% Dominant background and negative space
- **Neon Lime (#C6FF00)**: 20% Interactive highlights, CTAs, status badges
- **Royal Purple (#7C3AED / #A855F7)**: 15% Fluid ribbon accents, secondary badges

---

## 🛠️ Tech Stack & Commands

- **React 19**
- **Vite 6**
- **Three.js 0.173**
- **Tailwind CSS v4**
- **Lucide Icons**

```bash
# Install dependencies
npm install

# Local development
npm run dev

# Production build
npm run build
```
