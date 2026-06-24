"use client";

import { useTranslation } from "@/lib/translations";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.05em] text-accent whitespace-nowrap">
        {children}
      </p>
      <div className="h-px flex-1 bg-border-subtle" />
    </div>
  );
}

export default function Resume() {
  const { t } = useTranslation();

  const education = [
    {
      degree: t("resumePage.edu.degree"),
      school: "University of Miami",
      date: t("resumePage.edu.date"),
      notes: [t("resumePage.edu.note")],
    },
  ];

  const experience = [
    {
      title: t("resumePage.exp1.title"),
      org: "Ensel Technologies LLC",
      date: t("resumePage.exp1.date"),
      bullets: [t("resumePage.exp1.bullet1")],
    },
    {
      title: t("resumePage.exp2.title"),
      org: "Loomis Chaffee ESG Investment Fund",
      date: t("resumePage.exp2.date"),
      bullets: [t("resumePage.exp2.bullet1"), t("resumePage.exp2.bullet2")],
    },
  ];

  const projects = [
    {
      title: t("resumePage.proj1.title"),
      tech: "C++, raylib",
      bullets: [t("resumePage.proj1.bullet1"), t("resumePage.proj1.bullet2")],
    },
    {
      title: t("resumePage.proj2.title"),
      tech: "C++, raylib",
      bullets: [t("resumePage.proj2.bullet1"), t("resumePage.proj2.bullet2")],
    },
  ];

  const skills = {
    [t("capabilities.languages")]: ["C++", "Python", "Java", "JavaScript", "TypeScript"],
    [t("capabilities.tools")]: ["Git", "GitHub", "Makefiles", "raylib", "React", "Next.js"],
  };

  const coursework = [
    "ECE 218: Data Structures (C++)",
    "ECE 118: Introduction to Programming (C++)",
    "ENG 123: Computing and Digital Solutions (Python)",
  ];

  const awards = [
    {
      title: t("resumePage.award1.title"),
      org: "University of Miami",
      date: t("resumePage.award1.date"),
      detail: t("resumePage.award1.detail"),
    },
    {
      title: t("resumePage.award2.title"),
      org: "The Loomis Chaffee School",
      date: t("resumePage.award2.date"),
      detail: t("resumePage.award2.detail"),
    },
  ];

  return (
    <main className="relative z-[2] mx-auto w-full max-w-3xl px-6 py-24">
      <div className="absolute -inset-x-24 inset-y-0 bg-bg-base -z-10" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }} />

      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary">Eduardo Gracia Panini</h1>
          <p className="mt-1 font-body text-text-secondary">{t("resumePage.subtitle")}</p>
        </div>
        <div className="text-right font-mono text-[11px] text-text-tertiary">
          <p>exg2332@miami.edu</p>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-12">

        <section>
          <SectionHeading>{t("resumePage.education")}</SectionHeading>
          {education.map((e) => (
            <div key={e.degree} className="flex justify-between gap-4">
              <div>
                <p className="font-display font-medium text-text-primary">{e.degree}</p>
                <p className="font-body text-sm text-text-secondary">{e.school}</p>
                {e.notes.map((n) => (
                  <p key={n} className="mt-1 font-body text-sm text-text-tertiary">{n}</p>
                ))}
              </div>
              <p className="shrink-0 font-mono text-[11px] text-text-tertiary">{e.date}</p>
            </div>
          ))}
        </section>

        <section>
          <SectionHeading>{t("resumePage.experience")}</SectionHeading>
          <div className="flex flex-col gap-6">
            {experience.map((e) => (
              <div key={e.title}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display font-medium text-text-primary">{e.title}</p>
                  <p className="shrink-0 font-mono text-[11px] text-text-tertiary">{e.date}</p>
                </div>
                <p className="font-body text-sm text-text-secondary">{e.org}</p>
                <ul className="mt-2 flex flex-col gap-1">
                  {e.bullets.map((b) => (
                    <li key={b} className="font-body text-sm text-text-secondary pl-4 relative before:absolute before:left-1 before:content-['–']">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading>{t("resumePage.projects")}</SectionHeading>
          <div className="flex flex-col gap-6">
            {projects.map((p) => (
              <div key={p.title}>
                <div className="flex items-baseline gap-2">
                  <p className="font-display font-medium text-text-primary">{p.title}</p>
                  <p className="font-mono text-[11px] text-text-tertiary">{p.tech}</p>
                </div>
                <ul className="mt-2 flex flex-col gap-1">
                  {p.bullets.map((b) => (
                    <li key={b} className="font-body text-sm text-text-secondary pl-4 relative before:absolute before:left-1 before:content-['–']">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading>{t("resumePage.skills")}</SectionHeading>
          <div className="flex flex-col gap-3">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="flex gap-8">
                <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-[0.05em] text-text-tertiary">{category}</span>
                <span className="font-body text-sm text-text-secondary">{items.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading>{t("resumePage.coursework")}</SectionHeading>
          <div className="flex flex-col gap-1">
            {coursework.map((c) => (
              <p key={c} className="font-body text-sm text-text-secondary">{c}</p>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading>{t("resumePage.awards")}</SectionHeading>
          <div className="flex flex-col gap-4">
            {awards.map((a) => (
              <div key={a.title} className="flex justify-between gap-4">
                <div>
                  <p className="font-display font-medium text-text-primary">{a.title}</p>
                  <p className="font-body text-sm text-text-secondary">{a.org}</p>
                  <p className="mt-1 font-body text-sm text-text-tertiary">{a.detail}</p>
                </div>
                <p className="shrink-0 font-mono text-[11px] text-text-tertiary">{a.date}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
