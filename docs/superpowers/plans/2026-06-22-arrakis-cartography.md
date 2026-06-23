# Arrakis Cartography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio site from a linear stack into an immersive Dune-inspired desert landscape with layered sand particles, parallax depth, bento grid layouts, a custom glyph system, spice-themed interactions, and a scroll-driven color journey.

**Architecture:** The site is a Next.js 16 App Router project with Tailwind 4 (CSS-first config). Visual layers are stacked as fixed canvases behind scrolling content. Interactive effects use lightweight per-component canvases created on demand. A shared scroll listener (RAF-throttled) drives parallax, color journey, and sand density via CSS custom properties. A React context bridges DOM hover state to the SandField canvas for sand-scatter effects.

**Tech Stack:** Next.js 16.2.6, React 19, TypeScript 5, Tailwind 4 (CSS-first), Canvas 2D API

## Global Constraints

- **Branch:** `dune-arrakis-cartography` (already created)
- **Tailwind 4:** CSS-first config via `@theme inline` in `globals.css`. No `tailwind.config.js`.
- **Canvas rules:** Never change `strokeStyle` mid-path or break paths inside draw loops (from CLAUDE.md)
- **Fonts:** Instrument Sans (display), Geist (body), JetBrains Mono (mono) — loaded in `layout.tsx`
- **Colors:** Use semantic token names (`text-primary`, `bg-elevated`, `accent`, etc.), never raw hex in components
- **Animations:** All keyframes in `globals.css`. No blanket `prefers-reduced-motion` rules that kill all animations.
- **No co-author:** Never add `Co-Authored-By` lines to commits.
- **Performance:** 60fps desktop, 30fps mobile minimum. Max 3 concurrent RAF loops.
- **Testing:** This is a visual/canvas-heavy project with no existing test suite. Verification is visual — run `npm run dev`, check in browser, confirm `npm run build` succeeds. No unit tests for canvas rendering.
- **Next.js:** Read `node_modules/next/dist/docs/` before writing Next.js-specific code if unsure about APIs.

---

## File Map

### New Files
| File | Responsibility |
|------|---------------|
| `components/Glyph.tsx` | SVG glyph component — renders named glyphs from inline SVG paths at configurable size |
| `components/glyphs.ts` | Glyph path data — maps glyph names to SVG path strings and viewBox |
| `components/TerrainDivider.tsx` | Section divider — SVG wave path + CSS heat shimmer pseudo-element |
| `components/SpiceBloom.tsx` | Hover particle burst — small canvas overlay, created on demand per card |
| `components/SpiceCursor.tsx` | Cursor trail — fixed canvas layer, golden dots fading on mouse move |
| `components/ParallaxLayer.tsx` | Far-depth SVG dune contours — positioned with CSS parallax transform |
| `components/ScrollEngine.tsx` | Single scroll listener — updates CSS custom properties for all scroll-dependent features |
| `components/SandInteractionContext.tsx` | React context — bridges card hover state + bounding rects to SandField |

### Modified Files
| File | What Changes |
|------|-------------|
| `components/SandField.tsx` | Full-page fixed canvas, density zones, spice shimmer particles, sand-scatter repulsion via context |
| `components/AmbientField.tsx` | Read `--scroll-mid` CSS property for parallax offset |
| `components/SectionHeader.tsx` | Replace number prop with glyph, add hover rotation + golden underline |
| `components/HeroSection.tsx` | Full-bleed split layout, massive typography |
| `components/StatusBadge.tsx` | Add glyph prefix for status indicators |
| `app/globals.css` | Heat shimmer keyframe, scroll color journey properties, terrain divider styles |
| `app/layout.tsx` | Add ScrollEngine, SpiceCursor, SandInteractionContext provider, move SandField to layout |
| `app/page.tsx` | Bento capabilities grid, asymmetric about, staggered projects, full-width blog strips, 2x2 resume bento, TerrainDivider between sections |

---

## Task 1: ScrollEngine — Central Scroll Listener

All scroll-dependent features (parallax, color journey, spice density) read from CSS custom properties set by one listener. Build this first so every subsequent task can consume it.

**Files:**
- Create: `components/ScrollEngine.tsx`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Produces:**
- CSS custom properties on `<html>`: `--scroll-progress` (0–1), `--scroll-far` (px offset for far parallax layer), `--scroll-mid` (px offset for mid parallax layer)
- `--bg-deep` dynamically interpolated between 3 color stops based on `--scroll-progress`

- [ ] **Step 1: Add scroll color journey CSS variables to globals.css**

Add after the existing `@theme inline` block in `app/globals.css`:

```css
@keyframes heatShimmer {
  0%, 100% { backdrop-filter: blur(0px); -webkit-backdrop-filter: blur(0px); }
  50% { backdrop-filter: blur(1.5px); -webkit-backdrop-filter: blur(1.5px); }
}
```

No other CSS changes yet — the color journey is driven by JS setting `--bg-deep` directly.

- [ ] **Step 2: Create ScrollEngine component**

Create `components/ScrollEngine.tsx`:

```tsx
"use client";

import { useEffect } from "react";

const LIGHT_STOPS = [
  [244, 237, 228],  // #f4ede4 — morning parchment
  [250, 246, 240],  // #faf6f0 — high-noon sand
  [237, 224, 208],  // #ede0d0 — amber dusk
] as const;

const DARK_STOPS = [
  [10, 10, 18],   // #0a0a12 — pre-dawn blue
  [15, 16, 24],   // #0f1018 — midnight warm
  [18, 16, 10],   // #12100a — desert sunset
] as const;

function lerpColor(
  stops: readonly (readonly [number, number, number])[],
  t: number,
): string {
  const segment = t < 0.5 ? 0 : 1;
  const localT = segment === 0 ? t * 2 : (t - 0.5) * 2;
  const from = stops[segment];
  const to = stops[segment + 1];
  const r = Math.round(from[0] + (to[0] - from[0]) * localT);
  const g = Math.round(from[1] + (to[1] - from[1]) * localT);
  const b = Math.round(from[2] + (to[2] - from[2]) * localT);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function ScrollEngine() {
  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

      const root = document.documentElement;
      root.style.setProperty("--scroll-progress", String(progress));

      const farOffset = scrollY * 0.2;
      const midOffset = scrollY * 0.5;
      root.style.setProperty("--scroll-far", `${farOffset}px`);
      root.style.setProperty("--scroll-mid", `${midOffset}px`);

      const isDark = root.classList.contains("dark");
      const stops = isDark ? DARK_STOPS : LIGHT_STOPS;
      root.style.setProperty("--bg-deep", lerpColor(stops, progress));

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}
```

- [ ] **Step 3: Add ScrollEngine to layout.tsx**

In `app/layout.tsx`, import and render `ScrollEngine` inside the `ThemeProvider`, right after `AmbientField`:

