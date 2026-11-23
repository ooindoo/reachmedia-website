import Link from "next/link";

const VARIANTS = [
  {
    href: "/redesign/a",
    name: "A · Graphite",
    desc: "Resta scuro ma passa dal nero a un grafite più chiaro. Look da dashboard: griglia, monospace, grafico revenue e card in vetro.",
    bg: "#16181c",
    ink: "#f2f3ef",
  },
  {
    href: "/redesign/b",
    name: "B · Light Lab",
    desc: "Fondo chiaro, il lime diventa evidenziatore. Hero con un flow Klaviyo disegnato come nel prodotto, case study su card scura.",
    bg: "#f3f4ef",
    ink: "#0b0c0e",
  },
];

export default function RedesignIndex() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        background: "#1d2025",
        color: "#f2f3ef",
        fontFamily: "var(--font-geist), system-ui, sans-serif",
        padding: "64px 24px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <p style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 13, color: "#e8ff47" }}>
          reachmedia.it · redesign di prova
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.1, margin: "12px 0 40px" }}>
          Due direzioni, stessa palette. Scegli quella che preferisci.
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {VARIANTS.map((v) => (
            <Link
              key={v.href}
              href={v.href}
              style={{
                display: "block",
                padding: 28,
                borderRadius: 20,
                background: v.bg,
                color: v.ink,
                border: "1px solid rgb(255 255 255 / 0.12)",
              }}
            >
              <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: 3, background: "#e8ff47", marginBottom: 20 }} />
              <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: "-0.03em" }}>{v.name} →</h2>
              <p style={{ marginTop: 8, fontSize: 15, lineHeight: 1.6, opacity: 0.7 }}>{v.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
