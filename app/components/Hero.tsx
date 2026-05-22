import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-cream overflow-hidden">
      {/* Vertical rule — editorial accent */}
      <div className="absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-border opacity-30 hidden lg:block" />

      {/* Push content to bottom */}
      <div className="flex-1" />

      <div className="container-site w-full pb-20 md:pb-28 lg:pb-32">
        <div className="grid md:grid-cols-12 gap-y-10 md:gap-x-8">

          {/* Headline: wide, asymmetric */}
          <div className="md:col-span-11">
            <h1 className="font-display font-light text-display text-ink">
              L&apos;email marketing che il tuo e-commerce non sta ancora usando davvero.
            </h1>
          </div>

          {/* Subtitle + CTA: offset right */}
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-base md:text-[1.0625rem] text-muted leading-relaxed mb-10 font-light">
              Reach Media lavora con brand che vendono prodotti che meritano.
              Costruiamo i sistemi Klaviyo che trasformano la lista email in un
              canale di revenue prevedibile.
            </p>
            <Link
              href="#contatti"
              className="inline-flex items-center gap-4 text-sm font-medium px-8 py-4 bg-olive text-cream hover:bg-olive-dark transition-colors duration-300 group"
            >
              Parliamo del tuo progetto
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
