import Link from "next/link";
import Typewriter from "@/components/Typewriter";
import {
  SiCplusplus,
  SiC,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiGit,
  SiLinux,
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

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24">

      {/* Hero */}
      <div className="flex flex-col gap-4">
        <p className="text-sm font-medium tracking-widest text-zinc-400 uppercase">
          Software Engineer
        </p>
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

      {/* CTAs */}
      <div className="mt-10 flex items-center gap-4">
        <Link
          href="/projects"
          className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
        >
          View Projects
        </Link>
        <Link
          href="/about"
          className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          About me →
        </Link>
      </div>

      {/* Divider */}
      <div className="mt-20 border-t border-zinc-100" />

      {/* Skills */}
      <div className="mt-12">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
          Skills
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          {skills.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-600"
            >
              <Icon className="text-base text-zinc-500" />
              {label}
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}
