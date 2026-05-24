import { createClient } from "@sanity/client";
import { groq } from "next-sanity";

export const projectId = "6926yn16";
export const dataset = "production";
export const apiVersion = "2024-01-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN in production for fast reads; direct API in dev for always-fresh data
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
  stega: false,
});

// ── Types ────────────────────────────────────────────────────────────────────

export type SanityPost = {
  title: string;
  slug: string;
  publishedAt: string;
  category: string;
  readingTime: number;
  excerpt: string;
  body?: SanityBlock[];
  seoTitle?: string;
  seoDescription?: string;
};

// Minimal shape for Portable Text blocks — keeps dependency on @portabletext/react lightweight
export type SanityBlock = {
  _type: string;
  _key: string;
  [key: string]: unknown;
};

// ── GROQ queries ─────────────────────────────────────────────────────────────

/** All published posts, sorted by date desc — used for /blog listing */
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    publishedAt,
    category,
    readingTime,
    excerpt
  }
`;

/** Single post by slug — used for /blog/[slug] */
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    publishedAt,
    category,
    readingTime,
    excerpt,
    body,
    seoTitle,
    seoDescription
  }
`;

/** Only slugs — used in generateStaticParams */
export const postSlugsQuery = groq`
  *[_type == "post"] { "slug": slug.current }
`;

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Format a Sanity datetime string (ISO) as Italian locale date */
export function formatSanityDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Extract YYYY-MM-DD from a Sanity datetime string */
export function sanityDateToISO(isoString: string): string {
  return isoString.split("T")[0];
}
