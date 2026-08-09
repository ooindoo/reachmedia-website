"use client";

import { useState } from "react";
import CountUp from "./CountUp";
import FadeIn from "./FadeIn";

const STATS = [
  { label: "Esperienza", value: 3, suffix: "+", unit: "anni nel settore" },
  { label: "Brand seguiti", value: 15, suffix: "+", unit: "clienti attivi" },
  { label: "Campagne inviate", value: 686, suffix: "", unit: "campagne totali" },
  { label: "Open Rate medio", value: 58, suffix: "%", unit: "benchmark settore 21%" },
];

export default function StatsBar() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="border-t border-b border-border relative">
      {/* Full-width overlay: absolute, covers full section width (incl. page margins).
          Cells have opaque bg-bg so they render above this layer; only the
          left/right margins outside container-site reveal the overlay color. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-white/[0.06] pointer-events-none transition-opacity duration-200"
        style={{ opacity: hovered ? 1 : 0 }}
      />

      <div className="container-site">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {STATS.map((s, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div
                className={`relative bg-bg py-8 md:py-10 group overflow-hidden cursor-default hover:bg-white/[0.06] transition-colors duration-200 ${
                  i === 0
                    ? "pl-0 pr-6 md:pr-10"          // first cell: no left pad → aligns with logo
                    : i === STATS.length - 1
                    ? "pl-6 md:pl-10 pr-0"           // last cell: no right pad → symmetric
                    : "px-6 md:px-10"
                }`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <span className="absolute bottom-0 left-0 right-0 h-px bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <p className="text-[0.6875rem] font-semibold tracking-[0.12em] uppercase text-secondary mb-2">
                  {s.label}
                </p>
                <p
                  className="font-display leading-none text-primary mb-1 tracking-display"
                  style={{ fontSize: "clamp(2.75rem, 4.5vw, 4.5rem)" }}
                >
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="text-[0.625rem] tracking-[0.1em] uppercase text-secondary mt-1">
                  {s.unit}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
