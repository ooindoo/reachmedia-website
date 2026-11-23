import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

// Trial pages: never indexed, never linked from the live site.
export const metadata: Metadata = {
  title: "Redesign di prova",
  robots: { index: false, follow: false },
};

export default function RedesignLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${geist.variable} ${geistMono.variable}`}>{children}</div>;
}
