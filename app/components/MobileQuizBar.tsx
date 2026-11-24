"use client";

import { useState, useEffect } from "react";

export default function MobileQuizBar() {
  const [visible, setVisible] = useState(false);
  const [quizDone, setQuizDone] = useState(false);

  useEffect(() => {
    setQuizDone(localStorage.getItem("rm_quiz_completed") === "1");

    // Hidden while a section with its own call to action is on screen
    // (the quiz, the contact form, the footer CTA): never two lime buttons.
    const targets = [
      document.getElementById("quiz"),
      document.getElementById("contatti"),
      document.querySelector("footer"),
    ].filter((el): el is HTMLElement => !!el);

    const inView = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? inView.add(e.target) : inView.delete(e.target)));
        setVisible(inView.size === 0);
      },
      { threshold: 0.1 }
    );
    targets.forEach((el) => observer.observe(el));
    if (targets.length === 0) setVisible(true);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleQuizDone = () => setQuizDone(true);
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
            {quizDone ? "Parliamo" : "Valuta il tuo email marketing"} <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
