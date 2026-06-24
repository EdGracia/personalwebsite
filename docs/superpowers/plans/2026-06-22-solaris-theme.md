# Solaris Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the portfolio into the "Solaris" theme — desert-meets-ocean color palette, interactive sand/wind hero simulation, grain texture, warm-tinted grid background.

**Architecture:** Color tokens in `globals.css` drive the entire palette swap — most components inherit automatically. The hero gets a new `SandField` canvas component for the sand particle simulation. A CSS-based grain overlay and horizon gradient complete the atmospheric feel. Old experimental components (SoftBodyBlob, ParticleConstellation) are removed.

**Tech Stack:** Next.js 16, React 19, Tailwind 4 (CSS-first `@theme inline`), Canvas API

## Global Constraints

- Canvas rendering: never change `strokeStyle` mid-path or break paths inside draw loops
- No blanket `prefers-reduced-motion` rules that kill all animations — handle per-component if needed
- No `Co-Authored-By` lines in commits
- Colors must use CSS custom properties registered with `@theme inline`
- Fonts are already set: Instrument Sans (display), Geist (body), JetBrains Mono (mono)

---

### Task 1: Update Color Palette

**Files:**
- Modify: `app/globals.css:4-36` (`:root` and `.dark` blocks)

**Interfaces:**
- Consumes: nothing
- Produces: all CSS custom properties (`--bg-deep`, `--accent`, etc.) used by every component via Tailwind tokens

- [ ] **Step 1: Replace `:root` light mode colors**

In `app/globals.css`, replace lines 4–18 (the `:root` block) with:

```css
:root {
  --bg-deep: #f4ede4;
  --bg-base: #faf6f0;
  --bg-elevated: #ffffff;
  --bg-surface: #ede6db;
  --border-subtle: #ddd4c6;
  --border-active: #c9bda9;
  --text-primary: #1a1610;
  --text-secondary: #6b5f51;
  --text-tertiary: #9a8e7e;
  --accent: #1a6fb5;
  --accent-muted: #7baacf;
  --accent-glow: rgba(26, 111, 181, 0.12);
  --signal: #d4763a;
  --signal-bg: rgba(212, 118, 58, 0.1);
}
```

- [ ] **Step 2: Replace `.dark` mode colors**

Replace lines 21–36 (the `.dark` block) with:

```css
.dark {
  --bg-deep: #0a0a12;
  --bg-base: #0f0f1a;
  --bg-elevated: #161624;
  --bg-surface: #1c1c2e;
  --border-subtle: #1e1e32;
  --border-active: #2a2a42;
  --text-primary: #e8e2d8;
  --text-secondary: #9a9080;
  --text-tertiary: #5a5448;
  --accent: #d4a24c;
  --accent-muted: #8a7040;
  --accent-glow: rgba(212, 162, 76, 0.15);
  --signal: #e8724a;
  --signal-bg: rgba(232, 114, 74, 0.1);
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors. All components pick up new colors through tokens.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "theme: replace palette with Solaris desert-meets-ocean colors"
```

---

### Task 2: Add Grain Texture Overlay

**Files:**
- Modify: `app/globals.css` (add grain overlay rule after `body` block)

**Interfaces:**
- Consumes: `--bg-deep` color token (for warm-tinted noise)
- Produces: `body::after` pseudo-element rendering a full-viewport noise overlay

- [ ] **Step 1: Add grain overlay CSS**

In `app/globals.css`, after the `body { ... }` block (after line 131), add:

```css
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds. The grain overlay renders on top of everything as a subtle texture.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "theme: add subtle grain noise overlay for sandstone texture"
```

---

### Task 3: Warm-tint AmbientField Grid

**Files:**
- Modify: `components/AmbientField.tsx:52` (strokeStyle line)

**Interfaces:**
- Consumes: nothing new
- Produces: warm-tinted grid lines instead of neutral gray/white

- [ ] **Step 1: Update grid line colors**

In `components/AmbientField.tsx`, replace line 52:

