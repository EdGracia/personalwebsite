import Link from "next/link";
import Image from "next/image";
import Typewriter from "@/components/Typewriter";
import { getAllPosts } from "@/lib/posts";
import { FiGithub, FiArrowUpRight, FiMail } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
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
            />
            <p className="text-sm font-medium tracking-widest text-zinc-400 uppercase">
              Software Engineer
            </p>
            <div className="flex items-center gap-3">
              <Link href="https://github.com/EdGracia" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 transition-colors"><FiGithub /></Link>
              <Link href="https://www.linkedin.com/in/eduardo-ed-gracia/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 transition-colors"><FaLinkedinIn /></Link>
              <Link href="mailto:Exg2332@miami.edu" className="text-zinc-400 hover:text-zinc-900 transition-colors"><FiMail /></Link>
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-zinc-900">
            <Typewriter text="Ed Gracia" />
          </h1>
          <p className="max-w-xl text-xl leading-relaxed text-zinc-500">
            <Typewriter
              text="I build things close to the metal — systems, graphics, and tools designed to reach a lot of people."
              delay={800}
              speed={30}
            />
          </p>
        </div>
        <div className="mt-10 flex items-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
          >
            View Projects
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            About me →
          </a>
        </div>
        <div className="mt-20 border-t border-zinc-100" />
        <div className="mt-12">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">Skills</p>
          <div className="mt-6 flex flex-wrap gap-4">
            {skills.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-600">
                <Icon className="text-base text-zinc-500" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-14 border-t border-zinc-100">
        <h2 className="text-3xl font-bold tracking-tight">About</h2>
        <p className="mt-6 max-w-xl leading-relaxed text-zinc-500">
          I&apos;m a Software Engineering student at the University of Miami,
          originally from Houston, Texas. I care about building things at the
          lowest level possible — where performance is a craft, not an afterthought.
        </p>
        <p className="mt-4 max-w-xl leading-relaxed text-zinc-500">
          I speak English and Spanish natively, which has shaped how I think
          about communication in code as much as in conversation.
        </p>
        <div className="mt-12 border-t border-zinc-100" />
        <div className="mt-10">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">Currently</p>
          <div className="mt-6 flex flex-col gap-6">
            {[
              { label: "Building", value: "A 3D game engine from scratch — the foundation for a game I'm designing." },
              { label: "Studying", value: "B.S. Software Engineering, University of Miami" },
              { label: "Based in", value: "Miami, FL (from Houston, TX)" },
            ].map((item) => (
              <div key={item.label} className="flex gap-8">
                <span className="w-20 shrink-0 text-sm font-medium text-zinc-900">{item.label}</span>
                <span className="text-sm leading-relaxed text-zinc-500">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-14 border-t border-zinc-100">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <p className="mt-3 text-zinc-500">Things I&apos;ve built or am currently building.</p>
        <div className="mt-12 flex flex-col gap-6">
          {projects.map((project) => (
            <div key={project.title} className="group rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-300 hover:bg-zinc-50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-zinc-900">{project.title}</h3>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${project.status === "In Progress" ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-500"}`}>
                    {project.status}
                  </span>
                </div>
                <Link href={project.github} target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-zinc-900">
                  <FiGithub className="text-base" />
                  <FiArrowUpRight className="text-xs" />
                </Link>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Blog ── */}
      <section id="blog" className="py-14 border-t border-zinc-100">
        <h2 className="text-3xl font-bold tracking-tight">Blog</h2>
        <p className="mt-3 text-zinc-500">Thoughts on systems, graphics, and building things.</p>
        <div className="mt-12 flex flex-col gap-4">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-2xl border border-zinc-200 bg-white p-6 flex items-center justify-between hover:border-zinc-300 hover:bg-zinc-50 transition-colors"
            >
              <div>
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{post.date}</p>
                <p className="mt-1 font-medium text-zinc-900">{post.title}</p>
                <p className="mt-1 text-sm text-zinc-500">{post.summary}</p>
              </div>
              <FiArrowUpRight className="shrink-0 text-zinc-400 ml-4" />
            </Link>
          ))}
          <Link href="/blog" className="mt-2 inline-block text-sm text-zinc-400 hover:text-zinc-900 transition-colors">
            All posts →
          </Link>
        </div>
      </section>

      {/* ── Resume ── */}
      <section id="resume" className="py-14 border-t border-zinc-100">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Resume</h2>
          <Link href="/resume" className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors">
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
              <span className="w-28 shrink-0 text-sm font-medium text-zinc-900">{item.label}</span>
              <span className="text-sm leading-relaxed text-zinc-500">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
