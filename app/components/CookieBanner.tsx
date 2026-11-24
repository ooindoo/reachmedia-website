"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "all");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "essential");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      // On mobile it sits above the quiz bar (52px + gaps) so both stay usable
      className="popup-enter tile fixed z-50 left-3 right-3 bottom-[calc(76px+env(safe-area-inset-bottom))] md:bottom-6 md:left-6 md:right-auto md:max-w-[420px] p-5 shadow-[var(--shadow-lift)]"
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
          Gestisci preferenze
        </button>
        <button onClick={accept} className="btn btn-ink h-10 px-4 text-sm rounded-[10px]">
          Accetta tutti
        </button>
      </div>
    </div>
  );
}
