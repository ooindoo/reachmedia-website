"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import s from "./site.module.css";
import { NAV_LINKS } from "./nav";

/**
 * Floating glass header shared by every page. Aligned to the content column;
 * on mobile the links fold into a panel that grows out of the same surface.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);

  // Close on route change and on Escape
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={s.navWrap}>
      <nav className={`glass ${s.nav} ${open ? s.navOpen : ""}`} aria-label="Principale">
        <div className={s.navBar}>
          <Link
            href="/"
            className={s.logo}
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <span className={s.logoDot} aria-hidden="true" />
            <span>
              reachmedia<span className={s.logoTld}>.it</span>
            </span>
          </Link>

          <ul className={s.navLinks}>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={pathname === l.href ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/#quiz" className={`btn btn-ink ${s.navCta}`}>
            Quiz gratuito
          </Link>

          <button
            type="button"
            className={s.burger}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>

        {/* Mobile panel — grid-rows transition stays interruptible */}
        <div id="mobile-menu" className={s.panel} aria-hidden={!open}>
          <div className={s.panelInner}>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
