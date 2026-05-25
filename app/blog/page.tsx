import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FadeIn from "../components/FadeIn";
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
      <Navbar />
      <main className="min-h-screen bg-bg">
        <div className="pt-14 md:pt-16">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
        </div>
        {/* Header */}
        <div className="border-b border-border pt-10 md:pt-14 pb-12 md:pb-20">
          <div className="container-site">
            <FadeIn>
              <p className="section-label mb-4">Risorse</p>
              <h1
                className="font-display tracking-display text-primary leading-tight mb-4"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
              >
                INSIGHTS
              </h1>
              <p className="text-secondary text-sm md:text-base max-w-lg leading-relaxed">
                Risorse pratiche per chi vuole fare email marketing serio.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Articles grid */}
        <div className="container-site py-12 md:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {allPosts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-bg p-8 md:p-10 hover:bg-surface transition-colors duration-200"
              >
                <FadeIn delay={i * 80}>
                  {/* Category + read time */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="section-label">{post.category}</span>
                    <span className="text-xs text-[#444]">{post.readTime} min</span>
                  </div>

                  {/* Title */}
                  <h2
                    className="font-display tracking-display text-primary leading-tight mb-4 group-hover:text-accent transition-colors duration-200"
                    style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)" }}
                  >
                    {post.title.toUpperCase()}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-secondary text-sm leading-relaxed mb-8">
                    {post.excerpt}
                  </p>

                  {/* Footer: date + arrow */}
                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <span className="text-xs text-[#444]">{post.dateLabel}</span>
                    <span className="text-secondary group-hover:text-primary transition-all duration-200 group-hover:translate-x-1 inline-block">
                      &rarr;
                    </span>
                  </div>
                </FadeIn>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
