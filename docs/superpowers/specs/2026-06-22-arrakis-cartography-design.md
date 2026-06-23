# Arrakis Cartography — Portfolio Visual Overhaul

**Branch:** `dune-arrakis-cartography`
**Date:** 2026-06-22
**Theme:** Dune-inspired desert aesthetic — thematic and evocative, not fan-art. Visitors who know Dune recognize the motifs; everyone else sees a striking, cohesive design.
**Motifs:** Sand & wind, spice golden glow, Fremen-style geometric glyphs.
**Performance stance:** Push it. Bold canvas work, parallax, shaders welcome. Mobile gets a gracefully reduced version.

---

## 1. Full-Page Sand System

**Current state:** SandField is hero-only, radially masked.

**Changes:**
- SandField becomes a **fixed, full-viewport canvas** layer (like AmbientField)
- Particle density varies by scroll position:
  - Top third (hero): dense — deep desert
  - Middle third: moderate, with added golden "spice shimmer" particles that drift slower
  - Bottom third: sparse — approaching the shield wall
- Existing wind direction and mouse-push interaction work everywhere
- Spice shimmer particles: occasional gold-glowing dots, concentrated in the middle third, 0.6x base wind speed
- Mobile: particle count drops ~50%

**Visual stack (back to front):**
1. `bg-deep` solid background (color shifts with scroll — see §6)
2. AmbientField grid (fixed, masked to lower portion)
3. SandField particles (fixed, full page, density varies by scroll)
4. Grain noise overlay (fixed, unchanged)
5. Page content

---

## 2. Parallax Depth Layers

**Current state:** Everything scrolls at the same rate — flat.

