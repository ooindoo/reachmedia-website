// Shared by the header (client) and footer (server) — kept out of the
// "use client" module so the server component can import plain data.
export const NAV_LINKS = [
  { href: "/#servizi", label: "Servizi" },
  { href: "/#risultati", label: "Risultati" },
  { href: "/#metodo", label: "Metodo" },
  { href: "/blog", label: "Insights" },
  { href: "/#contatti", label: "Contatti" },
];
