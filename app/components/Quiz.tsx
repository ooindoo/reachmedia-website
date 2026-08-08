"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";

const QUESTIONS = [
  {
    q: "Quanto fattura il tuo e-commerce ogni anno?",
    options: ["Meno di 100K", "100K a 500K", "500K a 2M", "Oltre 2M"],
    scores: [0, 1, 2, 3],
  },
  {
    q: "Che piattaforma usi?",
    options: [
      "Shopify",
      "WooCommerce",
      "Magento o altra",
      "Non ho ancora un e-commerce",
    ],
    scores: [3, 2, 1, 0],
  },
  {
    q: "Come gestisci le email oggi?",
    options: [
      "Non mando email",
      "Mando newsletter manuali ogni tanto",
      "Ho Klaviyo ma non uso i flow automatici",
      "Ho flow attivi e mando campagne regolari",
    ],
    scores: [0, 1, 2, 3],
  },
  {
    q: "Qual è il tuo obiettivo principale con l'email?",
    options: [
      "Iniziare da zero",
      "Migliorare quello che ho già",
      "Scalare un sistema che funziona",
      "Capire se vale la pena investirci",
    ],
    scores: [0, 1, 3, 0],
  },
  {
    q: "Quanto del tuo fatturato viene dall'email marketing?",
    options: [
      "Non lo so",
      "Meno del 5%",
      "Tra il 5% e il 20%",
      "Oltre il 20%",
    ],
    scores: [0, 1, 2, 3],
  },
];

const RESULTS = [
  {
    min: 0,
    max: 5,
    title: "IL TUO EMAIL MARKETING NON ESISTE ANCORA.",
    body: "Hai un potenziale significativo non sfruttato. Con un e-commerce attivo, un sistema email ben costruito genera mediamente tra il 15% e il 30% del fatturato totale. Parti dalla guida gratuita per capire da dove iniziare.",
    cta: {
      type: "low" as const,
      primary: { label: "Scarica la guida gratuita", href: "/rm_guida_zero.pdf" },
      secondary: { label: "Parliamo, ti dico da dove partire", href: "#contatti" },
    },
  },
  {
    min: 6,
    max: 10,
    title: "STAI LASCIANDO SOLDI SUL TAVOLO OGNI MESE.",
    body: "Hai le basi ma i gap sono significativi. Flow incompleti, segmentazione assente o campagne non ottimizzate si traducono in revenue persa ogni settimana. La checklist ti mostra esattamente dove intervenire.",
    cta: {
      type: "mid" as const,
      primary: { label: "Scarica la checklist", href: "/rm_checklist.pdf" },
    },
  },
  {
    min: 11,
    max: 15,
    title: "STAI LAVORANDO BENE. MA C'È ANCORA MARGINE.",
    body: "Il tuo email marketing è già un canale attivo. Le ottimizzazioni avanzate (segmentazione predittiva, test sistematici, espansione internazionale) sono il prossimo livello. Scarica i flow avanzati per identificare i gap residui.",
    cta: {
      type: "high" as const,
      primary: { label: "Scarica i flow avanzati", href: "/rm_flow_avanzati.pdf" },
    },
  },
];

