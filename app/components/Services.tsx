import FadeIn from "./FadeIn";

const SERVICES = [
  {
    index: "01",
    title: "Email Marketing & Klaviyo",
    body: "Strategia, segmentazione, copywriting. Flow automatizzati che lavorano mentre tu dormi. Campagne che non sembrano email di massa perché non lo sono.",
  },
  {
    index: "02",
    title: "Shopify Development",
    body: "Temi custom, ottimizzazione conversioni, integrazioni. Il negozio deve vendere, non solo esistere.",
  },
  {
    index: "03",
    title: "Consulenza e Audit",
    body: "Analizziamo quello che hai già e diciamo esattamente cosa non sta funzionando e perché. Senza giri di parole.",
  },
];

export default function Services() {
  return (
    <section id="servizi" className="bg-cream py-24 md:py-32 lg:py-40">
      <div className="container-site">

        {/* Section header */}
        <FadeIn className="mb-16 md:mb-20">
          <span className="section-label">Cosa facciamo</span>
        </FadeIn>

        {/* Services list */}
        <div className="divide-y divide-border">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.index} delay={i * 80}>
              <div className="grid md:grid-cols-12 gap-x-8 gap-y-5 py-12 md:py-14 lg:py-16 group">

                {/* Left: index + title */}
                <div className="md:col-span-5 flex flex-col gap-4">
                  <span className="font-sans text-xs text-olive tracking-[0.18em]">
                    {s.index}
                  </span>
                  <h3 className="font-display text-display-sm font-light text-ink leading-tight">
                    {s.title}
                  </h3>
                </div>

                {/* Right: description */}
                <div className="md:col-span-6 md:col-start-7 flex items-center">
                  <p className="text-[0.9375rem] text-muted leading-relaxed font-light">
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