```tsx
import ScrollEngine from "@/components/ScrollEngine";
```

Add `<ScrollEngine />` after `<AmbientField />`:

```tsx
<ThemeProvider>
  <AmbientField />
  <ScrollEngine />
  <div className="relative z-10 flex flex-1 flex-col">
```

- [ ] **Step 4: Verify**

Run `npm run dev`. Open browser. Scroll down the page slowly. The background color should subtly shift from cool parchment/dark-blue at top toward warmer amber at the bottom. Toggle dark/light mode — both should interpolate. Check devtools — `--scroll-progress`, `--scroll-far`, `--scroll-mid` should update on `<html>` as you scroll.

- [ ] **Step 5: Commit**

```bash
git add components/ScrollEngine.tsx app/globals.css app/layout.tsx
git commit -m "feat: add ScrollEngine for scroll-driven color journey and parallax variables"
```

---

## Task 2: Glyph Design System

Build the SVG glyph component and all 9 glyph paths. This is a dependency for SectionHeader, StatusBadge, and layout changes.

**Files:**
- Create: `components/glyphs.ts`
- Create: `components/Glyph.tsx`

**Produces:**
- `<Glyph name="capabilities" size={24} className="..." />` component
- Named exports: `GLYPH_NAMES` (union type), `glyphData` (path data map)

- [ ] **Step 1: Create glyph path data**

Create `components/glyphs.ts`:

```ts
export const glyphData: Record<string, { paths: string[]; viewBox: string }> = {
  home: {
    viewBox: "0 0 24 24",
    paths: [
      "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z",
      "M12 10.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z",
    ],
  },
  capabilities: {
    viewBox: "0 0 24 24",
    paths: [
      "M8 6l4 6-4 6",
      "M12 6l4 6-4 6",
      "M16 6l4 6-4 6",
    ],
  },
  about: {
    viewBox: "0 0 24 24",
    paths: [
      "M4 12h16",
      "M18 4a8 8 0 0 1 0 16",
    ],
  },
  projects: {
    viewBox: "0 0 24 24",
    paths: [
      "M12 2l8 10-8 10-8-10Z",
      "M12 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z",
    ],
  },
  blog: {
    viewBox: "0 0 24 24",
    paths: [
      "M4 7h16M4 12h7M15 12h5M4 17h16",
    ],
  },
  resume: {
    viewBox: "0 0 24 24",
    paths: [
      "M12 3l9 18H3Z",
      "M12 9v4M8.5 15h7",
    ],
  },
  languages: {
    viewBox: "0 0 24 24",
    paths: [
      "M12 12m-7 0a7 7 0 1 0 14 0 7 7 0 1 0-14 0",
      "M12 5v7M12 12l5 4M12 12l-5 4",
    ],
  },
  frameworks: {
    viewBox: "0 0 24 24",
    paths: [
      "M5 5h8v8H5Z",
      "M11 11h8v8h-8Z",
    ],
  },
  tools: {
    viewBox: "0 0 24 24",
    paths: [
      "M12 12m-7 0a7 7 0 1 0 14 0 7 7 0 1 0-14 0",
      "M17 7l-5 5-3 5",
    ],
  },
};

export type GlyphName = keyof typeof glyphData;

export const GLYPH_NAMES = Object.keys(glyphData) as GlyphName[];
```

- [ ] **Step 2: Create the Glyph component**

Create `components/Glyph.tsx`:

```tsx
import { glyphData, type GlyphName } from "./glyphs";

interface GlyphProps {
  name: GlyphName;
  size?: number;
  className?: string;
}

export default function Glyph({ name, size = 24, className = "" }: GlyphProps) {
  const data = glyphData[name];
  if (!data) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox={data.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {data.paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
```

- [ ] **Step 3: Verify**

Temporarily render a few glyphs on the homepage to check they display correctly:

```tsx
import Glyph from "@/components/Glyph";
// In any section: <Glyph name="capabilities" size={32} className="text-accent" />
```

Confirm all 9 glyphs render as distinct geometric shapes. Remove the test renders.

- [ ] **Step 4: Commit**

```bash
git add components/glyphs.ts components/Glyph.tsx
git commit -m "feat: add Fremen-inspired glyph design system with 9 SVG symbols"
```

---

## Task 3: TerrainDivider Component

Replace flat `border-t` section dividers with organic SVG wave paths and a heat shimmer strip.

**Files:**
- Create: `components/TerrainDivider.tsx`
- Modify: `app/globals.css` (add `heatShimmer` keyframe if not already added in Task 1)

**Produces:**
- `<TerrainDivider seed={1} />` — renders a unique organic wave based on seed, with heat shimmer above

- [ ] **Step 1: Create TerrainDivider component**

Create `components/TerrainDivider.tsx`:

```tsx
"use client";

interface TerrainDividerProps {
  seed?: number;
  className?: string;
}

function generateWavePath(seed: number, width: number): string {
  const points: string[] = [];
  const amplitude = 6 + (seed % 5);
  const frequency = 0.008 + (seed % 3) * 0.002;
  const phaseShift = seed * 1.7;

  points.push(`M0 ${20 + amplitude}`);
  for (let x = 0; x <= width; x += 4) {
    const y =
      20 +
      Math.sin(x * frequency + phaseShift) * amplitude +
      Math.sin(x * frequency * 2.3 + phaseShift * 0.7) * (amplitude * 0.3);
    points.push(`L${x} ${y.toFixed(1)}`);
  }

  return points.join(" ");
}

export default function TerrainDivider({
  seed = 1,
  className = "",
}: TerrainDividerProps) {
  const width = 1200;
  const path = generateWavePath(seed, width);

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className="absolute -top-2 left-0 right-0 h-2 pointer-events-none"
        style={{ animation: "heatShimmer 4s ease-in-out infinite" }}
      />
      <svg
        viewBox={`0 0 ${width} 40`}
        preserveAspectRatio="none"
        className="w-full h-6 text-border-subtle"
        aria-hidden="true"
      >
        <path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Ensure heatShimmer keyframe exists in globals.css**

Verify the `@keyframes heatShimmer` block was added in Task 1. If not, add it after the existing `@keyframes scrollLine` block:

```css
@keyframes heatShimmer {
  0%, 100% { backdrop-filter: blur(0px); -webkit-backdrop-filter: blur(0px); }
  50% { backdrop-filter: blur(1.5px); -webkit-backdrop-filter: blur(1.5px); }
}
```

- [ ] **Step 3: Verify**

Temporarily replace one `border-t border-border-subtle` in `page.tsx` with `<TerrainDivider seed={1} />`. Confirm: organic wave line renders, varies when you change seed, heat shimmer strip visible as subtle blur above the line.

- [ ] **Step 4: Commit**

```bash
git add components/TerrainDivider.tsx app/globals.css
git commit -m "feat: add TerrainDivider with organic SVG wave paths and heat shimmer"
```

---

## Task 4: SectionHeader with Glyphs

Replace numeric section labels with glyphs. Add hover rotation and golden underline.

**Files:**
- Modify: `components/SectionHeader.tsx`

**Consumes:**
- `<Glyph name={...} />` from Task 2

- [ ] **Step 1: Update SectionHeader**

Replace the full content of `components/SectionHeader.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Glyph from "./Glyph";
import type { GlyphName } from "./glyphs";

