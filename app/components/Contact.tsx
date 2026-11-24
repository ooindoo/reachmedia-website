"use client";

import { useState } from "react";

type Form = { name: string; email: string; message: string };
type Errors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_URL = "https://formspree.io/f/xpqnldne";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="text-sm text-[color:var(--danger)] mt-1.5">{error}</p>}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState<Form>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors((p) => ({ ...p, [name]: undefined }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const newErrors: Errors = {};
    if (!form.name.trim()) newErrors.name = "Il nome è obbligatorio.";
    if (!form.email.trim()) {
      newErrors.email = "L'email è obbligatoria.";
    } else if (!EMAIL_RE.test(form.email)) {
      newErrors.email = "Inserisci un indirizzo email valido.";
    }
    if (!form.message.trim()) newErrors.message = "Il messaggio è obbligatorio.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setServerError(
          data?.errors?.[0]?.message ??
            "Errore nell'invio. Riprova tra qualche minuto."
        );
      }
    } catch {
      setServerError("Errore di rete. Riprova tra qualche minuto.");
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (key: keyof Errors) => `field ${errors[key] ? "field-error" : ""}`;

  return (
    <section id="contatti" className="container-site pt-[var(--section-gap)]">
      <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-start">
        <header>
          <p className="section-label mb-3">Contatti</p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.08] tracking-[-0.04em] font-semibold text-balance">
            Parliamo.
          </h2>
          <p className="mt-4 text-secondary text-[0.9375rem] leading-relaxed max-w-md">
            Vuoi capire se ha senso lavorare insieme? Scrivici: ti rispondiamo entro 24 ore.
          </p>
          <a
            href="mailto:info@reachmedia.it"
            className="inline-flex mt-6 font-mono text-sm text-primary underline underline-offset-4 decoration-border-mid hover:decoration-primary transition-colors"
          >
            info@reachmedia.it
          </a>
        </header>

        <div className="tile p-6 md:p-8">
          {sent ? (
            <div className="quiz-enter" role="status">
              <span className="inline-block w-2.5 h-2.5 rounded-[3px] bg-accent outline outline-1 outline-primary/20 mb-4" />
              <p className="text-2xl font-semibold tracking-[-0.03em] mb-2">Messaggio ricevuto.</p>
              <p className="text-secondary text-[0.9375rem]">Ti rispondiamo entro 24 ore.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
              <Field id="name" label="Nome" error={errors.name}>
                <input
                  id="name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={onChange}
                  placeholder="Il tuo nome"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={fieldClass("name")}
                />
              </Field>

              <Field id="email" label="Email" error={errors.email}>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  placeholder="tua@email.it"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={fieldClass("email")}
                />
              </Field>

              <Field id="message" label="Messaggio" error={errors.message}>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={form.message}
                  onChange={onChange}
                  placeholder="Descrivi la tua situazione attuale."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={fieldClass("message")}
                />
              </Field>

              {serverError && (
                <p className="text-sm text-[color:var(--danger)]" role="alert">{serverError}</p>
              )}

              <button type="submit" disabled={loading} className="btn btn-ink w-full mt-1">
                {loading ? "Invio in corso..." : <>Invia messaggio <span className="arrow" aria-hidden="true">→</span></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
