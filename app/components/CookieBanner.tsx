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
    <div className="fixed bottom-0 inset-x-0 z-50 bg-surface border-t border-border">
      <div className="container-site py-4 md:py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <p className="text-xs text-secondary flex-1 leading-relaxed">
          Usiamo cookie tecnici e, con il tuo consenso, cookie analitici per
          migliorare il sito.{" "}
          <Link
            href="/cookie-policy"
            className="underline hover:text-primary transition-colors"
          >
            Leggi la Cookie Policy
          </Link>
        </p>
        <div className="flex items-center gap-5 flex-shrink-0">
          <button
            onClick={decline}
            className="text-xs text-[#444] hover:text-secondary transition-colors"
          >
            Gestisci preferenze
          </button>
          <button
            onClick={accept}
            className="px-6 py-2.5 bg-accent text-bg text-xs font-medium hover:bg-accent-hover transition-colors"
          >
            Accetta tutti
          </button>
        </div>
      </div>
    </div>
  );
}
