import FadeIn from "./FadeIn";

const STEPS = [
  {
    num: "01",
    title: "AUDIT",
    desc: "Analizziamo la tua lista email, le performance storiche e i flussi automatici esistenti. Identifichiamo le opportunità di revenue non sfruttate.",
  },
  {
    num: "02",
    title: "STRATEGIA",
    desc: "Definiamo il calendario editoriale, la segmentazione avanzata e i trigger di automazione. Ogni email ha un obiettivo di conversione preciso.",
  },
  {
    num: "03",
    title: "ESECUZIONE",
    desc: "Produciamo, testiamo e ottimizziamo. Report bi-settimanali con dati reali, non metriche di vanità.",
  },
];

export default function Processo() {
  return (
    <section className="border-t border-border py-12 md:py-20">
      <div className="container-site">
        <FadeIn className="mb-10 md:mb-16">
          <p className="section-label mb-3">Come lavoriamo</p>
          <h2
            className="font-display tracking-display text-primary"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            IL METODO
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {STEPS.map((s, i) => (
            <FadeIn key={s.num} delay={i * 80}>
              <div className="relative bg-bg p-8 md:p-10 group overflow-hidden hover:bg-surface transition-colors duration-200 h-full">
                <span className="absolute top-0 left-0 right-0 h-px bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <p
                  className="font-display text-accent leading-none mb-4"
                  style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
                >
                  {s.num}
                </p>
                <h3
                  className="font-display tracking-display text-primary mb-3"
                  style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)" }}
                >
                  {s.title}
                </h3>
                <p className="text-secondary text-sm leading-[1.7]">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
