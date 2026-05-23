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
      aria-label={quizDone ? "Vai alla sezione contatti" : "Vai al quiz"}
      className="md:hidden fixed bottom-0 inset-x-0 z-50 h-14 flex items-center justify-center bg-[#E8FF47] text-[#0A0A0A] font-display tracking-display text-xl"
    >
      {quizDone ? "PARLIAMO" : "FAI IL QUIZ"}
    </a>
  );
}
