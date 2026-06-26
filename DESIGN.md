# IBT Solutions & IslandHub - Design System

Inspired by Google Stitch DESIGN.md format. A custom Caribbean-inspired design system for building consistent UI across IBT Solutions and IslandHub platforms.

---

## Visual Theme & Atmosphere

**Philosophy**: Tropical Premium meets Technical Precision

The design draws from Caribbean geography and culture while maintaining the professional feel of top tech platforms. Ocean blues blend with sunset oranges, creating a warm yet professional aesthetic. The system balances warmth (Caribbean hospitality) with precision (modern tech platforms).

**Density**: Medium - comfortable spacing with clear visual hierarchy

**Motion**: Subtle, purposeful animations. No excessive movement. Respect 200ms minimum transition times.

---

## Color Palette

> **All colors use OKLCH for perceptual uniformity.** Same lightness = same perceived brightness regardless of hue. This ensures accessible contrast in both light and dark modes without manual tweaking.

### Core Colors

| Token | OKLCH | L* | Role | Usage |
|-------|-------|-----|------|-------|
|| `--ocean-900` | `oklch(0.10 0.012 230)` | 10% | Primary Dark | Main backgrounds, headers |
|| `--ocean-800` | `oklch(0.13 0.018 230)` | 13% | Dark | Cards, elevated surfaces |
|| `--ocean-700` | `oklch(0.20 0.022 230)` | 20% | Medium Dark | Borders, dividers |
|| `--ocean-600` | `oklch(0.30 0.024 230)` | 30% | Medium | Secondary elements |
|| `--ocean-500` | `oklch(0.56 0.12 230)` | 56% | Primary | Primary actions, links |
|| `--ocean-400` | `oklch(0.70 0.10 230)` | 70% | Primary Light | Hover states |
|| `--ocean-300` | `oklch(0.82 0.06 230)` | 82% | Light | Secondary text, icons |

### Accent Colors

| Token | OKLCH | L* | Role | Usage |
|-------|-------|-----|------|-------|
|| `--sunset-600` | `oklch(0.55 0.18 40)` | 55% | Bold Accent | Urgent, important |
|| `--sunset-500` | `oklch(0.65 0.20 40)` | 65% | Primary Accent | CTAs, highlights |
|| `--sunset-400` | `oklch(0.75 0.16 40)` | 75% | Accent Light | Hover, secondary actions |
|| `--coral-500` | `oklch(0.65 0.18 25)` | 65% | Soft Accent | Alerts, notifications |
|| `--turquoise-500` | `oklch(0.75 0.15 175)` | 75% | Success | Success states, positive |

### Neutral Colors (Caribbean-tinted — no pure gray)

| Token | OKLCH | L* | Role | Usage |
|-------|-------|-----|------|-------|
|| `--sand-50` | `oklch(0.99 0.002 80)` | 99% | Lightest | Light backgrounds |
|| `--sand-100` | `oklch(0.97 0.004 80)` | 97% | Light | Card backgrounds |
|| `--sand-200` | `oklch(0.93 0.006 80)` | 93% | Light Border | Borders |
|| `--sand-300` | `oklch(0.86 0.008 80)` | 86% | Muted | Placeholder text |
|| `--ink-500` | `oklch(0.55 0.020 230)` | 55% | Secondary | Body text |
|| `--ink-700` | `oklch(0.30 0.018 230)` | 30% | Primary Text | Headings |
|| `--ink-900` | `oklch(0.13 0.014 230)` | 13% | Dark Text | Primary content |

### Semantic Colors

| Token | OKLCH | L* | Usage |
|-------|-------|-----|-------|
|| `--success` | `oklch(0.75 0.15 145)` | 75% | Success states |
|| `--warning` | `oklch(0.80 0.16 80)` | 80% | Warnings |
|| `--error` | `oklch(0.65 0.20 25)` | 65% | Errors |
|| `--info` | `oklch(0.70 0.14 230)` | 70% | Informational |

---

## Light Mode Palette

