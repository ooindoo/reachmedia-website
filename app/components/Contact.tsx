"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";

type Form = { name: string; email: string; message: string };
type Errors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FORMSPREE_URL = "https://formspree.io/f/xpqnldne";

const INPUT =
  "w-full bg-transparent border-b border-border text-primary text-sm py-3.5 placeholder-[#333] focus:outline-none focus:border-primary transition-colors duration-200";

const INPUT_ERR =
  "w-full bg-transparent border-b border-red-400 text-primary text-sm py-3.5 placeholder-[#333] focus:outline-none focus:border-red-400 transition-colors duration-200";

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

    // Validazione client-side
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
            "Errore nell'invio. Riprova o scrivi a info@reachmedia.it."
        );
      }
    } catch {
      setServerError("Errore di rete. Riprova o scrivi a info@reachmedia.it.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contatti" className="bg-contact-section border-t border-border py-20">
      <div className="container-site">
        <div className="grid md:grid-cols-12 gap-x-8 gap-y-12">
          {/* Left */}
          <FadeIn className="md:col-span-4">
            <h2
              className="font-display tracking-display text-primary mb-6 leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              PARLIAMO
            </h2>
            <p className="text-secondary text-sm leading-relaxed mb-8">
              Vuoi capire se ha senso lavorare insieme? Scrivici.
            </p>
            <div>
              <p className="text-[10px] text-secondary uppercase tracking-widest mb-2">
                Email
              </p>
              <a
                href="mailto:info@reachmedia.it"
                className="text-primary hover:text-secondary transition-colors text-sm"
              >
                info@reachmedia.it
              </a>
            </div>
          </FadeIn>

          {/* Form */}
          <div className="md:col-span-6 md:col-start-6">
            <FadeIn delay={120}>
              {sent ? (
                <div className="border-t-2 border-primary pt-8">
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
                <form onSubmit={onSubmit} className="space-y-8" noValidate>
                  <div>
                    <label className="block text-[10px] text-secondary uppercase tracking-widest mb-3">
                      Nome
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={onChange}
                      placeholder="Il tuo nome"
                      className={errors.name ? INPUT_ERR : INPUT}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] text-secondary uppercase tracking-widest mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={onChange}
                      placeholder="tua@email.it"
                      className={errors.email ? INPUT_ERR : INPUT}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[10px] text-secondary uppercase tracking-widest mb-3">
                      Messaggio
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={onChange}
                      placeholder="Descrivi la tua situazione attuale."
                      className={`${errors.message ? INPUT_ERR : INPUT} resize-none`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400 mt-1.5">{errors.message}</p>
                    )}
                  </div>

                  {serverError && (
                    <p className="text-xs text-red-400">{serverError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-primary text-bg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 tracking-wide"
                  >
                    {loading ? "Invio in corso..." : "Invia"}
                  </button>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
