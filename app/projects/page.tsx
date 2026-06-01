import Link from "next/link";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";

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
    <main className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      <p className="mt-3 text-zinc-500">
        Things I&apos;ve built or am currently building.
      </p>

      <div className="mt-12 flex flex-col gap-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group rounded-2xl border border-zinc-200 p-6 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="font-semibold text-zinc-900">{project.title}</h2>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    project.status === "In Progress"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-zinc-900"
              >
                <FiGithub className="text-base" />
                <FiArrowUpRight className="text-xs" />
              </Link>
            </div>

            {/* Description */}
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              {project.description}
            </p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
