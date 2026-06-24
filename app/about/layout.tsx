import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Ed Gracia — Software Engineering student at the University of Miami with a focus on systems programming, graphics, and C++.",
  openGraph: {
    title: "About Ed Gracia",
    description:
      "Software Engineering student at the University of Miami with a focus on systems programming, graphics, and C++.",
    url: "https://edgracia.dev/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
