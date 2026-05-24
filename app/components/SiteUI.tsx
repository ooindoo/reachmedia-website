"use client";

import { usePathname } from "next/navigation";
import MobileQuizBar from "./MobileQuizBar";
import CookieBanner from "./CookieBanner";
import ChecklistPopup from "./ChecklistPopup";

/**
 * Global UI widgets rendered outside the page tree.
 * Hidden entirely on /studio so Sanity Studio renders clean.
 */
export default function SiteUI() {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  return (
    <>
      <MobileQuizBar />
      <CookieBanner />
      <ChecklistPopup />
    </>
  );
}
