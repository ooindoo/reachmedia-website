import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";
import ChecklistPopup from "./components/ChecklistPopup";
import MobileQuizBar from "./components/MobileQuizBar";

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
        url: "/og-image.png",
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
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// Inline script — runs synchronously before first paint to prevent FOUC.
// Reads localStorage and adds `light` class to <html> if needed.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light');}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: the inline script may add `light` class before
    // React hydrates, causing a mismatch between server and client HTML.
    <html lang="it" className={`${inter.variable} ${bebas.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        {/* Theme init — must be first child to run before any paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Script
          src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=VhAfyx"
          strategy="afterInteractive"
        />
        {children}
        <MobileQuizBar />
        <CookieBanner />
        <ChecklistPopup />
      </body>
    </html>
  );
}
