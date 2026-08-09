"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-bg hero-grid min-h-[100dvh] flex flex-col">
      <div className="flex-1 min-h-20 md:min-h-24" />
      <div className="container-site w-full pb-16 md:pb-24">
        {/* Mobile: stacked. Desktop: split left/right anchored at bottom */}
        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
          {/* Left: headline */}
          <div className="flex-shrink-0 md:w-[58%]">
            <h1
              className="font-display leading-[0.92] tracking-display text-primary"
              style={{ fontSize: "clamp(3.5rem, 7.5vw, 7.5rem)" }}
            >
              EMAIL
              <br />
              MARKETING
              <br />
              CHE GENERA
              <br />
              REVENUE.
              <br />
              <span className="hero-accent">NON SOLO</span>
              <br />
              <span className="hero-accent">APERTURE.</span>
            </h1>
          </div>

          {/* Right: description + CTA */}
          <div className="flex-1 pb-2">
            <p className="text-[0.9375rem] text-secondary leading-[1.7] mb-8 max-w-[28rem]">
              Progettiamo strategie email che trasformano ogni campagna in un motore di entrate. Niente metriche di vanità — solo risultati concreti per il tuo e-commerce.
            </p>
            <Link
              href="#quiz"
              className="inline-flex items-center gap-2 bg-primary text-bg text-[0.8125rem] font-bold tracking-[0.06em] uppercase px-8 py-[0.875rem] hover:bg-accent transition-colors duration-200"
            >
              Fai il quiz gratuito &rarr;
            </Link>
            <p className="mt-4 text-[0.75rem] text-secondary/70 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              Risultati in 3 minuti. Nessuna registrazione richiesta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
