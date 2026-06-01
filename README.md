# edgracia.dev

Personal portfolio and blog — built with Next.js, TypeScript, and Tailwind CSS.

## Stack

- **Framework** — [Next.js 15](https://nextjs.org) (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **Fonts** — Inter via `next/font`
- **Deployment** — [Vercel](https://vercel.com)

## Features

- Single-page scrolling layout with smooth anchor navigation
- Interactive canvas grid with mouse-driven refraction effect
- Blog powered by local Markdown files — no CMS or database
- Page transitions, scroll-aware navbar, and OG image support
- Fully responsive

## Running Locally

```bash
git clone https://github.com/EdGracia/personalwebsite.git
cd personalwebsite
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Writing a Blog Post

Add a `.md` file to the `posts/` directory with the following frontmatter:

```md
---
title: "Your Post Title"
date: "YYYY-MM-DD"
summary: "A one-line description."
---

Your content here.
```

The post will appear automatically on the blog page and homepage.

## License

MIT
