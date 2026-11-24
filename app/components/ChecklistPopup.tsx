"use client";

import { useState, useEffect } from "react";

export default function ChecklistPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("popup-shown")) return;

    const show = () => {
      if (sessionStorage.getItem("popup-shown")) return;
      sessionStorage.setItem("popup-shown", "1");
      setVisible(true);
    };

    const timer = setTimeout(show, 8000);

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      if (total > 0 && scrolled / total >= 0.4) {
        clearTimeout(timer);
        show();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const close = () => setVisible(false);

  const scrollToQuiz = () => {
    close();
    const el = document.getElementById("quiz");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <div
      className="popup-enter tile hidden md:block fixed right-6 bottom-6 z-40 w-[300px] p-6 shadow-[var(--shadow-lift)]"
      role="dialog"
      aria-label="Checklist audit email"
      style={{ transformOrigin: "bottom right" }}
    >
      <button
        onClick={close}
        className="absolute top-3 right-3 w-8 h-8 grid place-items-center rounded-lg text-secondary hover:text-primary hover:bg-bg transition-colors"
        aria-label="Chiudi"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <p className="section-label mb-3">Gratis per te</p>
      <p className="text-base font-semibold tracking-[-0.02em] mb-2 leading-snug pr-6">
        La checklist audit email in 10 punti.
      </p>
      <p className="text-sm text-secondary mb-5 leading-relaxed">
        Scopri dove stai perdendo revenue ogni mese. Fai il quiz e ricevi la tua analisi personalizzata.
      </p>
      <button onClick={scrollToQuiz} className="btn btn-ink w-full">
        Fai il quiz gratis <span className="arrow" aria-hidden="true">→</span>
      </button>
    </div>
  );
}
