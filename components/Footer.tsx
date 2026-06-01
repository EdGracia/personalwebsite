import Link from "next/link";
import { FiGithub, FiMail } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";

const links = [
  { href: "https://github.com/EdGracia", icon: FiGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/eduardo-ed-gracia/", icon: FaLinkedinIn, label: "LinkedIn" },
  { href: "mailto:Exg2332@miami.edu", icon: FiMail, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-zinc-100 dark:border-zinc-800">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          © {new Date().getFullYear()} Ed Gracia
        </p>
        <div className="flex items-center gap-4">
          {links.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-zinc-400 dark:text-zinc-600 transition-colors hover:text-emerald-500 dark:hover:text-emerald-400"
            >
              <Icon className="text-base" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
