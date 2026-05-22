"use client";

import { useState, useEffect } from "react";

type Phase = "popup" | "form" | "sent";

export default function ChecklistPopup() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<Phase>("popup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setPhase("sent");
  };

  if (!visible) return null;

  return (
    <div className="popup-enter fixed bottom-5 right-5 z-40 w-76 bg-surface border border-border-mid shadow-[0_8px_48px_rgba(0,0,0,0.7)]">
      <div className="p-6 relative">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-[#444] hover:text-secondary transition-colors text-xs w-6 h-6 flex items-center justify-center"
          aria-label="Chiudi"
        >
          &#x2715;
        </button>

        {phase === "popup" && (
          <>
            <p className="text-[10px] text-accent uppercase tracking-widest mb-3">
              Gratis per te
            </p>
            <p className="text-sm text-primary font-medium mb-2 leading-snug pr-6">
              La checklist audit email in 10 punti.
            </p>
            <p className="text-xs text-secondary mb-5 leading-relaxed">
              Scopri dove stai perdendo revenue ogni mese.
            </p>
            <button
              onClick={() => setPhase("form")}
              className="w-full py-3 bg-accent text-bg text-xs font-medium hover:bg-accent-hover transition-colors"
            >
              Scarica ora
            </button>
          </>
        )}

        {phase === "form" && (
          <form onSubmit={submit} className="space-y-4" noValidate>
            <p className="text-xs text-secondary mb-4 pr-6">
              Inserisci i tuoi dati.
            </p>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
              className="w-full bg-transparent border-b border-border text-primary text-xs py-2.5 placeholder-[#333] focus:outline-none focus:border-accent transition-colors"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email aziendale"
              className="w-full bg-transparent border-b border-border text-primary text-xs py-2.5 placeholder-[#333] focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-accent text-bg text-xs font-medium hover:bg-accent-hover transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? "..." : "Invia la checklist"}
            </button>
          </form>
        )}

        {phase === "sent" && (
          <div>
            <p className="font-display text-xl tracking-display text-accent mb-2">
              CONTROLLA L&apos;EMAIL.
            </p>
            <p className="text-xs text-secondary">
              Ti abbiamo mandato la checklist.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
