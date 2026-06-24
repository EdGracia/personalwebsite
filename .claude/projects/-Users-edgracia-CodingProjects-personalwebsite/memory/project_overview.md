---
name: project-overview
description: "Personal portfolio site — Next.js 16.2.6, Tailwind 4, Space Grotesk + Inter + JetBrains Mono, blue accent, dark/light mode"
metadata: 
  node_type: memory
  type: project
  originSessionId: d96baccb-4de1-4c83-9ec4-4f5a0bd82760
---

Next.js 16.2.6 App Router with Turbopack. Tailwind 4 (CSS-first config via @theme inline). Three fonts: Space Grotesk (display), Inter (body), JetBrains Mono (technical). Blue accent (#6e8eff/#3d5afe). CSS custom properties for all colors. Dark/light mode via next-themes. Hosted on Vercel with Analytics.

Pages: / (home with hero, capabilities, about, projects, writing, resume), /about, /projects, /blog, /blog/[slug], /resume.

Key components: HeroSection (split-name + clip-path animation), Navbar (Space Grotesk, scroll-spy), AmbientField (canvas particle field), RevealGroup (IntersectionObserver staggered reveal), SectionHeader (numbered sections), StatusBadge, GitHubGraph, PageTransition, Footer (HUD metadata — coordinates, clock, EN/ES).

Blog posts are markdown files in /posts/, parsed via lib/posts.ts.

**Why:** Personal portfolio and engineering blog.
**How to apply:** Read node_modules/next/dist/docs/ before writing Next.js-specific code (per AGENTS.md). Tailwind 4 uses @theme inline not tailwind.config.js. All colors use CSS custom properties (--bg-deep, --accent, etc.) registered in globals.css.
