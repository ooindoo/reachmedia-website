"use client";

import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Inserisci la tua email.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("Formato email non valido.");
      return;
    }
    setError("");
    try {
      const existing: string[] = JSON.parse(
        localStorage.getItem("rm_newsletter_emails") ?? "[]"
      );
      if (!existing.includes(email)) {
        existing.push(email);
        localStorage.setItem("rm_newsletter_emails", JSON.stringify(existing));
      }
    } catch {
      // localStorage not available — proceed anyway
    }
    setDone(true);
  };

  return (
    <div className="border-t border-border py-10 mb-10">
      <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Left: copy */}
        <div>
          <h3 className="font-display tracking-display text-primary leading-tight mb-2 text-2xl">
            INSIGHTS MENSILI
          </h3>
          <p className="text-xs text-secondary leading-relaxed">
            Un approfondimento al mese su email marketing ed ecommerce.
            Niente spam, solo roba utile.
          </p>
        </div>

        {/* Right: form */}
        <div>
          {done ? (
            <p className="text-sm text-secondary">Aggiunto alla lista. Grazie.</p>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="tua@email.it"
                  className="flex-1 bg-transparent border-b border-border text-primary text-sm py-3 placeholder-[#555] focus:outline-none focus:border-primary transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="sm:shrink-0 px-6 py-3 bg-[#E8FF47] text-[#0A0A0A] text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Iscriviti
                </button>
              </div>
              {error && (
                <p className="text-xs text-red-400 mt-2">{error}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
