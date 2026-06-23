"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import { LanguageContext, type Locale } from "@/lib/translations";

function getStoredLocale(): Locale {
  const stored = localStorage.getItem("locale");
  return stored === "es" ? "es" : "en";
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const initialLocale = useSyncExternalStore(
    () => () => {},
    getStoredLocale,
    () => "en" as Locale,
  );

  const [locale, setLocaleState] = useState<Locale>(initialLocale);

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
