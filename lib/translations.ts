"use client";

import { createContext, useContext } from "react";

export type Locale = "en" | "es";

export const LanguageContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
}>({ locale: "en", setLocale: () => {} });

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.resume": "Resume",
  },
  es: {
    // Nav
    "nav.about": "Sobre mí",
    "nav.projects": "Proyectos",
    "nav.blog": "Blog",
    "nav.resume": "Currículum",
  },
};

export function useTranslation() {
  const { locale, setLocale } = useContext(LanguageContext);
  const t = (key: string): string => translations[locale][key] ?? key;
  return { t, locale, setLocale };
}
