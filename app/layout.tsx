import type { Metadata } from "next";
import { Instrument_Sans, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParallaxLayer from "@/components/ParallaxLayer";
import AmbientField from "@/components/AmbientField";
import SandField from "@/components/SandField";
import SpiceCursor from "@/components/SpiceCursor";
import { SandInteractionProvider } from "@/components/SandInteractionContext";
import ScrollEngine from "@/components/ScrollEngine";
import PageTransition from "@/components/PageTransition";
import LanguageProvider from "@/components/LanguageProvider";
import { Analytics } from "@vercel/analytics/next";

const instrumentSans = Instrument_Sans({ subsets: ["latin"], variable: "--font-display" });
const geist = Geist({ subsets: ["latin"], variable: "--font-body" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://edgracia.dev"),
  title: {
    default: "Ed Gracia — Software Engineer",
    template: "%s | Ed Gracia",
  },
  description:
    "Software Engineering student at the University of Miami specializing in systems programming, graphics, and C++. Explore projects, blog posts, and resume.",
  keywords: [
    "Ed Gracia",
    "software engineer",
    "portfolio",
    "University of Miami",
    "C++",
    "systems programming",
    "graphics",
    "Next.js",
    "React",
    "TypeScript",
  ],
  authors: [{ name: "Ed Gracia", url: "https://edgracia.dev" }],
  creator: "Ed Gracia",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://edgracia.dev",
    siteName: "Ed Gracia",
    title: "Ed Gracia — Software Engineer",
    description:
      "Software Engineering student at the University of Miami specializing in systems programming, graphics, and C++.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ed Gracia — Software Engineer",
    description:
      "Software Engineering student at the University of Miami specializing in systems programming, graphics, and C++.",
  },
  verification: {
    google: "tfEojaryUZcDOgvXxdeD0kzK3hV5AcbM9M0s6AO1_-4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${geist.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-bg-deep text-text-primary">
          <LanguageProvider>
            <SandInteractionProvider>
              <ParallaxLayer />
              <AmbientField />
              <SandField />
              <SpiceCursor />
              <ScrollEngine />
              <div className="relative z-10 flex flex-1 flex-col">
                <Navbar />
                <PageTransition>
                  {children}
                </PageTransition>
                <Footer />
              </div>
            </SandInteractionProvider>
          </LanguageProvider>
          <Analytics />
      </body>
    </html>
  );
}
