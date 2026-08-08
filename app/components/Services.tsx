import FadeIn from "./FadeIn";

const SERVICES = [
  {
    index: "01",
    kpi: "58,7% Open Rate medio",
    title: "EMAIL STRATEGY",
    body: "Pianificazione editoriale mensile, segmentazione avanzata e A/B testing sistematico. Ogni campagna ha un obiettivo di conversione misurabile.",
  },
  {
    index: "02",
    kpi: "15+ store ottimizzati",
    title: "AUTOMAZIONI",
    body: "Flow di benvenuto, carrello abbandonato, win-back e post-acquisto. Automazioni che lavorano mentre dormi.",
  },
  {
    index: "03",
    kpi: "Report in 72h",
    title: "ANALYTICS & REPORT",
    body: "Dashboard personalizzata, report bi-settimanali con dati attributi e raccomandazioni azionabili. Zero metriche di vanità.",
  },
];

export default function Services() {
  return (
    <section id="servizi" className="border-t border-border py-12 md:py-32">
      <div className="container-site">
        <FadeIn className="mb-10 md:mb-20">
          <p className="section-label mb-3">Cosa offriamo</p>
          <h2
            className="font-display tracking-display text-primary"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            COSA FACCIAMO
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.index} delay={i * 80}>
              <div className="relative bg-bg p-8 md:p-10 group overflow-hidden hover:bg-surface transition-colors duration-200 h-full flex flex-col">
                <span className="absolute top-0 left-0 bottom-0 w-px bg-accent origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />

                {/* Decorative number */}
                <span
                  className="font-display leading-none text-primary/[0.06] mb-5 select-none"
                  style={{ fontSize: "clamp(2.5rem, 4vw, 3rem)" }}
                >
                  {s.index}
                </span>

                {/* KPI badge */}
                <span className="inline-flex items-center gap-1.5 text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-accent border border-accent/15 bg-accent/[0.06] px-2.5 py-1 mb-5 self-start">
                  <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                  {s.kpi}
                </span>

                <h3
                  className="font-display tracking-display text-primary leading-tight mb-3"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.75rem)" }}
                >
                  {s.title}
                </h3>
                <p className="font-sans text-secondary text-[0.875rem] leading-[1.7] mt-auto">
                  {s.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