| Token | OKLCH | Role |
|-------|-------|------|
|| `--bg-primary` | `oklch(1.0 0.0 0)` | Main background (white) |
|| `--bg-secondary` | `oklch(0.98 0.002 230)` | Secondary surfaces |
|| `--bg-tertiary` | `oklch(0.96 0.004 230)` | Tertiary surfaces |
|| `--surface-elevated` | `oklch(0.99 0.002 230)` | Elevated cards/modals |
|| `--text-primary` | `oklch(0.13 0.014 230)` | Primary text |
|| `--text-secondary` | `oklch(0.42 0.020 230)` | Secondary text |
|| `--text-muted` | `oklch(0.55 0.020 230)` | Muted text |
|| `--border` | `oklch(0.90 0.008 230)` | Borders |

---

## Dark Mode Palette

| Token | OKLCH | Role |
|-------|-------|------|
|| `--bg-primary` | `oklch(0.10 0.012 230)` | Main background |
|| `--bg-secondary` | `oklch(0.13 0.018 230)` | Secondary surfaces |
|| `--bg-tertiary` | `oklch(0.20 0.022 230)` | Tertiary surfaces |
|| `--surface-elevated` | `oklch(0.16 0.018 230)` | Elevated cards/modals |
|| `--text-primary` | `oklch(0.97 0.004 230)` | Primary text |
|| `--text-secondary` | `oklch(0.82 0.012 230)` | Secondary text |
|| `--text-muted` | `oklch(0.72 0.016 230)` | Muted text |
|| `--border` | `oklch(0.30 0.024 230)` | Borders |

---

## Theme Modes (Beyond Dark/Light)

### Ocean Theme
- Primary: Ocean blues
- Background: Deep sea dark / bright horizon
- Best for: Professional services, B2B

### Sunset Theme
- Primary: Orange/coral accents
- Background: Warm tones
- Best for: Tourism, lifestyle, hospitality

### Emerald Theme
- Primary: Palm greens
- Background: Deep jungle / fresh green
- Best for: Environment, eco-tourism, nature

### Coral Reef Theme
- Primary: Coral and turquoise
- Background: Underwater blues
- Best for: Marine, beach, water sports

---

## Typography

### Font Families

