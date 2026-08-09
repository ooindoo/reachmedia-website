"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";

const FAQS = [
  {
    q: "Quanto costa lavorare con Reach Media?",
    a: "I progetti partono da una fase di audit e strategia. Il costo dipende dal perimetro di lavoro. Parliamo quando hai fatto il quiz e capisci dove sei.",
  },
  {
    q: "In quanto tempo si vedono i risultati?",
    a: "I primi dati arrivano entro 30 giorni. Risultati consolidati si vedono tra i 60 e i 90 giorni dall'attivazione dei flow principali.",
  },
  {
    q: "Devo già avere Klaviyo attivo?",
    a: "No. Lavoriamo sia con chi parte da zero che con chi ha già Klaviyo installato ma non lo usa davvero.",
  },
  {
    q: "Lavorate solo con Shopify?",
    a: "Shopify è la piattaforma su cui lavoriamo meglio, ma gestiamo anche progetti su WooCommerce e altre piattaforme per la parte email.",
  },
  {
    q: "Quante ore al mese richiede la mia partecipazione?",
    a: "Pochissime. Ti chiediamo un briefing iniziale e un allineamento mensile. Il resto lo gestiamo noi.",
  },
  {
    q: "Come faccio a sapere se siete la scelta giusta per me?",
    a: "Fai il quiz. In 2 minuti capisci dove sei e cosa ti manca. Se ha senso lavorare insieme, lo vedi dai risultati.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section className="border-t border-border py-12 md:py-32">
      <div className="container-site">
        <FadeIn className="mb-8 md:mb-14">
          <h2
            className="font-display tracking-display text-primary leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            DOMANDE FREQUENTI
          </h2>
        </FadeIn>

        <div className="max-w-3xl border-t border-b border-border divide-y divide-border">
          {FAQS.map((item, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div className={`transition-colors duration-200 ${open === i ? "bg-surface/60" : "hover:bg-surface/40"}`}>
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-start justify-between gap-6 px-5 md:px-6 py-6 text-left group"
                  aria-expanded={open === i}
                >
                  <span
                    className={`text-sm md:text-base font-medium transition-colors duration-200 ${
                      open === i ? "text-accent" : "text-primary group-hover:text-accent"
                    }`}
                  >
                    {item.q}
                  </span>
                  <span
                    className={`flex-shrink-0 mt-1 text-secondary transition-transform duration-300 ${
                      open === i ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                      <polyline points="1,1 7,7 13,1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    open === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-sm text-secondary leading-relaxed px-5 md:px-6 pb-6 pr-14">
                    {item.a}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
