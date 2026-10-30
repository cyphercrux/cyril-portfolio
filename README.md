# Cyril William — Personal Portfolio Website

A premium, futuristic, engineering-focused personal portfolio website for **Cyril William**, Electrical Engineering student at the University of Mumbai (Fr. C. Rodrigues Institute of Technology, Vashi).

![Cyril William Portfolio Preview](/public/images/hero/cyril-portfolio-hero.jpg)

---

## ⚡ Brand & Visual Identity

- **Visual Balance**: 65% Black foundation (`#050505`, `#09090B`), 20% Neon Lime (`#C6FF00`, `#B8FF3B`), 15% Royal Purple & Deep Violet (`#7C3AED`, `#35105F`, `#A855F7`).
- **Display Typography**: **Proxon** bold display font paired with **Space Grotesk** for clean, legible body copy and technical case studies.
- **Hero Experience**: Real-time procedural **WebGL Liquid Metal Shader** with 3-layer domain warping, multi-octave simplex noise, 3D Blinn-Phong specular reflections, and chromatic depth, inspired by Cyril's supplied hero artwork.
- **Performance Optimization**: `IntersectionObserver` automatically pauses the WebGL rendering loop when the hero scrolls out of view (**0% GPU/CPU overhead** when reading case studies).
- **Introduction**: Dual-layer interactive typing animation for Cyril William's name and cyclic typing/deleting animation for engineering specialisations with automatic replay on re-entry. Balanced 2-column layout (bio on left, 310px framed portrait on right).
- **Contact & Communication**: Direct mail routing to **`cyrilwilliam2003@gmail.com`**.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, Static Site Generation / SSG)
- **Language**: TypeScript
- **Styling**: Modern CSS variables & tokens (`app/globals.css`)
- **3D & Shaders**: Three.js + Custom WebGL GLSL Shaders (`shaders/liquidMetal.ts`)
- **Typography**: Local `@font-face` Proxon (TrueType) & Space Grotesk (Variable WOFF2)
- **Deployment**: Standalone production build compatible with Vercel, Netlify, Docker, or Node.js

---

## 📂 Project Structure

```
cyril-portfolio/
├── app/
│   ├── about/
│   │   └── page.tsx                 # Bio, education (FCRIT), Siemens/Vivid internships, skills
│   ├── contact/
│   │   └── page.tsx                 # Contact channels & interactive form
│   ├── projects/
│   │   ├── [slug]/
│   │   │   └── page.tsx             # Complete technical case studies with photo galleries
│   │   └── page.tsx                 # Project showcase with interactive category filtering
│   ├── globals.css                  # Theme tokens, Proxon/Space Grotesk fonts, layout grids
│   ├── icon.tsx                     # Dynamic SVG Next.js favicon generator
│   ├── layout.tsx                   # Root layout, metadata & OpenGraph cards, Cursor, Navbar, Footer
│   ├── page.tsx                     # Home page (Hero → Intro → Selected Work → Experience → CTA)
│   ├── robots.ts                    # Search engine crawler configuration
│   └── sitemap.ts                   # Dynamic XML sitemap covering all routes & project slugs
├── components/
│   ├── ContactForm.tsx              # Interactive contact form routing to cyrilwilliam2003@gmail.com
│   ├── Footer.tsx                   # Clean footer with GitHub, LinkedIn, Instagram links
│   ├── Fx.tsx                       # Custom cursor, scroll progress, reveal animations
│   ├── Hero.tsx                     # Cinematic liquid-metal WebGL hero section with fallback
│   ├── Img.tsx                      # Optimized Next.js image component with fallback handling
│   ├── Introduction.tsx             # Interactive typing name, role cycler, bio & portrait
│   ├── Lightbox.tsx                 # Full-screen image lightbox for hardware photography
│   ├── LiquidMetalCanvas.tsx        # High-performance Three.js WebGL canvas with auto-pause
│   ├── Navbar.tsx                   # Responsive header with mobile drawer & active route indicator
│   └── ProjectGrid.tsx              # Dynamic project grid with tag filtering and lightbox support
├── data/
│   ├── projects.ts                  # Single source of truth for all projects, specs, and gallery photos
│   └── site.ts                      # Central site metadata, contact info, education & internships
├── public/
│   ├── fonts/
│   │   ├── Proxon.ttf               # Proxon display typeface
│   │   └── SpaceGrotesk-Variable.woff2 # Modern geometric sans-serif
│   └── images/
│       ├── hero/
│       │   └── cyril-portfolio-hero.jpg # Liquid metal gradient artwork
│       ├── personal/
│       │   ├── portrait-casual-campus.jpg
│       │   ├── portrait-suit-arms-crossed.jpg
│       │   └── portrait-suit-full.jpg
│       └── projects/
│           ├── classroom-automation/
│           ├── crux/                # ESP32 EV battery monitoring board & testbench gallery
│           ├── mobile-jammer/
│           └── pir-lighting/
├── shaders/
│   └── liquidMetal.ts               # Procedural GLSL vertex & fragment shaders
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ (tested on v26.13.0 LTS)
- **npm** or **pnpm**

### Installation

```bash
cd cyril-portfolio
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

This compiles an optimized static export (14 static pages generated with 0 errors).

### Standalone Production Server

```bash
npm run start
```
Or for standalone container deployment:
```bash
node .next/standalone/server.js
```

---

## 👤 Author

**Cyril William**
- **Email**: [cyrilwilliam2003@gmail.com](mailto:cyrilwilliam2003@gmail.com)
- **GitHub**: [github.com/cyphercrux](https://github.com/cyphercrux)
- **LinkedIn**: [linkedin.com/in/cyrilwilliam](https://www.linkedin.com/in/cyrilwilliam)
- **Instagram**: [@\_cyril_william\_](https://www.instagram.com/_cyril_william_/)
- **College**: Fr. C. Rodrigues Institute of Technology, Vashi (University of Mumbai)
