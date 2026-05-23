import FadeIn from "./FadeIn";

const SERVICES = [
  {
    index: "01",
    title: "EMAIL MARKETING E KLAVIYO",
    body: "Strategia, segmentazione avanzata, copywriting, A/B test sistematici. Flow automatizzati che generano revenue mentre il tuo team si occupa del prodotto.",
  },
  {
    index: "02",
    title: "SHOPIFY DEVELOPMENT",
    body: "Temi custom, ottimizzazione conversioni, integrazioni con Klaviyo e terze parti. Il negozio deve vendere, non solo esistere online.",
  },
  {
    index: "03",
    title: "AUDIT E CONSULENZA",
    body: "Analisi completa della situazione attuale. Deliverability, segmentazione, flow, campagne. Diciamo esattamente cosa non funziona e perché, senza filtri.",
  },
];

export default function Services() {
  return (
    <section id="servizi" className="border-t border-border py-24 md:py-32">
      <div className="container-site">
        <FadeIn className="mb-16 md:mb-20">
          <p className="section-label mb-3">Cosa facciamo</p>
          <h2
            className="font-display tracking-display text-primary"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            COSA FACCIAMO
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.index} delay={i * 80} className="h-full">
              <div className="relative flex flex-col h-full border border-border bg-surface p-8 md:p-10 overflow-hidden group transition-colors duration-300">
                <span className="absolute inset-y-0 left-0 w-0.5 bg-[#E8FF47] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <span
                  className="font-display tracking-display text-primary block mb-6"
                  style={{ fontSize: "clamp(2rem, 3vw, 3rem)" }}
                >
                  {s.index}
                </span>
                <h3
                  className="font-display tracking-display text-primary leading-tight mb-5"
                  style={{ fontSize: "clamp(1.5rem, 2vw, 2rem)" }}
                >
                  {s.title}
                </h3>
                <p className="font-sans text-secondary text-[0.9375rem] leading-relaxed mt-auto">
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
