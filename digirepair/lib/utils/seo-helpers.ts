import type { Metadata } from "next";
import {
  SEO_CATEGORIES,
  SEO_CITIES,
  type SeoCategory,
  type SeoCity,
} from "@/lib/constants/seo-config";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://digirepair.fr";

interface ParsedSlug {
  category: SeoCategory;
  city: SeoCity;
}

export function parseSeoSlug(slug: string): ParsedSlug | null {
  if (!slug.startsWith("reparation-")) return null;

  const remainder = slug.slice("reparation-".length);

  for (const category of SEO_CATEGORIES) {
    if (remainder.startsWith(category.slug + "-")) {
      const citySlug = remainder.slice(category.slug.length + 1);
      const city = SEO_CITIES.find((c) => c.slug === citySlug);
      if (city) {
        return { category, city };
      }
    }
  }

  return null;
}

export function generateSeoMetadata(
  category: SeoCategory,
  city: SeoCity,
): Metadata {
  const title = `Reparation ${category.label} a ${city.name} (${city.postalCode})`;
  const description = `${category.description} DigiRepair intervient a ${city.name} et dans un rayon de 40km. Devis gratuit, reparation rapide.`;
  const slug = `reparation-${category.slug}-${city.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${slug}`,
      type: "website",
      locale: "fr_FR",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    alternates: {
      canonical: `${BASE_URL}/${slug}`,
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function generateBreadcrumbs(
  category: SeoCategory,
  city: SeoCity,
): BreadcrumbItem[] {
  return [
    { name: "Accueil", href: "/" },
    { name: category.label, href: `/#services` },
    { name: city.name, href: `/reparation-${category.slug}-${city.slug}` },
  ];
}
