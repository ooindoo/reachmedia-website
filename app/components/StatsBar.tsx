import CountUp from "./CountUp";
import FadeIn from "./FadeIn";

const STATS = [
  { value: 3, suffix: "+", label: "Anni di esperienza email marketing" },
  { value: 15, suffix: "+", label: "Brand premium gestiti" },
  { value: 686, suffix: "", label: "Campagne email inviate" },
  { value: 58, suffix: "%", label: "Open rate medio" },
];

export default function StatsBar() {
  return (
    <section className="border-t border-b border-border py-10 md:py-14">
      <div className="container-site">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {STATS.map((s, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div>
                <p
                  className="font-display leading-none text-primary mb-2 tracking-display"
                  style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)" }}
                >
                  <CountUp to={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs text-secondary leading-snug">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
