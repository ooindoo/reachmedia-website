import Link from "next/link";
import s from "./site.module.css";
import BrandMark from "./BrandMark";
import FooterNewsletter from "./FooterNewsletter";
import { NAV_LINKS } from "./nav";
import CookiePrefsButton from "./CookiePrefsButton";

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/termini", label: "Termini di Servizio" },
];

export default function SiteFooter({ showCta = true }: { showCta?: boolean }) {
  const year = new Date().getFullYear();

  return (
    <footer className={s.footer}>
      <div className="container-site">
        {showCta && (
          <div className={s.ctaRow}>
            <h2 className={s.ctaTitle}>
              Quanto può <span className={s.ctaMark}>rendere</span> la tua email?
            </h2>
            <Link href="/#quiz" className="btn btn-accent">
              Valuta il tuo email marketing <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        )}

        <div className={s.footerGrid}>
          <div className={s.footerBrand}>
            <Link href="/" className={s.logo}>
              <BrandMark size={18} />
              <span>
                reachmedia<span className={s.logoTldDark}>.it</span>
              </span>
            </Link>
            <p>Email marketing e Klaviyo per e-commerce premium italiani.</p>
          </div>

          <div>
            <p className={s.footerHead}>Navigazione</p>
            <ul className={s.footerList}>
              <li><Link href="/">Home</Link></li>
              {NAV_LINKS.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className={s.footerHead}>Legal</p>
            <ul className={s.footerList}>
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
              <li><CookiePrefsButton className={s.footerLinkButton} /></li>
            </ul>
          </div>

          <FooterNewsletter />
        </div>

        <div className={s.footerBottom}>
          <span>© {year} Reach Media · Ardit Ndoja · P.IVA IT05405030262</span>
          <a href="mailto:info@reachmedia.it">info@reachmedia.it</a>
        </div>
      </div>
    </footer>
  );
}
