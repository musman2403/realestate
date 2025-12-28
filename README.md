# Vital Estates - Premium Real Estate Platform

A high-performance, conversion-focused real estate landing page featuring advanced animations and a premium dark aesthetic.

## 🚀 Key Features

### 🎨 Visual & Interactive
- **Dual Particle System**:
  - **Hero Section**: Polygon mesh shower using `tsParticles`.
  - **Global**: Custom Canvas-based falling meteor shower with glowing heads and gradients (Z-Ordered for readability).
- **Orbiting Services**:
  - **Desktop**: Interactive 3D orbiting animation that pauses on hover.
  - **Mobile**: Responsive vertical grid layout for maximum readability.
- **Scroll Animations**:
  - Magnetic buttons and hover effects.
  - Scroll-triggered reveal animations.
  - Interactive testimonials with touch-swipe support.

### 📱 Mobile functionality
- Fully responsive design.
- Touch-optimized carousels and navigation.
- Performance-tuned animations (reduced particle count on mobile).

## 🛠️ Tech Stack
- **Core**: Semantic HTML5, CSS3 (Variables + Flexbox/Grid), Vanilla JavaScript (ES6+).
- **Libraries**: 
  - [`tsParticles`](https://particles.js.org/) (Hero background).
- **Architecture**:
  - CSS-first animations for performance.
  - Modular JS architecture (`AnimationController`).

## 🏃‍♂️ Getting Started

### Prerequisites
No node modules or build steps required. This is a static site.

### Running Locally
You can serve the files using any static file server.

**Using Python:**
```bash
python -m http.server 3000
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

**Using VS Code:**
- Install "Live Server" extension.
- Right-click `index.html` -> "Open with Live Server".

## 📂 Project Structure
```
Vital Estate/
├── index.html          # Main entry point
├── styles.css          # Global styles & design system
├── animations.js       # Animation logic (Orbit, Meteors, Interactivity)
└── assets/
    ├── particles/      # Particle configurations
    └── svg/            # Vector assets
```

## ✨ Design Philosophy
"Documentation-First Real Estate" — The design reflects trust, premium quality, and verification.

---
© 2025 Vital Estates & Builders.
