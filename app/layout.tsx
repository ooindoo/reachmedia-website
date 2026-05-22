import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";
import ChecklistPopup from "./components/ChecklistPopup";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reach Media | Email Marketing e Klaviyo per E-commerce Premium",
  description:
    "Reach Media costruisce sistemi Klaviyo per e-commerce premium italiani. Dalla strategia alla deliverability.",
  keywords: [
    "email marketing",
    "Klaviyo",
    "Shopify",
    "e-commerce",
    "marketing automation",
    "consulenza email",
  ],
  openGraph: {
    title: "Reach Media | Email Marketing e Klaviyo per E-commerce Premium",
    description:
      "Sistemi Klaviyo e email marketing per e-commerce premium italiani.",
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${inter.variable} ${bebas.variable}`}>
      <body className="font-sans">
        {children}
        <CookieBanner />
        <ChecklistPopup />
      </body>
    </html>
  );
}
