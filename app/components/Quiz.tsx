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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const total = scores.reduce((a, b) => a + b, 0);
  const result =
    RESULTS.find((r) => total >= r.min && total <= r.max) ?? RESULTS[1];

  const pick = (score: number, answer: string) => {
    const nextScores = [...scores, score];
    const nextAnswers = [...answers, answer];
    setScores(nextScores);
    setAnswers(nextAnswers);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setPhase("form");
    }
  };

  const restart = () => {
    setStep(0);
    setScores([]);
    setAnswers([]);
    setPhase("quiz");
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

    const apiKey = process.env.NEXT_PUBLIC_KLAVIYO_API_KEY;
    const listId = process.env.NEXT_PUBLIC_KLAVIYO_LIST_ID;

    console.log("[Klaviyo debug] NEXT_PUBLIC_KLAVIYO_API_KEY:", apiKey ?? "undefined/missing");
    console.log("[Klaviyo debug] NEXT_PUBLIC_KLAVIYO_LIST_ID:", listId ?? "undefined/missing");

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
        console.log("[Klaviyo debug] payload:", JSON.stringify(payload, null, 2));
        const res = await fetch(
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
        const text = await res.text();
        console.log("[Klaviyo debug] response status:", res.status, res.statusText);
        console.log("[Klaviyo debug] response body:", text || "(empty — success)");
      } catch (err) {
        console.error("[Klaviyo debug] fetch error:", err);
      }
    }

    setLoading(false);
    setPhase("result");
  };

  const INPUT =
    "w-full bg-transparent border-b border-border text-primary text-sm py-3 placeholder-[#333] focus:outline-none focus:border-primary transition-colors duration-200";

  return (
    <section id="quiz" className="border-t border-border py-14 md:py-32">
      <div className="container-site">
        <FadeIn className="mb-8 md:mb-14">
          <p className="section-label mb-4">Quiz</p>
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

        <div className="max-w-xl">
          {/* QUIZ */}
          {phase === "quiz" && (
            <>
              {/* Progress */}
              <div className="mb-10">
                <div className="flex justify-between text-xs text-secondary mb-2">
                  <span>
                    Domanda {step + 1} di {QUESTIONS.length}
                  </span>
                  <span>{Math.round((step / QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="h-px bg-border-mid">
                  <div
                    className="h-px bg-primary transition-all duration-500"
                    style={{
                      width: `${(step / QUESTIONS.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Question */}
              <div key={step} className="quiz-enter">
                <p className="text-base md:text-lg text-primary leading-relaxed mb-8">
                  {QUESTIONS[step].q}
                </p>
                <div className="space-y-3">
                  {QUESTIONS[step].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => pick(QUESTIONS[step].scores[i], opt)}
                      className="w-full text-left px-5 py-4 border border-border hover:border-primary text-secondary hover:text-primary transition-all duration-200 text-sm group"
                    >
                      <span className="font-display tracking-display text-xs mr-3 text-[#444] group-hover:text-primary transition-colors">
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
              <div className="border-t-2 border-primary pt-8 mb-8">
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

                {/* Primary CTA — PDF download */}
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

                {/* Secondary CTA — solo per risultato basso */}
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
      </div>
    </section>
  );
}
