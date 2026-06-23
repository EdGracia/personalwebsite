"use client";

import Link from "next/link";
import { FiGithub, FiMail } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/translations";

const socialLinks = [
  { href: "https://github.com/EdGracia", icon: FiGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/eduardo-ed-gracia/", icon: FaLinkedinIn, label: "LinkedIn" },
  { href: "mailto:Exg2332@miami.edu", icon: FiMail, label: "Email" },
];

export default function Footer() {
  const { locale, setLocale } = useTranslation();
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="mt-auto w-full border-t border-border-subtle">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-6">
          <p className="font-mono text-[11px] tracking-wide text-text-tertiary">
            © {new Date().getFullYear()} Ed Gracia
          </p>
          <span className="hidden sm:inline font-mono text-[11px] tracking-wide text-text-tertiary">
            25.7617°N, 80.1918°W
          </span>
          {time && (
            <span className="hidden sm:inline font-mono text-[11px] tracking-wide text-text-tertiary">
              MIA {time}
            </span>
          )}
          <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] tracking-wide">
            <button
              onClick={() => setLocale("en")}
              className={`transition-colors ${
                locale === "en"
                  ? "text-accent font-medium"
                  : "text-text-tertiary hover:text-text-secondary"
              }`}
            >
              EN
            </button>
            <span className="text-text-tertiary">/</span>
            <button
              onClick={() => setLocale("es")}
              className={`transition-colors ${
                locale === "es"
                  ? "text-accent font-medium"
                  : "text-text-tertiary hover:text-text-secondary"
              }`}
            >
              ES
            </button>
          </span>
        </div>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-text-tertiary transition-colors hover:text-accent"
            >
              <Icon className="text-base" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
