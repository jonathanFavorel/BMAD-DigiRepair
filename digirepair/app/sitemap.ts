import type { MetadataRoute } from "next";
import { generateSeoSlugs, generateSeoCouche2Slugs } from "@/lib/constants/seo-config";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://digirepair.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date("2026-02-21"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  const seoPages: MetadataRoute.Sitemap = generateSeoSlugs().map((item) => ({
    url: `${BASE_URL}/${item.slug}`,
    lastModified: new Date("2026-02-21"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const seoCouche2Pages: MetadataRoute.Sitemap = generateSeoCouche2Slugs().map(
    (item) => ({
      url: `${BASE_URL}/${item.citySlug}/${item.repairSlug}`,
      lastModified: new Date("2026-02-22"),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }),
  );

  return [...staticPages, ...seoPages, ...seoCouche2Pages];
}
