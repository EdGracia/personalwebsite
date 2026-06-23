import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import RevealGroup from "@/components/RevealGroup";
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";
import GitHubGraph from "@/components/GitHubGraph";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import { getAllPosts, formatDate } from "@/lib/posts";
import {
  SiCplusplus, SiC, SiPython, SiJavascript,
  SiTypescript, SiReact, SiNextdotjs, SiGit, SiLinux,
} from "react-icons/si";

const skillGroups = [
  {
    category: "Languages",
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
    items: [
      { icon: SiReact, label: "React" },
      { icon: SiNextdotjs, label: "Next.js" },
    ],
  },
  {
    category: "Tools",
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
    <main className="mx-auto w-full max-w-5xl px-6">

      <HeroSection />

      {/* ── 01 Capabilities ── */}
      <section id="capabilities" className="py-24 border-t border-border-subtle">
        <RevealGroup>
          <SectionHeader glyph="capabilities" title="Capabilities" />
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {skillGroups.map(({ category, items }) => (
              <div key={category}>
                <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.05em] text-text-tertiary mb-4">
                  {category}
                </h3>
                <div className="flex flex-col gap-2.5">
                  {items.map(({ icon: Icon, label }) => (
                    <span key={label} className="flex items-center gap-2.5 font-mono text-sm text-text-secondary transition-all duration-200 hover:text-text-primary hover:translate-x-1 cursor-default">
                      <Icon className="text-sm shrink-0 text-text-tertiary transition-colors duration-200 group-hover:text-accent" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </RevealGroup>
      </section>

      {/* ── 02 About ── */}
      <section id="about" className="py-24 border-t border-border-subtle">
        <RevealGroup>
          <SectionHeader glyph="about" title="About" />
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-[auto_1fr]">
            <div className="flex flex-col items-start gap-6">
              <Image
                src="/headshot.png"
                alt="Ed Gracia"
                width={120}
                height={120}
                className="h-28 w-28 rounded-2xl object-cover ring-1 ring-border-subtle"
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
            <div>
              <p className="max-w-lg font-body leading-relaxed text-text-secondary">
                I&apos;m a Software Engineering student at the University of Miami,
                originally from Houston, Texas. I care about building things at the
                lowest level possible — where performance is a craft, not an afterthought.
              </p>
              <p className="mt-4 max-w-lg font-body leading-relaxed text-text-secondary">
                I speak English and Spanish natively, which has shaped how I think
                about communication in code as much as in conversation.
              </p>
              <GitHubGraph />
            </div>
          </div>
        </RevealGroup>
      </section>

      {/* ── 03 Projects ── */}
      <section id="projects" className="py-24 border-t border-border-subtle">
        <RevealGroup>
          <SectionHeader glyph="projects" title="Projects" />
        </RevealGroup>
        <div className="flex flex-col gap-6">
          {projects.map((project) => (
            <RevealGroup key={project.title}>
              <div className="group relative overflow-hidden rounded-xl border border-border-subtle bg-bg-elevated p-6 transition-all duration-300 hover:border-border-active hover:shadow-lg hover:shadow-accent-glow">
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

      {/* ── 04 Blog ── */}
      <section id="blog" className="py-24 border-t border-border-subtle">
        <RevealGroup>
          <SectionHeader glyph="blog" title="Blog" />
          <div className="flex flex-col">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-baseline justify-between gap-4 border-b border-border-subtle py-5 transition-all duration-200 first:border-t hover:pl-2"
              >
                <div className="flex items-baseline gap-4">
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
            <Link href="/blog" className="mt-4 inline-block font-display text-sm text-text-tertiary transition-colors hover:text-accent">
              All posts →
            </Link>
          </div>
        </RevealGroup>
      </section>

      {/* ── 05 Resume ── */}
      <section id="resume" className="py-24 border-t border-border-subtle">
        <RevealGroup>
          <div className="flex items-center justify-between mb-10">
            <SectionHeader glyph="resume" title="Resume" />
            <Link href="/resume" className="font-display text-sm text-text-tertiary transition-colors hover:text-accent">
              Full page →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { label: "Education", value: "B.S. Software Engineering, University of Miami — Expected May 2028" },
              { label: "Experience", value: "Engineering Intern at Ensel Technologies LLC (2024–2025)" },
              { label: "Awards", value: "Canes Achievement Award · Barry M. Moran Mathematics Award" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-border-subtle bg-bg-elevated p-5">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.05em] text-text-tertiary mb-2">
                  {item.label}
                </h3>
                <p className="font-body text-sm leading-relaxed text-text-secondary">{item.value}</p>
              </div>
            ))}
          </div>
        </RevealGroup>
      </section>

    </main>
  );
}
