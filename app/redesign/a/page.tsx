import Link from "next/link";
import s from "./a.module.css";
import {
  HERO, STATS, TOOLS, STEPS, SERVICES, FLOWS, FEATURED, MINIS, FAQS, NAV, chartPath,
} from "../content";

export const metadata = { title: "Redesign A · Graphite" };

function Chart({ className }: { className?: string }) {
  const { line, area, last } = chartPath(FEATURED.series, 320, 120);
  return (
    <svg className={className} viewBox="0 0 320 120" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="a-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#E8FF47" stopOpacity="0.28" />
          <stop offset="1" stopColor="#E8FF47" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[30, 60, 90].map((y) => (
        <line key={y} x1="0" x2="320" y1={y} y2={y} className={s.chartGrid} />
      ))}
      <path d={area} fill="url(#a-fill)" />
      <path d={line} className={s.chartLine} pathLength={1} />
      <circle cx={last[0]} cy={last[1]} r="3.5" className={s.chartDot} />
    </svg>
  );
}

export default function RedesignA() {
  return (
    <div className={s.page}>
      <div className={s.backdrop} aria-hidden="true" />

      {/* Nav — translucent floating layer, content scrolls under it */}
      <header className={s.navWrap}>
        <nav className={s.nav}>
          <Link href="/redesign/a" className={s.logo}>
            <span className={s.logoDot} />
            <span>reachmedia<span className={s.logoTld}>.it</span></span>
          </Link>
          <ul className={s.navLinks}>
            {NAV.map((n) => (
              <li key={n.href}><a href={n.href}>{n.label}</a></li>
            ))}
          </ul>
          <Link href={HERO.cta.href} className={`${s.btn} ${s.btnAccent} ${s.btnSm}`}>Quiz gratuito</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className={s.hero}>
        <div className={s.container}>
          <div className={s.heroGrid}>
            <div className={s.heroCopy}>
              <p className={`${s.eyebrow} ${s.enter}`} style={{ ["--i" as string]: 0 }}>
                <span className={s.pulse} /> {HERO.eyebrow}
              </p>
              <h1 className={`${s.h1} ${s.enter}`} style={{ ["--i" as string]: 1 }}>
                {HERO.title[0]}<br />{HERO.title[1]}{" "}
                <span className={s.h1Muted}>{HERO.titleMuted}</span>
              </h1>
              <p className={`${s.lead} ${s.enter}`} style={{ ["--i" as string]: 2 }}>{HERO.body}</p>
              <div className={`${s.heroActions} ${s.enter}`} style={{ ["--i" as string]: 3 }}>
                <Link href={HERO.cta.href} className={`${s.btn} ${s.btnAccent}`}>
                  {HERO.cta.label} <span aria-hidden="true">→</span>
                </Link>
                <a href="#risultati" className={`${s.btn} ${s.btnGhost}`}>Vedi i risultati</a>
              </div>
              <p className={`${s.note} ${s.enter}`} style={{ ["--i" as string]: 4 }}>{HERO.note}</p>
            </div>

            {/* Console card — the case study as a live dashboard */}
            <div className={`${s.console} ${s.enter}`} style={{ ["--i" as string]: 2 }}>
              <div className={s.consoleBar}>
                <span className={s.dots}><i /><i /><i /></span>
                <span className={s.mono}>klaviyo / revenue · case fashion</span>
                <span className={s.live}>live</span>
              </div>
              <div className={s.consoleBody}>
                <div className={s.kpiRow}>
                  <div>
                    <p className={s.kpiLabel}>Revenue attribuita email</p>
                    <p className={s.kpiValue}>{FEATURED.stat}</p>
                  </div>
                  <span className={s.delta}>▲ 14 mesi</span>
                </div>
                <Chart className={s.chart} />
                <ul className={s.flows}>
                  {FLOWS.map((f, i) => (
                    <li key={f.name} style={{ ["--w" as string]: `${f.share * 2.6}%`, ["--i" as string]: i }}>
                      <span>{f.name}</span>
                      <span className={s.bar}><b /></span>
                      <span className={s.mono}>{f.share}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={s.container}>
        <div className={s.stats}>
          {STATS.map((st) => (
            <div key={st.label} className={`${s.stat} ${s.reveal}`}>
              <p className={s.statLabel}>{st.label}</p>
              <p className={s.statValue}>{st.value}</p>
              <p className={s.statUnit}>{st.unit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools marquee */}
      <section className={s.tools} aria-label="Strumenti che usiamo">
        <p className={`${s.container} ${s.sectionKicker}`}>// strumenti che usiamo</p>
        <div className={s.marquee}>
          <div className={s.marqueeTrack}>
            {[...TOOLS, ...TOOLS].map((t, i) => (
              <span key={i} className={s.chip} aria-hidden={i >= TOOLS.length}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servizi" className={s.section}>
        <div className={s.container}>
          <header className={s.sectionHead}>
            <p className={s.sectionKicker}>// cosa facciamo</p>
            <h2 className={s.h2}>Tre leve, un solo obiettivo: revenue.</h2>
          </header>
          <div className={s.cards}>
            {SERVICES.map((sv) => (
              <article key={sv.index} className={`${s.card} ${s.reveal}`}>
                <div className={s.cardTop}>
                  <span className={s.mono}>{sv.index}</span>
                  <span className={s.kpiChip}>{sv.kpi}</span>
                </div>
                <h3 className={s.h3}>{sv.title}</h3>
                <p className={s.body}>{sv.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section id="risultati" className={s.section}>
        <div className={s.container}>
          <header className={s.sectionHead}>
            <p className={s.sectionKicker}>// case history</p>
            <h2 className={s.h2}>Risultati concreti.</h2>
          </header>
          <article className={`${s.featured} ${s.reveal}`}>
            <div className={s.featuredData}>
              <p className={s.kpiLabel}>{FEATURED.statLabel}</p>
              <p className={s.featuredStat}>{FEATURED.stat}</p>
              <Chart className={s.chartLarge} />
              <div className={s.metrics}>
                {FEATURED.metrics.map((m) => (
                  <div key={m.lab}>
                    <p className={s.metricVal}>{m.val}</p>
                    <p className={s.statUnit}>{m.lab}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={s.featuredText}>
              <span className={s.kpiChip}>{FEATURED.sector}</span>
              <h3 className={s.h3Lg}>{FEATURED.title}</h3>
              <p className={s.body}>{FEATURED.body}</p>
              <div className={s.tags}>
                {FEATURED.tags.map((t) => <span key={t} className={s.tag}>{t}</span>)}
              </div>
            </div>
          </article>
          <div className={s.minis}>
            {MINIS.map((m) => (
              <article key={m.stat} className={`${s.card} ${s.reveal}`}>
                <p className={s.miniStat}>{m.stat}</p>
                <p className={s.statUnit}>{m.statLabel}</p>
                <p className={s.miniSector}>{m.sector}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Method — a pipeline, not a list */}
      <section id="metodo" className={s.section}>
        <div className={s.container}>
          <header className={s.sectionHead}>
            <p className={s.sectionKicker}>// come lavoriamo</p>
            <h2 className={s.h2}>Il metodo.</h2>
          </header>
          <ol className={s.pipeline}>
            {STEPS.map((st) => (
              <li key={st.num} className={`${s.step} ${s.reveal}`}>
                <span className={s.node}>{st.num}</span>
                <h3 className={s.h3}>{st.title}</h3>
                <p className={s.body}>{st.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className={s.container}>
        <div className={`${s.cta} ${s.reveal}`}>
          <div>
            <h2 className={s.ctaTitle}>Vuoi sapere quanto stai perdendo?</h2>
            <p className={s.ctaNote}>Ci vogliono 3 minuti. Nessun impegno.</p>
          </div>
          <Link href={HERO.cta.href} className={`${s.btn} ${s.btnDark}`}>
            {HERO.cta.label} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={s.section}>
        <div className={`${s.container} ${s.faqGrid}`}>
          <header className={s.sectionHead}>
            <p className={s.sectionKicker}>// faq</p>
            <h2 className={s.h2}>Domande frequenti.</h2>
          </header>
          <div className={s.faq}>
            {FAQS.map((f) => (
              <details key={f.q} className={s.faqItem}>
                <summary>{f.q}<span className={s.plus} aria-hidden="true" /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className={s.footer}>
        <div className={`${s.container} ${s.footerInner}`}>
          <span className={s.logo}><span className={s.logoDot} /><span>reachmedia<span className={s.logoTld}>.it</span></span></span>
          <span className={s.mono}>Ardit Ndoja · P.IVA IT05405030262 · info@reachmedia.it</span>
        </div>
      </footer>
    </div>
  );
}
