import Link from "next/link";
import s from "./b.module.css";
import {
  HERO, STATS, LOGOS, STEPS, SERVICES, FEATURED, MINIS, FAQS, NAV, chartPath,
} from "../content";

export const metadata = { title: "Redesign B · Light Lab" };

// A Klaviyo-style automation, drawn as the product itself would show it.
const FLOW = [
  { kind: "Trigger", title: "Prodotto aggiunto al carrello", meta: "Shopify · evento live" },
  { kind: "Attesa", title: "4 ore", meta: "se non ha completato l'ordine" },
  { kind: "Email", title: "Hai dimenticato qualcosa?", meta: "template + oggetto in A/B test" },
  { kind: "Split", title: "Ha aperto l'email?", meta: "sì → sconto · no → SMS" },
];

function Chart() {
  const { line, area, last } = chartPath(FEATURED.series, 480, 160);
  return (
    <svg className={s.chart} viewBox="0 0 480 160" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="b-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#E8FF47" stopOpacity="0.35" />
          <stop offset="1" stopColor="#E8FF47" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#b-fill)" />
      <path d={line} className={s.chartLine} pathLength={1} />
      <circle cx={last[0]} cy={last[1]} r="4" className={s.chartDot} />
    </svg>
  );
}

export default function RedesignB() {
  return (
    <div className={s.page}>
      {/* Header — floating glass pill (from A), on the light ground */}
      <header className={s.navWrap}>
        <nav className={s.nav}>
          <Link href="/redesign/b" className={s.logo}>
            <span className={s.logoDot} />
            <span>reachmedia<span className={s.logoTld}>.it</span></span>
          </Link>
          <ul className={s.navLinks}>
            {NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}
          </ul>
          <Link href={HERO.cta.href} className={`${s.btn} ${s.btnInk} ${s.btnSm}`}>Quiz gratuito</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className={`${s.container} ${s.hero}`}>
        <div className={s.heroCopy}>
          <p className={`${s.eyebrow} ${s.enter}`} style={{ ["--i" as string]: 0 }}>{HERO.eyebrow}</p>
          <h1 className={`${s.h1} ${s.enter}`} style={{ ["--i" as string]: 1 }}>
            Email marketing che genera <mark className={s.mark}>revenue</mark>.{" "}
            <span className={s.h1Muted}>{HERO.titleMuted}</span>
          </h1>
          <p className={`${s.lead} ${s.enter}`} style={{ ["--i" as string]: 2 }}>{HERO.body}</p>
          <div className={`${s.heroActions} ${s.enter}`} style={{ ["--i" as string]: 3 }}>
            <Link href={HERO.cta.href} className={`${s.btn} ${s.btnInk}`}>
              {HERO.cta.label} <span className={s.arrow} aria-hidden="true">→</span>
            </Link>
            <span className={s.note}>{HERO.note}</span>
          </div>
        </div>

        {/* Automation canvas */}
        <div className={`${s.canvas} ${s.enter}`} style={{ ["--i" as string]: 2 }} aria-label="Esempio di automazione: carrello abbandonato">
          <div className={s.canvasHead}>
            <span className={s.mono}>flow / carrello-abbandonato</span>
            <span className={s.statusOn}>attivo</span>
          </div>
          <ol className={s.flow}>
            {FLOW.map((n, i) => (
              <li key={n.title} className={s.flowNode} style={{ ["--i" as string]: i }}>
                <span className={`${s.kind} ${n.kind === "Trigger" ? s.kindTrigger : ""}`}>{n.kind}</span>
                <p className={s.nodeTitle}>{n.title}</p>
                <p className={s.mono}>{n.meta}</p>
              </li>
            ))}
          </ol>
          <div className={s.canvasFoot}>
            <span className={s.mono}>esempio di flow</span>
            <span className={s.footValue}>Lavora mentre dormi.</span>
          </div>
        </div>
      </section>

      {/* Bento: stats + services */}
      <section id="servizi" className={`${s.container} ${s.section}`}>
        <header className={s.sectionHead}>
          <p className={s.kicker}>Cosa facciamo</p>
          <h2 className={s.h2}>Strategia, automazioni e dati. Nello stesso posto.</h2>
        </header>
        <div className={s.bento}>
          {STATS.map((st) => (
            <div key={st.label} className={`${s.tile} ${s.tileStat} ${s.reveal}`}>
              <p className={s.statValue}>{st.value}</p>
              <p className={s.statLabel}>{st.label}</p>
              <p className={s.mono}>{st.unit}</p>
            </div>
          ))}
          {SERVICES.map((sv) => (
            <article key={sv.index} className={`${s.tile} ${s.tileService} ${s.reveal}`}>
              <div className={s.tileTop}>
                <span className={s.mono}>{sv.index}</span>
                <span className={s.pill}>{sv.kpi}</span>
              </div>
              <h3 className={s.h3}>{sv.title}</h3>
              <p className={s.body}>{sv.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Tools — the original logos from the live site */}
      <section className={s.toolsRow} aria-label="Strumenti che usiamo">
        <p className={`${s.container} ${s.kicker}`}>Strumenti che usiamo</p>
        <div className={s.marquee}>
          <div className={s.marqueeTrack}>
            {[...LOGOS, ...LOGOS].map((l, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={i}
                src={l.url}
                alt={i < LOGOS.length ? l.name : ""}
                aria-hidden={i >= LOGOS.length}
                title={l.name}
                width={32}
                height={32}
                className={s.toolLogo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Results — a dark island on a light page */}
      <section id="risultati" className={`${s.container} ${s.section}`}>
        <header className={s.sectionHead}>
          <p className={s.kicker}>Case history</p>
          <h2 className={s.h2}>Risultati concreti, non metriche di vanità.</h2>
        </header>
        <article className={`${s.dark} ${s.reveal}`}>
          <div className={s.darkTop}>
            <div>
              <span className={s.pillDark}>{FEATURED.sector}</span>
              <h3 className={s.darkTitle}>{FEATURED.title}</h3>
              <p className={s.darkBody}>{FEATURED.body}</p>
            </div>
            <div className={s.darkStat}>
              <p className={s.bigStat}>{FEATURED.stat}</p>
              <p className={s.monoDark}>{FEATURED.statLabel}</p>
            </div>
          </div>
          <Chart />
          <div className={s.darkMetrics}>
            {FEATURED.metrics.map((m) => (
              <div key={m.lab}>
                <p className={s.darkMetricVal}>{m.val}</p>
                <p className={s.monoDark}>{m.lab}</p>
              </div>
            ))}
            <div className={s.darkTags}>
              {FEATURED.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
          </div>
        </article>
        <div className={s.minis}>
          {MINIS.map((m) => (
            <article key={m.stat} className={`${s.tile} ${s.reveal}`}>
              <p className={s.statValue}>{m.stat}</p>
              <p className={s.statLabel}>{m.statLabel}</p>
              <p className={s.body}>{m.sector}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Method */}
      <section id="metodo" className={`${s.container} ${s.section}`}>
        <header className={s.sectionHead}>
          <p className={s.kicker}>Come lavoriamo</p>
          <h2 className={s.h2}>Il metodo, in tre passaggi.</h2>
        </header>
        <ol className={s.steps}>
          {STEPS.map((st) => (
            <li key={st.num} className={`${s.stepItem} ${s.reveal}`}>
              <span className={s.stepNum}>{st.num}</span>
              <div>
                <h3 className={s.h3}>{st.title}</h3>
                <p className={s.body}>{st.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section id="faq" className={`${s.container} ${s.section} ${s.faqGrid}`}>
        <header className={s.sectionHead}>
          <p className={s.kicker}>FAQ</p>
          <h2 className={s.h2}>Domande frequenti.</h2>
        </header>
        <div className={s.faq}>
          {FAQS.map((f) => (
            <details key={f.q} className={s.faqItem}>
              <summary>{f.q}<span className={s.chev} aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA + footer */}
      <footer className={s.footer}>
        <div className={s.container}>
          <div className={s.ctaRow}>
            <h2 className={s.ctaTitle}>
              Vuoi sapere quanto <mark className={s.markDark}>stai perdendo</mark>?
            </h2>
            <Link href={HERO.cta.href} className={`${s.btn} ${s.btnAccent}`}>
              {HERO.cta.label} <span className={s.arrow} aria-hidden="true">→</span>
            </Link>
          </div>
          <div className={s.footerBottom}>
            <span>reachmedia.it</span>
            <span>Ardit Ndoja · P.IVA IT05405030262 · info@reachmedia.it</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
