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

        <div className="divide-y divide-border">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.index} delay={i * 80}>
              <div className="grid md:grid-cols-12 gap-x-8 gap-y-5 py-10 md:py-14">
                <div className="md:col-span-5">
                  <span className="text-xs text-secondary font-display tracking-display block mb-3">
                    {s.index}
                  </span>
                  <h3
                    className="font-display tracking-display text-primary leading-tight"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                  >
                    {s.title}
                  </h3>
                </div>
                <div className="md:col-span-6 md:col-start-7 flex items-center">
                  <p className="text-secondary text-[0.9375rem] leading-relaxed">
                    {s.body}
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
