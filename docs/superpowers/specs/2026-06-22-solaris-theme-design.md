# Solaris Theme — Portfolio Redesign

**Date:** 2026-06-22
**Goal:** Transform Ed's portfolio from a clean-but-generic developer site into an immersive, memorable experience themed around "Dune meets Miami" — desert grandeur fused with tropical heat. The site should make visitors say "whoa, this is different" while still being navigable for recruiters.

**Target vibe:** Ancient-future, epic scale, warm and physical. A space cowboy who wears suits.

---

## 1. Color System

Replace the current neutral palette with a desert-meets-ocean system. All colors remain CSS custom properties in `globals.css` with `@theme inline` registration.

### Light Mode
- `--bg-deep`: `#f4ede4` — warm parchment/sand base
- `--bg-base`: `#faf6f0` — lighter sand
- `--bg-elevated`: `#ffffff` — clean white for cards (keeps readability)
- `--bg-surface`: `#ede6db` — darker sand for recessed areas
- `--border-subtle`: `#ddd4c6` — sandy border
- `--border-active`: `#c9bda9` — warm active border
- `--text-primary`: `#1a1610` — near-black with warm undertone
- `--text-secondary`: `#6b5f51` — warm gray-brown
- `--text-tertiary`: `#9a8e7e` — faded sand
- `--accent`: `#1a6fb5` — deep ocean blue
- `--accent-muted`: `#7baacf` — muted ocean
- `--accent-glow`: `rgba(26, 111, 181, 0.12)` — ocean glow
- `--signal`: `#d4763a` — sunset coral/amber
- `--signal-bg`: `rgba(212, 118, 58, 0.1)` — warm signal bg

### Dark Mode (Midnight Desert)
- `--bg-deep`: `#0a0a12` — deep indigo night sky
- `--bg-base`: `#0f0f1a` — slightly lighter night
- `--bg-elevated`: `#161624` — elevated night surface
- `--bg-surface`: `#1c1c2e` — surface panels
- `--border-subtle`: `#1e1e32` — subtle night border
- `--border-active`: `#2a2a42` — active border
- `--text-primary`: `#e8e2d8` — warm white (sand-tinted, not blue-white)
- `--text-secondary`: `#9a9080` — warm muted text
- `--text-tertiary`: `#5a5448` — dim warm text
- `--accent`: `#d4a24c` — golden amber (desert gold replaces ocean blue at night)
- `--accent-muted`: `#8a7040` — muted gold
- `--accent-glow`: `rgba(212, 162, 76, 0.15)` — golden glow
- `--signal`: `#e8724a` — warm coral
- `--signal-bg`: `rgba(232, 114, 74, 0.1)` — coral glow

### Design rationale
- Light mode: ocean blue accent on sand — daytime desert meeting the sea
- Dark mode: golden amber accent on indigo — nighttime desert under stars
- The accent color *swapping* between modes (blue ↔ gold) is intentional and distinctive — most sites just lighten/darken the same hue

---

## 2. Typography

- **Display/headings:** Instrument Sans (already set up) — geometric, modern, works for large hero text
- **Body:** Geist (already set up) — clean and technical
- **Mono:** JetBrains Mono (keep) — metadata and code
- **Hero name treatment:** Instrument Sans at massive scale (text-8xl+), uppercase, tight tracking. Add a subtle text-shadow or gradient fill that suggests carved stone catching light

---

## 3. Hero Section — "The Dunes"

### Layout
Full-viewport hero. The name stays left-aligned as it is now. The right side and background become the interactive canvas — a field of drifting sand particles.

### Interactive Canvas: Sand/Wind Simulation
A canvas element fills the hero section (not fixed to the page like AmbientField — scoped to the hero). It renders:

- **Sand particles:** Hundreds of small dots/grains in warm sand/gold colors with varying opacity. They drift lazily in a default wind direction (left-to-right, slightly downward).
- **Cursor = wind:** Moving the cursor pushes particles away from the cursor position, like a gust of wind. The push strength is proportional to cursor speed — fast movement creates a strong gust, slow movement is a gentle breeze.
- **Settling:** When the cursor stops or leaves, particles gradually drift back to a natural resting distribution. They don't snap back — they float and settle like real sand.
- **Depth layers:** 2-3 layers of particles at different sizes and speeds (parallax). Foreground grains are larger/faster, background grains are smaller/dimmer/slower. Creates depth without 3D.
- **Horizon glow:** A subtle gradient at the vertical midpoint of the hero — warm sunset colors (gold → coral → deep blue) suggesting where desert meets sky. This is CSS, not canvas.

