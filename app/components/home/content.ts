// Copy and data for the home page.

export const HERO = {
  eyebrow: "Per e-commerce premium · Klaviyo · Shopify",
  title: ["Email marketing", "che genera revenue."],
  titleMuted: "Non solo aperture.",
  body: "Strategia, flow e campagne Klaviyo per e-commerce di moda, lusso e lifestyle. Un canale che vende, curato con la stessa attenzione che metti nel tuo marchio.",
  cta: { label: "Valuta il tuo email marketing", href: "#quiz" },
  note: "Cinque domande, tre minuti. Nessuna registrazione.",
};

export const STATS = [
  { label: "Esperienza", value: "3+", unit: "anni nel settore" },
  { label: "Brand seguiti", value: "8", unit: "e-commerce premium" },
  { label: "Campagne inviate", value: "1.000+", unit: "dal 2024" },
  { label: "Quota email sul fatturato", value: "22%", unit: "case moda multibrand" },
];

// Same logo set as the live site's LogoBar.
export const LOGOS = [
  { name: "Klaviyo", url: "/logos/klaviyo.svg" },
  { name: "Shopify", url: "https://cdn.simpleicons.org/shopify" },
  { name: "Meta", url: "https://cdn.simpleicons.org/meta" },
  { name: "Google Ads", url: "https://cdn.simpleicons.org/googleads" },
  { name: "Figma", url: "https://cdn.simpleicons.org/figma" },
  { name: "Notion", url: "https://cdn.simpleicons.org/notion" },
  { name: "Make", url: "https://cdn.simpleicons.org/make" },
  { name: "Zapier", url: "https://cdn.simpleicons.org/zapier" },
  { name: "Vercel", url: "https://cdn.simpleicons.org/vercel" },
  { name: "GitHub", url: "https://cdn.simpleicons.org/github" },
  { name: "Google Analytics", url: "https://cdn.simpleicons.org/googleanalytics" },
  { name: "ChatGPT", url: "/logos/openai.svg" },
  { name: "Claude", url: "/logos/anthropic.svg" },
  { name: "Google AI Studio", url: "/logos/google-ai-studio.svg" },
];

export const STEPS = [
  {
    num: "01",
    title: "Audit",
    desc: "Analizziamo la tua lista email, le performance storiche e i flussi automatici esistenti. Identifichiamo le opportunità di revenue non sfruttate.",
  },
  {
    num: "02",
    title: "Strategia",
    desc: "Definiamo il calendario editoriale, la segmentazione avanzata e i trigger di automazione. Ogni email ha un obiettivo di conversione preciso.",
  },
  {
    num: "03",
    title: "Esecuzione",
    desc: "Produciamo, testiamo e ottimizziamo. Segui tutto da una dashboard live, letta sul fatturato e non sulle aperture.",
  },
];

export const SERVICES = [
  {
    index: "01",
    kpi: "Calendario mensile",
    title: "Email strategy",
    body: "Pianificazione editoriale mensile, segmentazione avanzata e A/B testing sistematico. Ogni campagna ha un obiettivo di conversione misurabile.",
  },
  {
    index: "02",
    kpi: "Flow su misura",
    title: "Automazioni",
    body: "Benvenuto, carrello abbandonato, post-acquisto e win-back. Sequenze costruite sul comportamento dei tuoi clienti, sempre attive.",
  },
  {
    index: "03",
    kpi: "Sempre aggiornata",
    title: "Dashboard & analytics",
    body: "Una dashboard live, sempre aggiornata, con la revenue attribuita a ogni flow e campagna e una raccomandazione concreta accanto a ogni numero.",
  },
];

// The abandoned-cart automation drawn in the hero, as Klaviyo shows it.
export const FLOW = [
  { kind: "Trigger", title: "Prodotto aggiunto al carrello", meta: "Shopify · evento live" },
  { kind: "Attesa", title: "4 ore", meta: "se non ha completato l'ordine" },
  { kind: "Email", title: "Hai dimenticato qualcosa?", meta: "template + oggetto in A/B test" },
  { kind: "Filtro", title: "Ha completato l'ordine?", meta: "sì → esce dal flow · no → email 2" },
];

