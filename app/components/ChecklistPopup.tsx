"use client";

import { useState, useEffect } from "react";

export default function ChecklistPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("popup-shown")) return;

    let timer: ReturnType<typeof setTimeout> | undefined;

    const show = () => {
      if (sessionStorage.getItem("popup-shown")) return;
      sessionStorage.setItem("popup-shown", "1");
      setVisible(true);
    };

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      if (total > 0 && scrolled / total >= 0.4) {
        clearTimeout(timer);
        show();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    // Same triggers as before (8s or 40% scroll), but counted from the
    // cookie choice: the two cards never share the screen.
    const arm = () => {
      timer = setTimeout(show, 8000);
      window.addEventListener("scroll", handleScroll, { passive: true });
    };

    if (localStorage.getItem("cookie-consent")) arm();
    else window.addEventListener("rm_cookie_choice", arm, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("rm_cookie_choice", arm);
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
    <div className="float-layer hidden md:block z-40 bottom-6">
      <div className="container-site flex justify-end">
        <div
          className="popup-enter glass glass-thick relative rounded-[18px] w-[300px] p-6"
          role="dialog"
          aria-label="Checklist audit email"
          style={{ transformOrigin: "bottom right" }}
        >
          <button
            onClick={close}
            className="absolute top-3 right-3 w-8 h-8 grid place-items-center rounded-lg text-secondary hover:text-primary hover:bg-black/5 transition-colors"
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
      </div>
    </div>
  );
}
