import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { POSTS, getPost, formatDate } from "../../lib/posts";

// Static content map — imported at build time, no dynamic imports needed
import KlaviyoEcommerceItaliano from "../content/klaviyo-ecommerce-italiano";
import EmailMarketingEcommerceFatturato from "../content/email-marketing-ecommerce-fatturato";
import FlowKlaviyoEcommerce from "../content/flow-klaviyo-ecommerce";

const CONTENT_MAP: Record<string, React.FC> = {
  "klaviyo-ecommerce-italiano": KlaviyoEcommerceItaliano,
  "email-marketing-ecommerce-fatturato": EmailMarketingEcommerceFatturato,
  "flow-klaviyo-ecommerce": FlowKlaviyoEcommerce,
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.seo.title,
    description: post.seo.description,
    alternates: {
      canonical: `https://reachmedia.it/blog/${slug}`,
    },
    openGraph: {
      title: post.seo.ogTitle,
      description: post.seo.ogDescription,
      url: `https://reachmedia.it/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      authors: ["Reach Media"],
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.seo.ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.ogTitle,
      description: post.seo.ogDescription,
      images: ["/og-image.png"],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const Content = CONTENT_MAP[slug];
  if (!Content) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.seo.description,
    "datePublished": post.date,
    "dateModified": post.date,
    "url": `https://reachmedia.it/blog/${slug}`,
    "author": {
      "@type": "Person",
      "name": "Ardit Ndoja",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Reach Media",
      "url": "https://reachmedia.it",
    },
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
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs text-secondary hover:text-primary transition-colors tracking-widest uppercase mb-10 block"
            >
              &larr; Insights
            </Link>

            {/* Category + meta */}
            <div className="flex items-center gap-4 mb-6">
              <span className="section-label">{post.category}</span>
              <span className="text-[#444] text-xs">·</span>
              <span className="text-xs text-[#444]">{formatDate(post.date)}</span>
              <span className="text-[#444] text-xs">·</span>
              <span className="text-xs text-[#444]">{post.readTime} min di lettura</span>
            </div>

            {/* Title */}
            <h1
              className="font-display tracking-display text-primary leading-tight max-w-3xl"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              {post.title.toUpperCase()}
            </h1>
          </div>
        </div>

        {/* Article body */}
        <div className="container-site py-12 md:py-20">
          <div className="max-w-[680px]">
            <div
              className={[
                // Paragraphs
                "[&_p]:text-secondary [&_p]:text-[0.9375rem] [&_p]:leading-[1.8] [&_p]:mb-6",
                // H2 — section headings
                "[&_h2]:font-sans [&_h2]:text-xs [&_h2]:text-primary [&_h2]:uppercase [&_h2]:tracking-widest [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:border-border [&_h2]:pb-3",
                // H3 — sub-headings
                "[&_h3]:font-sans [&_h3]:text-sm [&_h3]:text-primary [&_h3]:font-medium [&_h3]:mt-8 [&_h3]:mb-3",
                // Strong
                "[&_strong]:text-primary [&_strong]:font-medium",
                // Em
                "[&_em]:text-secondary [&_em]:not-italic [&_em]:font-medium [&_em]:text-primary",
                // Links
                "[&_a]:text-secondary [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary [&_a]:transition-colors",
                // Lists
                "[&_ul]:my-6 [&_ul]:space-y-3 [&_li]:text-secondary [&_li]:text-[0.9375rem] [&_li]:leading-relaxed [&_li]:pl-4 [&_li]:relative [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.6em] [&_li]:before:w-1.5 [&_li]:before:h-px [&_li]:before:bg-border-mid",
              ].join(" ")}
            >
              <Content />
            </div>

            {/* CTA block */}
            <div className="mt-16 pt-10 border-t border-border">
              <p className="section-label mb-4">Vuoi sapere dove ti trovi?</p>
              <p className="text-secondary text-sm leading-relaxed mb-6 max-w-md">
                Scopri come sei messo con il tuo email marketing. 5 domande, risultato personalizzato in meno di 2 minuti.
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
