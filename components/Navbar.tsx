"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

const links = [
  { href: "/#about", label: "About", id: "about" },
  { href: "/#projects", label: "Projects", id: "projects" },
  { href: "/#blog", label: "Blog", id: "blog" },
  { href: "/#resume", label: "Resume", id: "resume" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeId, setActiveId] = useState("");
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isHome) return;
    const observers: IntersectionObserver[] = [];
    links.forEach(({ id }) => {
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
    if (isHome) return activeId === link.id;
    return pathname === link.href;
  };

  return (
    <header className="sticky top-0 z-20 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
          Ed Gracia
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm transition-colors hover:text-emerald-500 dark:hover:text-emerald-400 ${
                    isActive(link) ? "font-medium text-emerald-500 dark:text-emerald-400" : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="text-zinc-400 dark:text-zinc-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <FiSun className="text-base" /> : <FiMoon className="text-base" />}
            </button>
          )}
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="text-zinc-400 hover:text-emerald-500 transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <FiSun className="text-base" /> : <FiMoon className="text-base" />}
            </button>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-zinc-400 hover:text-emerald-500 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX className="text-base" /> : <FiMenu className="text-base" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-t border-zinc-100 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm transition-colors hover:text-emerald-500 dark:hover:text-emerald-400 ${
                isActive(link) ? "font-medium text-emerald-500 dark:text-emerald-400" : "text-zinc-500 dark:text-zinc-400"
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