export const FEATURED = {
  stat: "€519k",
  statLabel: "Revenue attribuita email · 20 mesi",
  metrics: [
    { val: "22,4%", lab: "Del fatturato online" },
    { val: "424", lab: "Campagne inviate" },
    { val: "1,18M", lab: "Email inviate" },
  ],
  sector: "Moda / Multibrand premium",
  title: "Da newsletter occasionali a €519k di revenue email",
  body: "Negozio multibrand di moda premium. Prima l'email era qualche newsletter sporadica inviata da Shopify, senza strategia né automazioni. Abbiamo portato tutto su Klaviyo: lista, segmentazione, template, flow e calendario editoriale. Oggi l'email genera in media il 22% del fatturato online, e l'82% di quella revenue arriva dalle automazioni.",
  tags: ["Klaviyo", "Shopify", "Flow", "Segmentazione"],
  // Cumulative email-attributed revenue (k€) per month, Mar 2025 → Nov 2026.
  // Source: Klaviyo, Placed Order attributed to email (flows + campaigns).
  series: [13.5, 37.7, 60.1, 85.5, 107.0, 123.8, 154.3, 189.5, 216.3, 242.2, 273.7, 296.9, 323.6, 351.5, 377.7, 394.1, 422.5, 441.1, 466.6, 496.0, 518.7],
};

// Verified in Klaviyo (Nov 2026).
export const MINIS = [
  // Squale: 110 campaigns, Apr 2025 → Nov 2026, unique clicks / delivered
  { stat: "9,2%", statLabel: "Click rate campagne", sector: "Orologeria svizzera premium · 110 campagne" },
  // Seventy: €19.9k of €64.8k online revenue attributed to email, 1–24 Nov 2026
  { stat: "31%", statLabel: "Fatturato online da email, primo mese", sector: "Brand di moda · da Mailchimp a Klaviyo" },
];

export const FAQS = [
  {
    q: "Quanto costa lavorare con Reach Media?",
    a: "I progetti partono da una fase di audit e strategia. Il costo dipende dal perimetro di lavoro. Ne parliamo dopo la valutazione, quando è chiaro da dove si parte.",
  },
  {
    q: "In quanto tempo si vedono i risultati?",
    a: "I primi dati arrivano entro 30 giorni. Risultati consolidati si vedono tra i 60 e i 90 giorni dall'attivazione dei flow principali.",
  },
  {
    q: "Devo già avere Klaviyo attivo?",
    a: "No. Lavoriamo sia con chi parte da zero che con chi ha già Klaviyo installato ma non lo usa davvero.",
  },
  {
    q: "Lavorate solo con Shopify?",
    a: "Shopify è la piattaforma su cui lavoriamo meglio, ma gestiamo anche progetti su WooCommerce e altre piattaforme per la parte email.",
  },
  {
    q: "Quante ore al mese richiede la mia partecipazione?",
    a: "Pochissime. Ti chiediamo un briefing iniziale e un allineamento mensile. Il resto lo gestiamo noi.",
  },
  {
    q: "Come faccio a sapere se siete la scelta giusta per me?",
    a: "Parti dalla valutazione gratuita: in tre minuti capisci a che punto sei e cosa manca. Se ha senso lavorare insieme, lo vedi dai risultati.",
  },
];

// Builds an SVG path for a sparkline/area chart from a numeric series.
export function chartPath(series: number[], w: number, h: number, pad = 4) {
  const max = Math.max(...series);
  const step = (w - pad * 2) / (series.length - 1);
  const pts = series.map((v, i) => [pad + i * step, h - pad - (v / max) * (h - pad * 2)]);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${h} L${pts[0][0].toFixed(1)} ${h} Z`;
  return { line, area, last: pts[pts.length - 1] };
}