type Phase = "quiz" | "form" | "result";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>("quiz");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const total = scores.reduce((a, b) => a + b, 0);
  const result =
    RESULTS.find((r) => total >= r.min && total <= r.max) ?? RESULTS[1];

  const pick = (score: number, answer: string, idx: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(idx);
    setTimeout(() => {
      const nextScores = [...scores, score];
      const nextAnswers = [...answers, answer];
      setScores(nextScores);
      setAnswers(nextAnswers);
      setSelectedIndex(null);
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1);
      } else {
        setPhase("form");
      }
    }, 280);
  };

  const restart = () => {
    setStep(0);
    setScores([]);
    setAnswers([]);
    setPhase("quiz");
    setSelectedIndex(null);
    setName("");
    setEmail("");
    setErrors({});
  };

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validazione campi
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) newErrors.name = "Il nome è obbligatorio.";
    if (!email.trim()) {
      newErrors.email = "L'email è obbligatoria.";
    } else if (!EMAIL_RE.test(email)) {
      newErrors.email = "Inserisci un indirizzo email valido.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    // VhAfyx è la public company key — già visibile nel sorgente tramite klaviyo.js
    const apiKey = process.env.NEXT_PUBLIC_KLAVIYO_API_KEY ?? "VhAfyx";
    const listId = process.env.NEXT_PUBLIC_KLAVIYO_LIST_ID ?? "YqRu4p";

    if (apiKey) {
      // Costruisce le proprietà custom del profilo con le risposte al quiz
      const quizProperties: Record<string, string | number> = {};
      QUESTIONS.forEach((q, i) => {
        quizProperties[`quiz_q${i + 1}_domanda`] = q.q;
        quizProperties[`quiz_q${i + 1}_risposta`] = answers[i] ?? "";
      });
      quizProperties["quiz_score"] = total;
      quizProperties["quiz_result"] = result.title;
      quizProperties["quiz_source"] = "Quiz Reach Media";

      const profileAttributes = {
        email,
        first_name: name,
        properties: quizProperties,
      };

      const payload = {
        data: {
          type: "subscription",
          attributes: {
            custom_source: "Quiz Reach Media",
            profile: {
              data: {
                type: "profile",
                attributes: profileAttributes,
              },
            },
          },
          ...(listId && {
            relationships: {
              list: {
                data: {
                  type: "list",
                  id: listId,
                },
              },
            },
          }),
        },
      };

      try {
        await fetch(
          `https://a.klaviyo.com/client/subscriptions/?company_id=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              revision: "2024-02-15",
            },
            body: JSON.stringify(payload),
          }
        );
      } catch (err) {
        console.error("Klaviyo subscription error:", err);
      }
    }

    setLoading(false);
    localStorage.setItem("rm_quiz_completed", "1");
    window.dispatchEvent(new Event("rm_quiz_done"));
    setPhase("result");
  };

  const INPUT =
    "w-full bg-transparent border-b border-border text-primary text-sm py-3 placeholder-[#333] focus:outline-none focus:border-primary transition-colors duration-200";

  return (
    <section id="quiz" className="border-t border-border py-12 md:py-32">
      <div className="container-site">
        <FadeIn className="mb-8 md:mb-14">
          <h2
            className="font-display tracking-display text-primary leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            QUANTO STA RENDENDO
            <br />
            IL TUO EMAIL MARKETING?
          </h2>
          <p className="text-secondary mt-4 text-sm">
            5 domande. Risultato personalizzato in meno di 2 minuti.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-[7fr_5fr] gap-12 items-start">
          {/* Left: quiz UI */}
          <div>
            {/* QUIZ */}
            {phase === "quiz" && (
              <>
                {/* Segment progress bar */}
                <div className="flex gap-[3px] mb-10">
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-0.5 flex-1 transition-colors duration-300 ${
                        i < step
                          ? "bg-primary"
                          : i === step
                          ? "bg-accent"
                          : "bg-border"
                      }`}
                    />
                  ))}
                </div>

                {/* Question */}
                <div key={step} className="quiz-enter">
                  <p className="text-base md:text-lg text-primary leading-relaxed mb-1">
                    {QUESTIONS[step].q}
                  </p>
                  <p className="text-xs mb-8" style={{ color: "#666666" }}>
                    Scegli una risposta
                  </p>
                  <div className="divide-y divide-border border border-border">
                    {QUESTIONS[step].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => pick(QUESTIONS[step].scores[i], opt, i)}
                        className={`w-full text-left px-5 py-4 min-h-[52px] transition-all duration-200 text-sm group ${
                          selectedIndex === i
                            ? "bg-surface text-primary shadow-[inset_2px_0_0_rgb(var(--color-accent))]"
                            : "text-secondary hover:text-primary hover:bg-surface"
                        }`}
                      >
                        <span
                          className={`font-display tracking-display text-xs mr-3 transition-colors duration-200 ${
                            selectedIndex === i
                              ? "text-accent"
                              : "text-[#444] group-hover:text-primary"
                          }`}
                        >
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* FORM — shown before result */}
            {phase === "form" && (
              <div key="form" className="quiz-enter border border-border p-7 md:p-8">
                <p className="text-[10px] text-secondary uppercase tracking-widest mb-2">
                  Quasi fatto
                </p>
                <p className="text-sm text-secondary mb-6 leading-relaxed">
                  Inserisci i tuoi dati per vedere il risultato personalizzato e scaricare la checklist.
                </p>
                <form onSubmit={handleForm} className="space-y-6" noValidate>
                  <div>
                    <label className="block text-[10px] text-secondary uppercase tracking-widest mb-3">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: undefined })); }}
                      placeholder="Il tuo nome"
                      className={`${INPUT} ${errors.name ? "border-red-400 focus:border-red-400" : ""}`}
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1.5">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] text-secondary uppercase tracking-widest mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: undefined })); }}
                      placeholder="tua@email.it"
                      className={`${INPUT} ${errors.email ? "border-red-400 focus:border-red-400" : ""}`}
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-primary text-bg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {loading ? "Un attimo..." : "Mostra il mio risultato"}
                  </button>
                </form>
              </div>
            )}

            {/* RESULT — shown after form */}
            {phase === "result" && (
              <div key="result" className="quiz-enter">
                <div className="border-t border-primary pt-8 mb-8">
                  <p className="section-label mb-4">Il tuo risultato</p>
                  <h3
                    className="font-display tracking-display text-primary leading-tight mb-6"
                    style={{ fontSize: "clamp(1.6rem, 3.5vw, 3rem)" }}
                  >
                    {result.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed mb-8">
                    {result.body}
                  </p>

                  <a
                    href={result.cta.primary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-7 py-4 bg-primary text-bg text-sm font-medium hover:opacity-90 transition-opacity duration-200 group"
                  >
                    {result.cta.primary.label}
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </a>

                  {result.cta.type === "low" && (
                    <div className="mt-5">
                      <a
                        href={result.cta.secondary.href}
                        className="text-sm text-secondary hover:text-primary underline underline-offset-4 transition-colors duration-200"
                      >
                        {result.cta.secondary.label}
                      </a>
                    </div>
                  )}
                </div>
                <button
                  onClick={restart}
                  className="text-xs text-[#444] hover:text-secondary transition-colors"
                >
                  Rifai il quiz
                </button>
              </div>
            )}
          </div>

          {/* Right: deliverables panel (sticky) */}
          <div className="hidden md:block">
            <div className="border border-border p-8 sticky top-36">
              <p className="text-[0.6875rem] font-bold tracking-[0.14em] uppercase text-secondary mb-6">
                Al completamento ricevi
              </p>
              {[
                { num: "01", title: "Score personalizzato", desc: "Un punteggio da 0 a 100 sulla salute del tuo email marketing." },
                { num: "02", title: "Gap analysis", desc: "Le 3 opportunità di revenue che stai lasciando sul tavolo." },
                { num: "03", title: "Benchmark di settore", desc: "Confronto anonimizzato con brand simili al tuo." },
              ].map((d) => (
                <div key={d.num} className="flex items-start gap-4 mb-5 last:mb-0">
                  <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-[0.625rem] font-bold text-secondary flex-shrink-0 mt-0.5">
                    {d.num}
                  </div>
                  <div className="text-[0.8125rem] text-secondary leading-relaxed">
                    <strong className="text-primary font-medium block mb-0.5">{d.title}</strong>
                    {d.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
