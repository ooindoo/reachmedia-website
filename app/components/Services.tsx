const SERVICES = [
  {
    number: "01",
    title: "Email Marketing",
    description:
      "Campagne email strategiche che convertono gli iscritti in clienti fedeli. Copywriting persuasivo, design premium e analisi continua delle performance per massimizzare ogni invio.",
    tags: ["Campagne", "Copywriting", "A/B Testing", "Analytics"],
  },
  {
    number: "02",
    title: "Klaviyo Automation",
    description:
      "Flussi automatizzati personalizzati per ogni touchpoint del customer journey. Dalla welcome series al post-purchase, ogni automazione lavora per te 24/7.",
    tags: ["Welcome Series", "Abandoned Cart", "Post-Purchase", "Winback"],
  },
  {
    number: "03",
    title: "Shopify Development",
    description:
      "Store Shopify ottimizzati per la conversione e l'esperienza utente. Temi custom, integrazioni avanzate e performance per brand che vogliono distinguersi.",
    tags: ["Liquid", "Temi Custom", "Integrazioni", "CRO"],
  },
];

export default function Services() {
  return (
    <section id="servizi" className="bg-[#F9F8F5] section-padding">
      <div className="container-max">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <div className="eyebrow">
            <div className="eyebrow-line" />
            <span className="eyebrow-text">Cosa faccio</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#111111] leading-tight max-w-lg">
            Servizi su misura per il tuo brand.
          </h2>
        </div>

        {/* Services grid — separated by hairlines */}
        <div className="grid md:grid-cols-3 gap-px bg-[#E0DDD6]">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="bg-[#F9F8F5] p-8 md:p-10 lg:p-12 group hover:bg-white transition-colors duration-400"
            >
              <span className="block font-mono text-xs text-accent tracking-[0.18em] mb-7">
                {service.number}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#111111] mb-4 leading-snug">
                {service.title}
              </h3>
              <p className="text-[#777777] leading-relaxed mb-8 text-[0.9375rem]">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1.5 border border-[#E4E0D8] text-[#999999] group-hover:border-accent group-hover:text-accent transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex items-center gap-4">
          <div className="w-8 h-px bg-[#CCCCCC]" />
          <p className="text-sm text-[#AAAAAA]">
            Ogni progetto è personalizzato —{" "}
            <a
              href="#contatti"
              className="text-[#111111] underline underline-offset-4 decoration-[#CCCCCC] hover:decoration-accent transition-colors"
            >
              parliamo del tuo
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
