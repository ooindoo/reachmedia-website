import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../components/site/SiteHeader";
import SiteFooter from "../components/site/SiteFooter";
import Breadcrumb from "../components/Breadcrumb";
import { client, postsQuery, formatSanityDate, sanityDateToISO, type SanityPost } from "../lib/sanity";
import { POSTS, formatDate } from "../lib/posts";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Risorse pratiche sull'email marketing per e-commerce: guide a Klaviyo, benchmark di settore, flow automatici e strategie per brand italiani.",
  alternates: {
    canonical: "https://reachmedia.it/blog",
  },
  openGraph: {
    title: "Insights | Reach Media",
    description:
      "Risorse pratiche sull'email marketing per e-commerce. Guide a Klaviyo, benchmark e strategie per brand italiani.",
    url: "https://reachmedia.it/blog",
    type: "website",
  },
};

// Normalised shape used for rendering — works with both Sanity and static data
type DisplayPost = {
  slug: string;
  title: string;
  category: string;
  date: string;        // YYYY-MM-DD for sorting
  dateLabel: string;   // localised Italian label for display
  readTime: number;
  excerpt: string;
};

function fromSanity(p: SanityPost): DisplayPost {
  return {
    slug: p.slug,
    title: p.title,
    category: p.category,
    date: sanityDateToISO(p.publishedAt),
    dateLabel: formatSanityDate(p.publishedAt),
    readTime: p.readingTime,
    excerpt: p.excerpt,
  };
}

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Insights | Reach Media",
  "url": "https://reachmedia.it/blog",
  "description":
    "Risorse pratiche sull'email marketing per e-commerce: guide a Klaviyo, benchmark di settore, flow automatici e strategie per brand italiani.",
  "publisher": {
    "@type": "Organization",
    "name": "Reach Media",
    "url": "https://reachmedia.it",
  },
};

export default async function BlogPage() {
  // Fetch from Sanity; fall back to static data if empty or on error
  const sanityPosts: SanityPost[] = await client.fetch(postsQuery).catch(() => []);

  // Slugs already covered by Sanity
  const sanitySlugs = new Set(sanityPosts.map((p) => p.slug));

  // Static posts NOT yet in Sanity (so existing content never disappears)
  const staticFallbacks = POSTS
    .filter((p) => !sanitySlugs.has(p.slug))
    .map((p): DisplayPost => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      date: p.date,
      dateLabel: formatDate(p.date),
      readTime: p.readTime,
      excerpt: p.excerpt,
    }));

  const allPosts: DisplayPost[] = [
    ...sanityPosts.map(fromSanity),
    ...staticFallbacks,
  ]
    // Drop incomplete Sanity drafts/test posts missing required fields
    .filter((p) => p.slug && p.title && p.excerpt && p.category)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <SiteHeader />
      <main className="min-h-screen">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

        <header className="container-site pt-8 pb-12">
          <p className="section-label mb-3">Risorse</p>
          <h1 className="text-[clamp(2.4rem,5vw,4rem)] leading-[1.04] tracking-[-0.045em] font-semibold">
            Insights
          </h1>
          <p className="mt-4 text-secondary text-[1.0625rem] max-w-lg leading-relaxed">
            Risorse pratiche per chi vuole fare email marketing serio.
          </p>
        </header>

        <div className="container-site">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {allPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group tile flex flex-col p-6 md:p-7 transition-[transform,box-shadow] duration-200 [transition-timing-function:var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] active:scale-[0.99]"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-accent font-mono text-[0.6875rem] text-primary">
                    {post.category}
                  </span>
                  <span className="font-mono text-xs text-dim">{post.readTime} min</span>
                </div>

                <h2 className="text-xl font-semibold tracking-[-0.025em] leading-snug mb-3 text-balance">
                  {post.title}
                </h2>

                <p className="text-secondary text-[0.9375rem] leading-relaxed mb-8">
                  {post.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between pt-5 border-t border-border">
                  <span className="font-mono text-xs text-dim">{post.dateLabel}</span>
                  <span className="text-secondary group-hover:text-primary transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
