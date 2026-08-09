import FadeIn from "./FadeIn";

const FEATURED = {
  stat: "€428k",
  statLabel: "Revenue attribuita email",
  metrics: [
    { val: "58,7%", lab: "Open Rate" },
    { val: "372", lab: "Campagne inviate" },
    { val: "984k", lab: "Email inviate" },
  ],
  sector: "Fashion / E-commerce",
  title: "DA 0 A €428K DI REVENUE EMAIL IN 14 MESI",
  body: "Brand di abbigliamento premium che non aveva mai investito in email marketing. Abbiamo costruito l'intera infrastruttura da zero: lista, template, automazioni e calendario editoriale. In 14 mesi il canale email è diventato il secondo per revenue dopo il paid.",
  tags: ["Klaviyo", "Shopify", "Email Strategy", "Automazioni"],
};

const MINIS = [
  {
    stat: "56,8%",
    statLabel: "Open rate campagne",
    sector: "Orologi di lusso, settore lifestyle premium",
  },
  {
    stat: "28,4%",
    statLabel: "Revenue email su totale",
    sector: "Second-hand luxury, marketplace pre-loved",
  },
];

export default function Results() {
  return (
    <section id="risultati" className="border-t border-border py-12 md:py-32">
      <div className="container-site">
        <FadeIn className="mb-10 md:mb-16">
          <p className="section-label mb-3">Case history</p>
          <h2
            className="font-display tracking-display text-primary"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            RISULTATI CONCRETI
          </h2>
        </FadeIn>

        {/* All cases: featured + minis in one seamless grid container */}
        <div className="bg-border flex flex-col gap-px">

        {/* Featured case */}
        <FadeIn>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {/* Stat side */}
            <div className="bg-white/[0.025] p-8 md:p-10">
              <p
                className="font-display leading-none text-accent mb-2"
                style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
              >
                {FEATURED.stat}
              </p>
              <p className="text-[0.75rem] tracking-[0.1em] uppercase text-secondary mb-8">
                {FEATURED.statLabel}
              </p>
              <div className="flex flex-col gap-5">
                {FEATURED.metrics.map((m) => (
                  <div key={m.lab}>
                    <p
                      className="font-display leading-none text-primary"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 1.75rem)" }}
                    >
                      {m.val}
                    </p>
                    <p className="text-[0.6875rem] tracking-[0.1em] uppercase text-secondary mt-1">
                      {m.lab}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Text side */}
            <div className="bg-bg p-8 md:p-10 flex flex-col justify-between">
              <div>
                <p className="text-[0.6875rem] font-bold tracking-[0.14em] uppercase text-secondary border-b border-accent pb-1 inline-block mb-6">
                  {FEATURED.sector}
                </p>
                <h3
                  className="font-display tracking-display text-primary leading-tight mb-4"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                >
                  {FEATURED.title}
                </h3>
                <p className="text-secondary text-sm leading-[1.75] mb-8">
                  {FEATURED.body}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {FEATURED.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[0.6875rem] tracking-[0.08em] uppercase border border-border text-secondary px-3 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Mini cases */}
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {MINIS.map((c, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="bg-bg p-8 md:p-10 group hover:bg-surface transition-colors duration-200 h-full">
                <p
                  className="font-display leading-none text-primary group-hover:text-accent transition-colors duration-300 mb-1"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 3rem)" }}
                >
                  {c.stat}
                </p>
                <p className="text-[0.6875rem] tracking-[0.1em] uppercase text-secondary mb-4">
                  {c.statLabel}
                </p>
                <p className="text-xs text-secondary/60">{c.sector}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        </div>{/* end seamless gap-px container */}
      </div>
    </section>
  );
}
