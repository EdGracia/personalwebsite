"use client";

import Link from "next/link";
import Image from "next/image";
import RevealGroup from "@/components/RevealGroup";
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";
import type { ReactNode } from "react";
import TerrainDivider from "@/components/TerrainDivider";
import Glyph from "@/components/Glyph";
import SpiceBloom from "@/components/SpiceBloom";
import HeroSection from "@/components/HeroSection";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import { useTranslation } from "@/lib/translations";
import {
  SiCplusplus, SiC, SiPython, SiJavascript,
  SiTypescript, SiReact, SiNextdotjs, SiGit, SiLinux,
} from "react-icons/si";
import type { GlyphName } from "@/components/glyphs";

interface Post {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
}

export default function HomeContent({ recentPosts, githubGraph }: { recentPosts: Post[]; githubGraph: ReactNode }) {
  const { t } = useTranslation();

  const skillGroups: {
    category: string;
    glyph: GlyphName;
    items: { icon: typeof SiCplusplus; label: string }[];
    span?: string;
  }[] = [
    {
      category: t("capabilities.languages"),
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
      category: t("capabilities.frameworks"),
      glyph: "frameworks",
      items: [
        { icon: SiReact, label: "React" },
        { icon: SiNextdotjs, label: "Next.js" },
      ],
    },
    {
      category: t("capabilities.tools"),
      glyph: "tools",
      items: [
        { icon: SiGit, label: "Git" },
        { icon: SiLinux, label: "Linux" },
      ],
    },
  ];

  const projects = [
    {
      title: t("projects.engine.title"),
      description: t("projects.engine.description"),
      tags: ["C++", "raylib", "Graphics", "Systems"],
      status: t("projects.status.inProgress"),
      github: "https://github.com/EdGracia/Sandbox",
    },
    {
      title: t("projects.platformer.title"),
      description: t("projects.platformer.description"),
      tags: ["C++", "raylib", "Game Dev"],
      status: t("projects.status.incomplete"),
      github: "https://github.com/EdGracia/Platformer",
    },
  ];

  return (
    <main className="w-full">

      <HeroSection />

      {/* ── About — Asymmetric Editorial ── */}
      <div className="mx-auto max-w-5xl px-6">
        <TerrainDivider seed={1} />
      </div>
      <section id="about" className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealGroup>
            <SectionHeader glyph="about" title={t("about.title")} />
          </RevealGroup>
        </div>
        <RevealGroup>
          <div className="mx-auto max-w-5xl px-6 grid grid-cols-1 gap-12 sm:grid-cols-[auto_1fr]">
            <div className="flex flex-col items-start gap-6">
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
                  { label: t("about.label.building"), value: t("about.value.building") },
                  { label: t("about.label.studying"), value: t("about.value.studying") },
                  { label: t("about.label.based"), value: t("about.value.based") },
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
                {t("about.bio1")}
              </p>
              <p className="mt-4 font-body leading-relaxed text-text-secondary">
                {t("about.bio2")}
              </p>
              {githubGraph}
            </div>
          </div>
        </RevealGroup>
      </section>

      {/* ── Capabilities — Bento Grid ── */}
      <div className="mx-auto max-w-5xl px-6">
        <TerrainDivider seed={3} />
      </div>
      <section id="capabilities" className="mx-auto max-w-5xl px-6 py-24">
        <RevealGroup>
          <SectionHeader glyph="capabilities" title={t("capabilities.title")} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map(({ category, glyph, items, span }) => (
              <SpiceBloom
                key={category}
                className={span ?? ""}
              >
                <div className="group h-full rounded-xl border border-border-subtle bg-bg-surface/50 p-6 transition-all duration-300 hover:border-border-active hover:bg-bg-surface">
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
              </SpiceBloom>
            ))}
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
            <SectionHeader glyph="projects" title={t("projects.title")} />
          </RevealGroup>
        </div>
        <div className="mx-auto max-w-5xl px-6 flex flex-col gap-8">
          {projects.map((project) => (
            <RevealGroup key={project.title}>
              <div
                className="group relative overflow-hidden rounded-xl border border-border-subtle bg-bg-elevated p-8 transition-all duration-300 hover:border-border-active hover:shadow-lg hover:shadow-accent-glow"
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
            <SectionHeader glyph="blog" title={t("blog.title")} />
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
                    {post.formattedDate}
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
                {t("blog.allPosts")}
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
          <SectionHeader glyph="resume" title={t("resume.title")} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { glyph: "about" as GlyphName, label: t("resume.education"), value: t("resume.education.value") },
              { glyph: "projects" as GlyphName, label: t("resume.experience"), value: t("resume.experience.value") },
              { glyph: "capabilities" as GlyphName, label: t("resume.awards"), value: t("resume.awards.value") },
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
                {t("resume.fullResume")}
              </span>
            </Link>
          </div>
        </RevealGroup>
      </section>

    </main>
  );
}
