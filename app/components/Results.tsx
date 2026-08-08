import FadeIn from "./FadeIn";

const CASES = [
  {
    stat: "€428k",
    statLabel: "fatturato generato via email",
    sector: "E-commerce moda premium, Italia",
    body: "372 campagne inviate in 17 mesi, 984.038 destinatari raggiunti. Open rate medio del 58,7%. Fatturato generato tra campagne e automazioni: €428.558.",
  },
  {
    stat: "56,8%",
    statLabel: "open rate medio",
    sector: "Brand orologi di lusso, Italia",
    body: "Partiti da zero, nessun email marketing precedente. Circa 60 campagne inviate, 431.914 destinatari raggiunti. Click rate medio del 9,8%. 98 ordini diretti tracciati da campagna.",
  },
  {
    stat: "28,4%",
    statLabel: "open rate medio dopo recovery",
    sector: "Piattaforma second-hand luxury",
    body: "Recovery completo di un account con seri problemi di deliverability. 254 campagne inviate, 47.468 destinatari raggiunti. Open rate portato da un minimo del 25% a una media stabile del 28,4%.",
  },
];

export default function Results() {
  return (
    <section id="risultati" className="border-t border-border py-12 md:py-32">
      <div className="container-site">
        <FadeIn className="mb-10 md:mb-20">
          <h2
            className="font-display tracking-display text-primary"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            RISULTATI CONCRETI
          </h2>
        </FadeIn>

        <div className="divide-y divide-border">
          {CASES.map((c, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="grid md:grid-cols-12 gap-x-8 gap-y-5 py-10 md:py-14 group">
                {/* Big stat */}
                <div className="md:col-span-4">
                  <p
                    className="font-display leading-none tracking-display text-primary group-hover:text-accent transition-colors duration-300"
                    style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
                  >
                    {c.stat}
                  </p>
                  <p className="text-xs text-secondary mt-2 leading-snug">
                    {c.statLabel}
                  </p>
                </div>

                {/* Description */}
                <div className="md:col-span-7 md:col-start-6 flex flex-col justify-center">
                  <p className="text-[10px] text-secondary uppercase tracking-[0.14em] mb-3">
                    {c.sector}
                  </p>
                  <p className="text-secondary text-[0.9375rem] leading-relaxed">
                    {c.body}
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
