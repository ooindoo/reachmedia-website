"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#servizi", label: "Servizi" },
  { href: "#chi-sono", label: "Chi Sono" },
  { href: "#contatti", label: "Contatti" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/96 backdrop-blur-md border-b border-[#EBEBEB]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl font-bold tracking-tight text-[#111111] hover:opacity-70 transition-opacity"
          >
            Reach Media
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#666666] hover:text-[#111111] transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contatti"
              className="text-sm font-medium px-6 py-2.5 bg-[#111111] text-white hover:bg-[#2A2A2A] transition-colors"
            >
              Inizia ora
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 -mr-2"
            aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
          >
            <span
              className={`block w-6 h-px bg-[#111111] transition-all duration-300 origin-center ${
                isOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-[#111111] transition-all duration-300 ${
                isOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-[#111111] transition-all duration-300 origin-center ${
                isOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-[#F0F0F0] px-6 py-8 flex flex-col gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-[#333333] hover:text-[#111111] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contatti"
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium px-6 py-3.5 bg-[#111111] text-white text-center hover:bg-[#2A2A2A] transition-colors mt-2"
          >
            Inizia ora
          </Link>
        </div>
      </div>
    </nav>
  );
}
