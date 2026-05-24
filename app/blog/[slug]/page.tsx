import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  client,
  postBySlugQuery,
  postSlugsQuery,
  formatSanityDate,
  sanityDateToISO,
  type SanityPost,
  type SanityBlock,
} from "../../lib/sanity";
import { POSTS, getPost, formatDate } from "../../lib/posts";

// Static content map — kept as fallback while content is migrated to Sanity
import KlaviyoEcommerceItaliano from "../content/klaviyo-ecommerce-italiano";
import EmailMarketingEcommerceFatturato from "../content/email-marketing-ecommerce-fatturato";
import FlowKlaviyoEcommerce from "../content/flow-klaviyo-ecommerce";

const STATIC_CONTENT_MAP: Record<string, React.FC> = {
  "klaviyo-ecommerce-italiano": KlaviyoEcommerceItaliano,
  "email-marketing-ecommerce-fatturato": EmailMarketingEcommerceFatturato,
  "flow-klaviyo-ecommerce": FlowKlaviyoEcommerce,
};

type Props = { params: Promise<{ slug: string }> };

// ── Static params: Sanity slugs + static fallback slugs ───────────────────────
export async function generateStaticParams() {
  const staticParams = POSTS.map((p) => ({ slug: p.slug }));
  try {
    const sanityPosts: { slug: string }[] = await client.fetch(postSlugsQuery);
    const sanitySlugs = new Set(staticParams.map((p) => p.slug));
    const extra = sanityPosts
      .filter((p) => !sanitySlugs.has(p.slug))
      .map((p) => ({ slug: p.slug }));
    return [...staticParams, ...extra];
  } catch {
    return staticParams;
  }
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Try Sanity first
  const sanityPost: SanityPost | null = await client
    .fetch(postBySlugQuery, { slug })
    .catch(() => null);

  if (sanityPost) {
    const title = sanityPost.seoTitle ?? sanityPost.title;
    const description = sanityPost.seoDescription ?? sanityPost.excerpt;
    return {
      title,
      description,
      alternates: { canonical: `https://reachmedia.it/blog/${slug}` },
      openGraph: {
        title,
        description,
        url: `https://reachmedia.it/blog/${slug}`,
        type: "article",
        publishedTime: sanityPost.publishedAt,
        authors: ["Reach Media"],
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
      },
      twitter: { card: "summary_large_image", title, description, images: ["/og-image.png"] },
    };
  }

  // Static fallback metadata
  const staticPost = getPost(slug);
  if (!staticPost) return {};
  return {
    title: staticPost.seo.title,
    description: staticPost.seo.description,
    alternates: { canonical: `https://reachmedia.it/blog/${slug}` },
    openGraph: {
      title: staticPost.seo.ogTitle,
      description: staticPost.seo.ogDescription,
      url: `https://reachmedia.it/blog/${slug}`,
      type: "article",
      publishedTime: staticPost.date,
      authors: ["Reach Media"],
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: staticPost.seo.ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: staticPost.seo.ogTitle,
      description: staticPost.seo.ogDescription,
      images: ["/og-image.png"],
    },
  };
}

// ── PortableText component map ────────────────────────────────────────────────
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a href={value?.href} target={value?.blank ? "_blank" : undefined} rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

