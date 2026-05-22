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
    body: "Hai un potenziale significativo non sfruttato. Con un e-commerce attivo, un sistema email ben costruito genera mediamente tra il 15% e il 30% del fatturato totale. Parti dalla checklist gratuita per capire da dove iniziare.",
  },
  {
    min: 6,
    max: 10,
    title: "STAI LASCIANDO SOLDI SUL TAVOLO OGNI MESE.",
    body: "Hai le basi ma i gap sono significativi. Flow incompleti, segmentazione assente o campagne non ottimizzate si traducono in revenue persa ogni settimana. La checklist ti mostra esattamente dove intervenire.",
  },
  {
    min: 11,
    max: 15,
    title: "STAI LAVORANDO BENE. MA C'È ANCORA MARGINE.",
    body: "Il tuo email marketing è già un canale attivo. Le ottimizzazioni avanzate (segmentazione predittiva, test sistematici, espansione internazionale) sono il prossimo livello. Scarica la checklist per identificare i gap residui.",
  },
];

type Phase = "quiz" | "result" | "form" | "sent";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [phase, setPhase] = useState<Phase>("quiz");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const total = scores.reduce((a, b) => a + b, 0);
  const result =
    RESULTS.find((r) => total >= r.min && total <= r.max) ?? RESULTS[1];

  const pick = (score: number) => {
    const next = [...scores, score];
    setScores(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setPhase("result");
    }
  };

  const restart = () => {
    setStep(0);
    setScores([]);
    setPhase("quiz");
    setName("");
    setEmail("");
  };

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setPhase("sent");
  };

  const INPUT =
    "w-full bg-transparent border-b border-border text-primary text-sm py-3 placeholder-[#333] focus:outline-none focus:border-accent transition-colors duration-200";

  return (
    <section id="quiz" className="border-t border-border py-24 md:py-32">
      <div className="container-site">
        <FadeIn className="mb-14">
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
            5 domande. Risultato immediato. Nessuna email richiesta per vedere
            il risultato.
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
                    className="h-px bg-accent transition-all duration-500"
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
                      onClick={() => pick(QUESTIONS[step].scores[i])}
                      className="w-full text-left px-5 py-4 border border-border hover:border-accent text-secondary hover:text-accent transition-all duration-200 text-sm group"
                    >
                      <span className="font-display tracking-display text-xs mr-3 text-[#444] group-hover:text-accent transition-colors">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* RESULT */}
          {phase === "result" && (
            <div key="result" className="quiz-enter">
              <div className="border-t-2 border-accent pt-8 mb-8">
                <p className="section-label mb-4">Il tuo risultato</p>
                <h3
                  className="font-display tracking-display text-accent leading-tight mb-6"
                  style={{ fontSize: "clamp(1.6rem, 3.5vw, 3rem)" }}
                >
                  {result.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed mb-8">
                  {result.body}
                </p>
                <button
                  onClick={() => setPhase("form")}
                  className="inline-flex items-center gap-3 px-7 py-4 bg-accent text-bg text-sm font-medium hover:bg-accent-hover transition-colors duration-200 group"
                >
                  Scarica la checklist gratuita
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </button>
              </div>
              <button
                onClick={restart}
                className="text-xs text-[#444] hover:text-secondary transition-colors"
              >
                Rifai il quiz
              </button>
            </div>
          )}

          {/* FORM */}
          {phase === "form" && (
            <div key="form" className="quiz-enter border border-border p-7 md:p-8">
              <p className="text-sm text-secondary mb-6">
                Inserisci i tuoi dati per ricevere la checklist.
              </p>
              <form onSubmit={handleForm} className="space-y-6" noValidate>
                <div>
                  <label className="block text-[10px] text-secondary uppercase tracking-widest mb-3">
                    Nome
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Il tuo nome"
                    className={INPUT}
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-secondary uppercase tracking-widest mb-3">
                    Email aziendale
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tua@azienda.it"
                    className={INPUT}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-accent text-bg text-sm font-medium hover:bg-accent-hover transition-colors disabled:opacity-50"
                >
                  {loading ? "Invio in corso..." : "Invia la checklist"}
                </button>
              </form>
            </div>
          )}

          {/* SENT */}
          {phase === "sent" && (
            <div key="sent" className="quiz-enter border-t-2 border-accent pt-8">
              <p
                className="font-display tracking-display text-accent mb-3"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
              >
                CONTROLLA LA TUA EMAIL.
              </p>
              <p className="text-secondary text-sm">
                Ti abbiamo inviato la checklist. Controlla anche la cartella
                spam se non la trovi.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
