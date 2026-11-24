import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import SiteHeader from "../../components/site/SiteHeader";
import SiteFooter from "../../components/site/SiteFooter";
import Breadcrumb from "../../components/Breadcrumb";
import ResourceUpgrade from "../../components/ResourceUpgrade";
import { resourceFor } from "../../lib/resources";
import {
  sanityFetch,
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
    const sanityPosts: { slug: string }[] = await sanityFetch<{ slug: string }[]>(postSlugsQuery);
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
  const sanityPost: SanityPost | null = await sanityFetch<SanityPost | null>(postBySlugQuery, { slug })
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
        images: [{ url: "/og-image.png?v=4", width: 1200, height: 630, alt: title }],
      },
      twitter: { card: "summary_large_image", title, description, images: ["/og-image.png?v=4"] },
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
      images: [{ url: "/og-image.png?v=4", width: 1200, height: 630, alt: staticPost.seo.ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: staticPost.seo.ogTitle,
      description: staticPost.seo.ogDescription,
      images: ["/og-image.png?v=4"],
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
  "[&_p]:text-secondary [&_p]:text-[1.0625rem] [&_p]:leading-[1.75] [&_p]:mb-6",
  "[&_h2]:text-primary [&_h2]:text-[1.6rem] [&_h2]:font-semibold [&_h2]:tracking-[-0.035em] [&_h2]:leading-tight [&_h2]:mt-14 [&_h2]:mb-4",
  "[&_h3]:text-primary [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:tracking-[-0.02em] [&_h3]:mt-10 [&_h3]:mb-3",
  "[&_strong]:text-primary [&_strong]:font-semibold",
  "[&_em]:not-italic [&_em]:font-medium [&_em]:text-primary",
  "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-border-mid hover:[&_a]:decoration-primary [&_a]:transition-colors",
  "[&_ul]:my-6 [&_ul]:space-y-3 [&_li]:text-secondary [&_li]:text-[1.0625rem] [&_li]:leading-relaxed [&_li]:pl-5 [&_li]:relative [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.65em] [&_li]:before:w-1.5 [&_li]:before:h-1.5 [&_li]:before:rounded-[2px] [&_li]:before:bg-accent [&_li]:before:outline [&_li]:before:outline-1 [&_li]:before:outline-primary/20",
].join(" ");

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  // Try Sanity first
  const sanityPost: SanityPost | null = await sanityFetch<SanityPost | null>(postBySlugQuery, { slug })
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

  // Free resource goes mid-article: before the section heading closest to
  // the middle of the body (never before the first section).
  const resource = resourceFor(slug);
  const body = (isSanity && sanityPost!.body ? sanityPost!.body : []) as SanityBlock[];
  const h2s = body.reduce<number[]>((acc, blk, i) => ((blk as { style?: string }).style === "h2" ? [...acc, i] : acc), []);
  const mid = body.length / 2;
  const splitAt =
    h2s.slice(1).sort((x, y) => Math.abs(x - mid) - Math.abs(y - mid))[0] ?? Math.ceil(mid);
  const bodyBefore = body.slice(0, splitAt);
  const bodyAfter = body.slice(splitAt);

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
    "image": "https://reachmedia.it/og-image.png?v=4",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <SiteHeader />
      <main>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: title },
          ]}
        />

        {/* Article header */}
        <header className="container-site pt-8 pb-10">
          <div className="max-w-[760px]">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-6 font-mono text-xs text-dim">
              <span className="px-2.5 py-0.5 rounded-full bg-accent text-primary text-[0.6875rem]">{category}</span>
              <span>{dateLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{readTime} min di lettura</span>
            </div>
            <h1 className="text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.06] tracking-[-0.045em] font-semibold text-balance">
              {title}
            </h1>
          </div>
        </header>

        {/* Article body — split around the free resource, so the article
            stays complete and the offer sits where interest is highest. */}
        <div className="container-site">
          <article className="max-w-[760px]">
            {isSanity && sanityPost!.body ? (
              <>
                <div className="tile px-6 py-8 md:px-12 md:py-12">
                  <div className={PROSE_CLASSES}>
                    <PortableText value={bodyBefore} components={portableTextComponents} />
                  </div>
                </div>
                <ResourceUpgrade resource={resource} slug={slug} />
                {bodyAfter.length > 0 && (
                  <div className="tile px-6 py-8 md:px-12 md:py-12">
                    <div className={PROSE_CLASSES}>
                      <PortableText value={bodyAfter} components={portableTextComponents} />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="tile px-6 py-8 md:px-12 md:py-12">
                  <div className={PROSE_CLASSES}>
                    {StaticContent ? (
                      <StaticContent />
                    ) : (
                      /* Sanity post without body — show excerpt as fallback */
                      <p>{sanityPost!.excerpt}</p>
                    )}
                  </div>
                </div>
                <ResourceUpgrade resource={resource} slug={slug} />
              </>
            )}
          </article>

          {/* CTA */}
          <aside className="max-w-[760px] mt-3 rounded-[18px] bg-primary text-[#f2f3ef] p-6 md:p-10">
            <p className="font-mono text-xs text-[#7d828a] mb-3">Vuoi sapere dove ti trovi?</p>
            <p className="text-2xl font-semibold tracking-[-0.03em] leading-tight mb-3 text-balance">
              Scopri come sei messo con il tuo email marketing.
            </p>
            <p className="text-[#a3a7ae] text-[0.9375rem] leading-relaxed mb-6 max-w-md">
              Cinque domande, tre minuti. Risultato personalizzato, nessuna registrazione.
            </p>
            <Link href="/#quiz" className="btn btn-accent">
              Valuta il tuo email marketing <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </main>
      <SiteFooter showCta={false} />
    </>
  );
}
