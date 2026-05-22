const HIGHLIGHTS = [
  { label: "Dal", value: "2023" },
  { label: "Focus", value: "Premium & Luxury" },
  { label: "Approccio", value: "Strategico" },
];

export default function About() {
  return (
    <section id="chi-sono" className="section-padding bg-white">
      <div className="container-max">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left: Visual card */}
          <div className="order-2 md:order-1">
            <div className="relative aspect-[4/5] bg-[#F4F2EC] overflow-hidden">
              {/* Top-right corner accent */}
              <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-accent opacity-60" />
              {/* Bottom-left corner accent */}
              <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-accent opacity-60" />

              {/* Quote overlay */}
              <div className="absolute inset-0 flex items-end p-10">
                <div className="border-l-2 border-accent pl-6">
                  <p className="font-serif text-xl md:text-2xl italic text-[#333333] leading-snug">
                    &ldquo;La differenza tra un brand medio
                    <br />e uno premium si vede
                    <br />nell&apos;email.&rdquo;
                  </p>
                </div>
              </div>

              {/* Subtle watermark */}
              <div className="absolute top-10 left-10 font-serif text-[7rem] font-bold text-[#ECEAE4] leading-none select-none pointer-events-none">
                RM
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 md:order-2">
            <div className="eyebrow">
              <div className="eyebrow-line" />
              <span className="eyebrow-text">Chi sono</span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#111111] leading-tight mb-8">
              Consulente specializzato in e-commerce premium.
            </h2>

            <div className="space-y-5 text-[#666666] leading-relaxed text-[0.9375rem]">
              <p>
                Sono{" "}
                <strong className="text-[#111111] font-semibold">Ardit</strong>, consulente
                freelance specializzato in e-commerce e marketing automation. Dal 2023 lavoro
                con brand premium e luxury per costruire sistemi di vendita email che generano
                fatturato ricorrente.
              </p>
              <p>
                Il mio approccio combina strategia, automazione e design per creare esperienze
                che riflettono il valore del tuo brand — senza dipendere dalla pubblicità a
                pagamento.
              </p>
              <p>
                Ogni progetto è trattato con cura artigianale: nessun template generico, solo
                soluzioni costruite specificamente per il tuo pubblico e i tuoi obiettivi.
              </p>
            </div>

            {/* Stats divider */}
            <div className="mt-10 pt-10 border-t border-[#EBEBEB] grid grid-cols-3 gap-4">
              {HIGHLIGHTS.map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] text-[#BBBBBB] uppercase tracking-wider mb-2">
                    {item.label}
                  </p>
                  <p className="font-serif font-bold text-[#111111] text-base leading-tight">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
