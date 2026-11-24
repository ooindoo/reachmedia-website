"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) {
      setVisible(true);
    }
    // "Preferenze cookie" in the footer reopens the banner
    const reopen = () => setVisible(true);
    window.addEventListener("rm_open_cookie_prefs", reopen);
    return () => window.removeEventListener("rm_open_cookie_prefs", reopen);
  }, []);

  const choose = (value: "all" | "essential") => {
    localStorage.setItem("cookie-consent", value);
    setVisible(false);
    // Starts/stops GA and lets the checklist popup start once this banner is gone
    window.dispatchEvent(new Event("rm_cookie_choice"));
  };
  const accept = () => choose("all");
  const decline = () => choose("essential");

  if (!visible) return null;

  return (
    // On mobile it sits above the quiz bar (60px + gaps) so both stay usable
    <div className="float-layer z-50 bottom-[calc(84px+env(safe-area-inset-bottom))] md:bottom-6">
      <div className="container-site">
        <div
          className="popup-enter glass glass-thick rounded-[18px] p-5 md:max-w-[420px]"
          style={{ transformOrigin: "bottom left" }}
          role="region"
          aria-label="Consenso cookie"
        >
          <p className="text-sm text-secondary leading-relaxed">
            Usiamo cookie tecnici e, con il tuo consenso, cookie analitici per
            migliorare il sito.{" "}
            <Link
              href="/cookie-policy"
              className="text-primary underline underline-offset-4 decoration-border-mid hover:decoration-primary transition-colors"
            >
              Leggi la Cookie Policy
            </Link>
          </p>
          <div className="flex items-center justify-end gap-2 mt-4">
            <button onClick={decline} className="btn btn-ghost h-10 px-4 text-sm rounded-[10px]">
              Solo necessari
            </button>
            <button onClick={accept} className="btn btn-ink h-10 px-4 text-sm rounded-[10px]">
              Accetta tutti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
