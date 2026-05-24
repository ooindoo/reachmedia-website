import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FadeIn from "../components/FadeIn";
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

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Navbar />
      <main className="min-h-screen bg-bg">
        {/* Header */}
        <div className="border-b border-border pt-28 md:pt-36 pb-12 md:pb-20">
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
            {POSTS.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 80}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-bg p-8 md:p-10 h-full hover:bg-surface transition-colors duration-200"
                >
                  {/* Category + read time */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="section-label">{post.category}</span>
                    <span className="text-xs text-[#444]">{post.readTime} min</span>
                  </div>

                  {/* Title */}
                  <h2 className="font-display tracking-display text-primary leading-tight mb-4 group-hover:text-accent transition-colors duration-200" style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)" }}>
                    {post.title.toUpperCase()}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-secondary text-sm leading-relaxed mb-8">
                    {post.excerpt}
                  </p>

                  {/* Footer: date + arrow */}
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-border">
                    <span className="text-xs text-[#444]">{formatDate(post.date)}</span>
                    <span className="text-secondary group-hover:text-primary transition-all duration-200 group-hover:translate-x-1 inline-block">
                      &rarr;
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
