"use client";

import { useState, useEffect } from "react";

export default function MobileQuizBar() {
  const [visible, setVisible] = useState(false);
  const [quizDone, setQuizDone] = useState(false);

  useEffect(() => {
    const done = localStorage.getItem("rm_quiz_completed") === "1";
    setQuizDone(done);

    if (done) {
      setVisible(true);
      return;
    }

    const quiz = document.getElementById("quiz");
    if (!quiz) {
      // Not on home page — show bar linking to /#quiz
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(quiz);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleQuizDone = () => {
      setQuizDone(true);
      setVisible(true);
    };
    window.addEventListener("rm_quiz_done", handleQuizDone);
    return () => window.removeEventListener("rm_quiz_done", handleQuizDone);
  }, []);

  if (!visible) return null;

  return (
    <a
      href={quizDone ? "/#contatti" : "/#quiz"}
      className="btn btn-accent md:hidden fixed inset-x-3 z-40 h-[52px] shadow-[var(--shadow-lift)] border border-primary/10"
      style={{ bottom: "calc(12px + env(safe-area-inset-bottom))" }}
    >
      {quizDone ? "Parliamo" : "Fai il quiz gratuito"} <span className="arrow" aria-hidden="true">→</span>
    </a>
  );
}
