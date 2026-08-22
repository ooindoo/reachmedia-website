"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import styles from "./varianti.module.css";

const SECTIONS = [
  { label: "REACHCOMMERCE.IT", href: "/ecommerce" },
  { label: "REACHRETENTION.IT", href: "/email-marketing" },
  { label: "REACHLABS.AI", href: "/ai" },
];

const VARIANTS = [
  {
    id: "vA",
    tab: "A · Underline",
    note: "Attuale. Underline sempre visibile al 25%, che cresce da sinistra a piena opacità su hover; gli altri due link si smorzano. Nessun riquadro, palette a due colori.",
  },
  {
    id: "vB",
    tab: "B · Chip che schiarisce",
    note: "Chip grigio #141414 che passa a #2E2E2E su hover. Il riquadro c'è, ma l'hover aggiunge luce invece di toglierla, così l'elemento puntato legge come attivo e non come disabilitato.",
  },
  {
    id: "vC",
    tab: "C · Chip che si riempie",
    note: "Chip grigio #141414 che su hover si inverte: fondo giallo, testo nero. È il segnale di hover più forte dei tre, ma è anche il più lontano dal minimalismo della pagina.",
  },
] as const;

export default function Varianti() {
  const [variant, setVariant] = useState<(typeof VARIANTS)[number]["id"]>("vA");
  const active = VARIANTS.find((v) => v.id === variant)!;

  return (
    <main className={styles.root}>
      <div className={styles.switcher}>
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setVariant(v.id)}
            aria-pressed={v.id === variant}
            className={`${styles.tab} ${v.id === variant ? styles.tabActive : ""}`}
          >
            {v.tab}
          </button>
        ))}
      </div>

      <h1 className={styles.name}>
        REACHMEDIA<span className={styles.tld}>.IT</span>
      </h1>

      <nav className={`${styles.links} ${styles[variant]}`}>
        {SECTIONS.map((s, i) => (
          <Fragment key={s.href}>
            {i > 0 && (
              <span className={styles.sep} aria-hidden="true">
                /
              </span>
            )}
            <Link href={s.href} className={styles.link}>
              {s.label}
            </Link>
          </Fragment>
        ))}
      </nav>

      <p className={styles.note}>{active.note}</p>

      <p className={styles.footer}>REACH MEDIA · TREVISO, ITALIA</p>
    </main>
  );
}
