"use client";

import { useState, useEffect, useCallback } from "react";
import { LanguageContext, type Locale } from "@/lib/translations";

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem("locale");
    if (stored === "en" || stored === "es") {
      setLocaleState(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
    document.documentElement.lang = l;
  }, []);

  return (
    <LanguageContext value={{ locale, setLocale }}>
      {children}
    </LanguageContext>
  );
}
