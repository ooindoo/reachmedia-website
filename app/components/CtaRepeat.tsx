import Link from "next/link";

export default function CtaRepeat() {
  return (
    <section className="border-t border-border py-12 md:py-20 bg-surface">
      <div className="container-site text-center">
        <h2
          className="font-display tracking-display text-primary leading-[0.95] mb-10"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
        >
          VUOI SAPERE
          <br />
          QUANTO STAI PERDENDO?
        </h2>
        <Link
          href="#quiz"
          className="inline-flex items-center gap-2 bg-accent text-bg text-[0.9375rem] font-display tracking-[0.08em] uppercase px-8 py-[0.875rem] hover:bg-primary transition-colors duration-200"
        >
          FAI IL QUIZ GRATUITO &rarr;
        </Link>
        <p className="mt-4 text-xs text-secondary">Ci vogliono 3 minuti. Nessun impegno.</p>
      </div>
    </section>
  );
}
