import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import SiteUI from "./components/SiteUI";
import GoogleAnalytics from "./components/GoogleAnalytics";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // Default — overridden per-page where needed
  title: {
    default: "Reach Media | Email Marketing e Klaviyo per E-commerce Premium",
    template: "%s | Reach Media",
  },
  description:
    "Trasformiamo la lista email del tuo e-commerce in un canale di revenue prevedibile. Strategia Klaviyo, automazioni e Shopify development per brand premium italiani.",
  keywords: [
    "email marketing",
    "Klaviyo",
    "Shopify",
    "e-commerce",
    "marketing automation",
    "consulenza email",
    "email marketing italia",
    "klaviyo agenzia",
  ],
  metadataBase: new URL("https://reachmedia.it"),
  alternates: {
    canonical: "https://reachmedia.it",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Reach Media | Email Marketing che Genera Revenue",
    description:
      "Fai il quiz gratuito e scopri dove stai perdendo soldi con l'email marketing.",
    type: "website",
    locale: "it_IT",
    url: "https://reachmedia.it",
    siteName: "Reach Media",
    images: [
      {
        url: "/og-image.png?v=2",
        width: 1200,
        height: 630,
        alt: "Reach Media – Email Marketing che Genera Revenue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reach Media | Email Marketing che Genera Revenue",
    description:
      "Fai il quiz gratuito e scopri dove stai perdendo soldi con l'email marketing.",
    images: ["/og-image.png?v=2"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans">
        <Script
          src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=VhAfyx"
          strategy="afterInteractive"
        />
        {/* Google Analytics 4 — only with analytics consent (see CookieBanner) */}
        <GoogleAnalytics />
        {children}
        <SiteUI />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
