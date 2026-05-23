import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col bg-bg hero-grid overflow-hidden">
      <div className="container-site w-full pt-[72px] md:pt-20 pb-16 md:pb-24">
        <div className="space-y-8 md:space-y-10">

          {/* Titolo — clamp(vw, vh) garantisce che 5 righe + sottotitolo stiano nella viewport */}
          <h1
            className="font-display leading-[0.92] tracking-display text-primary"
            style={{ fontSize: "clamp(2.8rem, min(7vw, 9vh), 5.5rem)" }}
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

          {/* Sottotitolo e CTA — sinistra, sotto il titolo, nessun offset */}
          <div className="max-w-lg">
            <p className="text-sm md:text-[0.9375rem] text-secondary leading-relaxed mb-6">
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

      <div className="flex-1" />
    </section>
  );
}
