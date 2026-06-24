"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useTranslation } from "@/lib/translations";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeId, setActiveId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const links = [
    { href: "/#about", label: t("nav.about"), id: "about" },
    { href: "/projects", label: t("nav.projects"), id: "projects" },
    { href: "/blog", label: t("nav.blog"), id: "blog" },
    { href: "/resume", label: t("nav.resume"), id: "resume" },
  ];

  useEffect(() => {
    if (!isHome) return;
    const sectionIds = ["about", "projects", "blog", "resume"];
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  const isActive = (link: (typeof links)[0]) => {
    if (!link.href.startsWith("/#") && pathname.startsWith(link.href)) return true;
    if (isHome) return activeId === link.id;
    return false;
  };

  return (
    <header className="sticky top-0 z-20 w-full border-b border-border-subtle bg-bg-deep/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-sm font-semibold tracking-tight text-text-primary transition-colors hover:text-accent">
          Ed Gracia
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative font-display text-sm transition-colors hover:text-accent ${
                    isActive(link)
                      ? "font-medium text-text-primary"
                      : "text-text-secondary"
                  }`}
                >
                  {link.label}
                  {isActive(link) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex sm:hidden items-center gap-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-text-tertiary transition-colors hover:text-text-primary"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX className="text-base" /> : <FiMenu className="text-base" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="sm:hidden border-t border-border-subtle bg-bg-deep/95 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-display text-sm transition-colors hover:text-accent ${
                isActive(link) ? "font-medium text-text-primary" : "text-text-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
