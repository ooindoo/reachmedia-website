import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./new-home.module.css";

export const metadata: Metadata = {
  title: "reachmedia.it",
  description: "Reach Media — Treviso, Italia.",
  // Pagina in prova: fuori dall'indice finché non sostituisce la home.
  robots: { index: false, follow: false },
};

// Testo visibile = nome del brand; href = sottocartella interna.
const SECTIONS = [
  { label: "REACHCOMMERCE.IT", href: "/ecommerce" },
  { label: "REACHRETENTION.IT", href: "/email-marketing" },
  { label: "REACHLABS.AI", href: "/ai" },
];

export default function NewHome() {
  return (
    <main className={styles.root}>
      <h1 className={styles.name}>
        <span className={styles.nameInner}>
          REACHMEDIA<span className={styles.tld}>.IT</span>
        </span>
      </h1>

      <nav className={styles.links}>
        {SECTIONS.map((s, i) => (
          // Fragment, non un wrapper: i link e i separatori devono essere
          // figli diretti del flex row perché il `gap` sia uniforme.
          <Fragment key={s.href}>
            {i > 0 && (
              <span className={styles.sep} aria-hidden="true">
                /
              </span>
            )}
            <Link
              href={s.href}
              className={styles.link}
              // Ingresso in sequenza: 0.9s, 1.05s, 1.2s
              style={{ animationDelay: `${0.9 + i * 0.15}s` }}
            >
              {s.label}
            </Link>
          </Fragment>
        ))}
      </nav>

      <p className={styles.footer}>REACH MEDIA · TREVISO, ITALIA</p>
    </main>
  );
}
