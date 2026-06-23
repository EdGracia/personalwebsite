# i18n: English / Spanish Language Toggle

**Date:** 2026-06-23
**Status:** Approved

## Goal

Turn the static "EN / ES" text in the footer into functional toggle buttons that switch the entire site between English and Spanish. English is always the default. Blog post content stays English-only.

## Architecture

### LanguageProvider (`components/LanguageProvider.tsx`)

React context component providing:
- `locale`: `"en" | "es"` (current language)
- `setLocale`: function to switch language

Behavior:
- On mount, reads `localStorage.getItem("locale")`. If not `"en"` or `"es"`, defaults to `"en"`.
- On locale change, writes to `localStorage` and updates `document.documentElement.lang` to match.
- Wraps the app in `layout.tsx`, nested inside `ThemeProvider`.

### Translations (`lib/translations.ts`)

Single dictionary file exporting:
- `translations` object: `Record<"en" | "es", Record<string, string>>`
- Keys use dotted paths: `nav.capabilities`, `home.about.bio1`, `projects.engine.description`, etc.
- `useTranslation()` hook: reads locale from context, returns `t(key: string) => string`

### Footer Toggle (in `components/Footer.tsx`)

Replaces the static `EN / ES` span with two `<button>` elements:
- Styled as a segmented control with the same `font-mono text-[11px]` styling
- Active language: `text-accent` or `text-text-primary` (visually distinct)
- Inactive language: `text-text-tertiary` (dimmed)
- Separator `/` between them for visual continuity
- Clicking the inactive button switches locale via context

## Scope: What Gets Translated

### Translated
- **Navbar:** all link labels (Capabilities, About, Projects, Blog, Resume)
- **HeroSection:** subtitle/tagline text
- **Homepage sections:** capability category names (Languages, Frameworks, Tools), about section bio paragraphs and metadata labels (Building, Studying, Based in), project titles and descriptions, project status labels, resume entries (Education, Experience, Awards and their values), blog section "All posts →" link, "Full Resume →" link
- **SectionHeader titles:** Capabilities, About, Projects, Blog, Resume (translated at each call site, passed as prop)
- **About page** (`app/about/page.tsx`): all text content
- **Projects page** (`app/projects/page.tsx`): all text content
- **Resume page** (`app/resume/page.tsx`): all text content
- **Blog page** (`app/blog/page.tsx`): section header and UI labels only
- **Footer:** any translatable UI text

### NOT Translated
- Blog post content, titles, and dates (sourced from markdown)
- Technical labels: C++, C, Python, JavaScript, TypeScript, React, Next.js, Git, Linux
- Proper nouns: Ed Gracia, University of Miami, GitHub repo names
- Footer metadata: coordinates, timezone clock, copyright
- `<html>` `<title>` and `<meta description>` (kept in English for SEO)

## Storage

- **Client-side only:** React context + `localStorage`
- Key: `"locale"`, values: `"en"` | `"es"`
- Default: `"en"` (always, even if browser locale is Spanish)
- No URL changes, no server-side routing

## Component Changes Summary

| File | Change |
|------|--------|
| `components/LanguageProvider.tsx` | New — context provider |
| `lib/translations.ts` | New — dictionary + `useTranslation` hook |
| `app/layout.tsx` | Wrap children with `LanguageProvider` |
| `components/Footer.tsx` | Replace static EN/ES with toggle buttons |
| `components/Navbar.tsx` | Use `t()` for link labels |
| `components/HeroSection.tsx` | Use `t()` for subtitle |
| `components/SectionHeader.tsx` | No change (receives translated title as prop) |
| `app/page.tsx` | Use `t()` for all section content; convert to client component or extract translatable sections into client components |
| `app/about/page.tsx` | Use `t()` for content |
| `app/projects/page.tsx` | Use `t()` for content |
| `app/resume/page.tsx` | Use `t()` for content |
| `app/blog/page.tsx` | Use `t()` for UI labels |

## Client/Server Component Consideration

`app/page.tsx` currently uses `getAllPosts()` (server-side). To use the `useTranslation` hook (client-side), translatable content will be extracted into client components that receive any server-fetched data as props. The page itself can remain a server component that passes data down.

## Translation Approach

All Spanish translations will be written by Claude, aiming for natural Latin American Spanish appropriate for a professional portfolio. Technical terms stay in English where that's standard practice (e.g., "Software Engineering" can stay as-is or be translated depending on context).
