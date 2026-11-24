"use client";

import { useState } from "react";
import s from "./site.module.css";
import { subscribeToKlaviyo, KLAVIYO_LISTS } from "../../lib/klaviyo";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
    setLoading(true);
    const ok = await subscribeToKlaviyo({
      email,
      source: "Newsletter footer Reach Media",
      listId: KLAVIYO_LISTS.newsletter,
    });
    setLoading(false);
    if (ok) setDone(true);
    else setError("Iscrizione non riuscita. Riprova tra qualche minuto.");
  };

  return (
    <div className={s.newsletter}>
      <p className={s.footerHead}>Insights mensili</p>
      <p className={s.newsletterCopy}>
        Un approfondimento al mese su email marketing ed e-commerce. Niente spam, solo roba utile.
      </p>
      {done ? (
        <p className={s.newsletterDone}>Aggiunto alla lista. Grazie.</p>
      ) : (
        <form onSubmit={handleSubmit} noValidate className={s.newsletterForm}>
          <label htmlFor="newsletter-email" className="sr-only">Email</label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder="tua@email.it"
            aria-invalid={!!error}
            className={s.newsletterInput}
          />
          <button type="submit" disabled={loading} className="btn btn-accent">
            {loading ? "Un attimo..." : "Iscriviti"}
          </button>
        </form>
      )}
      {error && <p className={s.newsletterError} role="alert">{error}</p>}
    </div>
  );
}
