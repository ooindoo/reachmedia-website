import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-white overflow-hidden">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #111111 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Accent line top-right */}
      <div className="absolute top-0 right-0 w-px h-48 bg-gradient-to-b from-transparent via-accent to-transparent opacity-40 hidden lg:block" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 lg:px-24 w-full pt-32 pb-24">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-px bg-accent" />
          <span className="text-xs font-medium tracking-[0.22em] uppercase text-[#999999]">
            Consulenza E-commerce Premium
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif font-bold text-[#111111] leading-[1.04] mb-8 text-[clamp(2.8rem,8vw,6rem)] max-w-4xl">
          Email che{" "}
          <em className="not-italic font-normal text-accent italic">vendono.</em>
          <br />
          Brand che{" "}
          <em className="not-italic font-normal text-accent italic">crescono.</em>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[#777777] max-w-xl mb-14 leading-relaxed font-light">
          Aiuto brand premium e luxury a massimizzare il fatturato attraverso email
          marketing strategico, automazioni Klaviyo e sviluppo Shopify su misura.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="#contatti"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#111111] text-white text-sm font-medium hover:bg-accent transition-colors duration-300 group"
          >
            Inizia il tuo progetto
            <svg
              className="transition-transform duration-300 group-hover:translate-x-0.5"
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
            >
              <path
                d="M1 5h12M8 1l5 4-5 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href="#servizi"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#DEDEDE] text-[#444444] text-sm font-medium hover:border-[#111111] hover:text-[#111111] transition-colors duration-300"
          >
            Scopri i servizi
          </Link>
        </div>

        {/* Stats bar */}
        <div className="mt-24 pt-10 border-t border-[#EDEDED] flex flex-wrap gap-x-16 gap-y-8">
          {[
            { value: "2023", label: "Anno di inizio" },
            { value: "100%", label: "Focus premium" },
            { value: "3", label: "Servizi specializzati" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-4xl font-bold text-[#111111] leading-none mb-1.5">
                {stat.value}
              </p>
              <p className="text-xs text-[#AAAAAA] tracking-wider uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
