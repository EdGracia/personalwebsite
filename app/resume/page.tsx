const education = [
  {
    degree: "B.S. Software Engineering",
    school: "University of Miami",
    date: "Expected May 2028",
    notes: ["Canes Achievement Award — $12,000/year merit scholarship"],
  },
];

const experience = [
  {
    title: "Summer Engineering Intern",
    org: "Ensel Technologies LLC",
    date: "May 2024 – July 2025",
    bullets: [
      "Assisted engineers in monitoring and maintaining factory production systems and machinery operations.",
    ],
  },
  {
    title: "President & Lead Analyst",
    org: "Loomis Chaffee ESG Investment Fund",
    date: "Sept 2022 – May 2023",
    bullets: [
      "Led a team of student researchers analyzing equities for a $150,000 investment portfolio.",
      "Presented investment recommendations to the board of trustees alongside the CFO.",
    ],
  },
];

const projects = [
  {
    title: "3D Game Engine",
    tech: "C++, raylib",
    bullets: [
      "Building a custom 3D engine from scratch as the foundation for an original game.",
      "Handles rendering, scene management, and core engine architecture.",
    ],
  },
  {
    title: "2D Platformer",
    tech: "C++, raylib",
    bullets: [
      "Built a custom 2D platformer with hand-rolled collision detection, camera systems, enemy AI, and player movement.",
      "Structured with OOP principles, header files, and Makefiles. Version controlled with Git.",
    ],
  },
];

const skills = {
  Languages: ["C++", "Python", "Java", "JavaScript", "TypeScript"],
  Tools: ["Git", "GitHub", "Makefiles", "raylib", "React", "Next.js"],
};

const coursework = [
  "ECE 218: Data Structures (C++)",
  "ECE 118: Introduction to Programming (C++)",
  "ENG 123: Computing and Digital Solutions (Python)",
];

const awards = [
  {
    title: "Canes Achievement Award",
    org: "University of Miami",
    date: "June 2024",
    detail: "$12,000/year for four years. Maintained 3.0 GPA with full-time course load.",
  },
  {
    title: "Barry M. Moran Mathematics Award",
    org: "The Loomis Chaffee School",
    date: "May 2024",
    detail: "Top of class in Mathematics for the 2023–2024 school year.",
  },
];

// Reusable section header
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 whitespace-nowrap">
        {children}
      </p>
      <div className="h-px flex-1 bg-zinc-100" />
    </div>
  );
}

export default function Resume() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Eduardo Gracia Panini</h1>
          <p className="mt-1 text-zinc-500">Software Engineering Student</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="text-right text-sm text-zinc-400">
            <p>Exg2332@miami.edu</p>
            <p>832-533-6990</p>
          </div>
          <a
            href="/resume.pdf"
            download
            className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-zinc-700"
          >
            Download PDF
          </a>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-12">

        {/* Education */}
        <section>
          <SectionHeading>Education</SectionHeading>
          {education.map((e) => (
            <div key={e.degree} className="flex justify-between gap-4">
              <div>
                <p className="font-medium text-zinc-900">{e.degree}</p>
                <p className="text-sm text-zinc-500">{e.school}</p>
                {e.notes.map((n) => (
                  <p key={n} className="mt-1 text-sm text-zinc-400">{n}</p>
                ))}
              </div>
              <p className="shrink-0 text-sm text-zinc-400">{e.date}</p>
            </div>
          ))}
        </section>

        {/* Experience */}
        <section>
          <SectionHeading>Experience</SectionHeading>
          <div className="flex flex-col gap-6">
            {experience.map((e) => (
              <div key={e.title}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-medium text-zinc-900">{e.title}</p>
                  <p className="shrink-0 text-sm text-zinc-400">{e.date}</p>
                </div>
                <p className="text-sm text-zinc-500">{e.org}</p>
                <ul className="mt-2 flex flex-col gap-1">
                  {e.bullets.map((b) => (
                    <li key={b} className="text-sm text-zinc-500 pl-4 relative before:absolute before:left-1 before:content-['–']">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <SectionHeading>Projects</SectionHeading>
          <div className="flex flex-col gap-6">
            {projects.map((p) => (
              <div key={p.title}>
                <div className="flex items-baseline gap-2">
                  <p className="font-medium text-zinc-900">{p.title}</p>
                  <p className="text-sm text-zinc-400">{p.tech}</p>
                </div>
                <ul className="mt-2 flex flex-col gap-1">
                  {p.bullets.map((b) => (
                    <li key={b} className="text-sm text-zinc-500 pl-4 relative before:absolute before:left-1 before:content-['–']">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <SectionHeading>Skills</SectionHeading>
          <div className="flex flex-col gap-3">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="flex gap-8">
                <span className="w-24 shrink-0 text-sm font-medium text-zinc-900">{category}</span>
                <span className="text-sm text-zinc-500">{items.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Coursework */}
        <section>
          <SectionHeading>Coursework</SectionHeading>
          <div className="flex flex-col gap-1">
            {coursework.map((c) => (
              <p key={c} className="text-sm text-zinc-500">{c}</p>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section>
          <SectionHeading>Awards</SectionHeading>
          <div className="flex flex-col gap-4">
            {awards.map((a) => (
              <div key={a.title} className="flex justify-between gap-4">
                <div>
                  <p className="font-medium text-zinc-900">{a.title}</p>
                  <p className="text-sm text-zinc-500">{a.org}</p>
                  <p className="mt-1 text-sm text-zinc-400">{a.detail}</p>
                </div>
                <p className="shrink-0 text-sm text-zinc-400">{a.date}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