### Text Treatment
- Name ("ED GRACIA") keeps the clipReveal entrance animation
- Add a very subtle grain/noise texture overlay on the hero (CSS background-image with a tiny noise PNG or SVG filter)
- The tagline and metadata text remain as-is but pick up the new warm color tokens

### Scroll Transition
As the user scrolls past the hero, the sand particles fade out and the first content section begins. The AmbientField grid continues below as the subtle background for the rest of the page. This creates a two-zone feel: immersive desert hero → clean technical content.

---

## 4. AmbientField Updates

The existing grid background stays for content sections below the hero. Updates:
- Adjust grid line color to use warm-tinted values instead of pure white/gray — `rgba(180, 170, 155, 0.12)` light / `rgba(200, 190, 170, 0.06)` dark
- The grid represents the "engineered" side of Ed's identity — structured, precise — contrasting with the organic hero

No other changes to AmbientField rendering logic.

---

## 5. Content Section Updates

### Texture
- Add a subtle grain/noise overlay to `bg-deep` — a repeating 200x200 noise PNG at ~3% opacity. Gives the sand/parchment feel depth without being heavy.

### Section Headers
- Keep the numbered format (01, 02, etc.)
- The section divider lines (`border-t border-border-subtle`) pick up the warm border color automatically through the new tokens

### Project Cards
- Cards use the new `bg-elevated` (warm white / deep night)
- Hover glow uses the new `accent-glow` — ocean blue shimmer in light mode, golden shimmer in dark mode
- The left accent bar on hover uses `accent` (ocean blue / desert gold)

### Status Badges, Social Links, All Other Components
- These all use the semantic color tokens, so they update automatically with the new palette. No component code changes needed.

---

## 6. Grain/Noise Texture

Create a small noise texture (or use an SVG filter) applied as a pseudo-element on the body or main wrapper:
- Very subtle — 2-4% opacity
- Warm-tinted noise, not pure gray
- Gives the entire site a tactile, physical quality — like paper or sandstone
- Applied via CSS `::after` on the main layout wrapper, `pointer-events: none`, `position: fixed`

---

## 7. Components to Create

| Component | Purpose |
|---|---|
| `SandField.tsx` | Canvas-based sand particle simulation for hero. Cursor = wind interaction. Replaces ParticleConstellation. |

## 8. Components to Modify

| Component | Changes |
|---|---|
| `HeroSection.tsx` | Add SandField canvas, add horizon gradient, add grain overlay, remove soft-body blob import |
| `globals.css` | New color tokens, grain texture CSS, warm noise overlay |
| `AmbientField.tsx` | Warm-tint the grid line colors |

## 9. Components to Remove

| Component | Reason |
|---|---|
| `SoftBodyBlob.tsx` | Replaced by SandField concept |
| `ParticleConstellation.tsx` | Replaced by SandField concept |

---

## 10. What Does NOT Change

- Page structure and routing (app directory layout stays the same)
- Navbar, Footer, RevealGroup, SectionHeader, PageTransition — all keep their logic, just inherit new colors through tokens
- Blog post styling (`.post-content` rules) — inherits new colors automatically
- Font loading setup in `layout.tsx`
- Dark/light mode toggle mechanism (next-themes)
- AmbientField canvas rendering logic (only color values change)

---

## 11. Success Criteria

1. First impression is "whoa" — the sand simulation is smooth, responsive, and atmospheric
2. The color palette feels cohesive and intentional — warm sand + ocean blue (light) / indigo night + desert gold (dark)
3. Content is still easy to scan for recruiters — the immersive hero doesn't sacrifice usability below
4. The theme feels personal and distinctive — not a template, not generic "developer dark mode"
5. Performance: sand simulation runs at 60fps, no jank on scroll transitions
6. The grain texture adds warmth without being distracting
