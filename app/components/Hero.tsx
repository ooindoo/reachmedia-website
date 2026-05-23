"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(100);

  useEffect(() => {
    const compute = () => {
      const navH = window.innerWidth >= 768 ? 64 : 56;
      const availH = window.innerHeight - navH;

      // Actual container width (rispetta container-site max-w e padding)
      const availW = containerRef.current?.clientWidth ?? window.innerWidth * 0.88;

      // 5 righe a leading 0.92 = 4.6 × fontSize riempie tutta l'altezza disponibile
      const byHeight = availH / 4.6;

      // "EMAIL MARKETING" è la riga più lunga — Bebas Neue ≈ 7.0 larghezze per em
      const byWidth = availW / 7.0;

      setFontSize(Math.min(byHeight, byWidth) * 0.95);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <>
      {/* Sezione hero — esattamente un viewport di altezza */}
      <section className="h-screen flex flex-col bg-bg hero-grid overflow-hidden">
        <div
          ref={containerRef}
          className="container-site w-full flex-1 flex flex-col justify-end pt-14 md:pt-16 pb-0"
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

      {/* Sottotitolo e CTA — primo contenuto dopo lo scroll */}
      <div className="bg-bg border-b border-border">
        <div className="container-site py-12 md:py-16">
          <div className="max-w-lg">
            <p className="text-sm md:text-[0.9375rem] text-secondary leading-relaxed mb-6">
              Reach Media costruisce sistemi Klaviyo per e-commerce premium
              italiani. Dalla strategia alla deliverability.
            </p>
            <div className="flex flex-col items-start gap-3">
              <Link
                href="#quiz"
                className="inline-flex items-center gap-3 px-7 py-4 bg-primary text-bg text-sm font-medium hover:opacity-90 transition-opacity duration-200 group"
              >
                Scopri dove stai perdendo soldi
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
              <p className="text-[11px] text-secondary">
                Nessuna call. Nessun impegno. Solo dati concreti.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
