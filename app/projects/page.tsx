"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiGithub, FiArrowUpRight, FiGlobe, FiX } from "react-icons/fi";
import StatusBadge from "@/components/StatusBadge";
import { useTranslation } from "@/lib/translations";

function ProjectsContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState<string | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!expanded) return;
      for (const el of cardRefs.current.values()) {
        if (el.contains(e.target as Node)) return;
      }
      setExpanded(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setExpanded(null);
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const projects = [
    {
      slug: "ensel",
      title: t("projectsPage.ensel.title"),
      description: t("projectsPage.ensel.description"),
      tags: ["Next.js", "React", "TypeScript", "Vercel"],
      status: t("projects.status.complete"),
      link: "https://enseltech.com",
      image: "/images/projects/ensel-preview.png",
    },
    {
      slug: "engine",
      title: t("projectsPage.engine.title"),
      description: t("projectsPage.engine.description"),
      tags: ["C++", "raylib", "Graphics", "Systems"],
      status: t("projects.status.inProgress"),
      github: "https://github.com/EdGracia/Sandbox",
      image: "/images/projects/sandbox-preview.png",
    },
    {
      slug: "platformer",
      title: t("projectsPage.platformer.title"),
      description: t("projectsPage.platformer.description"),
      tags: ["C++", "raylib", "Game Dev"],
      status: t("projects.status.incomplete"),
      github: "https://github.com/EdGracia/Platformer",
      image: "/images/projects/platformer-preview.png",
    },
  ];

  useEffect(() => {
    const expandSlug = searchParams.get("expand");
    if (expandSlug) {
      const match = projects.find((p) => p.slug === expandSlug);
      if (match) {
        setExpanded(match.title);
        const el = cardRefs.current.get(match.title);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-24">
      <h1 className="relative inline-block font-display text-4xl font-bold tracking-tight text-text-primary">
        {t("projectsPage.title")}
        <span className="absolute -bottom-1 left-0 h-px bg-accent animate-[underlineIn_0.5s_ease-out_0.5s_forwards] w-0" />
      </h1>
      <p className="mt-3 font-body text-text-secondary">
        {t("projectsPage.subtitle")}
      </p>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const isExpanded = expanded === project.title;
          const href = project.github ?? project.link!;
          const isGithub = !!project.github;

          return (
            <div
              key={project.title}
              ref={(el) => { if (el) cardRefs.current.set(project.title, el); }}
              onClick={() => !isExpanded && setExpanded(project.title)}
              className={`group relative flex flex-col overflow-hidden rounded-xl border bg-bg-elevated transition-all duration-300 ${
                isExpanded
                  ? "border-accent shadow-lg shadow-accent-glow/50 col-span-1 sm:col-span-2"
                  : "border-border-subtle hover:border-border-active hover:shadow-lg hover:shadow-accent-glow/50 hover:-translate-y-0.5 cursor-pointer"
              }`}
            >
              <button
                onClick={(e) => { e.stopPropagation(); setExpanded(null); }}
                className={`absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-bg-surface/80 text-text-tertiary backdrop-blur-sm transition-all duration-200 hover:bg-bg-surface hover:text-text-primary ${
                  isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
                }`}
                aria-label="Close"
              >
                <FiX className="text-sm" />
              </button>

              <div className={`relative w-full overflow-hidden bg-bg-surface transition-all duration-300 ${
                isExpanded ? "aspect-[2/1]" : "aspect-[16/9]"
              }`}>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    className={`object-cover object-top transition-transform duration-500 ${
                      !isExpanded ? "group-hover:scale-105" : ""
                    }`}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    {isGithub ? <FiGithub className="text-2xl text-text-tertiary/40" /> : <FiGlobe className="text-2xl text-text-tertiary/40" />}
                  </div>
                )}
              </div>

              <div className={`flex flex-1 flex-col transition-all duration-300 ${
                isExpanded ? "p-6" : "p-4"
              }`}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h2 className={`font-display font-semibold text-text-primary transition-all duration-200 ${
                      isExpanded ? "text-lg" : "text-sm group-hover:text-accent"
                    }`}>{project.title}</h2>
                    <StatusBadge status={project.status} />
                  </div>
                  {!isExpanded && (
                    <FiArrowUpRight className="shrink-0 text-sm text-text-tertiary transition-all duration-200 opacity-0 group-hover:opacity-100" />
                  )}
                </div>

                <p className={`mt-2 font-body leading-relaxed text-text-secondary transition-all duration-300 ${
                  isExpanded ? "text-sm" : "text-xs line-clamp-2"
                }`}>{project.description}</p>

                <div className={`flex flex-wrap gap-1.5 ${isExpanded ? "mt-4" : "mt-auto pt-3"}`}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-bg-surface px-2 py-0.5 font-mono text-[10px] font-medium text-text-tertiary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={`overflow-hidden transition-all duration-300 ease-out ${
                  isExpanded ? "mt-5 max-h-20 opacity-100" : "mt-0 max-h-0 opacity-0"
                }`}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    tabIndex={isExpanded ? 0 : -1}
                    className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-display text-sm font-medium text-white transition-all duration-200 hover:brightness-110"
                  >
                    {isGithub ? <FiGithub className="text-sm" /> : <FiGlobe className="text-sm" />}
                    {isGithub ? "View on GitHub" : "Visit Site"}
                    <FiArrowUpRight className="text-xs" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default function Projects() {
  return (
    <Suspense>
      <ProjectsContent />
    </Suspense>
  );
}