interface SectionHeaderProps {
  glyph: GlyphName;
  title: string;
  number?: string;
}

export default function SectionHeader({ glyph, title, number }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="group mb-10 flex items-center gap-4">
      <span
        className="text-text-tertiary transition-all duration-200 group-hover:text-accent group-hover:rotate-[15deg]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? undefined : "translateX(-8px)",
          transition: "opacity 0.5s, transform 0.5s, color 0.2s",
        }}
      >
        <Glyph name={glyph} size={20} />
      </span>
      <h2
        className="relative font-display text-2xl font-bold tracking-tight text-text-primary transition-all duration-500 delay-100"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-8px)",
        }}
      >
        {title}
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
      </h2>
      <div
        className="h-px flex-1 bg-border-subtle origin-left transition-transform duration-700 delay-200"
        style={{
          transform: visible ? "scaleX(1)" : "scaleX(0)",
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Update SectionHeader usage in page.tsx**

In `app/page.tsx`, update all `SectionHeader` calls. The prop changes from `number` to `glyph`:

| Old | New |
|-----|-----|
| `<SectionHeader number="01" title="Capabilities" />` | `<SectionHeader glyph="capabilities" title="Capabilities" />` |
| `<SectionHeader number="02" title="About" />` | `<SectionHeader glyph="about" title="About" />` |
| `<SectionHeader number="03" title="Projects" />` | `<SectionHeader glyph="projects" title="Projects" />` |
| `<SectionHeader number="04" title="Blog" />` | `<SectionHeader glyph="blog" title="Blog" />` |
| `<SectionHeader number="05" title="Resume" />` | `<SectionHeader glyph="resume" title="Resume" />` |

- [ ] **Step 3: Verify**

Run `npm run dev`. Each section header should show a geometric glyph instead of a number. On hover: glyph rotates 15° and turns accent color, golden underline slides under the title. Check both dark and light mode.

- [ ] **Step 4: Commit**

```bash
git add components/SectionHeader.tsx app/page.tsx
git commit -m "feat: replace section numbers with Fremen glyphs, add hover animations"
```

---

## Task 5: Full-Page SandField + SandInteractionContext

Transform SandField from hero-only to full-page fixed canvas with scroll-dependent density zones and spice shimmer particles. Add the context for sand-scatter interaction.

**Files:**
- Create: `components/SandInteractionContext.tsx`
- Modify: `components/SandField.tsx`
- Modify: `components/HeroSection.tsx` (remove local SandField render)
- Modify: `app/layout.tsx` (add SandField + context provider)

**Consumes:**
- `--scroll-progress` CSS property from Task 1 (ScrollEngine)

**Produces:**
- `SandInteractionProvider` and `useSandInteraction()` hook
- Full-page SandField reading scroll progress and interaction zones

- [ ] **Step 1: Create SandInteractionContext**

Create `components/SandInteractionContext.tsx`:

```tsx
"use client";

import { createContext, useContext, useRef, useCallback, type ReactNode } from "react";

interface InteractionZone {
  id: string;
  rect: DOMRect;
  isHovered: boolean;
}

interface SandInteractionAPI {
  zonesRef: React.RefObject<Map<string, InteractionZone>>;
  register: (id: string, rect: DOMRect) => void;
  unregister: (id: string) => void;
  setHovered: (id: string, hovered: boolean) => void;
}

const SandInteractionContext = createContext<SandInteractionAPI | null>(null);

export function SandInteractionProvider({ children }: { children: ReactNode }) {
  const zonesRef = useRef<Map<string, InteractionZone>>(new Map());

  const register = useCallback((id: string, rect: DOMRect) => {
    zonesRef.current!.set(id, { id, rect, isHovered: false });
  }, []);

  const unregister = useCallback((id: string) => {
    zonesRef.current!.delete(id);
  }, []);

  const setHovered = useCallback((id: string, hovered: boolean) => {
    const zone = zonesRef.current!.get(id);
    if (zone) zone.isHovered = hovered;
  }, []);

  return (
    <SandInteractionContext value={{ zonesRef, register, unregister, setHovered }}>
      {children}
    </SandInteractionContext>
  );
}

export function useSandInteraction() {
  const ctx = useContext(SandInteractionContext);
  if (!ctx) throw new Error("useSandInteraction must be used within SandInteractionProvider");
  return ctx;
}
```

- [ ] **Step 2: Rewrite SandField for full-page + density zones**

Replace the full content of `components/SandField.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

const DESKTOP_COUNT = 400;
const MOBILE_COUNT = 200;
const SPICE_RATIO = 0.15;
const BASE_WIND_X = 0.3;
const BASE_WIND_Y = 0.08;
const MOUSE_RADIUS = 200;
const FRICTION = 0.97;

interface Grain {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  layer: number;
  isSpice: boolean;
}

function isMobile() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}

function createGrains(w: number, h: number): Grain[] {
  const count = isMobile() ? MOBILE_COUNT : DESKTOP_COUNT;
  return Array.from({ length: count }, () => {
    const layer = Math.random();
    const isSpice = Math.random() < SPICE_RATIO;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0,
      vy: 0,
      size: isSpice ? 1.5 : layer < 0.33 ? 1 : layer < 0.66 ? 1.5 : 2.5,
      opacity: isSpice ? 0.6 : layer < 0.33 ? 0.2 : layer < 0.66 ? 0.35 : 0.55,
      layer,
      isSpice,
    };
  });
}

export default function SandField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grains = useRef<Grain[]>([]);
  const mouse = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999 });
  const raf = useRef(0);
  const dims = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      dims.current = { w: window.innerWidth, h: window.innerHeight };
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (grains.current.length === 0) {
        grains.current = createGrains(window.innerWidth, window.innerHeight);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const m = mouse.current;
      m.prevX = m.x;
      m.prevY = m.y;
      m.x = e.clientX;
      m.y = e.clientY;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      const m = mouse.current;
      m.prevX = m.x;
      m.prevY = m.y;
      m.x = t.clientX;
      m.y = t.clientY;
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    const draw = () => {
      const { w, h } = dims.current;
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains("dark");
      const progress = parseFloat(
        document.documentElement.style.getPropertyValue("--scroll-progress") || "0"
      );

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const mSpeed = Math.sqrt(
        (mx - mouse.current.prevX) ** 2 + (my - mouse.current.prevY) ** 2
      );
      const pushStrength = Math.min(mSpeed * 0.15, 8);

      const densityMultiplier =
        progress < 0.33 ? 1.0 : progress < 0.66 ? 0.7 : 0.4;

      const spiceIntensity =
        progress < 0.2 ? 0.2 :
        progress < 0.4 ? 0.5 + (progress - 0.2) * 2.5 :
        progress < 0.6 ? 1.0 :
        progress < 0.8 ? 1.0 - (progress - 0.6) * 2.5 :
        0.2;

      for (const g of grains.current) {
        if (!g.isSpice && Math.random() > densityMultiplier) {
          continue;
        }

        const layerMult = 0.3 + g.layer * 0.7;
        const windMult = g.isSpice ? 0.6 : 1;

        g.vx += BASE_WIND_X * layerMult * 0.1 * windMult;
        g.vy += BASE_WIND_Y * layerMult * 0.1 * windMult;

        const dx = g.x - mx;
        const dy = g.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * pushStrength * layerMult;
          g.vx += (dx / dist) * force;
          g.vy += (dy / dist) * force;
        }

        g.vx *= FRICTION;
        g.vy *= FRICTION;
        g.x += g.vx;
        g.y += g.vy;

        if (g.x > w + 10) { g.x = -10; g.vy = 0; }
        if (g.x < -10) { g.x = w + 10; g.vy = 0; }
        if (g.y > h + 10) { g.y = -10; g.vx = 0; }
        if (g.y < -10) { g.y = h + 10; g.vx = 0; }
      }

      const sandColor = isDark ? "210, 190, 160" : "160, 140, 110";
      const sandGrains = grains.current.filter((g) => !g.isSpice);
      ctx.beginPath();
      for (const g of sandGrains) {
        ctx.moveTo(g.x + g.size, g.y);
        ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
      }
      ctx.fillStyle = isDark
        ? `rgba(${sandColor}, 0.35)`
        : `rgba(${sandColor}, 0.4)`;
      ctx.fill();

      const spiceGrains = grains.current.filter((g) => g.isSpice);
      if (spiceGrains.length > 0) {
        ctx.beginPath();
        for (const g of spiceGrains) {
          ctx.moveTo(g.x + g.size, g.y);
          ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
        }
        ctx.fillStyle = isDark
          ? `rgba(212, 162, 76, ${0.3 * spiceIntensity})`
          : `rgba(180, 120, 40, ${0.25 * spiceIntensity})`;
        ctx.fill();
      }

      mouse.current.prevX = mx;
      mouse.current.prevY = my;
      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ touchAction: "none" }}
    />
  );
}
```

- [ ] **Step 3: Remove SandField from HeroSection**

In `components/HeroSection.tsx`, remove the `import SandField from "./SandField"` line and remove `<SandField />` from the JSX. The sand is now global.

- [ ] **Step 4: Add SandField and SandInteractionProvider to layout.tsx**

In `app/layout.tsx`, add imports:

```tsx
import SandField from "@/components/SandField";
import { SandInteractionProvider } from "@/components/SandInteractionContext";
```

Update the body content to wrap with provider and add SandField after AmbientField:

```tsx
<ThemeProvider>
  <SandInteractionProvider>
    <AmbientField />
    <SandField />
    <ScrollEngine />
    <div className="relative z-10 flex flex-1 flex-col">
      <Navbar />
      <PageTransition>
        {children}
      </PageTransition>
      <Footer />
    </div>
  </SandInteractionProvider>
  <Analytics />
</ThemeProvider>
```

- [ ] **Step 5: Verify**

Run `npm run dev`. Sand particles should now be visible across the entire page (not just the hero). Scroll down — particles should thin out toward the bottom. In the middle third, golden spice particles should be more visible. Mouse push should work everywhere. Check both themes.

- [ ] **Step 6: Commit**

```bash
git add components/SandField.tsx components/SandInteractionContext.tsx components/HeroSection.tsx app/layout.tsx
git commit -m "feat: extend SandField to full-page with density zones and spice shimmer"
```

---

## Task 6: ParallaxLayer + AmbientField Parallax

Add the far-depth SVG dune contour layer and parallax offset to AmbientField.

**Files:**
- Create: `components/ParallaxLayer.tsx`
- Modify: `components/AmbientField.tsx`
- Modify: `app/layout.tsx`

**Consumes:**
- `--scroll-far`, `--scroll-mid` CSS properties from Task 1

- [ ] **Step 1: Create ParallaxLayer**

Create `components/ParallaxLayer.tsx`:

```tsx
"use client";

function generateDuneContour(
  width: number,
  yCenter: number,
  seed: number,
): string {
  const points: string[] = [];
  const amplitude = 15 + (seed % 10);
  const freq = 0.003 + (seed % 5) * 0.001;
  const phase = seed * 2.1;

  points.push(`M0 ${yCenter}`);
  for (let x = 0; x <= width; x += 6) {
    const y =
      yCenter +
      Math.sin(x * freq + phase) * amplitude +
      Math.sin(x * freq * 1.7 + phase * 0.5) * (amplitude * 0.4);
    points.push(`L${x} ${y.toFixed(1)}`);
  }

  return points.join(" ");
}

export default function ParallaxLayer() {
  const width = 2000;
  const height = 4000;
  const contours = [
    { yCenter: 600, seed: 1 },
    { yCenter: 1400, seed: 7 },
    { yCenter: 2200, seed: 13 },
    { yCenter: 3200, seed: 19 },
  ];

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{
        transform: "translateY(calc(var(--scroll-far, 0px) * -1))",
        willChange: "transform",
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-[400vh] opacity-[0.04] text-text-tertiary"
        aria-hidden="true"
      >
        {contours.map(({ yCenter, seed }) => (
          <path
            key={seed}
            d={generateDuneContour(width, yCenter, seed)}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          />
        ))}
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Add parallax offset to AmbientField**

In `components/AmbientField.tsx`, modify the canvas's style in the return statement to include the parallax offset. Change:

```tsx
<canvas
  ref={canvasRef}
  className="pointer-events-none fixed inset-0 z-0"
  style={{
    mask: "linear-gradient(to bottom, transparent 0%, transparent 60%, black 85%)",
    WebkitMask: "linear-gradient(to bottom, transparent 0%, transparent 60%, black 85%)",
  }}
/>
```

To:

```tsx
<canvas
  ref={canvasRef}
  className="pointer-events-none fixed inset-0 z-0"
  style={{
    mask: "linear-gradient(to bottom, transparent 0%, transparent 60%, black 85%)",
    WebkitMask: "linear-gradient(to bottom, transparent 0%, transparent 60%, black 85%)",
    transform: "translateY(calc(var(--scroll-mid, 0px) * -1))",
    willChange: "transform",
  }}
/>
```

- [ ] **Step 3: Add ParallaxLayer to layout.tsx**

In `app/layout.tsx`, import and add before AmbientField:

```tsx
import ParallaxLayer from "@/components/ParallaxLayer";
```

```tsx
<SandInteractionProvider>
  <ParallaxLayer />
  <AmbientField />
  <SandField />
  <ScrollEngine />
```

- [ ] **Step 4: Verify**

Run `npm run dev`. As you scroll, faint dune contour lines should be visible at very low opacity, moving slower than the content. The AmbientField grid should also drift at about half the scroll speed. The effect should be gentle — barely noticeable until you look for it.

Check with `prefers-reduced-motion` enabled (System Preferences → Accessibility → Reduce motion) — parallax should flatten.

- [ ] **Step 5: Add reduced motion handling**

In `components/ParallaxLayer.tsx`, wrap the transform in a media query check. Add to the style:

```tsx
style={{
  transform: "translateY(calc(var(--scroll-far, 0px) * -1))",
  willChange: "transform",
}}
```

In `components/ScrollEngine.tsx`, add a check at the top of the `update` function:

```tsx
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// When setting parallax values:
const farOffset = reducedMotion ? 0 : scrollY * 0.2;
const midOffset = reducedMotion ? 0 : scrollY * 0.5;
```

- [ ] **Step 6: Commit**

```bash
git add components/ParallaxLayer.tsx components/AmbientField.tsx components/ScrollEngine.tsx app/layout.tsx
git commit -m "feat: add parallax depth layers with far dune contours and mid-grid offset"
```

---

## Task 7: Hero Layout Overhaul

Transform the hero from a contained vertical stack to a full-bleed split composition with massive typography.

**Files:**
- Modify: `components/HeroSection.tsx`

- [ ] **Step 1: Rewrite HeroSection**

Replace the full content of `components/HeroSection.tsx`:

```tsx
"use client";

import Link from "next/link";
import { FiGithub, FiMail } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { useEffect, useState } from "react";
import Glyph from "./Glyph";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const clipStyle = (delay: number): React.CSSProperties =>
    mounted
      ? {
          opacity: 0,
          animation: `clipReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms forwards`,
        }
      : {};

  const fadeStyle = (delay: number): React.CSSProperties =>
    mounted
      ? {
          opacity: 0,
          animation: `fadeIn 0.7s ease-out ${delay}ms forwards`,
        }
      : {};

  const socialLinks = [
    { href: "https://github.com/EdGracia", icon: FiGithub, label: "GitHub" },
    { href: "https://www.linkedin.com/in/eduardo-ed-gracia/", icon: FaLinkedinIn, label: "LinkedIn" },
    { href: "mailto:Exg2332@miami.edu", icon: FiMail, label: "Email" },
  ];

  return (
    <section id="home" className="relative flex min-h-[85vh] items-center py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 50% at 50% 80%, var(--accent-glow) 0%, transparent 70%)",
      }} />

      <div className="relative z-10 grid w-full grid-cols-1 gap-8 px-6 sm:grid-cols-[3fr_2fr] sm:items-center sm:gap-12 max-w-[90vw] mx-auto">
        <div>
          <div style={clipStyle(100)}>
            <h1
              className="font-display font-bold tracking-[-0.04em] text-text-primary leading-[0.9]"
              style={{
                fontSize: "clamp(4rem, 15vw, 12rem)",
                textShadow: "0 2px 30px var(--accent-glow)",
              }}
            >
              ED
            </h1>
          </div>
          <div style={clipStyle(250)}>
            <h1
              className="font-display font-bold tracking-[-0.04em] text-text-primary leading-[0.9]"
              style={{
                fontSize: "clamp(4rem, 15vw, 12rem)",
                textShadow: "0 2px 30px var(--accent-glow)",
              }}
            >
              GRACIA
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-8" style={fadeStyle(600)}>
          <div className="flex items-center gap-3 text-text-tertiary">
            <Glyph name="home" size={16} />
            <span className="font-mono text-[11px] uppercase tracking-[0.05em]">
              25.7617°N, 80.1918°W
            </span>
          </div>

          <p className="max-w-md font-body text-lg leading-relaxed text-text-secondary">
            A student passionate about all things software who dives deep into
            low-level systems, computer graphics, and graphics engine architecture.
          </p>

          <div className="flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.05em] text-text-tertiary">
            <span>SWE @ University of Miami</span>
            <span>Systems / Graphics / Engines</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, icon: Icon, label }, i) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-text-tertiary transition-all duration-200 hover:text-accent hover:-translate-y-0.5"
                style={fadeStyle(1000 + i * 100)}
              >
                <Icon className="text-lg" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={fadeStyle(1400)}
      >
        <div
          className="h-8 w-px bg-text-tertiary/40 origin-top"
          style={{ animation: "scrollLine 2s ease-in-out infinite" }}
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run `npm run dev`. The hero should show:
- "ED GRACIA" in massive type on the left (scaling with viewport)
- Tagline, metadata, and social links on the right
- On mobile (< 640px): stacks vertically, name on top
- Glyph icon next to the coordinates
- All entrance animations still work

