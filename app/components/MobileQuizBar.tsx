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
    <div
      className="float-layer md:hidden z-40"
      style={{ bottom: "calc(12px + env(safe-area-inset-bottom))" }}
    >
      <div className="container-site">
        {/* Same glass + concentric radius as the header: 10px button + 7px padding */}
        <div className="glass rounded-[17px] p-[7px]">
          <a
            href={quizDone ? "/#contatti" : "/#quiz"}
            className="btn btn-accent w-full h-11 rounded-[10px]"
          >
            {quizDone ? "Parliamo" : "Fai il quiz gratuito"} <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