**Primary Font** (Headings & UI):
```
font-family: 'Geist', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

**Monospace Font** (Code & Technical):
```
font-family: 'Geist Mono', 'JetBrains Mono', 'Fira Code', monospace
```

### Type Scale

| Level | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| Display | 48px / 3rem | 1.1 | 800 | Hero headlines |
| H1 | 36px / 2.25rem | 1.2 | 700 | Page titles |
| H2 | 30px / 1.875rem | 1.25 | 700 | Section headers |
| H3 | 24px / 1.5rem | 1.3 | 600 | Subsection |
| H4 | 20px / 1.25rem | 1.4 | 600 | Card titles |
| Body Large | 18px / 1.125rem | 1.6 | 400 | Lead paragraphs |
| Body | 16px / 1rem | 1.6 | 400 | Standard text |
| Body Small | 14px / 0.875rem | 1.5 | 400 | Secondary text |
| Caption | 12px / 0.75rem | 1.4 | 500 | Labels, badges |
| Overline | 11px / 0.6875rem | 1.3 | 600 | Category labels |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text |
| Medium | 500 | Emphasis, UI labels |
| Semibold | 600 | Headings, buttons |
| Bold | 700 | Strong emphasis |
| Black | 800 | Display, hero |

---

## Component Styling

### Buttons

**Primary Button**:
```css
background: var(--ocean-500);
color: white;
border-radius: 12px;
padding: 12px 24px;
font-weight: 600;
transition: all 0.2s ease;
```
Hover: `background: var(--ocean-400)`

**Secondary Button**:
```css
background: transparent;
color: var(--ocean-500);
border: 2px solid var(--ocean-500);
border-radius: 12px;
padding: 12px 24px;
font-weight: 600;
```
Hover: `background: var(--ocean-500); color: white`

**Accent Button**:
```css
background: var(--sunset-500);
color: white;
border-radius: 12px;
padding: 12px 24px;
font-weight: 600;
```
Hover: `background: var(--sunset-400)`

**Ghost Button**:
```css
background: transparent;
color: var(--slate-500);
border-radius: 12px;
padding: 12px 24px;
font-weight: 500;
```
Hover: `background: var(--bg-tertiary); color: var(--text-primary)`

### Button Sizes

| Size | Padding | Font Size | Border Radius |
|------|---------|-----------|---------------|
| sm | 8px 16px | 14px | 8px |
| md | 12px 24px | 16px | 12px |
| lg | 16px 32px | 18px | 16px |
| xl | 20px 40px | 20px | 20px |

### Cards

```css
background: var(--bg-secondary);
border: 1px solid var(--border);
border-radius: 16px;
padding: 24px;
box-shadow: 0 1px 3px rgba(0,0,0,0.05);
```

**Card Hover**:
```css
transform: translateY(-2px);
box-shadow: 0 8px 30px rgba(0,0,0,0.12);
border-color: var(--ocean-500);
```

### Form Inputs

```css
background: var(--bg-primary);
border: 1px solid var(--border);
border-radius: 12px;
padding: 12px 16px;
font-size: 16px;
color: var(--text-primary);
transition: all 0.2s ease;
```

**Input Focus**:
```css
border-color: var(--ocean-500);
box-shadow: 0 0 0 3px var(--ocean-500 / 0.2);
```

**Input Error**:
```css
border-color: var(--error);
box-shadow: 0 0 0 3px var(--error / 0.2);
```

### Navigation

**Top Nav**:
```css
background: var(--bg-primary / 0.8);
backdrop-filter: blur(12px);
border-bottom: 1px solid var(--border);
height: 64px;
padding: 0 24px;
```

**Sidebar**:
```css
background: var(--bg-secondary);
width: 280px;
border-right: 1px solid var(--border);
```

### Badges & Tags

```css
background: var(--ocean-500 / 0.1);
color: var(--ocean-500);
border-radius: 100px;
padding: 4px 12px;
font-size: 12px;
font-weight: 600;
```

**Status Badge Variants**:
- Success: `background: var(--success / 0.1); color: var(--success)`
- Warning: `background: var(--warning / 0.1); color: var(--warning)`
- Error: `background: var(--error / 0.1); color: var(--error)`
- Info: `background: var(--info / 0.1); color: var(--info)`

---

## Layout Principles

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight spacing |
| `--space-2` | 8px | Component internal |
| `--space-3` | 12px | Related elements |
| `--space-4` | 16px | Standard padding |
| `--space-5` | 20px | Section padding |
| `--space-6` | 24px | Card padding |
| `--space-8` | 32px | Section gaps |
| `--space-10` | 40px | Major sections |
| `--space-12` | 48px | Hero spacing |
| `--space-16` | 64px | Page margins |
| `--space-20` | 80px | Large gaps |
| `--space-24` | 96px | Full sections |

### Grid System

**Container**:
```css
max-width: 1280px;
padding: 0 24px;
margin: 0 auto;
```

**Grid**:
```css
display: grid;
gap: 24px;
```

| Grid Type | Columns |
|-----------|---------|
| Mobile | 1 column |
| Tablet | 2 columns |
| Desktop | 3 columns |
| Wide | 4 columns |

### Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| xs | 480px | Large phones |
| sm | 640px | Tablets portrait |
| md | 768px | Tablets landscape |
| lg | 1024px | Laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Wide screens |

---

## Depth & Elevation

### Shadow Scale

```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
--shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1);
--shadow-glow: 0 0 40px rgba(0, 102, 204, 0.3);
```

### Layer Hierarchy

| Layer | Elevation | Usage |
|-------|-----------|-------|
| Base | 0 | Page background |
| Card | 1 | Content cards |
| Dropdown | 2 | Menus, popovers |
| Sticky | 3 | Navigation |
| Modal | 4 | Dialogs, modals |
| Toast | 5 | Notifications |

### Gradients

**Hero Gradient**:
```css
background: linear-gradient(135deg, var(--ocean-900) 0%, var(--ocean-800) 50%, var(--sunset-600) 100%);
```

**Card Gradient**:
```css
background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
```

**Accent Glow**:
```css
background: radial-gradient(circle at center, var(--ocean-500 / 0.2) 0%, transparent 70%);
```

---

## Do's and Don'ts

### Do
✅ Use semantic color tokens for consistent meaning
✅ Maintain 16px minimum touch targets on mobile
✅ Use clear visual hierarchy (size, weight, color)
✅ Include adequate whitespace (minimum 24px between sections)
✅ Use icons consistently with the platform style
✅ Support both dark and light modes
✅ Follow the spacing scale exactly

### Don't
❌ Use arbitrary colors outside the palette
❌ Create custom font sizes outside the type scale
❌ Use shadows for non-interactive elements
❌ Mix different border radius values on the same page
❌ Use more than 3 font weights on a single page
❌ Create custom spacing values not in the spacing scale
❌ Use pure black (#000000) or pure white (#FFFFFF)

---

## Responsive Behavior

### Mobile-First Approach
- Design mobile first, then expand
- Use the spacing scale to maintain consistency
- Stack grids to single column on mobile
- Touch targets minimum 44x44px

### Collapsing Strategy
- Navigation: Hamburger menu on mobile
- Cards: Reduce padding on mobile (16px vs 24px)
- Hero: Reduce text size, stack content
- Forms: Full width inputs

### Touch Optimization
- Minimum 44x44px touch targets
- 8px minimum spacing between targets
- Avoid hover-only interactions
- Support swipe gestures where appropriate

---

## IslandHub Section Variations

### Marketplace (Amazon/eBay inspired)
- Use standard palette
- Product cards with clear pricing
- Search-focused header

### Rentals (Airbnb inspired)
- More imagery, larger cards
- Calendar date picker integration
- Map integration prominent

### Transport (Uber inspired)
- Map-centric interface
- Quick action buttons
- Status tracking UI

### Auctions (WhatNot inspired)
- Countdown timers prominent
- Bid history display
- Live indicator styling
- Urgency color accents (sunset)

### Community (Instagram/Facebook inspired)
- Feed-centric layout
- Avatar-focused
- Like/comment interaction buttons
- Story format at top

### Stores (Shopify inspired)
- Store header with branding
- Product grid layout
- Clear CTA buttons

---

## Agent Prompt Guide

When using this design system in an AI agent, use these prompts:

**For a landing page:**
```
Create a landing page using DESIGN.md as the visual reference. 
Include a hero section with gradient background, services grid with image cards, 
partner ecosystem section, and footer. Use the ocean theme with sunset accents.
```

**For a dashboard:**
```
Build a dashboard layout with sidebar navigation, top header with user menu, 
and main content area. Use card components for data display. 
Follow the dark mode palette.
```

**For a mobile-first component:**
```
Create a mobile-responsive card component that works on all breakpoints. 
Use the spacing scale for padding. Include touch-friendly interactions (44px targets).
```

---

## Preview Files

See companion preview files for visual reference:
- `preview.html` - Light mode preview
- `preview-dark.html` - Dark mode preview

---

## 3D Animated Shades — v2 Visual Layer

*Added 2026-06-01. This layer extends the Caribbean design system with depth-first 3D interactions, glass-morphism, and animated shading. It is the visual specialization of IBT Solutions.*

### Philosophy

"Animated Shades" means every UI element exists in 3D space and responds to light. Surfaces have volume, depth, and material properties. Colors shift like sunlight through water. The Caribbean ocean isn't just a color reference — it's a lighting model.

### 3D Depth System

Five depth layers, each with distinct material properties:

| Layer | Name | Z-Position | Material | Light Behavior |
|-------|------|------------|----------|----------------|
| 0 | Abyss | -200px | Void — no surface | Emits animated gradient (ocean waves) |
| 1 | Floor | 0px | Matte — solid color | Receives ambient light + cast shadows from Layer 2 |
| 2 | Surface | 50px | Glass — translucent with blur | Casts shadow on Layer 1, receives directional light |
| 3 | Floating | 100px | Crystal — high blur + refraction | Casts colored shadow (tinted by surface color) |
| 4 | Sky | 200px | Holographic — animated rainbow | Emits light onto layers below |

### Lighting Model

- **Primary light source:** Top-left, 45° angle. Warm white (#FFF7ED).
- **Secondary fill:** Bottom-right. Cool blue (#E0F2FE) at 30% intensity.
- **Ambient:** Ocean blue (#0F4C75) at 10% intensity — gives everything an underwater feel.
- **Rim light:** Gold (#FBBF24) edge highlight on hovered/active elements.

On interaction (hover/touch), the primary light source intensifies and shifts toward the interacted element.

### Glass-Morphism Specification

Glass panels are used on Layer 2+ surfaces:

```
Background: rgba(255, 255, 255, 0.04-0.08)
Backdrop Blur: 20px
Border: 1px solid rgba(255, 255, 255, 0.10)
Shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6)
```

**Glass variants by context:**
- **Clear Glass (marketplace cards):** blur(20px), opacity 0.04
- **Smoke Glass (nav, modals):** blur(24px), opacity 0.70
- **Ocean Glass (featured/premium):** blur(20px) + ocean blue tint, opacity 0.15
- **Gold Glass (achievements/vip):** blur(20px) + gold tint, opacity 0.08

**Mobile simplification:** No backdrop blur (performance). Use solid rgba(15, 23, 42, 0.95) instead.

### Animated Shading (Color Dynamics)

Colors aren't static — they shift based on context:

1. **Scroll-driven gradients:** Hero background gradient rotates 5-10° on scroll via ScrollTrigger
2. **Time-of-day tinting:** Optional. Warm (golden) shift during sunset hours, cool (blue) at night
3. **Interaction glow:** Hovered elements gain a colored glow matching their semantic role (ocean blue for interactive, gold for premium, coral for urgent)
4. **State transitions:** Color changes animate over 300ms with spring easing — never snap

### Particle Systems (Ambient)

CSS-only particles (no Three.js on mobile):

- **Ocean mode:** Small glowing dots (2-4px) rising slowly from bottom. Seafoam color. 20-30 particles.
- **Marketplace mode:** Tiny golden sparkles that appear near prices/CTA buttons. 10-15 particles.
- **Success mode:** Green confetti burst on trade completion/achievement unlock. 40 particles, 1s duration.

Implemented with pure CSS `@keyframes` for mobile performance. R3F particle systems on desktop only.

### Component: Holographic Card

Premium/featured items get holographic treatment:

```
Background: linear-gradient(135deg, ocean 0%, gold 25%, coral 50%, seafoam 75%, ocean 100%)
Background-size: 400% 400%
Animation: holoshift 4s ease infinite
```

The gradient continuously shifts, creating an iridescent/holographic foil effect.

### Component: 3D Press Button

Interactive buttons have physical depth:

```
Default:    translateY(0)     box-shadow: 0 4px 15px rgba(ocean, 0.3)
Pressed:    translateY(2px)   box-shadow: 0 1px 5px rgba(0, 0, 0, 0.6)
Hover:      translateY(-1px)  box-shadow: 0 6px 20px rgba(ocean, 0.5) + glow
Active:     scale(0.98)
```

The button feels like a physical object being pressed into a surface.

### Component: Parallax Card Stack

Content cards have depth-based parallax on scroll:

```
Card at Layer 1: translateY(scroll * 0.0)   — static
Card at Layer 2: translateY(scroll * -0.02) — slight lift
Card at Layer 3: translateY(scroll * -0.05) — floats upward
```

Creates a sense that cards are floating at different heights and respond to scroll at different rates.

### Component: Shader Background (Hero)

The hero section background uses CSS animated gradients (no WebGL on mobile):

```
Base: radial-gradient(ellipse at 50% 0%, rgba(ocean, 0.4) 0%, transparent 70%)
Mid:  radial-gradient(ellipse at 30% 50%, rgba(glow-blue, 0.2) 0%, transparent 60%)
Top:  radial-gradient(ellipse at 70% 30%, rgba(gold, 0.1) 0%, transparent 50%)
```

Each layer animates independently at different speeds (12s, 15s, 20s) creating organic, liquid motion.

On desktop (optional): Replace with R3F custom shader for true WebGL water/ocean simulation.

### Motion Specifications (3D-specific)

| Animation | Duration | Easing | Properties |
|-----------|----------|--------|------------|
| Card hover lift | 300ms | spring(0.34, 1.56, 0.64, 1) | translateY, box-shadow |
| Card hover rotate | 250ms | ease-smooth | rotateX(2deg) |
| Button press | 100ms | ease-out | translateY, box-shadow |
| Glass reveal | 400ms | ease-smooth | opacity, blur, translateY |
| Parallax scroll | Continuous | linear | translateY (scroll-driven) |
| Particle float | Continuous | ease-in-out | translateY, opacity |
| Holo shift | 4s | ease infinite | background-position |
| Glow pulse | 2s | ease infinite | box-shadow opacity |
| Price flash | 400ms | ease-out | background-color |
| Page enter | 350ms | ease-smooth | opacity, scale, translateY |
| Modal open | 400ms | ease-smooth | opacity, scale, backdrop-filter |
| Stagger children | 50ms delay | ease-smooth | per-item delay |

### Tech Stack for 3D

**Already installed:**
- `cesium` v1.114.0 — 3D globe/maps for location-based features
- `framer-motion` v12.27.5 — layout animations, page transitions, gesture handling

**To install for full 3D:**
- `@react-three/fiber` v9.x — React renderer for Three.js (3D scenes in React)
- `@react-three/drei` v10.x — helpers (OrbitControls, Environment, Float, etc.)
- `@react-three/postprocessing` v3.x — bloom, chromatic aberration, film grain
- `three` v0.172.x — core 3D library
- `gsap` v3.x — timeline animations, ScrollTrigger for parallax
- `@gsap/react` v2.x — React integration for GSAP

**3D Implementation Priority:**
1. ✅ CSS-based 3D (glass-morphism, animated gradients, particles) — works now, no deps needed
2. ✅ R3F hero scene (OceanMesh GLSL shader) — component written, needs npm install
3. ✅ 3D tilt cards (ListingCard3D) — component written, framer-motion already installed
4. ✅ PageTransition + ParticleField + MagneticButton — all working
5. 🔄 Cesium integration (3D globe for service locations) — already installed, needs implementation
6. 🔄 Post-processing effects (bloom, film grain on 3D scenes) — needs npm install
7. 🔄 GLSL custom shaders (water, holographic, glass refraction) — needs npm install

### Component Library (Shipped)

| Component | File | Status | Notes |
|-----------|------|--------|-------|
| `PageTransition` | `web/src/components/PageTransition.tsx` | ✅ Shipped | framer-motion AnimatePresence |
| `ParticleField` | `web/src/components/ParticleField.tsx` | ✅ Shipped | Canvas-based tropical motes |
| `MagneticButton` | `web/src/components/ui/MagneticButton.tsx` | ✅ Shipped | Spring-based magnetic hover |
| `HeroCanvas` | `web/src/components/HeroCanvas.tsx` | ⚠️ Written, needs npm | R3F + GLSL ocean shader |
| `ListingCard3D` | `web/src/components/ListingCard3D.tsx` | ✅ Shipped | Perspective tilt + glow |
| CSS utilities | `web/src/app/globals.css` | ✅ Shipped | .glass-card, .btn-3d, .holo-card, .skeleton, .aurora-divider |

### Do's and Don'ts (3D Layer)

**DO:**
- Use 3D depth to reinforce hierarchy (deeper = more important)
- Animate with spring easing for physical feel
- Keep particle counts low on mobile (< 30)
- Use glass-morphism only on floating layers (never on main content areas)
- Respect prefers-reduced-motion (disable particles, reduce parallax)
- Start with CSS 3D, progressively enhance with R3F on desktop

**DON'T:**
- Use 3D transforms on text (becomes unreadable)
- Add backdrop blur on mobile (use solid colors instead)
- Create R3F scenes that block content interaction
- Animate layout properties (always use transform + opacity)
- Use WebGL for simple effects that CSS can handle
- Add parallax that causes motion sickness (keep movement < 5% of viewport)

---

*This design system is custom-created for IBT Solutions and IslandHub.
3D Animated Shades layer added 2026-06-01 by OWL.
Not affiliated with any mentioned brands. Design inspiration only.*