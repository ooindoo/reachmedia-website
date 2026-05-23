import FadeIn from "./FadeIn";

const CASES = [
  {
    stat: "+340%",
    statLabel: "revenue da email in 90 giorni",
    sector: "Accessori moda premium, Italia",
    body: "Lista da 8.000 contatti, apertura al 18%, nessun flow attivo. Revenue da email passata dal 4% al 19% del fatturato totale.",
  },
  {
    stat: "+34%",
    statLabel: "LTV medio clienti in 4 mesi",
    sector: "Food gourmet, e-commerce B2C",
    body: "Klaviyo installato ma usato solo per newsletter manuali. 6 flow attivati, lifetime value medio aumentato del 34%.",
  },
  {
    stat: "38%",
    statLabel: "open rate raggiunto in 60 giorni",
    sector: "Brand lifestyle, espansione europea",
    body: "Migrazione da Mailchimp a Klaviyo con 22.000 contatti. Zero perdita di deliverability, open rate passato dal 21% al 38%.",
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
