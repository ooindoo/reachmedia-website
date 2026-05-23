export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: number; // minutes
  excerpt: string;
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
};

export const POSTS: Post[] = [
  {
    slug: "klaviyo-ecommerce-italiano",
    title: "Klaviyo per e-commerce italiano: guida pratica al setup",
    category: "Klaviyo",
    date: "2026-05-01",
    readTime: 6,
    excerpt:
      "Come configurare Klaviyo da zero per un e-commerce italiano: integrazione con Shopify, i primi 3 flow da attivare e la segmentazione base per iniziare a generare revenue.",
    seo: {
      title: "Klaviyo per E-commerce Italiano: Guida Pratica al Setup",
      description:
        "Guida completa all'uso di Klaviyo per e-commerce italiani: setup account, integrazione Shopify, i 3 flow essenziali e segmentazione base. Inizia a generare revenue dall'email marketing.",
      ogTitle: "Klaviyo per E-commerce Italiano: Guida Pratica al Setup",
      ogDescription:
        "Come configurare Klaviyo da zero per il tuo e-commerce italiano. I primi 3 flow, la segmentazione e tutto quello che devi sapere.",
    },
  },
  {
    slug: "email-marketing-ecommerce-fatturato",
    title: "Email marketing ecommerce: quanto dovresti fatturare da questo canale",
    category: "Email Marketing",
    date: "2026-05-10",
    readTime: 5,
    excerpt:
      "Il benchmark del settore dice 15-30% del fatturato da email. La maggior parte degli e-commerce italiani è sotto il 5%. Ecco perché e come misurare le tue performance.",
    seo: {
      title: "Email Marketing Ecommerce: Quanto Dovresti Fatturare",
      description:
        "Benchmark dell'email marketing ecommerce: scopri quanto dovresti fatturare da questo canale, perché sei probabilmente sotto la media e come misurare le performance su Klaviyo.",
      ogTitle: "Email Marketing Ecommerce: Quanto Dovresti Fatturare",
      ogDescription:
        "Il 15-30% del fatturato dovrebbe venire dall'email. Sei sotto quella soglia? Ecco i gap più comuni e come colmarli.",
    },
  },
  {
    slug: "flow-klaviyo-ecommerce",
    title: "I 5 flow Klaviyo che ogni e-commerce dovrebbe avere attivi",
    category: "Klaviyo",
    date: "2026-05-20",
    readTime: 7,
    excerpt:
      "Welcome series, carrello abbandonato, browse abandonment, post-acquisto e winback: i 5 flow Klaviyo che girano in automatico e generano revenue mentre dormi.",
    seo: {
      title: "I 5 Flow Klaviyo Essenziali per E-commerce",
      description:
        "Guida ai 5 flow Klaviyo indispensabili per ogni e-commerce: welcome series, carrello abbandonato, browse abandonment, post-acquisto e winback. Come configurarli e cosa aspettarsi.",
      ogTitle: "I 5 Flow Klaviyo Essenziali per E-commerce",
      ogDescription:
        "Questi 5 flow Klaviyo girano in automatico e generano revenue passiva. Ecco come configurarli e cosa aspettarsi in termini di performance.",
    },
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
