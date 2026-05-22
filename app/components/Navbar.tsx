"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const LINKS = [
  { href: "#servizi", label: "Servizi" },
  { href: "#risultati", label: "Risultati" },
  { href: "#contatti", label: "Contatti" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link
            href="/"
            className="font-display text-2xl md:text-3xl tracking-display text-primary hover:text-accent transition-colors duration-200"
          >
            REACH MEDIA
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-secondary hover:text-primary transition-colors tracking-wide"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="#quiz"
              className="text-sm font-medium px-5 py-2.5 border border-accent text-accent hover:bg-accent hover:text-bg transition-all duration-200"
            >
              Fai il quiz
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-[5px] w-9 h-9 items-center justify-center -mr-1"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
          >
            <span
              className={`block w-5 h-px bg-primary transition-all duration-300 ${
                open ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-primary transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-primary transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-bg border-t border-border px-6 py-6 flex flex-col gap-5">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-secondary hover:text-primary transition-colors text-sm"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#quiz"
            onClick={() => setOpen(false)}
            className="text-sm font-medium px-5 py-3 border border-accent text-accent text-center hover:bg-accent hover:text-bg transition-all duration-200 mt-1"
          >
            Fai il quiz
          </Link>
        </div>
      </div>
    </nav>
  );
}
