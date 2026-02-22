import type { Metadata } from "next";
import {
  SEO_CATEGORIES,
  SEO_CITIES,
  SEO_COUCHE2_ENTRIES,
  type SeoCategory,
  type SeoCity,
  type SeoCouche2Entry,
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

// ===========================
// COUCHE 2 HELPERS
// ===========================

interface ParsedCouche2Slug {
  entry: SeoCouche2Entry;
  city: SeoCity;
}

export function parseCouche2Slug(
  citySlug: string,
  repairSlug: string,
): ParsedCouche2Slug | null {
  const city = SEO_CITIES.find((c) => c.slug === citySlug);
  if (!city) return null;

  const entry = SEO_COUCHE2_ENTRIES.find(
    (e) => `${e.pieceSlug}-${e.modelSlug}` === repairSlug,
  );
  if (!entry) return null;

  return { entry, city };
}

export function generateCouche2Metadata(
  entry: SeoCouche2Entry,
  city: SeoCity,
): Metadata {
  const title = `Reparation ${entry.pieceLabel} ${entry.brandLabel} ${entry.modelLabel} a ${city.name} (${city.postalCode})`;
  const description = `Reparation ${entry.pieceLabel.toLowerCase()} ${entry.brandLabel} ${entry.modelLabel} a ${city.name}. Des ${entry.priceFrom} euros, delai ${entry.delai}. DigiRepair intervient a ${city.name} et dans un rayon de 40km. Devis gratuit.`;
  const slug = `${city.slug}/${entry.pieceSlug}-${entry.modelSlug}`;

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

export function generateCouche2Breadcrumbs(
  entry: SeoCouche2Entry,
  city: SeoCity,
): BreadcrumbItem[] {
  const category = SEO_CATEGORIES.find((c) => c.slug === entry.categorySlug);
  const categoryLabel = category ? category.label : entry.categorySlug;

  return [
    { name: "Accueil", href: "/" },
    { name: categoryLabel, href: `/#services` },
    {
      name: `${entry.brandLabel} ${entry.modelLabel}`,
      href: `/reparation-${entry.categorySlug}-${city.slug}`,
    },
    {
      name: `${entry.pieceLabel} ${city.name}`,
      href: `/${city.slug}/${entry.pieceSlug}-${entry.modelSlug}`,
    },
  ];
}
