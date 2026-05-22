import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reach Media — Email Marketing & Shopify per Brand Premium",
  description:
    "Consulenza freelance specializzata in email marketing, Klaviyo automation e sviluppo Shopify per brand premium e luxury. Dal 2023.",
  keywords: [
    "email marketing",
    "Klaviyo",
    "Shopify",
    "consulenza e-commerce",
    "luxury brand",
    "marketing automation",
  ],
  openGraph: {
    title: "Reach Media — Email Marketing & Shopify per Brand Premium",
    description:
      "Consulenza freelance specializzata in email marketing, Klaviyo automation e sviluppo Shopify per brand premium e luxury.",
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
