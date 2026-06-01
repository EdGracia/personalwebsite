import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import FadeIn from "@/components/FadeIn";
import GitHubGraph from "@/components/GitHubGraph";
import { FiGithub, FiArrowUpRight, FiMail } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { getAllPosts } from "@/lib/posts";
import {
  SiCplusplus, SiC, SiPython, SiJavascript,
  SiTypescript, SiReact, SiGit, SiLinux,
} from "react-icons/si";

const skills = [
  { icon: SiCplusplus, label: "C++" },
  { icon: SiC, label: "C" },
  { icon: SiPython, label: "Python" },
  { icon: SiJavascript, label: "JavaScript" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiReact, label: "React" },
  { icon: SiGit, label: "Git" },
  { icon: SiLinux, label: "Linux" },
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
    <main className="mx-auto w-full max-w-3xl px-6">

      {/* ── Hero ── */}
      <section id="home" className="py-16">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/headshot.png"
              alt="Ed Gracia"
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover shrink-0"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
            <div className="flex flex-col gap-1.5">
              <p className="text-sm font-medium tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Software Engineer</p>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">Open to opportunities</span>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-2">
              <Link href="https://github.com/EdGracia" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"><FiGithub /></Link>
              <Link href="https://www.linkedin.com/in/eduardo-ed-gracia/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"><FaLinkedinIn /></Link>
              <Link href="mailto:Exg2332@miami.edu" className="text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"><FiMail /></Link>
            </div>
          </div>
          <Hero />
        </div>
        <div className="mt-10 flex items-center gap-4">
          <a href="#projects" className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-400">
            View Projects
          </a>
          <a href="#about" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
            About me →
          </a>
        </div>
        <div className="mt-20 border-t border-zinc-100 dark:border-zinc-800" />
        <div className="mt-12">
          <p className="text-sm text-emerald-500 dark:text-emerald-400">// skills</p>
          <div className="mt-6 flex flex-wrap gap-4">
            {skills.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:border-emerald-500 dark:hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <Icon className="text-base" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-14 border-t border-zinc-100 dark:border-zinc-800">
        <FadeIn>
          <p className="text-sm text-emerald-500 dark:text-emerald-400">/* about */</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">About</h2>
          <p className="mt-6 max-w-xl leading-relaxed text-zinc-500 dark:text-zinc-400">
            I&apos;m a Software Engineering student at the University of Miami,
            originally from Houston, Texas. I care about building things at the
            lowest level possible — where performance is a craft, not an afterthought.
          </p>
        </FadeIn>
        <div className="mt-12 border-t border-zinc-100 dark:border-zinc-800" />
        <FadeIn>
          <div className="mt-10">
            <p className="text-sm text-emerald-500 dark:text-emerald-400">// currently</p>
            <div className="mt-6 flex flex-col gap-6">
              {[
                { label: "Building", value: "A 3D game engine from scratch — the foundation for a game I'm designing." },
                { label: "Studying", value: "B.S. Software Engineering, University of Miami" },
                { label: "Based in", value: "Miami, FL (from Houston, TX)" },
              ].map((item) => (
                <div key={item.label} className="flex gap-8">
                  <span className="w-20 shrink-0 text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.label}</span>
                  <span className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{item.value}</span>
                </div>
              ))}
            </div>
            <GitHubGraph />
          </div>
        </FadeIn>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-14 border-t border-zinc-100 dark:border-zinc-800">
        <FadeIn>
          <p className="text-sm text-emerald-500 dark:text-emerald-400">/* projects */</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Projects</h2>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400">Things I&apos;ve built or am currently building.</p>
          <div className="mt-12 flex flex-col gap-6">
            {projects.map((project) => (
              <div key={project.title} className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 transition-all hover:-translate-y-1 hover:shadow-md hover:border-emerald-500 dark:hover:border-emerald-400">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{project.title}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${project.status === "In Progress" ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"}`}>
                      {project.status}
                    </span>
                  </div>
                  <Link href={project.github} target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-emerald-500 dark:hover:text-emerald-400">
                    <FiGithub className="text-base" />
                    <FiArrowUpRight className="text-xs" />
                  </Link>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Blog ── */}
      <section id="blog" className="py-14 border-t border-zinc-100 dark:border-zinc-800">
        <FadeIn>
          <p className="text-sm text-emerald-500 dark:text-emerald-400">/* blog */</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Blog</h2>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400">Thoughts on systems, graphics, and building things.</p>
          <div className="mt-12 flex flex-col gap-4">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex items-center justify-between transition-all hover:-translate-y-1 hover:shadow-md hover:border-emerald-500 dark:hover:border-emerald-400"
              >
                <div>
                  <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{post.date}</p>
                  <p className="mt-1 font-medium text-zinc-900 dark:text-zinc-100">{post.title}</p>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{post.summary}</p>
                </div>
                <FiArrowUpRight className="shrink-0 text-zinc-400 dark:text-zinc-600 ml-4" />
              </Link>
            ))}
            <Link href="/blog" className="mt-2 inline-block text-sm text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
              All posts →
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ── Resume ── */}
      <section id="resume" className="py-14 border-t border-zinc-100 dark:border-zinc-800">
        <FadeIn>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-500 dark:text-emerald-400">/* resume */</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Resume</h2>
            </div>
            <Link href="/resume" className="text-sm text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
              Full page →
            </Link>
          </div>
          <div className="mt-10 flex flex-col gap-6">
            {[
              { label: "Education", value: "B.S. Software Engineering, University of Miami — Expected May 2028" },
              { label: "Experience", value: "Engineering Intern at Ensel Technologies LLC (2024–2025)" },
              { label: "Awards", value: "Canes Achievement Award · Barry M. Moran Mathematics Award" },
            ].map((item) => (
              <div key={item.label} className="flex gap-8">
                <span className="w-28 shrink-0 text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.label}</span>
                <span className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{item.value}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

    </main>
  );
}
