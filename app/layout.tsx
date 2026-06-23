import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AmbientField from "@/components/AmbientField";
import PageTransition from "@/components/PageTransition";
import ThemeProvider from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Ed Gracia",
  description: "Software engineer, student, and builder.",
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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-bg-deep text-text-primary" suppressHydrationWarning>
        <ThemeProvider>
          <AmbientField />
          <div className="relative z-10 flex flex-1 flex-col">
            <Navbar />
            <PageTransition>
              {children}
            </PageTransition>
            <Footer />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