- [ ] **Step 3: Commit**

```bash
git add components/HeroSection.tsx
git commit -m "feat: hero full-bleed split layout with massive typography"
```

---

## Task 8: Homepage Layout Overhaul

Transform capabilities (bento), about (asymmetric), projects (staggered), blog (horizontal strips), and resume (2x2 bento). Replace all `border-t` dividers with `TerrainDivider`.

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/StatusBadge.tsx`

**Consumes:**
- `<TerrainDivider />` from Task 3
- `<Glyph />` from Task 2
- `<SectionHeader glyph={...} />` from Task 4

- [ ] **Step 1: Update StatusBadge with glyph**

Replace `components/StatusBadge.tsx`:

```tsx
import Glyph from "./Glyph";

export default function StatusBadge({ status }: { status: string }) {
  const isActive = status === "In Progress";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium ${
        isActive
          ? "bg-signal-bg text-signal"
          : "bg-bg-surface text-text-tertiary"
      }`}
    >
      {isActive ? (
        <span className="h-1.5 w-1.5 rounded-full bg-signal" style={{ animation: "subtlePulse 2s ease-in-out infinite" }} />
      ) : (
        <Glyph name="tools" size={10} />
      )}
      {status}
    </span>
  );
}
```

- [ ] **Step 2: Rewrite page.tsx with new layouts**

Replace the full content of `app/page.tsx`:

```tsx
import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import RevealGroup from "@/components/RevealGroup";
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";
import GitHubGraph from "@/components/GitHubGraph";
import TerrainDivider from "@/components/TerrainDivider";
import Glyph from "@/components/Glyph";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import { getAllPosts, formatDate } from "@/lib/posts";
import {
  SiCplusplus, SiC, SiPython, SiJavascript,
  SiTypescript, SiReact, SiNextdotjs, SiGit, SiLinux,
} from "react-icons/si";
import type { GlyphName } from "@/components/glyphs";

const skillGroups: {
  category: string;
  glyph: GlyphName;
  items: { icon: typeof SiCplusplus; label: string }[];
  span?: string;
}[] = [
  {
    category: "Languages",
    glyph: "languages",
    span: "col-span-2 row-span-2",
    items: [
      { icon: SiCplusplus, label: "C++" },
      { icon: SiC, label: "C" },
      { icon: SiPython, label: "Python" },
      { icon: SiJavascript, label: "JavaScript" },
      { icon: SiTypescript, label: "TypeScript" },
    ],
  },
  {
    category: "Frameworks",
    glyph: "frameworks",
    items: [
      { icon: SiReact, label: "React" },
      { icon: SiNextdotjs, label: "Next.js" },
    ],
  },
  {
    category: "Tools",
    glyph: "tools",
    items: [
      { icon: SiGit, label: "Git" },
      { icon: SiLinux, label: "Linux" },
    ],
  },
];

const projects = [
  {
    title: "3D Game Engine",
    description: "A from-scratch 3D engine built in C++ using raylib. Handles rendering, scene management, and serves as the foundation for an original game. Actively in development.",
    tags: ["C++", "raylib", "Graphics", "Systems"],
    status: "In Progress",
    github: "https://github.com/EdGracia/Sandbox",
  },
  {
    title: "2D Platformer",
    description: "A 2D platformer built in C++ with raylib. Custom physics, collision detection, and sprite handling — written without a game framework to stay close to the metal.",
    tags: ["C++", "raylib", "Game Dev"],
    status: "Incomplete",
    github: "https://github.com/EdGracia/Platformer",
  },
];

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <main className="w-full">

      <HeroSection />

      {/* ── Capabilities — Bento Grid ── */}
      <div className="mx-auto max-w-5xl px-6">
        <TerrainDivider seed={1} />
      </div>
      <section id="capabilities" className="mx-auto max-w-5xl px-6 py-24">
        <RevealGroup>
          <SectionHeader glyph="capabilities" title="Capabilities" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map(({ category, glyph, items, span }) => (
              <div
                key={category}
                className={`group rounded-xl border border-border-subtle bg-bg-surface/50 p-6 transition-all duration-300 hover:border-border-active hover:bg-bg-surface ${span ?? ""}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Glyph name={glyph} size={14} className="text-text-tertiary transition-colors duration-200 group-hover:text-accent" />
                  <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.05em] text-text-tertiary">
                    {category}
                  </h3>
                </div>
                <div className="flex flex-col gap-2.5">
                  {items.map(({ icon: Icon, label }) => (
                    <span key={label} className="flex items-center gap-2.5 font-mono text-sm text-text-secondary transition-all duration-200 hover:text-text-primary hover:translate-x-1 cursor-default">
                      <Icon className="text-sm shrink-0 text-text-tertiary" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </RevealGroup>
      </section>

      {/* ── About — Asymmetric Editorial ── */}
      <div className="mx-auto max-w-5xl px-6">
        <TerrainDivider seed={3} />
      </div>
      <section id="about" className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealGroup>
            <SectionHeader glyph="about" title="About" />
          </RevealGroup>
        </div>
        <RevealGroup>
          <div className="mx-auto max-w-5xl px-6 grid grid-cols-1 gap-12 sm:grid-cols-[auto_1fr]">
            <div className="flex flex-col items-start gap-6 sm:-ml-10">
              <Image
                src="/headshot.png"
                alt="Ed Gracia"
                width={140}
                height={140}
                className="h-32 w-32 rounded-2xl object-cover ring-1 ring-border-subtle"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              />
              <div className="flex flex-col gap-3">
                {[
                  { label: "Building", value: "3D game engine from scratch" },
                  { label: "Studying", value: "B.S. Software Engineering" },
                  { label: "Based in", value: "Miami, FL" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.05em] text-text-tertiary w-16 shrink-0 pt-0.5">
                      {item.label}
                    </span>
                    <span className="text-sm text-text-secondary">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="max-w-lg">
              <p className="font-body leading-relaxed text-text-secondary">
                I&apos;m a Software Engineering student at the University of Miami,
                originally from Houston, Texas. I care about building things at the
                lowest level possible — where performance is a craft, not an afterthought.
              </p>
              <p className="mt-4 font-body leading-relaxed text-text-secondary">
                I speak English and Spanish natively, which has shaped how I think
                about communication in code as much as in conversation.
              </p>
              <GitHubGraph />
            </div>
          </div>
        </RevealGroup>
      </section>

      {/* ── Projects — Staggered Cards ── */}
      <div className="mx-auto max-w-5xl px-6">
        <TerrainDivider seed={7} />
      </div>
      <section id="projects" className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealGroup>
            <SectionHeader glyph="projects" title="Projects" />
          </RevealGroup>
        </div>
        <div className="mx-auto max-w-6xl px-6 flex flex-col gap-8">
          {projects.map((project, i) => (
            <RevealGroup key={project.title}>
              <div
                className={`group relative overflow-hidden rounded-xl border border-border-subtle bg-bg-elevated p-8 transition-all duration-300 hover:border-border-active hover:shadow-lg hover:shadow-accent-glow ${
                  i % 2 === 0
                    ? "sm:ml-12 sm:mr-0"
                    : "sm:mr-12 sm:ml-0"
                }`}
              >
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent origin-top transition-transform duration-300 scale-y-0 group-hover:scale-y-100" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-glow to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-lg font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent">{project.title}</h3>
                      <StatusBadge status={project.status} />
                    </div>
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      className="flex shrink-0 items-center gap-1 text-sm text-text-tertiary transition-all duration-200 hover:text-accent"
                    >
                      <FiGithub className="text-base" />
                      <FiArrowUpRight className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                  <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-bg-surface px-3 py-1 font-mono text-[11px] font-medium text-text-tertiary transition-colors duration-200 group-hover:bg-bg-surface/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealGroup>
          ))}
        </div>
      </section>

      {/* ── Blog — Full-Width Strips ── */}
      <div className="mx-auto max-w-5xl px-6">
        <TerrainDivider seed={11} />
      </div>
      <section id="blog" className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealGroup>
            <SectionHeader glyph="blog" title="Blog" />
          </RevealGroup>
        </div>
        <RevealGroup>
          <div className="flex flex-col">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative flex items-center justify-between gap-4 border-b border-border-subtle px-6 py-6 transition-all duration-200 hover:bg-bg-surface/30 sm:px-[calc(50vw-32rem)]"
              >
                <div className="flex items-center gap-4">
                  <Glyph name="blog" size={12} className="shrink-0 text-text-tertiary opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  <span className="hidden sm:inline shrink-0 font-mono text-[11px] tracking-wide text-text-tertiary">
                    {formatDate(post.date)}
                  </span>
                  <span className="font-display text-base font-medium text-text-primary transition-colors duration-200 group-hover:text-accent">
                    {post.title}
                  </span>
                </div>
                <FiArrowUpRight className="shrink-0 text-text-tertiary transition-all duration-200 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0" />
              </Link>
            ))}
            <div className="mx-auto max-w-5xl px-6 mt-4">
              <Link href="/blog" className="inline-block font-display text-sm text-text-tertiary transition-colors hover:text-accent">
                All posts →
              </Link>
            </div>
          </div>
        </RevealGroup>
      </section>

      {/* ── Resume — 2x2 Bento ── */}
      <div className="mx-auto max-w-5xl px-6">
        <TerrainDivider seed={17} />
      </div>
      <section id="resume" className="mx-auto max-w-5xl px-6 py-24">
        <RevealGroup>
          <SectionHeader glyph="resume" title="Resume" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { glyph: "about" as GlyphName, label: "Education", value: "B.S. Software Engineering, University of Miami — Expected May 2028" },
              { glyph: "projects" as GlyphName, label: "Experience", value: "Engineering Intern at Ensel Technologies LLC (2024–2025)" },
              { glyph: "capabilities" as GlyphName, label: "Awards", value: "Canes Achievement Award · Barry M. Moran Mathematics Award" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-border-subtle bg-bg-elevated p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Glyph name={item.glyph} size={12} className="text-text-tertiary" />
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.05em] text-text-tertiary">
                    {item.label}
                  </h3>
                </div>
                <p className="font-body text-sm leading-relaxed text-text-secondary">{item.value}</p>
              </div>
            ))}
            <Link
              href="/resume"
              className="group flex items-center justify-center rounded-xl border border-border-subtle bg-bg-surface/30 p-5 transition-all duration-300 hover:border-accent hover:bg-accent-glow"
            >
              <span className="font-display text-sm font-medium text-text-secondary transition-colors duration-200 group-hover:text-accent">
                Full Resume →
              </span>
            </Link>
          </div>
        </RevealGroup>
      </section>

    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run `npm run dev`. Check each section:
