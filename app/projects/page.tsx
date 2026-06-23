import Link from "next/link";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import RevealGroup from "@/components/RevealGroup";
import StatusBadge from "@/components/StatusBadge";

const projects = [
  {
    title: "3D Game Engine",
    description:
      "A from-scratch 3D engine built in C++ using raylib. Handles rendering, scene management, and serves as the foundation for an original game. Actively in development.",
    tags: ["C++", "raylib", "Graphics", "Systems"],
    status: "In Progress",
    github: "https://github.com/EdGracia/Sandbox",
  },
  {
    title: "2D Platformer",
    description:
      "A 2D platformer built in C++ with raylib. Custom physics, collision detection, and sprite handling — written without a game framework to stay close to the metal.",
    tags: ["C++", "raylib", "Game Dev"],
    status: "Incomplete",
    github: "https://github.com/EdGracia/Platformer",
  },
];

export default function Projects() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-24">
      <RevealGroup>
        <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary">Projects</h1>
        <p className="mt-3 font-body text-text-secondary">
          Things I&apos;ve built or am currently building.
        </p>
      </RevealGroup>

      <div className="mt-12 flex flex-col gap-6">
        {projects.map((project) => (
          <RevealGroup key={project.title}>
            <div className="group relative overflow-hidden rounded-xl border border-border-subtle bg-bg-elevated p-6 transition-all duration-300 hover:border-border-active hover:shadow-lg hover:shadow-accent-glow">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent origin-top transition-transform duration-300 scale-y-0 group-hover:scale-y-100" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent-glow to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-lg font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent">{project.title}</h2>
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

                <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
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
