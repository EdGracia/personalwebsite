"use client";

import Link from "next/link";
import { FiGithub, FiArrowUpRight, FiGlobe } from "react-icons/fi";
import RevealGroup from "@/components/RevealGroup";
import StatusBadge from "@/components/StatusBadge";
import { useTranslation } from "@/lib/translations";

export default function Projects() {
  const { t } = useTranslation();

  const projects = [
    {
      title: t("projectsPage.ensel.title"),
      description: t("projectsPage.ensel.description"),
      tags: ["Next.js", "React", "TypeScript", "Vercel"],
      status: t("projects.status.complete"),
      link: "https://enseltech.com",
    },
    {
      title: t("projectsPage.engine.title"),
      description: t("projectsPage.engine.description"),
      tags: ["C++", "raylib", "Graphics", "Systems"],
      status: t("projects.status.inProgress"),
      github: "https://github.com/EdGracia/Sandbox",
    },
    {
      title: t("projectsPage.platformer.title"),
      description: t("projectsPage.platformer.description"),
      tags: ["C++", "raylib", "Game Dev"],
      status: t("projects.status.incomplete"),
      github: "https://github.com/EdGracia/Platformer",
    },
  ];

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-24">
      <RevealGroup>
        <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary">{t("projectsPage.title")}</h1>
        <p className="mt-3 font-body text-text-secondary">
          {t("projectsPage.subtitle")}
        </p>
      </RevealGroup>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <RevealGroup key={project.title}>
            <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border-subtle bg-bg-elevated p-8 transition-all duration-300 hover:border-border-active hover:shadow-lg hover:shadow-accent-glow">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent origin-top transition-transform duration-300 scale-y-0 group-hover:scale-y-100" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent-glow to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-xl font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent">{project.title}</h2>
                    <StatusBadge status={project.status} />
                  </div>
                  <Link
                    href={project.github ?? project.link!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={project.github ? `${project.title} on GitHub` : `${project.title} website`}
                    className="flex shrink-0 items-center gap-1 text-sm text-text-tertiary transition-all duration-200 hover:text-accent"
                  >
                    {project.github ? <FiGithub className="text-lg" /> : <FiGlobe className="text-lg" />}
                    <FiArrowUpRight className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>

                <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-text-secondary">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-bg-surface px-3 py-1 font-mono text-[11px] font-medium text-text-tertiary transition-colors duration-200 group-hover:bg-bg-surface/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RevealGroup>
        ))}
      </div>
    </main>
  );
}