```typescript
ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(160, 160, 168, 0.15)";
```

with:

```typescript
ctx.strokeStyle = isDark ? "rgba(200, 190, 170, 0.06)" : "rgba(180, 170, 155, 0.12)";
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/AmbientField.tsx
git commit -m "theme: warm-tint AmbientField grid lines"
```

---

### Task 4: Build SandField Component

**Files:**
- Create: `components/SandField.tsx`

**Interfaces:**
- Consumes: nothing (self-contained canvas component)
- Produces: `<SandField />` — a canvas element that fills its parent with a sand particle wind simulation. Accepts no props.

- [ ] **Step 1: Create SandField.tsx**

Create `components/SandField.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 300;
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
}

function createGrains(w: number, h: number): Grain[] {
  return Array.from({ length: PARTICLE_COUNT }, () => {
    const layer = Math.random();
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0,
      vy: 0,
      size: layer < 0.33 ? 1 : layer < 0.66 ? 1.5 : 2.5,
      opacity: layer < 0.33 ? 0.2 : layer < 0.66 ? 0.35 : 0.55,
      layer,
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
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      dims.current = { w: rect.width, h: rect.height };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (grains.current.length === 0) {
        grains.current = createGrains(rect.width, rect.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const m = mouse.current;
      m.prevX = m.x;
      m.prevY = m.y;
      m.x = e.clientX - rect.left;
      m.y = e.clientY - rect.top;
    };
    const onTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      const m = mouse.current;
      m.prevX = m.x;
      m.prevY = m.y;
      m.x = t.clientX - rect.left;
      m.y = t.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    canvas.addEventListener("mouseleave", onLeave);

    const draw = () => {
      const { w, h } = dims.current;
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains("dark");
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const mSpeed = Math.sqrt(
        (mx - mouse.current.prevX) ** 2 + (my - mouse.current.prevY) ** 2
      );
      const pushStrength = Math.min(mSpeed * 0.15, 8);

      for (const g of grains.current) {
        const layerMult = 0.3 + g.layer * 0.7;

        g.vx += BASE_WIND_X * layerMult * 0.1;
        g.vy += BASE_WIND_Y * layerMult * 0.1;

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

      ctx.beginPath();
      for (const g of grains.current) {
        ctx.moveTo(g.x + g.size, g.y);
        ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
      }
      ctx.fillStyle = isDark
        ? `rgba(${sandColor}, 0.35)`
        : `rgba(${sandColor}, 0.4)`;
      ctx.fill();

      const brightGrains = grains.current.filter(g => g.layer > 0.66);
      if (brightGrains.length > 0) {
        ctx.beginPath();
        for (const g of brightGrains) {
          ctx.moveTo(g.x + g.size * 0.6, g.y);
          ctx.arc(g.x, g.y, g.size * 0.6, 0, Math.PI * 2);
        }
        ctx.fillStyle = isDark
          ? "rgba(212, 162, 76, 0.2)"
          : "rgba(26, 111, 181, 0.15)";
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
      canvas.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{ touchAction: "none" }}
    />
  );
}
```

Key design decisions:
- Single `fillStyle` for the main batch, one separate `fillStyle` for the bright accent grains — two passes total, never changing style mid-path
- Three depth layers via `layer` float (0–0.33, 0.33–0.66, 0.66–1.0) controlling size, opacity, and wind response
- Cursor speed drives push strength — fast swipes create gusts, slow movement is a gentle breeze
- Particles wrap around edges instead of bouncing (feels more like wind carrying sand across)
- `pointer-events: none` so it doesn't intercept clicks on hero text/links

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds (component is created but not yet imported anywhere).

- [ ] **Step 3: Commit**

```bash
git add components/SandField.tsx
git commit -m "feat: add SandField canvas component for hero sand/wind simulation"
```

---

### Task 5: Update HeroSection + Remove Old Components

**Files:**
- Modify: `components/HeroSection.tsx`
- Delete: `components/SoftBodyBlob.tsx`
- Delete: `components/ParticleConstellation.tsx`

