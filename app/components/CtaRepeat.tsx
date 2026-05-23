import Link from "next/link";
import FadeIn from "./FadeIn";

export default function CtaRepeat() {
  return (
    <section className="border-t border-border py-14 md:py-32">
      <div className="container-site">
        <FadeIn>
          <h2
            className="font-display tracking-display text-primary leading-tight mb-6"
            style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
          >
            PRONTO A VEDERE
            <br />I TUOI NUMERI?
          </h2>
          <p className="text-secondary mb-10 text-sm">
            Fai il quiz. Scarica la checklist. Parti da lì.
          </p>
          <Link
            href="#quiz"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-bg text-sm font-medium hover:opacity-90 transition-opacity duration-200 group"
          >
            Fai il quiz ora
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