- **Capabilities:** Bento grid with Languages card spanning 2 cols + 2 rows on desktop. Glyphs next to category names. Collapses to single column on mobile.
- **About:** Headshot bleeds left on desktop (`-ml-10`), stacks on mobile. Text in right column.
- **Projects:** Cards stagger left/right alternately. Wider than normal max-width.
- **Blog:** Full-width horizontal strips with glyph appearing on hover.
- **Resume:** 2x2 grid with CTA card. Glyphs on each info card.
- **Dividers:** Organic wave lines between every section, each different.

Run `npm run build` to confirm no type errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx components/StatusBadge.tsx
git commit -m "feat: bento capabilities, asymmetric about, staggered projects, full-width blog, 2x2 resume"
```

---

## Task 9: SpiceCursor — Cursor Trail

Add a golden particle trail that follows the mouse across the main content area.

**Files:**
- Create: `components/SpiceCursor.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create SpiceCursor component**

Create `components/SpiceCursor.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

const MAX_PARTICLES = 10;
const PARTICLE_LIFE = 300;

interface Particle {
  x: number;
  y: number;
  born: number;
  size: number;
}

export default function SpiceCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const raf = useRef(0);
  const lastEmit = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ("ontouchstart" in window) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastEmit.current < 40) return;
      lastEmit.current = now;

      const navHeight = 60;
      if (e.clientY < navHeight) return;

      particles.current.push({
        x: e.clientX,
        y: e.clientY,
        born: now,
        size: 1.5 + Math.random() * 1.5,
      });

      if (particles.current.length > MAX_PARTICLES) {
        particles.current.shift();
      }
    };
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      const now = performance.now();
      const isDark = document.documentElement.classList.contains("dark");

      particles.current = particles.current.filter(
        (p) => now - p.born < PARTICLE_LIFE
      );

      for (const p of particles.current) {
        const age = (now - p.born) / PARTICLE_LIFE;
        const alpha = (1 - age) * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - age * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(212, 162, 76, ${alpha})`
          : `rgba(180, 120, 40, ${alpha})`;
        ctx.fill();
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[2]"
      aria-hidden="true"
    />
  );
}
```

- [ ] **Step 2: Add SpiceCursor to layout.tsx**

In `app/layout.tsx`, import and add after SandField:

```tsx
import SpiceCursor from "@/components/SpiceCursor";
```

```tsx
<SandField />
<SpiceCursor />
<ScrollEngine />
```

- [ ] **Step 3: Verify**

Run `npm run dev`. Move the mouse across the page — a brief trail of golden dots should follow and fade. The trail should NOT appear over the navbar area. Should be disabled on touch devices.

- [ ] **Step 4: Commit**

```bash
git add components/SpiceCursor.tsx app/layout.tsx
git commit -m "feat: add SpiceCursor golden particle trail on mouse movement"
```

---

## Task 10: SpiceBloom — Hover Particle Burst

Add golden particle eruptions on card hover for the capabilities bento cells.

**Files:**
- Create: `components/SpiceBloom.tsx`

**Produces:**
- `<SpiceBloom />` — wraps children, adds canvas overlay that bursts particles on mouseenter

- [ ] **Step 1: Create SpiceBloom component**

Create `components/SpiceBloom.tsx`:

```tsx
"use client";

