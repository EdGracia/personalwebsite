"use client";

import RevealGroup from "@/components/RevealGroup";
import { useTranslation } from "@/lib/translations";

export default function About() {
  const { t } = useTranslation();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-24">
      <RevealGroup>
        <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary">{t("aboutPage.title")}</h1>

        <p className="mt-8 max-w-2xl font-body leading-relaxed text-text-secondary">
          {t("aboutPage.bio1")}
        </p>
        <p className="mt-4 max-w-2xl font-body leading-relaxed text-text-secondary">
          {t("aboutPage.bio2")}
        </p>
      </RevealGroup>

      <div className="mt-16 border-t border-border-subtle" />

      <RevealGroup className="mt-12">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.05em] text-text-tertiary mb-6">{t("aboutPage.currently")}</h2>
        <div className="flex flex-col gap-5">
          {[
            { label: t("aboutPage.building.label"), value: t("aboutPage.building.value") },
            { label: t("aboutPage.studying.label"), value: t("aboutPage.studying.value") },
            { label: t("aboutPage.based.label"), value: t("aboutPage.based.value") },
          ].map((item) => (
            <div key={item.label} className="flex gap-6">
              <span className="w-20 shrink-0 font-mono text-[11px] uppercase tracking-[0.05em] text-text-tertiary pt-0.5">
                {item.label}
              </span>
              <span className="font-body text-sm leading-relaxed text-text-secondary">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </RevealGroup>
    </main>
  );
}
