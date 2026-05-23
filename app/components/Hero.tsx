import Link from "next/link";

export default function Hero() {
  return (
    // pt-36 = 144px (navbar ~56-64px + 80px distanza minima dal titolo)
    <section className="relative min-h-screen flex flex-col bg-bg hero-grid overflow-hidden">
      <div className="container-site w-full pt-[72px] md:pt-20 pb-20 md:pb-28">
        <div className="space-y-10 md:space-y-12">
          {/* Headline — desktop ridotto del 20%: 11vw→8.8vw, max 10rem→8rem */}
          <h1
            className="font-display leading-[0.92] tracking-display text-primary text-left"
            style={{ fontSize: "clamp(3.5rem, 8.8vw, 8rem)" }}
          >
            EMAIL MARKETING
            <br />
            CHE GENERA
            <br />
            REVENUE.
            <br />
            <span className="hero-accent">NON SOLO</span>
            <br />
            APERTURE.
          </h1>

          {/* Subtitle + CTA — offset right on desktop */}
          <div className="grid md:grid-cols-12 gap-x-8 gap-y-6">
            <div className="md:col-span-5 md:col-start-8">
              <p className="text-sm md:text-[0.9375rem] text-secondary leading-relaxed mb-8">
                Reach Media costruisce sistemi Klaviyo per e-commerce premium
                italiani. Dalla strategia alla deliverability.
              </p>
              <div className="flex flex-col items-start gap-3">
                <Link
                  href="#quiz"
                  className="inline-flex items-center gap-3 px-7 py-4 bg-accent text-bg text-sm font-medium hover:bg-accent-hover transition-colors duration-200 group"
                >
                  Scopri dove stai perdendo soldi
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
                <p className="text-[11px] text-[#444]">
                  Nessuna call. Nessun impegno. Solo dati concreti.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spazio residuo sotto il contenuto */}
      <div className="flex-1" />
    </section>
  );
}
