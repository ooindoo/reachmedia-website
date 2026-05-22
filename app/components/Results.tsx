import FadeIn from "./FadeIn";

const CASES = [
  {
    index: "01",
    sector: "Accessori moda premium, Italia",
    situation:
      "Lista da 8.000 contatti, apertura al 18%, nessun flow attivo oltre il welcome.",
    metric: "19%",
    metricLabel: "del fatturato da email",
    detail: "in 90 giorni, partendo dal 4%",
  },
  {
    index: "02",
    sector: "Food gourmet, e-commerce B2C",
    situation:
      "Klaviyo installato ma usato solo per newsletter manuali settimanali.",
    metric: "+34%",
    metricLabel: "LTV medio clienti",
    detail: "6 flow attivati in 4 mesi",
  },
  {
    index: "03",
    sector: "Brand lifestyle, espansione Europa",
    situation:
      "Migrazione da Mailchimp a Klaviyo con lista da 22.000 contatti.",
    metric: "38%",
    metricLabel: "open rate raggiunto",
    detail: "dal 21%, in 60 giorni, zero perdita di deliverability",
  },
];

export default function Results() {
  return (
    <section id="risultati" className="bg-ink py-24 md:py-32 lg:py-40">
      <div className="container-site">

        {/* Section header */}
        <FadeIn className="mb-16 md:mb-20">
          <span className="text-xs font-sans font-medium tracking-[0.18em] uppercase text-olive-muted">
            Risultati concreti
          </span>
        </FadeIn>

        {/* Case studies */}
        <div className="divide-y divide-[#1E1E1E]">
          {CASES.map((c, i) => (
            <FadeIn key={c.index} delay={i * 100}>
              <div className="grid md:grid-cols-12 gap-x-8 gap-y-6 py-12 md:py-14 lg:py-16">

                {/* Left: index + sector + situation */}
                <div className="md:col-span-7">
                  <div className="flex items-baseline gap-5 mb-5">
                    <span className="font-sans text-xs text-[#444440] tracking-[0.18em]">
                      {c.index}
                    </span>
                    <span className="font-sans text-xs font-medium tracking-[0.14em] uppercase text-olive-muted">
                      {c.sector}
                    </span>
                  </div>
                  <p className="text-[0.9375rem] text-[#888580] leading-relaxed font-light italic font-display">
                    &ldquo;{c.situation}&rdquo;
                  </p>
                </div>

                {/* Right: metric */}
                <div className="md:col-span-4 md:col-start-9 flex flex-col justify-center">
                  <p className="font-display font-light text-cream leading-none mb-2"
                     style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)" }}>
                    {c.metric}
                  </p>
                  <p className="text-sm text-[#888580] font-sans mb-1">{c.metricLabel}</p>
                  <p className="text-xs text-[#555552] font-sans">{c.detail}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
