---
name: design-preferences
description: "Portfolio redesign: blue accent (#6e8eff), Space Grotesk + Inter + JetBrains Mono, HUD metadata in hero/footer"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d96baccb-4de1-4c83-9ec4-4f5a0bd82760
---

Redesigned June 2026 to escape "generic AI slop" look. Previous emerald-on-black terminal aesthetic replaced entirely.

**New design system:**
- Palette: cool blue accent (#6e8eff dark / #3d5afe light), chartreuse signal (#c4f070), layered dark backgrounds, warm paper light mode
- Typography: Space Grotesk (display/headings), Inter (body), JetBrains Mono (technical elements only — tags, dates, metadata, code)
- Hero: large split "ED / GRACIA" with clip-path entrance animation
- HUD metadata in hero and footer (coordinates, timezone, EN/ES) — not a persistent overlay
- Animation: one vocabulary — opacity + scale reveal, no translate-y lifts or typewriter effects
- Canvas: subtle particle field (AmbientField) replaces dot grid

**References the user admires:** ashwingupta.dev (favorite), Gustaf Furusten, Majd portfolio.

**Why:** User explicitly identified the previous terminal/emerald/monospace-everywhere aesthetic as looking like AI-generated slop. The blue accent is a deliberate rejection of the green developer cliché.
**How to apply:** Don't revert to emerald, typewriter, code-comment labels, or monospace-for-everything. Keep the three-font system with clear roles. HUD metadata should use real data (real coordinates, real time).
