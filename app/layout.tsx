import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import CookieBanner from "./components/CookieBanner";
import ChecklistPopup from "./components/ChecklistPopup";
import MobileQuizBar from "./components/MobileQuizBar";
import CustomCursor from "./components/CustomCursor";

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
        {children}
        <MobileQuizBar />
        <CookieBanner />
        <ChecklistPopup />
        <CustomCursor />
      </body>
    </html>
  );
}