**Changes — three depth planes:**
- **Far layer (0.2x scroll speed):** 3-4 faint, blurred SVG dune contour lines (horizontal waves) in `text-tertiary` at very low opacity (~0.05). Spaced down the page. Barely move while scrolling — distant horizon.
- **Mid layer (0.5x scroll speed):** The AmbientField grid. A parallax multiplier on its vertical offset makes it drift slower than content.
- **Near layer (1x scroll speed):** Page content. SandField particles are viewport-fixed (they don't scroll at all), which makes them feel closest — like sand blowing past the viewer's eyes.

**Implementation:** Single `scroll` event listener (throttled via RAF) updates CSS custom properties (`--scroll-far`, `--scroll-mid`). CSS `will-change: transform` for GPU compositing. The parallax is gentle — 20-50px of difference over a full page scroll. Depth of field, not a gimmick.

**Reduced motion:** Parallax flattens to 1x on all layers when `prefers-reduced-motion` is active.

---

## 3. Layout Overhaul

The current site is linear — every section is `max-w-5xl` centered with identical structure. Each section gets its own composition.

### 3a. Hero — Full-Bleed Immersive Entry

- Full viewport height, full-bleed (not constrained to `max-w-5xl`)
- Name "ED GRACIA" at massive scale (~15-20vw) bleeding to container edges
- **Split composition:** Name on the left (60% width), tagline + social links on the right, vertically centered
- Sand particles densest here, radial glow at bottom intensifies
- Scroll indicator line stays

### 3b. Capabilities — Bento Grid

- Replace three even columns with a bento grid of varied card sizes
- "Languages" gets a **2x2 tall card** (strongest category). "Frameworks" and "Tools" get 1x1 cards
- Cards have sand-colored surfaces (`bg-surface`) with subtle border
- Hover triggers **spice bloom** — golden particles erupt from card center (see §5)
- Section glyph replaces "01" number

**Grid:** `grid-template-columns: repeat(4, 1fr)` on desktop, `repeat(2, 1fr)` on tablet, single column mobile. Languages card spans 2 columns and 2 rows.

### 3c. About — Asymmetric Editorial Split

- Headshot **bleeds left past max-width** by ~40px into the margin, slightly overlapping the section divider. On mobile, the headshot returns to normal flow (no bleed) and stacks above the text
- Text flows in a narrower column on the right (~60% width) — editorial magazine style
- GitHub contribution graph uses **spice amber/gold tones** instead of green

### 3d. Projects — Staggered Cards with Depth

- Cards **alternate alignment** — first offset right, second offset left (staggered path like footprints in sand)
- Cards wider than current, breaking the container slightly, with more vertical padding
- Hover: left accent bar stays + **sand-scatter effect** (SandField particles near card edges get repulsion force) + intensified spice glow

### 3e. Blog — Full-Width Horizontal Strips

- Posts become **full-width horizontal strips** spanning edge to edge with generous padding
- Each strip has a faint SVG dune contour line behind it that shifts subtly on hover (heat shimmer)
- Dates rendered with glyph prefix alongside Latin text

### 3f. Resume — 2x2 Bento Summary

- Three info cards + one CTA card ("Full Resume →") in a 2x2 bento grid
- CTA cell has subtle animated sand texture inside — inviting interaction
- Cards use `bg-elevated` with glyph markers

### 3g. Section Dividers — Terrain Lines

- Replace flat `border-t` dividers with **procedural dune horizon lines** — gentle organic SVG wave paths, different per section
- Above each divider: thin (8px) **heat shimmer strip** using CSS `backdrop-filter: blur()` animated between 0-1.5px
- Pure CSS pseudo-element — no canvas needed

---

## 4. Glyph Design System

A set of 6-8 custom geometric symbols forming a visual language unique to the site. Abstract geometry evoking Fremen notation — systematic enough to feel like an alphabet.

### Design Language

- Built from geometric primitives: circles, triangles, lines, dots, crescents
- Consistent stroke weight and square bounding box (~24px at standard size)
- Delivered as SVG sprite sheet
- Accessed via `<Glyph name="capabilities" />` React component

### Glyph Vocabulary

| Section | Glyph Description | Symbolic Meaning |
|---------|-------------------|------------------|
| Home/Hero | Concentric circles with center dot | Coordinate target, thumper signal |
| Capabilities | Three nested chevrons pointing right | Forward motion, layered skill |
| About | Crescent with horizontal line through it | Horizon, identity |
| Projects | Open diamond with interior dot | Structure being built |
| Blog | Parallel horizontal lines with break | Written record, interrupted sand |
| Resume | Triangle with interior partitions | Structured information, hierarchy |
| Languages (skill) | Circle with three radial lines | Branching knowledge |
| Frameworks (skill) | Two interlocking squares | Building blocks, composition |
| Tools (skill) | Circle with inscribed angle | Precision, measurement |

### Usage Locations

- **Section headers** — replace "01", "02" numbers (Latin title stays alongside)
- **Skill category markers** — small glyphs next to "Languages", "Frameworks", "Tools"
- **Status badges** — glyph-adorned variants for "In Progress" / "Incomplete"
- **Blog post dates** — small glyph prefix before date string
- **Decorative accents** — faint oversized glyphs as section background watermarks

### Interaction

- Hover on section header: glyph rotates 15° and stroke shifts from `text-tertiary` to `accent` (200ms ease-out)
- Section title gets a faint golden underline sliding in from left

---

## 5. Interactive Moments & Micro-Interactions

### Spice Bloom on Hover (Cards & Bento Cells)

- 15-20 golden particles burst outward from cursor position within card bounds
- Randomized velocity, size (1-3px), lifespan (400-800ms), fading from `accent` gold to transparent
- Small canvas overlay per interactive card, only active during hover (no idle cost)

### Sand-Scatter on Project Cards

- On hover, SandField particles near card edges get a repulsion force — briefly push away as if wind displaced them
- Connects cards to the sand environment — cards are *in* the desert, not floating above it
- **Communication:** Project cards register their bounding rects with SandField via a shared React context (`SandInteractionContext`). SandField checks these rects each frame and applies repulsion zones when a card's `isHovered` flag is true

### Spice-Trail Cursor

- Mouse movement leaves 3-5 warm golden dots fading over 300ms
- Only over main content area (not nav or footer)
- Lightweight canvas layer, ~10 particles max alive at once
- Disabled on touch devices and `prefers-reduced-motion`

### Heat Shimmer on Section Dividers

- 8px strip above terrain-line dividers
- CSS `backdrop-filter: blur()` oscillating between 0-1.5px
- Content above the divider ripples faintly like heat rising off sand
- Pure CSS pseudo-element

### Glyph Hover (Section Headers)

- Glyph rotates 15° + shifts to accent color (200ms ease-out)
- Title text gets faint golden underline sliding in from left

### Scroll-Triggered Spice Density

- Middle third of page: SandField introduces more golden spice particles
- Top third (hero) and bottom third: mostly sand-colored particles
- Creates an arc of intensity — traveling through a spice-rich zone

---

## 6. Scroll Color Journey

Background color subtly shifts as you scroll — dawn → noon → dusk.

### Implementation

- Scroll listener updates `--scroll-progress` (0-1) on `<html>`
- `bg-deep` interpolates between three stops

### Color Stops

**Light mode:**
| Position | Color | Feel |
|----------|-------|------|
| Top (0) | `#f4ede4` | Warm morning parchment |
| Middle (0.5) | `#faf6f0` | Bleached high-noon sand |
| Bottom (1) | `#ede0d0` | Amber dusk |

**Dark mode:**
| Position | Color | Feel |
|----------|-------|------|
| Top (0) | `#0a0a12` | Pre-dawn deep blue |
| Middle (0.5) | `#0f1018` | Midnight, faint warm shift |
| Bottom (1) | `#12100a` | Dark amber-black, desert sunset |

**Subtlety:** 5-10% hue/lightness shift across full page scroll. Registers subconsciously — visitors feel the journey without pinpointing why.

**Downstream:** `bg-base`, `bg-elevated`, `bg-surface` shift proportionally. Grain overlay and canvas layers adapt naturally (semi-transparent over background).

**Performance:** One scroll listener, one CSS variable update per RAF. No repaints beyond background color.

---

## Accessibility & Performance

### Reduced Motion (`prefers-reduced-motion: reduce`)

- Cursor trail: disabled
- Spice blooms: become simple opacity fades
- Parallax: flattened to 1x on all layers
- Heat shimmer: static (no blur animation)
- Canvas RAF loops still run but particle counts drop and motion dampens
- Scroll color journey: still active (no motion involved)

### Mobile

- Particle counts drop ~50% across all canvas layers
- Spice trail cursor: disabled (touch devices)
- Parallax: reduced to 2 layers (far + content) or disabled on low-end devices
- Bento grids: collapse to single column
- Full-bleed elements: constrained to viewport with horizontal padding
- Sand-scatter hover: disabled (no hover on touch)

### Performance Budget

- Target: 60fps on mid-range desktop, 30fps minimum on mobile
- Canvas layers: max 3 concurrent RAF loops (AmbientField, SandField, spice trail)
- All hover-triggered canvases (spice bloom) are created on demand, destroyed on mouse leave
- Scroll listeners: throttled to RAF, single listener for all scroll-dependent features (parallax, color journey, spice density)

---

## Component Summary

| Component | Type | New/Modified |
|-----------|------|-------------|
| `SandField.tsx` | Canvas | Modified — full-page, density zones, spice shimmer |
| `AmbientField.tsx` | Canvas | Modified — parallax offset |
| `ParallaxLayer.tsx` | CSS/SVG | New — far dune contours |
| `Glyph.tsx` | SVG | New — glyph component + sprite sheet |
| `SpiceBloom.tsx` | Canvas | New — hover particle burst |
| `SpiceCursor.tsx` | Canvas | New — cursor trail |
| `TerrainDivider.tsx` | CSS/SVG | New — organic section dividers + heat shimmer |
| `SectionHeader.tsx` | React | Modified — glyphs replace numbers |
| `HeroSection.tsx` | React | Modified — full-bleed split layout |
| `StatusBadge.tsx` | React | Modified — glyph variants |
| `globals.css` | CSS | Modified — scroll journey, heat shimmer keyframes |
| `page.tsx` | React | Modified — bento layouts, staggered cards, full-width strips |
