"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";

type Form = { name: string; email: string; message: string };

const INPUT =
  "w-full bg-transparent border-b border-border text-primary text-sm py-3.5 placeholder-[#333] focus:outline-none focus:border-primary transition-colors duration-200";

export default function Contact() {
  const [form, setForm] = useState<Form>({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSent(true);
  };

  return (
    <section id="contatti" className="border-t border-border py-24 md:py-32">
      <div className="container-site">
        <div className="grid md:grid-cols-12 gap-x-8 gap-y-12">
          {/* Left */}
          <FadeIn className="md:col-span-4">
            <p className="section-label mb-4">Contatti</p>
            <h2
              className="font-display tracking-display text-primary mb-6 leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              CONTATTI
            </h2>
            <p className="text-secondary text-sm leading-relaxed mb-8">
              Hai già la checklist e vuoi parlare della tua situazione
              specifica? Scrivici.
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
                    className="font-display tracking-display text-primary mb-3"
                    style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                  >
                    MESSAGGIO INVIATO.
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
                      className={INPUT}
                    />
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
                      className={INPUT}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-secondary uppercase tracking-widest mb-3">
                      Messaggio
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={onChange}
                      placeholder="Descrivi la tua situazione attuale."
                      className={`${INPUT} resize-none`}
                    />
                  </div>
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
