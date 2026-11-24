"use client";

import { useEffect, useRef, type ReactNode } from "react";
import s from "./home.module.css";

/**
 * One card of the stacked-panels scroll: it sticks while the next panel
 * slides up over it. Panels taller than the viewport stick by their bottom
 * edge (negative top), so their whole content scrolls past before they stop.
 */
export default function StackPanel({ children, sticky = true }: { children: ReactNode; sticky?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !sticky) return;
    const fit = () => {
      el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [sticky]);

  return (
    <div ref={ref} className={`${s.panel} ${sticky ? s.panelSticky : ""}`}>
      {children}
    </div>
  );
}
