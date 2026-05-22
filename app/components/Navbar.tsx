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
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-site">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="font-display text-xl md:text-2xl font-semibold tracking-tight text-ink hover:text-olive transition-colors duration-200"
          >
            Reach Media
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted hover:text-ink transition-colors duration-200 tracking-wide"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="#contatti"
              className="text-sm font-medium px-6 py-3 bg-ink text-cream hover:bg-olive transition-colors duration-300"
            >
              Parliamo
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 -mr-1"
          >
            <span
              className={`block w-5 h-px bg-ink transition-all duration-300 origin-center ${
                open ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-ink transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-ink transition-all duration-300 origin-center ${
                open ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-cream border-t border-border px-6 py-8 flex flex-col gap-6">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-muted hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="#contatti"
            onClick={() => setOpen(false)}
            className="mt-2 text-sm font-medium px-6 py-3.5 bg-ink text-cream text-center hover:bg-olive transition-colors duration-300"
          >
            Parliamo
          </Link>
        </div>
      </div>
    </nav>
  );
}
