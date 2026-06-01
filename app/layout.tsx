import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DotGrid from "@/components/DotGrid";
import PageTransition from "@/components/PageTransition";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Ed Gracia",
  description: "Software engineer, student, and builder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <DotGrid />
        <div className="relative z-10 flex flex-1 flex-col">
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </div>
      </body>
    </html>
  );
}
