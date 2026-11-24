"use client";

import { useState } from "react";
import { subscribeToKlaviyo, KLAVIYO_LISTS } from "../lib/klaviyo";

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
    // `title` is sent to Klaviyo as quiz_result — keep it unchanged so
    // existing segments/flows keep matching. `label` is what we display.
    title: "IL TUO EMAIL MARKETING NON ESISTE ANCORA.",
    label: "Il tuo email marketing non esiste ancora.",
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
    label: "Stai lasciando soldi sul tavolo ogni mese.",
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
    label: "Stai lavorando bene. Ma c'è ancora margine.",
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

  const goBack = () => {
    const newScores = scores.slice(0, -1);
    const newAnswers = answers.slice(0, -1);
    setScores(newScores);
    setAnswers(newAnswers);
    setSelectedIndex(null);
    if (phase === "form") {
      setStep(QUESTIONS.length - 1);
      setPhase("quiz");
    } else {
      setStep(step - 1);
    }
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

    // Proprietà custom del profilo con le risposte al quiz
    const quizProperties: Record<string, string | number> = {};
    QUESTIONS.forEach((q, i) => {
      quizProperties[`quiz_q${i + 1}_domanda`] = q.q;
      quizProperties[`quiz_q${i + 1}_risposta`] = answers[i] ?? "";
    });
    quizProperties["quiz_score"] = total;
    quizProperties["quiz_result"] = result.title;
    quizProperties["quiz_source"] = "Quiz Reach Media";

    await subscribeToKlaviyo({
      email,
      firstName: name,
      source: "Quiz Reach Media",
      listId: KLAVIYO_LISTS.quiz,
      properties: quizProperties,
    });

    setLoading(false);
    localStorage.setItem("rm_quiz_completed", "1");
    window.dispatchEvent(new Event("rm_quiz_done"));
    setPhase("result");
  };

  return (
    <section id="quiz" className="container-site pt-28">
      <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-start">
        <header>
          <p className="section-label mb-3">Quiz gratuito</p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.08] tracking-[-0.04em] font-semibold text-balance max-w-[22ch]">
            Quanto sta rendendo il tuo email marketing?
          </h2>
          <p className="mt-4 text-secondary text-[0.9375rem] leading-relaxed max-w-md">
            5 domande. Risultato personalizzato in meno di 2 minuti, con la risorsa giusta per il tuo livello.
          </p>
        </header>

        <div className="tile p-6 md:p-8">
          {/* QUIZ */}
          {phase === "quiz" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-dim tabular">
                  Domanda {step + 1} / {QUESTIONS.length}
                </span>
                {step > 0 && (
                  <button
                    onClick={goBack}
                    className="text-sm text-secondary hover:text-primary transition-colors"
                  >
                    ← Indietro
                  </button>
                )}
              </div>
              {/* Segment progress bar */}
              <div className="flex gap-1 mb-8" aria-hidden="true">
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      i < step ? "bg-primary" : i === step ? "bg-accent outline outline-1 outline-primary/20" : "bg-surface-2"
                    }`}
                  />
                ))}
              </div>

              {/* Question */}
              <div key={step} className="quiz-enter">
                <p className="text-lg md:text-xl font-semibold tracking-[-0.02em] leading-snug mb-6">
                  {QUESTIONS[step].q}
                </p>
                <div className="grid gap-2" role="group" aria-label={QUESTIONS[step].q}>
                  {QUESTIONS[step].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => pick(QUESTIONS[step].scores[i], opt, i)}
                      aria-pressed={selectedIndex === i}
                      className={`w-full flex items-center gap-3 text-left px-4 py-3.5 min-h-[52px] rounded-xl border text-[0.9375rem] transition-[background-color,border-color,transform] duration-150 active:scale-[0.99] ${
                        selectedIndex === i
                          ? "bg-accent border-primary/30 text-primary"
                          : "bg-surface border-border text-primary hover:border-border-mid hover:bg-bg"
                      }`}
                    >
                      <span
                        className={`grid place-items-center w-7 h-7 rounded-lg font-mono text-xs flex-shrink-0 ${
                          selectedIndex === i ? "bg-primary text-accent" : "bg-surface-2 text-secondary"
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
            <div key="form" className="quiz-enter">
              <p className="font-mono text-xs text-dim mb-2">Quasi fatto</p>
              <p className="text-lg font-semibold tracking-[-0.02em] mb-2">Dove ti mandiamo il risultato?</p>
              <p className="text-sm text-secondary mb-6 leading-relaxed">
                Inserisci i tuoi dati per vedere il risultato personalizzato e scaricare la risorsa.
              </p>
              <form onSubmit={handleForm} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="quiz-name" className="field-label">Nome</label>
                  <input
                    id="quiz-name"
                    type="text"
                    autoComplete="given-name"
                    value={name}
                    onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(p => ({ ...p, name: undefined })); }}
                    placeholder="Il tuo nome"
                    aria-invalid={!!errors.name}
                    className={`field ${errors.name ? "field-error" : ""}`}
                  />
                  {errors.name && <p className="text-sm text-[color:var(--danger)] mt-1.5">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="quiz-email" className="field-label">Email</label>
                  <input
                    id="quiz-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: undefined })); }}
                    placeholder="tua@email.it"
                    aria-invalid={!!errors.email}
                    className={`field ${errors.email ? "field-error" : ""}`}
                  />
                  {errors.email && <p className="text-sm text-[color:var(--danger)] mt-1.5">{errors.email}</p>}
                </div>
                <button type="submit" disabled={loading} className="btn btn-ink w-full">
                  {loading ? "Un attimo..." : <>Mostra il mio risultato <span className="arrow" aria-hidden="true">→</span></>}
                </button>
                <button
                  type="button"
                  onClick={goBack}
                  className="w-full text-center text-sm text-secondary hover:text-primary transition-colors"
                >
                  ← Rivedi le risposte
                </button>
              </form>
            </div>
          )}

          {/* RESULT — shown after form */}
          {phase === "result" && (
            <div key="result" className="quiz-enter" aria-live="polite">
              <p className="section-label mb-4">Il tuo risultato</p>
              <h3 className="text-[clamp(1.5rem,3vw,2.1rem)] font-semibold tracking-[-0.035em] leading-[1.15] mb-4 text-balance">
                {result.label}
              </h3>
              <p className="text-secondary text-[0.9375rem] leading-relaxed mb-8">
                {result.body}
              </p>

              <a
                href={result.cta.primary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ink"
              >
                {result.cta.primary.label} <span className="arrow" aria-hidden="true">→</span>
              </a>

              {result.cta.type === "low" && (
                <div className="mt-5">
                  <a
                    href={result.cta.secondary.href}
                    className="text-sm text-secondary hover:text-primary underline underline-offset-4 transition-colors"
                  >
                    {result.cta.secondary.label}
                  </a>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-border">
                <button
                  onClick={restart}
                  className="text-sm text-secondary hover:text-primary transition-colors"
                >
                  Rifai il quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