import { useRef, useCallback, type ReactNode } from "react";

const PARTICLE_COUNT = 18;
const PARTICLE_LIFE = 600;

interface BloomParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  born: number;
  size: number;
}

export default function SpiceBloom({ children, className = "" }: { children: ReactNode; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<BloomParticle[]>([]);
  const raf = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    ctx.clearRect(0, 0, w, h);
    const now = performance.now();
    const isDark = document.documentElement.classList.contains("dark");

    particles.current = particles.current.filter((p) => now - p.born < PARTICLE_LIFE);

    for (const p of particles.current) {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.96;
      p.vy *= 0.96;
      const age = (now - p.born) / PARTICLE_LIFE;
      const alpha = (1 - age) * 0.7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (1 - age * 0.3), 0, Math.PI * 2);
      ctx.fillStyle = isDark
        ? `rgba(212, 162, 76, ${alpha})`
        : `rgba(180, 120, 40, ${alpha})`;
      ctx.fill();
    }

    if (particles.current.length > 0) {
      raf.current = requestAnimationFrame(draw);
    }
  }, []);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + (Math.random() - 0.5) * 0.5;
        const speed = 1 + Math.random() * 3;
        particles.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          born: now,
          size: 1 + Math.random() * 2,
        });
      }

      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(draw);
    },
    [draw]
  );

  return (
    <div className={`relative ${className}`} onMouseEnter={handleMouseEnter}>
      {children}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full z-10"
        aria-hidden="true"
      />
    </div>
  );
}
```

- [ ] **Step 2: Wrap capabilities bento cells with SpiceBloom in page.tsx**

In `app/page.tsx`, import SpiceBloom:

```tsx
import SpiceBloom from "@/components/SpiceBloom";
```

In the capabilities section, wrap each skill group card:

Change:
```tsx
<div
  key={category}
  className={`group rounded-xl border border-border-subtle bg-bg-surface/50 p-6 transition-all duration-300 hover:border-border-active hover:bg-bg-surface ${span ?? ""}`}
