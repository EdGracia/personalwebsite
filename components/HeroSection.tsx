"use client";

import Link from "next/link";
import { FiGithub, FiMail, FiMapPin } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { useSyncExternalStore } from "react";
import Glyph from "./Glyph";
import { useTranslation } from "@/lib/translations";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function HeroSection() {
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { t } = useTranslation();

  const clipStyle = (delay: number): React.CSSProperties =>
    mounted
      ? {
          opacity: 0,
          animation: `clipReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms forwards`,
        }
      : {};

  const fadeStyle = (delay: number): React.CSSProperties =>
    mounted
      ? {
          opacity: 0,
          animation: `fadeIn 0.7s ease-out ${delay}ms forwards`,
        }
      : {};

  const socialLinks = [
    { href: "https://github.com/EdGracia", icon: FiGithub, label: "GitHub" },
    { href: "https://www.linkedin.com/in/eduardo-ed-gracia/", icon: FaLinkedinIn, label: "LinkedIn" },
    { href: "mailto:Exg2332@miami.edu", icon: FiMail, label: "Email" },
  ];

  return (
    <section id="home" className="relative flex min-h-[85vh] items-center py-24">
      <div className="absolute inset-x-0 top-0 -bottom-48 pointer-events-none" style={{
        background: "radial-gradient(ellipse 120% 80% at 50% 50%, rgba(26,111,181,0.18) 0%, rgba(26,111,181,0.06) 40%, transparent 70%)",
      }} />

      <div className="relative z-10 grid w-full grid-cols-1 gap-8 px-6 sm:grid-cols-[3fr_2fr] sm:items-center sm:gap-12 max-w-[90vw] mx-auto">
        <div>
          <div style={clipStyle(100)}>
            <h1
              className="font-display font-bold tracking-[-0.04em] text-text-primary leading-[0.9]"
              style={{
                fontSize: "clamp(4rem, 15vw, 12rem)",
                textShadow: "0 2px 30px var(--accent-glow)",
              }}
            >
              ED
            </h1>
          </div>
          <div style={clipStyle(250)}>
            <h1
              className="font-display font-bold tracking-[-0.04em] text-text-primary leading-[0.9]"
              style={{
                fontSize: "clamp(4rem, 15vw, 12rem)",
                textShadow: "0 2px 30px var(--accent-glow)",
              }}
            >
              GRACIA
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-8" style={fadeStyle(600)}>
          <div className="flex items-center gap-3 text-text-tertiary">
            <FiMapPin className="text-sm" />
            <span className="font-mono text-[11px] uppercase tracking-[0.05em]">
              Houston, TX / Miami, FL
            </span>
          </div>

          <p className="max-w-md font-body text-lg leading-relaxed text-text-secondary">
            {t("hero.bio")}
          </p>

          <div className="flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.05em] text-text-tertiary">
            <span>{t("hero.role")}</span>
            <span>{t("hero.focus")}</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, icon: Icon, label }, i) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-text-tertiary transition-all duration-200 hover:text-accent hover:-translate-y-0.5"
                style={fadeStyle(1000 + i * 100)}
              >
                <Icon className="text-lg" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={fadeStyle(1400)}
      >
        <div
          className="h-8 w-px bg-text-tertiary/40 origin-top"
          style={{ animation: "scrollLine 2s ease-in-out infinite" }}
        />
      </div>
    </section>
  );
}
