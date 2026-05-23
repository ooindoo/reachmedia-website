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
    <div className="popup-enter fixed bottom-5 right-5 z-40 bg-surface border border-border-mid shadow-[0_12px_64px_rgba(0,0,0,0.9)]" style={{ width: "280px" }}>
      <div className="p-7 relative">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-[#444] hover:text-secondary transition-colors text-xs w-6 h-6 flex items-center justify-center"
          aria-label="Chiudi"
        >
          &#x2715;
        </button>

        <p className="text-[10px] text-secondary uppercase tracking-widest mb-4">
          Gratis per te
        </p>

        <p className="text-base text-primary font-medium mb-3 leading-snug pr-6">
          La checklist audit email in 10 punti.
        </p>

        <p className="text-sm text-secondary mb-6 leading-relaxed">
          Scopri esattamente dove stai perdendo revenue ogni mese. Fai il quiz e ricevi la tua analisi personalizzata.
        </p>

        <button
          onClick={scrollToQuiz}
          className="w-full py-4 bg-primary text-bg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Fai il quiz gratis &rarr;
        </button>
      </div>
    </div>
  );
}
