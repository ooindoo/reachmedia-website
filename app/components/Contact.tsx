"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";

type Form = {
  name: string;
  email: string;
  revenue: string;
  message: string;
};

const REVENUE_OPTIONS = [
  { value: "", label: "Seleziona il fatturato" },
  { value: "sotto-100k", label: "Sotto 100K" },
  { value: "100k-500k", label: "100K - 500K" },
  { value: "500k-2m", label: "500K - 2M" },
  { value: "oltre-2m", label: "Oltre 2M" },
];

const INPUT_BASE =
  "w-full bg-transparent border-b border-[#2A2A27] text-cream text-sm py-3.5 placeholder-[#3D3D3A] focus:outline-none focus:border-olive transition-colors duration-200 font-sans font-light";

export default function Contact() {
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    revenue: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSent(true);
  };

  return (
    <section id="contatti" className="bg-ink py-24 md:py-32 lg:py-40">
      <div className="container-site">
        <div className="grid md:grid-cols-12 gap-x-8 gap-y-16">

          {/* Left: copy */}
          <FadeIn className="md:col-span-5">
            <span className="section-label" style={{ color: "#7A7A5A" }}>
              Inizia da qui
            </span>
            <h2 className="font-display font-light text-display-sm text-cream mt-6 mb-8 leading-tight">
              Inizia da qui.
            </h2>
            <p className="text-[0.9375rem] text-[#888580] leading-relaxed mb-6 font-light">
              Se hai un e-commerce con un prodotto che merita e senti che
              l&apos;email non sta rendendo quanto dovrebbe, questo è il posto
              giusto per iniziare.
            </p>
            <p className="text-sm text-[#555552] font-light italic font-display">
              Niente call commerciale. Una conversazione per capire se ha senso
              lavorare insieme.
            </p>
          </FadeIn>

          {/* Right: form */}
          <div className="md:col-span-6 md:col-start-7">
            {sent ? (
              <FadeIn className="flex items-start pt-4">
                <div>
                  <div className="w-8 h-px bg-olive mb-8" />
                  <p className="font-display text-display-sm font-light text-cream mb-4">
                    Ricevuto.
                  </p>
                  <p className="text-[#888580] text-sm font-light">
                    Ti rispondo entro 24 ore.
                  </p>
                </div>
              </FadeIn>
            ) : (
              <FadeIn delay={120}>
                <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-sans font-medium uppercase tracking-widest text-[#555552] mb-3">
                      Nome
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Il tuo nome"
                      className={INPUT_BASE}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[10px] font-sans font-medium uppercase tracking-widest text-[#555552] mb-3">
                      Email aziendale
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tua@azienda.it"
                      className={INPUT_BASE}
                    />
                  </div>

                  {/* Revenue select */}
                  <div>
                    <label className="block text-[10px] font-sans font-medium uppercase tracking-widest text-[#555552] mb-3">
                      Fatturato e-commerce annuo
                    </label>
                    <div className="relative">
                      <select
                        name="revenue"
                        required
                        value={form.revenue}
                        onChange={handleChange}
                        className={`${INPUT_BASE} appearance-none pr-8 bg-transparent`}
                        style={{ color: form.revenue ? "#F7F5F2" : "#3D3D3A" }}
                      >
                        {REVENUE_OPTIONS.map((o) => (
                          <option
                            key={o.value}
                            value={o.value}
                            className="bg-ink text-cream"
                          >
                            {o.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                          <path d="M1 1l5 5 5-5" stroke="#555552" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] font-sans font-medium uppercase tracking-widest text-[#555552] mb-3">
                      Messaggio
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Raccontami del tuo brand e di dove ti trovi adesso con l'email."
                      className={`${INPUT_BASE} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-olive text-cream text-sm font-medium hover:bg-olive-dark transition-colors duration-300 disabled:opacity-50 tracking-wide"
                  >
                    {loading ? "Invio in corso..." : "Invia la richiesta"}
                  </button>
                </form>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
