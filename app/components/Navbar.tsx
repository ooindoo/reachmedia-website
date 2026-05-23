"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/#servizi", label: "Servizi" },
  { href: "/#risultati", label: "Risultati" },
  { href: "/blog", label: "Insights" },
  { href: "/#contatti", label: "Contatti" },
];

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();

  // On non-homepage routes (blog, legal pages) there's no yellow hero —
  // always render in the "scrolled" visual state.
  const isHome = pathname === "/";
  const showYellow = isHome && !scrolled;

  useEffect(() => {
    setIsDark(!document.documentElement.classList.contains("light"));

    const h = () => setScrolled(window.scrollY > 20);
    h(); // set initial state
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  // ── Stili condizionali ──────────────────────────────────────────────────────
  // In cima (hero visibile): sempre giallo #E8FF47 + testo nero, in entrambi i temi.
  // Dopo scroll: dark → #0A0A0A + testo bianco | light → #F5F3EF + testo nero.

  const navBg = showYellow
    ? "bg-[#E8FF47]"
    : "bg-bg/95 backdrop-blur-sm border-b border-border";

  const logoClass = showYellow
    ? "text-[#0A0A0A] hover:opacity-70"
    : "text-primary hover:text-accent";

  const linkClass = showYellow
    ? "text-[#0A0A0A]/70 hover:text-[#0A0A0A]"
    : "text-secondary hover:text-primary";

  const quizBtnClass = showYellow
    ? "border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#E8FF47]"
    : "border border-accent text-accent hover:bg-accent hover:text-bg";

  const toggleClass = showYellow
    ? "text-[#0A0A0A]/60 hover:text-[#0A0A0A]"
    : "text-secondary hover:text-primary";

  const hamburgerBg = showYellow ? "bg-[#0A0A0A]" : "bg-primary";

  const drawerBg = showYellow
    ? "bg-[#E8FF47] border-t border-[#0A0A0A]/15"
    : "bg-bg border-t border-border";

  const drawerLinkClass = showYellow
    ? "text-[#0A0A0A]/70 hover:text-[#0A0A0A]"
    : "text-secondary hover:text-primary";

  const drawerQuizClass = showYellow
    ? "border border-[#0A0A0A] text-[#0A0A0A] text-center hover:bg-[#0A0A0A] hover:text-[#E8FF47]"
    : "border border-accent text-accent text-center hover:bg-accent hover:text-bg";

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="container-site">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link
            href="/"
            className={`font-display text-2xl md:text-3xl tracking-display transition-all duration-200 ${logoClass}`}
          >
            REACHMEDIA.IT
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-underline text-sm transition-colors tracking-wide ${linkClass}`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="#quiz"
              className={`text-sm font-medium px-5 py-2.5 transition-all duration-200 ${quizBtnClass}`}
            >
              Fai il quiz
            </Link>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={`w-8 h-8 flex items-center justify-center transition-colors duration-200 ${toggleClass}`}
              aria-label={isDark ? "Passa alla modalità chiara" : "Passa alla modalità scura"}
              title={isDark ? "Light mode" : "Dark mode"}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`w-8 h-8 flex items-center justify-center transition-colors duration-200 ${toggleClass}`}
              aria-label={isDark ? "Passa alla modalità chiara" : "Passa alla modalità scura"}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="flex flex-col gap-[5px] w-9 h-9 items-center justify-center -mr-1"
              aria-label={open ? "Chiudi menu" : "Apri menu"}
            >
              <span className={`block w-5 h-px transition-all duration-300 ${hamburgerBg} ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`block w-5 h-px transition-all duration-300 ${hamburgerBg} ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-px transition-all duration-300 ${hamburgerBg} ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className={`px-6 py-6 flex flex-col gap-5 ${drawerBg}`}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-sm transition-colors ${drawerLinkClass}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#quiz"
            onClick={() => setOpen(false)}
            className={`text-sm font-medium px-5 py-3 transition-all duration-200 mt-1 ${drawerQuizClass}`}
          >
            Fai il quiz
          </Link>
        </div>
      </div>
    </nav>
  );
}
