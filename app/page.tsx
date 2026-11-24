import Link from "next/link";
import s from "./components/home/home.module.css";
import {
  HERO, STATS, LOGOS, STEPS, SERVICES, FEATURED, MINIS, FAQS, FLOW, chartPath,
} from "./components/home/content";
import SiteHeader from "./components/site/SiteHeader";
import SiteFooter from "./components/site/SiteFooter";
import Quiz from "./components/Quiz";
import Contact from "./components/Contact";
import StackPanel from "./components/home/StackPanel";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Reach Media",
  "url": "https://reachmedia.it",
  "email": "info@reachmedia.it",
  "description": "Consulenza email marketing, Klaviyo automation e Shopify development per e-commerce premium italiani.",
  "founder": {
    "@type": "Person",
    "name": "Ardit Ndoja",
  },
  "areaServed": "IT",
  "serviceType": ["Email Marketing", "Klaviyo Automation", "Shopify Development"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Reach Media",
  "url": "https://reachmedia.it",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

function Chart() {
  const { line, area, last } = chartPath(FEATURED.series, 480, 160);
  return (
    <svg className={s.chart} viewBox="0 0 480 160" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="home-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#E8FF47" stopOpacity="0.35" />
          <stop offset="1" stopColor="#E8FF47" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#home-fill)" />
      <path d={line} className={s.chartLine} />
      <circle cx={last[0]} cy={last[1]} r="4" className={s.chartDot} />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {[organizationSchema, websiteSchema, faqSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <SiteHeader />

      <main>
        {/* Hero */}
        <section className={`container-site ${s.hero}`}>
          <div>
            <p className={`${s.eyebrow} ${s.enter}`} style={{ ["--i" as string]: 0 }}>{HERO.eyebrow}</p>
            <h1 className={`${s.h1} ${s.enter}`} style={{ ["--i" as string]: 1 }}>
              Email marketing che genera <mark className={s.mark}>revenue</mark>.{" "}
              <span className={s.h1Muted}>{HERO.titleMuted}</span>
            </h1>
            <p className={`${s.lead} ${s.enter}`} style={{ ["--i" as string]: 2 }}>{HERO.body}</p>
            <div className={`${s.heroActions} ${s.enter}`} style={{ ["--i" as string]: 3 }}>
              <Link href={HERO.cta.href} className="btn btn-ink">
                {HERO.cta.label} <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <span className={s.note}>{HERO.note}</span>
            </div>
          </div>

          {/* Automation canvas */}
          <div
            className={`${s.canvas} ${s.enter}`}
            style={{ ["--i" as string]: 2 }}
            role="img"
            aria-label="Esempio di flow Klaviyo per il carrello abbandonato: trigger, attesa di 4 ore, email, filtro sull'ordine"
          >
            <div className={s.canvasHead}>
              <span className={s.mono}>flow / carrello-abbandonato</span>
              {/* Klaviyo's own flow status: a "Live" switch, not a status dot */}
              <span className={s.statusOn}>
                Live
                <span className={s.switch} aria-hidden="true" />
              </span>
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
              <span className={s.footValue}>Attivo 24 ore su 24.</span>
            </div>
          </div>
        </section>

        {/* Bento: stats + services */}
        <section id="servizi" className={`container-site ${s.section}`}>
          <header className={s.sectionHead}>
            <p className="section-label">Cosa facciamo</p>
            <h2 className={s.h2}>Strategia, automazioni e dati. Nello stesso posto.</h2>
          </header>
          <div className={s.bento}>
            {STATS.map((st) => (
              <div key={st.label} className={`${s.tile} ${s.reveal}`}>
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

        {/* Tools — original logos */}
        <section className={`container-site ${s.toolsRow}`} aria-label="Strumenti che usiamo">
          <p className="section-label">Strumenti che usiamo</p>
          <div className={s.marquee}>
            {/* Four identical sets so the strip never runs out on wide screens;
                the track shifts by exactly one set (-25%) and loops seamlessly. */}
            <div className={s.marqueeTrack}>
              {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((l, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={l.url}
                  alt={i < LOGOS.length ? l.name : ""}
                  aria-hidden={i >= LOGOS.length}
                  title={l.name}
                  width={32}
                  height={32}
                  loading="lazy"
                  className={s.toolLogo}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Results — a dark island on the light page */}
        <section id="risultati" className={`container-site ${s.section}`}>
          <header className={s.sectionHead}>
            <p className="section-label">Case history</p>
            <h2 className={s.h2}>Risultati misurati sul fatturato.</h2>
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
        <section id="metodo" className={`container-site ${s.section}`}>
          <header className={s.sectionHead}>
            <p className="section-label">Come lavoriamo</p>
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

        {/* From here the page scrolls as stacked panels: each one holds
            while the next slides over it. */}
        <div className={s.stack}>
          <StackPanel>
            <Quiz />
          </StackPanel>
          <StackPanel>
            {/* FAQ */}
            <section id="faq" className={`container-site ${s.section} ${s.faqGrid}`}>
              <header className={s.sectionHead}>
                <p className="section-label">FAQ</p>
                <h2 className={s.h2}>Domande frequenti.</h2>
              </header>
              <div className={s.faq}>
                {FAQS.map((f) => (
                  <details key={f.q} name="faq" className={s.faqItem}>
                    <summary>{f.q}<span className={s.chev} aria-hidden="true" /></summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </StackPanel>
          <StackPanel sticky={false}>
            <Contact />
          </StackPanel>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
