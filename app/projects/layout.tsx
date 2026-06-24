import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Ed Gracia's software engineering projects — web apps, systems tools, and more built with Next.js, React, TypeScript, and C++.",
  openGraph: {
    title: "Projects — Ed Gracia",
    description:
      "Software engineering projects built with Next.js, React, TypeScript, and C++.",
    url: "https://edgracia.dev/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
