"use client";

import { useState, useEffect } from "react";

export default function MobileQuizBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const quiz = document.getElementById("quiz");
    if (!quiz) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(quiz);
    return () => observer.disconnect();
  }, []);

  const scrollToQuiz = () => {
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToQuiz}
      className="md:hidden fixed bottom-0 inset-x-0 z-50 h-14 flex items-center justify-center bg-[#E8FF47] text-[#0A0A0A] font-display tracking-display text-xl"
      aria-label="Vai al quiz"
    >
      FAI IL QUIZ
    </button>
  );
}
