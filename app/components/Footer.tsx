import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "#servizi", label: "Servizi" },
  { href: "#risultati", label: "Risultati" },
  { href: "#contatti", label: "Contatti" },
];

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/termini", label: "Termini di Servizio" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container-site py-16 md:py-20">
        {/* 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Col 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-display text-xl tracking-display text-primary block mb-4 hover:text-accent transition-colors"
            >
              REACH MEDIA
            </Link>
            <p className="text-xs text-secondary leading-relaxed mb-4">
              Email marketing e Klaviyo per e-commerce premium italiani.
            </p>
            <p className="text-xs text-[#444]">P.IVA IT12345670151</p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p className="text-[10px] text-secondary uppercase tracking-widest mb-5">
              Navigazione
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-xs text-secondary hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div>
            <p className="text-[10px] text-secondary uppercase tracking-widest mb-5">
              Legal
            </p>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-xs text-secondary hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contacts */}
          <div>
            <p className="text-[10px] text-secondary uppercase tracking-widest mb-5">
              Contatti
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@reachmedia.it"
                  className="text-xs text-secondary hover:text-primary transition-colors"
                >
                  info@reachmedia.it
                </a>
              </li>
              <li>
                <p className="text-xs text-secondary">Treviso, Italia</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-[#444]">
            {year} Reach Media. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="text-xs text-[#444] hover:text-secondary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/cookie-policy"
              className="text-xs text-[#444] hover:text-secondary transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
