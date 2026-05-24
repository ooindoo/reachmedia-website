"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";

type Form = { name: string; email: string; message: string };
type Errors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_URL = "https://formspree.io/f/xpqnldne";

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

  // Field wrapper: label + input + error
  const Field = ({
    id,
    label,
    error,
    children,
  }: {
    id: string;
    label: string;
    error?: string;
    children: React.ReactNode;
  }) => (
    <div>
      <label
        htmlFor={id}
        className="block font-display tracking-[0.14em] mb-3"
        style={{ fontSize: "11px", color: "#888888" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-400 mt-2">{error}</p>
      )}
    </div>
  );

  return (
    <section id="contatti" className="border-t border-border py-12 md:py-32">
      <div className="container-site">
        <div className="grid md:grid-cols-12 gap-x-8 gap-y-12">
          {/* Left */}
          <FadeIn className="md:col-span-4">
            <h2
              className="font-display tracking-display text-primary leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              PARLIAMO
            </h2>
            <p className="text-secondary text-sm leading-relaxed mt-6">
              Vuoi capire se ha senso lavorare insieme? Scrivici.
            </p>
          </FadeIn>

          {/* Form */}
          <div className="md:col-span-6 md:col-start-6">
            <FadeIn delay={120}>
              {/* Border wrapper that distinguishes the form from the section */}
              <div className="border border-border p-7 md:p-10">
                {sent ? (
                  <div>
                    <p
                      className="font-display tracking-display text-accent mb-3"
                      style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                    >
                      MESSAGGIO RICEVUTO.
                    </p>
                    <p className="text-secondary text-sm">
                      Ti rispondo entro 24 ore.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
                    <Field id="name" label="Nome" error={errors.name}>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={onChange}
                        placeholder="Il tuo nome"
                        className={`contact-input${errors.name ? " contact-input--error" : ""}`}
                      />
                    </Field>

                    <Field id="email" label="Email" error={errors.email}>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={onChange}
                        placeholder="tua@email.it"
                        className={`contact-input${errors.email ? " contact-input--error" : ""}`}
                      />
                    </Field>

                    <Field id="message" label="Messaggio" error={errors.message}>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={form.message}
                        onChange={onChange}
                        placeholder="Descrivi la tua situazione attuale."
                        className={`contact-input${errors.message ? " contact-input--error" : ""}`}
                      />
                    </Field>

                    {serverError && (
                      <p className="text-xs text-red-400">{serverError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full h-14 bg-accent text-bg font-display tracking-display text-xl hover:opacity-90 transition-opacity disabled:opacity-50 mt-1"
                    >
                      {loading ? "INVIO IN CORSO..." : "INVIA"}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
