"use client";

import dynamic from "next/dynamic";
import config from "../../../sanity.config";

// Load Sanity Studio client-only — it uses React.createContext internally,
// which fails during SSR/Turbopack module collection if imported statically.
const StudioComponent = dynamic(
  async () => {
    const { NextStudio } = await import("next-sanity/studio");
    function Studio() {
      return <NextStudio config={config} />;
    }
    Studio.displayName = "SanityStudio";
    return Studio;
  },
  { ssr: false }
);

export default function StudioPage() {
  return <StudioComponent />;
}