>
```

To:
```tsx
<SpiceBloom
  key={category}
  className={span ?? ""}
>
  <div
    className="group h-full rounded-xl border border-border-subtle bg-bg-surface/50 p-6 transition-all duration-300 hover:border-border-active hover:bg-bg-surface"
  >
```

And close the `</SpiceBloom>` after the card's closing `</div>`.

- [ ] **Step 3: Verify**

Run `npm run dev`. Hover over capabilities cards — golden particles should burst outward from the cursor position. Particles fade over ~600ms. No particles when `prefers-reduced-motion` is on.

- [ ] **Step 4: Commit**

```bash
git add components/SpiceBloom.tsx app/page.tsx
git commit -m "feat: add SpiceBloom golden particle burst on capabilities card hover"
```

---

## Task 11: GitHubGraph Spice Colors

Retheme the GitHub contribution graph from the default accent colors to spice amber/gold tones.

**Files:**
- Modify: `components/GitHubGraph.tsx`

- [ ] **Step 1: Update level colors**

In `components/GitHubGraph.tsx`, change the `levelColors` record:

From:
```tsx
const levelColors: Record<number, string> = {
  0: "bg-bg-surface",
  1: "bg-accent-muted/40",
  2: "bg-accent-muted/70",
  3: "bg-accent/60",
  4: "bg-accent",
};
```

To:
```tsx
const levelColors: Record<number, string> = {
  0: "bg-bg-surface",
  1: "bg-[rgba(212,162,76,0.2)] dark:bg-[rgba(212,162,76,0.15)]",
  2: "bg-[rgba(212,162,76,0.4)] dark:bg-[rgba(212,162,76,0.3)]",
  3: "bg-[rgba(212,162,76,0.65)] dark:bg-[rgba(212,162,76,0.5)]",
  4: "bg-[rgba(212,162,76,0.9)] dark:bg-[rgba(212,162,76,0.75)]",
};
```

- [ ] **Step 2: Verify**

Run `npm run dev`. The GitHub contribution graph in the About section should show amber/gold tones instead of blue/accent. Check both light and dark mode.

- [ ] **Step 3: Commit**

```bash
git add components/GitHubGraph.tsx
git commit -m "feat: retheme GitHub contribution graph with spice amber/gold tones"
```

---

## Task 12: Final Polish & Build Verification

Run a final build, check all features work together, fix any integration issues.

**Files:**
- Possibly any file that needs small fixes

- [ ] **Step 1: Production build**

```bash
npm run build
```

Fix any TypeScript errors or build failures.

- [ ] **Step 2: Visual verification checklist**

Run `npm run dev` and check every feature:

| Feature | Check |
|---------|-------|
| Scroll color journey | Background shifts dawn → noon → dusk |
| Sand particles | Visible across full page, density thins toward bottom |
| Spice shimmer | Golden particles more visible in middle third |
| Parallax | Far dune contours move slower than content |
| AmbientField | Grid drifts at ~0.5x scroll speed |
| Hero | Full-bleed split layout, massive type, glyph + coordinates |
| Capabilities | Bento grid, Languages 2x2, glyph category markers |
| About | Headshot bleeds left on desktop, stacks on mobile |
| Projects | Staggered left/right cards |
| Blog | Full-width horizontal strips, glyph on hover |
| Resume | 2x2 bento with CTA card |
| Section dividers | Organic wave lines with heat shimmer |
| Section headers | Glyphs instead of numbers, hover rotation + underline |
| SpiceCursor | Golden trail follows mouse, not in nav area |
| SpiceBloom | Particles burst on capabilities card hover |
| GitHub graph | Amber/gold tones |
| Dark/Light mode | Both themes work for all features |
| Mobile (375px) | Bento collapses, headshot stacks, no horizontal scroll |
| Reduced motion | Parallax flat, cursor trail off, blooms simple fade |

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Fix any linting errors.

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "polish: fix integration issues from visual overhaul"
```

