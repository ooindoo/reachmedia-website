import type { MetadataRoute } from "next";
import { client, postsQuery, sanityDateToISO, type SanityPost } from "./lib/sanity";
import { POSTS } from "./lib/posts";

const BASE_URL = "https://reachmedia.it";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch Sanity posts; fall back to [] on error
  const sanityPosts: SanityPost[] = await client.fetch(postsQuery).catch(() => []);

  // Slugs already in Sanity
  const sanitySlugs = new Set(sanityPosts.map((p) => p.slug));

  // Static posts not yet migrated to Sanity
  const staticFallbacks = POSTS.filter((p) => !sanitySlugs.has(p.slug));

  // Blog article entries from Sanity
  const sanityEntries: MetadataRoute.Sitemap = sanityPosts
    .filter((p) => p.slug && p.publishedAt)
    .map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: new Date(sanityDateToISO(p.publishedAt)),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  // Blog article entries from static data
  const staticEntries: MetadataRoute.Sitemap = staticFallbacks.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...sanityEntries,
    ...staticEntries,
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date("2026-05-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookie-policy`,
      lastModified: new Date("2026-05-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/termini`,
      lastModified: new Date("2026-05-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
