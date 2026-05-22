"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contatti" className="section-padding bg-[#0F0F0F]">
      <div className="container-max">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left: Info */}
          <div>
            <div className="eyebrow">
              <div className="w-8 h-px bg-accent" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#666666]">
                Contatti
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
              Inizia il tuo progetto.
            </h2>

            <p className="text-[#888888] leading-relaxed mb-12 text-[0.9375rem]">
              Raccontami del tuo brand e dei tuoi obiettivi. Ti rispondo entro 24 ore per capire
              come posso aiutarti a crescere.
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-[#555555] mb-2">
                  Email
                </p>
                <a
                  href="mailto:ciao@reachmedia.it"
                  className="text-white font-medium hover:text-accent transition-colors duration-200"
                >
                  ciao@reachmedia.it
                </a>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-[#555555] mb-2">
                  Tempo di risposta
                </p>
                <p className="text-[#888888]">Entro 24 ore</p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-widest text-[#555555] mb-2">
                  Disponibilità
                </p>
                <p className="text-[#888888]">Nuovi progetti — aperto</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {submitted ? (
              <div className="h-full flex items-center justify-center min-h-[320px]">
                <div className="text-center">
                  <div className="w-14 h-14 border border-accent flex items-center justify-center mx-auto mb-6">
                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                      <path
                        d="M2 8l5.5 5.5L20 2"
                        stroke="#C9A96E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-3">
                    Messaggio inviato!
                  </h3>
                  <p className="text-[#888888] text-sm">
                    Ti rispondo entro 24 ore. A presto.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {[
                  {
                    name: "name",
                    label: "Nome",
                    type: "text",
                    placeholder: "Il tuo nome",
                    required: true,
                  },
                  {
                    name: "email",
                    label: "Email",
                    type: "email",
                    placeholder: "tua@email.com",
                    required: true,
                  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-[10px] font-medium text-[#666666] uppercase tracking-widest mb-3">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      required={field.required}
                      value={form[field.name as keyof FormState]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full bg-[#191919] border border-[#2A2A2A] text-white text-sm px-4 py-4 placeholder-[#3D3D3D] focus:outline-none focus:border-accent transition-colors duration-200"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-[10px] font-medium text-[#666666] uppercase tracking-widest mb-3">
                    Messaggio
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Raccontami del tuo brand, i tuoi obiettivi e cosa cerchi..."
                    className="w-full bg-[#191919] border border-[#2A2A2A] text-white text-sm px-4 py-4 placeholder-[#3D3D3D] focus:outline-none focus:border-accent transition-colors duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-white text-[#111111] text-sm font-medium hover:bg-accent hover:text-white transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Invio in corso..." : "Invia messaggio"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
