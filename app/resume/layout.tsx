import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Ed Gracia's resume — Software Engineering student at the University of Miami. Skills, experience, and education.",
  openGraph: {
    title: "Resume — Ed Gracia",
    description:
      "Software Engineering student at the University of Miami. Skills, experience, and education.",
    url: "https://edgracia.dev/resume",
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
