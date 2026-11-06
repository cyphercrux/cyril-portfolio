# Cyril William — Premium Interactive Portfolio

A production-ready personal engineering portfolio website built for **Cyril William**, an Electrical Engineering student specializing in embedded systems, IoT automation, EV battery monitoring, and industrial electrical panel testing.

The website pairs an editorial minimalist dark aesthetic with an advanced **multi-cursor autonomous agent system** and a **Craig Reynolds Boids fish-school swarm finale**.

---

## 🎨 Visual Identity & Color System

The visual design is strictly balanced across three core colors:

| Color | Hex | Proportion | Application |
|---|---|---|---|
| **Noir / Black** | `#050505` | **65%** | Dominant foundation, cards (`#121214`), borders (`#292929`), calm negative space |
| **Lime Green** | `#C6FF00` | **20%** | Key interactions, selection box reveals, active pills, status indicators, primary buttons |
| **Electric Purple** | `#7C3AED` / `#A855F7` | **15%** | Secondary agent identities, technical badges, schematic accents, hover glows |

### Typography
- **Headings / Display**: Anton & Space Grotesk (Oversized, technical, bold)
- **Body**: Manrope & Inter (Crisp, highly readable)
- **Technical Badges**: JetBrains Mono

---

## ⚡ Signature Feature: Multi-Cursor Agent System

A synchronized fleet of **simulated digital cursor agents** operates across the interface without interfering with actual user clicks or touch controls (`pointer-events: none`):

1. **Content-Driven Selection Reveals (`SelectionReveal.jsx`)**:
   - As sections scroll into view, an autonomous agent flies to the target coordinates.
   - The agent anchors at the top-left and draws an animated rectangular selection box (with technical corner brackets in lime green or purple).
   - As the bounding box completes, the content snaps into full clarity with an editorial reveal transition.
   - Sequential, coordinated reveals for Hero, About, Education, Siemens/Vivid Experience, Skills, Project Cards, and Contact.

2. **8 Independent Agent Identities**:
   - `Lex // Lead Architect` (Lime `#C6FF00`)
   - `Nova // Layout Specialist` (Light Purple `#A855F7`)
   - `Vex // Circuit Inspector` (Secondary Lime `#B7FF00`)
   - `Pulse // Telemetry Probe` (Primary Purple `#7C3AED`)
   - `Echo // Systems Auditor` (Lime `#C6FF00`)
   - `Spark // Hardware Runner` (Deep Violet `#8B5CF6`)
   - `Flux // Flow Analyzer` (Lime Accent `#D4FF33`)
   - `Orbit // Swarm Coordinator` (Purple Glow `#9333EA`)

3. **Fish-School Swarm Finale (`BoidsEngine.js`)**:
   - Inspired by the organic schooling behavior of fish, built using Craig Reynolds' Boids algorithm:
     - **Separation**: Agents maintain personal breathing room.
     - **Alignment**: Agents steer towards the average heading of nearby flockmates.
     - **Cohesion**: Agents steer towards the local center of mass.
     - **Schooling Dynamics**: Oscillating split and merge cycles allow the school to naturally divide into smaller groups and regroup across the screen.
   - Activates automatically at the bottom finale section ("THANKS FOR EXPLORING MY WORLD").

4. **Motion Button**:
   - Prominently positioned in the top navigation.
   - One-click toggle between active agent simulation and static editorial mode.
   - Persists visitor preference in `localStorage`.
   - Automatically respects `prefers-reduced-motion`.

---

## 📁 Verified Projects Documented

All project information is verified from Cyril William's academic papers, test logs, and lab bench setups:

1. **Project 01: CRUX — IoT-Based EV Battery Monitoring System Using AI Predictive Analysis**
   - Microcontroller: ESP32-S3 / VVM601
   - Sensors: INA219 (voltage & current), Temperature sensors
   - Telemetry: Nginx, AWS Cloud, timestamped JSON database
   - Client: React Native mobile diagnostics application
   - Analysis: Decision Tree predictive modeling for thermal runaway prevention
   - Schematics: Full system block diagram, circuit schematic, motor-load test bench