// ── Shared article prose wrapper ──────────────────────────────────────────────
const PROSE_CLASSES = [
  "[&_p]:text-secondary [&_p]:text-[0.9375rem] [&_p]:leading-[1.8] [&_p]:mb-6",
  "[&_h2]:font-sans [&_h2]:text-xs [&_h2]:text-primary [&_h2]:uppercase [&_h2]:tracking-widest [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:border-border [&_h2]:pb-3",
  "[&_h3]:font-sans [&_h3]:text-sm [&_h3]:text-primary [&_h3]:font-medium [&_h3]:mt-8 [&_h3]:mb-3",
  "[&_strong]:text-primary [&_strong]:font-medium",
  "[&_em]:not-italic [&_em]:font-medium [&_em]:text-primary",
  "[&_a]:text-secondary [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary [&_a]:transition-colors",
  "[&_ul]:my-6 [&_ul]:space-y-3 [&_li]:text-secondary [&_li]:text-[0.9375rem] [&_li]:leading-relaxed [&_li]:pl-4 [&_li]:relative [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.6em] [&_li]:before:w-1.5 [&_li]:before:h-px [&_li]:before:bg-border-mid",
].join(" ");

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  // Try Sanity first
  const sanityPost: SanityPost | null = await client
    .fetch(postBySlugQuery, { slug })
    .catch(() => null);

  // Determine data source
  const isSanity = !!sanityPost;
  const staticPost = isSanity ? null : getPost(slug);
  const StaticContent = isSanity ? null : STATIC_CONTENT_MAP[slug] ?? null;

  // 404 if neither source has the post
  if (!isSanity && !staticPost) notFound();

  // Canonical article data (unified from either source)
  const title = isSanity ? sanityPost!.title : staticPost!.title;
  const category = isSanity ? sanityPost!.category : staticPost!.category;
  const readTime = isSanity ? sanityPost!.readingTime : staticPost!.readTime;
  const dateLabel = isSanity
    ? formatSanityDate(sanityPost!.publishedAt)
    : formatDate(staticPost!.date);
  const dateISO = isSanity
    ? sanityDateToISO(sanityPost!.publishedAt)
    : staticPost!.date;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": isSanity
      ? (sanityPost!.seoDescription ?? sanityPost!.excerpt)
      : staticPost!.seo.description,
    "datePublished": dateISO,
    "dateModified": dateISO,
    "url": `https://reachmedia.it/blog/${slug}`,
    "author": { "@type": "Person", "name": "Ardit Ndoja" },
    "publisher": { "@type": "Organization", "name": "Reach Media", "url": "https://reachmedia.it" },
    "image": "https://reachmedia.it/og-image.png",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-bg">
        {/* Article header */}
        <div className="border-b border-border pt-28 md:pt-36 pb-12 md:pb-16">
          <div className="container-site">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs text-secondary hover:text-primary transition-colors tracking-widest uppercase mb-10 block"
            >
              &larr; Insights
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className="section-label">{category}</span>
              <span className="text-[#444] text-xs">·</span>
              <span className="text-xs text-[#444]">{dateLabel}</span>
              <span className="text-[#444] text-xs">·</span>
              <span className="text-xs text-[#444]">{readTime} min di lettura</span>
            </div>

            <h1
              className="font-display tracking-display text-primary leading-tight max-w-3xl"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              {title.toUpperCase()}
            </h1>
          </div>
        </div>

        {/* Article body */}
        <div className="container-site py-12 md:py-20">
          <div className="max-w-[680px]">
            <div className={PROSE_CLASSES}>
              {isSanity && sanityPost!.body ? (
                <PortableText
                  value={sanityPost!.body as SanityBlock[]}
                  components={portableTextComponents}
                />
              ) : StaticContent ? (
                <StaticContent />
              ) : (
                /* Sanity post without body — show excerpt as fallback */
                <p>{sanityPost!.excerpt}</p>
              )}
            </div>

            {/* CTA */}
            <div className="mt-16 pt-10 border-t border-border">
              <p className="section-label mb-4">Vuoi sapere dove ti trovi?</p>
              <p className="text-secondary text-sm leading-relaxed mb-6 max-w-md">
                Scopri come sei messo con il tuo email marketing. 5 domande, risultato
                personalizzato in meno di 2 minuti.
              </p>
              <Link
                href="/#quiz"
                className="inline-flex items-center gap-3 px-7 py-4 bg-primary text-bg text-sm font-medium hover:opacity-90 transition-opacity duration-200 group"
              >
                Scopri come sei messo con il tuo email marketing
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
