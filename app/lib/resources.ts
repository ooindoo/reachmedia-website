// Free resource offered inside each article (content upgrade).
export type Resource = { title: string; desc: string; file: string };

const BY_SLUG: Record<string, Resource> = {
  "flow-klaviyo-ecommerce": {
    title: "Flow Klaviyo avanzati",
    desc: "La versione operativa dei flow: struttura, tempi e logiche che usiamo con i clienti.",
    file: "/rm_flow_avanzati.pdf",
  },
  "email-marketing-ecommerce-fatturato": {
    title: "Checklist audit email in 10 punti",
    desc: "I dieci controlli che facciamo per primi per capire quanto fatturato manca al canale email.",
    file: "/rm_checklist.pdf",
  },
  "klaviyo-ecommerce-italiano": {
    title: "Guida: partire da zero con Klaviyo",
    desc: "I primi passi in ordine di priorità, dall'integrazione con Shopify ai primi flow.",
    file: "/rm_guida_zero.pdf",
  },
};

// Articles without a dedicated resource get the audit checklist.
export const resourceFor = (slug: string): Resource =>
  BY_SLUG[slug] ?? BY_SLUG["email-marketing-ecommerce-fatturato"];