(Skip this step if no fixes are needed.)

---

## Summary

| Task | What It Builds | Key Files |
|------|---------------|-----------|
| 1 | ScrollEngine (central scroll listener + color journey) | `ScrollEngine.tsx`, `globals.css`, `layout.tsx` |
| 2 | Glyph design system (9 SVG symbols) | `glyphs.ts`, `Glyph.tsx` |
| 3 | TerrainDivider (organic wave + heat shimmer) | `TerrainDivider.tsx`, `globals.css` |
| 4 | SectionHeader with glyphs | `SectionHeader.tsx`, `page.tsx` |
| 5 | Full-page SandField + SandInteractionContext | `SandField.tsx`, `SandInteractionContext.tsx`, `layout.tsx` |
| 6 | ParallaxLayer + AmbientField parallax | `ParallaxLayer.tsx`, `AmbientField.tsx`, `layout.tsx` |
| 7 | Hero full-bleed split layout | `HeroSection.tsx` |
| 8 | Homepage layout overhaul (all sections) | `page.tsx`, `StatusBadge.tsx` |
| 9 | SpiceCursor (golden cursor trail) | `SpiceCursor.tsx`, `layout.tsx` |
| 10 | SpiceBloom (hover particle burst) | `SpiceBloom.tsx`, `page.tsx` |
| 11 | GitHubGraph spice colors | `GitHubGraph.tsx` |
| 12 | Final polish & build verification | Any needed fixes |

---

## Deferred Items

These spec features are intentionally deferred to a follow-up pass after the core visual system is stable:

- **Sand-scatter on project cards** (spec §5): SandInteractionContext infrastructure is built in Task 5, but wiring SandField's draw loop to read repulsion zones from project card hovers adds complexity to the already-large SandField rewrite. Wire it after the base system is verified working.
- **Decorative watermark glyphs** (spec §4): Faint oversized glyphs as section background accents. Purely decorative — add once layouts are finalized.
- **Blog date glyph prefix** (spec §4): Small glyph before date strings in blog post listings. Quick to add once the glyph system is in and the blog layout is settled.
