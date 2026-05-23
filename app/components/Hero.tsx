"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    const compute = () => {
      const isMobile = window.innerWidth < 768;
      const navH = isMobile ? 56 : 64;
      const availH = window.innerHeight - navH;
      const availW = containerRef.current?.clientWidth ?? window.innerWidth * 0.88;

      // Mobile: only constrain by width — section is auto-height, no vertical fill
      // Desktop: fill available viewport height
      const byHeight = isMobile ? Infinity : availH / 4.6;
      const byWidth = availW / 7.0;
      setFontSize(Math.min(byHeight, byWidth) * 0.95);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <>
      {/* Mobile: compact auto-height. Desktop: full viewport h-screen */}
      <section className="bg-bg hero-grid overflow-hidden md:h-screen md:flex md:flex-col">
        <div
          ref={containerRef}
          className="container-site w-full md:flex-1 md:flex md:flex-col md:justify-end pt-14 md:pt-16 pb-4 md:pb-0"
        >
          <h1
            className="font-display leading-[0.92] tracking-display text-primary"
            style={{ fontSize: `${fontSize}px` }}
          >
            EMAIL MARKETING
            <br />
            CHE GENERA
            <br />
            REVENUE.
            <br />
            <span className="hero-accent">NON SOLO</span>
            <br />
            APERTURE.
          </h1>
        </div>
      </section>

      {/* Subtitle + CTA — subito sotto il titolo su mobile */}
      <div className="bg-bg border-b border-border">
        <div className="container-site py-5 md:py-16">
          <div className="max-w-lg">
            <p className="text-sm md:text-[0.9375rem] text-secondary leading-relaxed mb-5">
              Reach Media costruisce sistemi Klaviyo per e-commerce premium
              italiani. Dalla strategia alla deliverability.
            </p>
            <div className="flex flex-col items-stretch md:items-start gap-3">
              <Link
                href="#quiz"
                className="inline-flex items-center justify-center md:justify-start gap-3 px-7 py-4 bg-primary text-bg text-sm font-medium hover:opacity-90 transition-opacity duration-200 group"
              >
                Scopri dove stai perdendo soldi
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
              <p className="text-[11px] text-secondary text-center md:text-left">
                Nessuna call. Nessun impegno. Solo dati concreti.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
