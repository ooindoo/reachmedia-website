import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reach Media — Email Marketing e Klaviyo per E-commerce Premium",
  description:
    "Reach Media costruisce sistemi Klaviyo che trasformano la lista email in un canale di revenue prevedibile. Per brand e-commerce con prodotti che meritano.",
  keywords: [
    "email marketing",
    "Klaviyo",
    "Shopify",
    "e-commerce",
    "marketing automation",
    "consulenza email",
  ],
  openGraph: {
    title: "Reach Media — Email Marketing e Klaviyo per E-commerce Premium",
    description:
      "Sistemi Klaviyo e email marketing per brand e-commerce italiani con prodotti premium.",
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
    <html lang="it" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
