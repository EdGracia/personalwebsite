"use client";

import Link from "next/link";
import Image from "next/image";
import RevealGroup from "@/components/RevealGroup";
import SectionHeader from "@/components/SectionHeader";
import StatusBadge from "@/components/StatusBadge";
import type { ReactNode } from "react";
import SpiceBloom from "@/components/SpiceBloom";
import HeroSection from "@/components/HeroSection";
import { FiGithub, FiArrowUpRight, FiGlobe } from "react-icons/fi";
import { useTranslation } from "@/lib/translations";
import {
  SiCplusplus, SiC, SiPython, SiJavascript,
  SiTypescript, SiReact, SiNextdotjs, SiGit, SiLinux,
} from "react-icons/si";

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
    items: { icon: typeof SiCplusplus; label: string }[];
    span?: string;
  }[] = [
    {
      category: t("capabilities.languages"),
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
      items: [
        { icon: SiReact, label: "React" },
        { icon: SiNextdotjs, label: "Next.js" },
      ],
    },
    {
      category: t("capabilities.tools"),
      items: [
        { icon: SiGit, label: "Git" },
        { icon: SiLinux, label: "Linux" },
      ],
    },
  ];

  const projects = [
    {
      slug: "ensel",
      title: t("projects.ensel.title"),
      description: t("projects.ensel.description"),
      tags: ["Next.js", "React", "TypeScript", "Vercel"],
      status: t("projects.status.complete"),
      link: "https://enseltech.com",
      image: "/images/projects/ensel-preview.png",
    },
    {
      slug: "engine",
      title: t("projects.engine.title"),
      description: t("projects.engine.description"),
      tags: ["C++", "raylib", "Graphics", "Systems"],
      status: t("projects.status.inProgress"),
      github: "https://github.com/EdGracia/Sandbox",
      image: "/images/projects/sandbox-preview.png",
    },
    {
      slug: "platformer",
      title: t("projects.platformer.title"),
      description: t("projects.platformer.description"),
      tags: ["C++", "raylib", "Game Dev"],
      status: t("projects.status.incomplete"),
      github: "https://github.com/EdGracia/Platformer",
      image: "/images/projects/platformer-preview.png",
    },
  ];

  return (
    <main className="w-full">

      <HeroSection />

      {/* ── About — Asymmetric Editorial ── */}
      <section id="about" className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealGroup>
            <SectionHeader title={t("about.title")} sectionId="about" />
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
      <section id="capabilities" className="mx-auto max-w-5xl px-6 py-24">
        <RevealGroup>
          <SectionHeader title={t("capabilities.title")} sectionId="capabilities" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map(({ category, items, span }) => (
              <SpiceBloom
                key={category}
                className={span ?? ""}
              >
                <div className="group h-full rounded-xl border border-border-subtle bg-bg-surface/50 px-6 pt-4 pb-6 transition-all duration-300 hover:border-border-active hover:bg-bg-surface">
                  <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.05em] text-text-tertiary mb-4">
                    {category}
                  </h3>
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

      {/* ── Projects — Card Grid ── */}
      <section id="projects" className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealGroup>
            <SectionHeader title={t("projects.title")} sectionId="projects" />
          </RevealGroup>
        </div>
        <div className="mx-auto max-w-5xl px-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <RevealGroup key={project.title}>
              <Link
                href={`/projects?expand=${project.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-bg-elevated transition-all duration-300 hover:border-border-active hover:shadow-lg hover:shadow-accent-glow/50 hover:-translate-y-0.5"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-surface">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      {project.github ? <FiGithub className="text-2xl text-text-tertiary/40" /> : <FiGlobe className="text-2xl text-text-tertiary/40" />}
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-sm font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent">{project.title}</h3>
                      <StatusBadge status={project.status} />
                    </div>
                    <FiArrowUpRight className="shrink-0 text-sm text-text-tertiary transition-all duration-200 opacity-0 group-hover:opacity-100" />
                  </div>
                  <p className="mt-1.5 font-body text-xs leading-relaxed text-text-secondary line-clamp-2">{project.description}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-bg-surface px-2 py-0.5 font-mono text-[10px] font-medium text-text-tertiary">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </RevealGroup>
          ))}
        </div>
        <div className="mx-auto max-w-5xl px-6 mt-4">
          <Link href="/projects" className="inline-block font-display text-sm text-text-tertiary transition-colors hover:text-accent">
            {t("projects.allProjects")}
          </Link>
        </div>
      </section>

      {/* ── Blog — Full-Width Strips ── */}
      <section id="blog" className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <RevealGroup>
            <SectionHeader title={t("blog.title")} sectionId="blog" />
          </RevealGroup>
        </div>
        <RevealGroup>
          <div className="mx-auto max-w-5xl px-6 flex flex-col">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group relative flex items-center justify-between gap-4 border-b border-border-subtle py-6 transition-all duration-200 hover:bg-bg-surface/30"
              >
                <div className="flex items-center gap-4">
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
            <div className="mt-4">
              <Link href="/blog" className="inline-block font-display text-sm text-text-tertiary transition-colors hover:text-accent">
                {t("blog.allPosts")}
              </Link>
            </div>
          </div>
        </RevealGroup>
      </section>

      {/* ── Resume — 2x2 Bento ── */}
      <section id="resume" className="mx-auto max-w-5xl px-6 py-24">
        <RevealGroup>
          <SectionHeader title={t("resume.title")} sectionId="resume" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: t("resume.education"), value: t("resume.education.value") },
              { label: t("resume.experience"), value: t("resume.experience.value") },
              { label: t("resume.awards"), value: t("resume.awards.value") },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-border-subtle bg-bg-elevated p-5">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.05em] text-text-tertiary mb-2">
                  {item.label}
                </h3>
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
