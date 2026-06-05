import Link from "next/link";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import FadeIn from "@/components/FadeIn";

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

      <FadeIn>
        <p className="text-sm text-emerald-500 dark:text-emerald-400">/* projects */</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Projects</h1>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400">
          Things I&apos;ve built or am currently building.
        </p>
      </FadeIn>

      <div className="mt-12 flex flex-col gap-6">
        {projects.map((project) => (
          <FadeIn key={project.title}>
            <div className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-zinc-900/50 hover:border-emerald-500 dark:hover:border-emerald-400">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</h2>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      project.status === "In Progress"
                        ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} on GitHub`}
                  className="flex shrink-0 items-center gap-1 text-sm text-zinc-400 transition-colors duration-150 hover:text-emerald-500 dark:hover:text-emerald-400"
                >
                  <FiGithub className="text-base" />
                  <FiArrowUpRight className="text-xs" />
                </Link>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </main>
  );
}