2. **Project 02: Classroom Automation Using ESP8266 and IoT**
   - Controller: NodeMCU ESP8266
   - Switching: 4-Channel electromechanical relays with optocoupler isolation
   - Interface: Blynk IoT cloud dashboard & Wi-Fi telemetry
   - Objective: Curtail standby energy consumption in unoccupied institutional halls

3. **Project 03: PIR Sensor-Based Automatic Lighting System**
   - Controller: Arduino Uno
   - Sensor: HC-SR501 passive infrared pyroelectric sensor
   - Switching: 5V relay module with non-blocking 30-second countdown hold timer
   - Application: Occupancy-based automatic corridor illumination

4. **Project 04: Mobile Signal Jammer — RF Electronics Prototype**
   - Core: NE555 timer IC in astable multivibrator mode
   - Tuning: Discrete copper inductors, variable trimmer capacitors, tuned LC tank
   - Purpose: Academic investigation into high-frequency oscillator principles and carrier interference

---

## 🛠️ Project Architecture

```
cyril-william-portfolio/
├── public/
│   ├── favicon.ico
│   ├── apple-icon.png
│   ├── fonts/
│   └── images/
│       ├── personal/          # Cyril's authentic portraits
│       ├── profile/
│       ├── projects/          # Hardware photos & circuit schematics
│       └── og/                # OpenGraph social banners
├── src/
│   ├── config/
│   │   └── site.js            # Centralized personal info & verified contacts
│   ├── data/
│   │   ├── projects.js        # Single source of truth for projects
│   │   └── experience.js      # Siemens, Vivid, Education & Skills
│   ├── animations/
│   │   ├── types.js           # Agent identity configs & state definitions
│   │   ├── BoidsEngine.js     # Craig Reynolds flocking & fish-school physics
│   │   ├── SelectionReveal.jsx# Intersection-triggered selection box reveal wrapper
│   │   ├── AgentCursor.jsx    # Crisp vector pointer & badge renderer
│   │   └── AgentManager.jsx   # 60fps canvas & RAF physics orchestrator
│   ├── components/
│   │   ├── Navbar.jsx         # Sticky header with Motion toggle
│   │   ├── Footer.jsx         # Minimalist editorial footer
│   │   └── sections/
│   │       ├── HeroSection.jsx
│   │       ├── AboutSection.jsx
│   │       ├── ProjectGallery.jsx
│   │       ├── ProjectDialog.jsx  # Accessible modal with schematics & specs
│   │       ├── ContactSection.jsx # Validated form & verified contact details
│   │       └── SwarmFinale.jsx    # School-of-fish finale climax
│   ├── styles/
│   │   └── index.css          # Tailwind CSS v4 + editorial design tokens
│   ├── App.jsx
│   └── main.jsx
├── index.html                 # Comprehensive SEO & OpenGraph metadata
├── vite.config.js             # Vite + React + Tailwind v4 static bundle
└── package.json
```

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start local development server
```bash
npm run dev
```

### 3. Build for production (Static distribution)
```bash
npm run build
```
The optimized static production assets will be output to the `dist/` directory.

### 4. Preview production build locally
```bash
npm run preview
```

---

## 🌐 Deployment to GitHub & Vercel

### Step A: Push to GitHub
```bash
git init
git add .
git commit -m "feat: complete Cyril William premium portfolio with multi-cursor agent system & fish swarm finale"
git branch -M main
git remote add origin https://github.com/cyphercrux/<repo-name>.git
git push -u origin main
```

### Step B: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Import your GitHub repository.
3. Vercel automatically detects **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Your portfolio will be live worldwide on a global CDN with SSL!

---

© 2026 Cyril William. All verified content maintained in `src/config/site.js`.