**Interfaces:**
- Consumes: `<SandField />` from Task 4
- Produces: updated hero with sand simulation, horizon gradient, and text treatment

- [ ] **Step 1: Rewrite HeroSection.tsx**

Replace the entire contents of `components/HeroSection.tsx` with:

```tsx
"use client";

import Link from "next/link";
import { FiGithub, FiMail } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { useEffect, useState } from "react";
import SandField from "./SandField";

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
    <section id="home" className="relative flex min-h-[85vh] flex-col justify-center py-24 overflow-hidden">
      <SandField />

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to bottom, transparent 30%, var(--signal-bg) 60%, var(--accent-glow) 85%, transparent 100%)",
      }} />

      <div className="relative z-10">
        <div style={clipStyle(100)}>
          <h1 className="font-display text-7xl font-bold tracking-[-0.03em] text-text-primary sm:text-8xl"
            style={{ textShadow: "0 2px 30px var(--accent-glow)" }}>
            ED
          </h1>
        </div>
        <div style={clipStyle(250)}>
          <h1 className="font-display text-7xl font-bold tracking-[-0.03em] text-text-primary sm:text-8xl"
            style={{ textShadow: "0 2px 30px var(--accent-glow)" }}>
            GRACIA
          </h1>
        </div>

        <div style={fadeStyle(600)}>
          <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-text-secondary">
            A student passionate about all things software who dives deep into
            low-level systems, computer graphics, and game engine architecture.
          </p>
        </div>
      </div>

      <div
        className="relative z-10 mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        style={fadeStyle(850)}
      >
        <div className="flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.05em] text-text-tertiary">
          <span>SWE @ University of Miami</span>
          <span>Miami, FL — 25.7617°N, 80.1918°W</span>
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

Changes from original:
- Import `SandField` instead of `SoftBodyBlob`
- Hero height increased to `min-h-[85vh]` + `overflow-hidden` for the sand canvas
- `SandField` canvas positioned absolutely behind content
- Horizon gradient overlay using `--signal-bg` and `--accent-glow` tokens (coral → ocean in light, coral → gold in dark)
- Subtle `textShadow` on name using `--accent-glow` for carved-stone-catching-light effect
- `z-10` on text content and bottom elements so they sit above the canvas
- Removed the `flex items-center justify-between gap-8` wrapper and the SoftBodyBlob placement — back to single-column text layout

- [ ] **Step 2: Delete old components**

```bash
rm components/SoftBodyBlob.tsx components/ParticleConstellation.tsx
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds. No import errors (SoftBodyBlob and ParticleConstellation are no longer imported anywhere).

- [ ] **Step 4: Commit**

```bash
git add components/HeroSection.tsx components/SandField.tsx
git add -u components/SoftBodyBlob.tsx components/ParticleConstellation.tsx
git commit -m "feat: integrate SandField into hero, remove SoftBodyBlob and ParticleConstellation"
```

---

### Task 6: Visual Verification

**Files:** none (verification only)

- [ ] **Step 1: Start dev server and verify light mode**

Run: `npm run dev`

Check in browser:
- Sand particles drift left-to-right across hero
- Moving cursor pushes particles away like wind (fast swipes = strong gusts)
- Warm sand/parchment background visible across all sections
- Ocean blue accent on links, hover states, project cards
- Coral/amber signal color on status badges
- Grain texture visible as subtle overlay
- Horizon gradient visible in hero (warm glow in lower portion)
- Text is readable — name has subtle glow shadow
- AmbientField grid has warm-tinted lines below hero

- [ ] **Step 2: Toggle to dark mode and verify**

Check:
- Deep indigo background, golden amber accent color
- Sand particles shift to warmer/dimmer tones
- Grid lines are warm-tinted in dark mode
- Grain texture still subtle, not overpowering
- Text contrast is sufficient for readability

- [ ] **Step 3: Check performance**

Open browser DevTools Performance tab, record 5 seconds of cursor movement over hero.
Expected: Consistent 60fps, no dropped frames during sand simulation.
