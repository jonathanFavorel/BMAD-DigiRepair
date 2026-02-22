import { describe, it, expect } from "vitest";
import {
  parseSeoSlug,
  generateSeoMetadata,
  generateBreadcrumbs,
  parseCouche2Slug,
  generateCouche2Metadata,
  generateCouche2Breadcrumbs,
} from "./seo-helpers";
import {
  SEO_CATEGORIES,
  SEO_CITIES,
  SEO_COUCHE2_ENTRIES,
} from "@/lib/constants/seo-config";

const testCategory = SEO_CATEGORIES[0]; // telephone
const testCity = SEO_CITIES[0]; // haulchin

describe("parseSeoSlug", () => {
  it("parses valid slug correctly", () => {
    const result = parseSeoSlug("reparation-telephone-haulchin");
    expect(result).not.toBeNull();
    expect(result!.category.slug).toBe("telephone");
    expect(result!.city.slug).toBe("haulchin");
  });

  it("returns null for invalid prefix", () => {
    expect(parseSeoSlug("repair-telephone-haulchin")).toBeNull();
  });

  it("returns null for unknown category", () => {
    expect(parseSeoSlug("reparation-voiture-haulchin")).toBeNull();
  });

  it("returns null for unknown city", () => {
    expect(parseSeoSlug("reparation-telephone-paris")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(parseSeoSlug("")).toBeNull();
  });

  it("handles multi-word city slug (saint-amand-les-eaux)", () => {
    const result = parseSeoSlug("reparation-telephone-saint-amand-les-eaux");
    expect(result).not.toBeNull();
    expect(result!.city.slug).toBe("saint-amand-les-eaux");
  });

  it("handles multi-word category slug (pc-portable)", () => {
    const result = parseSeoSlug("reparation-pc-portable-valenciennes");
    expect(result).not.toBeNull();
    expect(result!.category.slug).toBe("pc-portable");
  });
});

describe("generateSeoMetadata", () => {
  it("generates correct title", () => {
    const meta = generateSeoMetadata(testCategory, testCity);
    expect(meta.title).toBe("Reparation Telephones a Haulchin (59121)");
  });

  it("generates description with category info", () => {
    const meta = generateSeoMetadata(testCategory, testCity);
    expect(meta.description).toContain("Haulchin");
    expect(meta.description).toContain("40km");
  });

  it("sets canonical URL", () => {
    const meta = generateSeoMetadata(testCategory, testCity);
    expect(meta.alternates?.canonical).toContain(
      "reparation-telephone-haulchin",
    );
  });

  it("sets OpenGraph locale to fr_FR", () => {
    const meta = generateSeoMetadata(testCategory, testCity);
    const og = meta.openGraph as { locale?: string };
    expect(og?.locale).toBe("fr_FR");
  });
});

describe("generateBreadcrumbs", () => {
  it("returns 3 items", () => {
    const crumbs = generateBreadcrumbs(testCategory, testCity);
    expect(crumbs).toHaveLength(3);
  });

  it("first item is Accueil", () => {
    const crumbs = generateBreadcrumbs(testCategory, testCity);
    expect(crumbs[0].name).toBe("Accueil");
    expect(crumbs[0].href).toBe("/");
  });

  it("last item href matches slug pattern", () => {
    const crumbs = generateBreadcrumbs(testCategory, testCity);
    expect(crumbs[2].href).toBe("/reparation-telephone-haulchin");
  });
});

// ===========================
// COUCHE 2 TESTS
// ===========================

const testEntry = SEO_COUCHE2_ENTRIES[0];

describe("parseCouche2Slug", () => {
  it("parses valid city + repair slug", () => {
    const repairSlug = `${testEntry.pieceSlug}-${testEntry.modelSlug}`;
    const result = parseCouche2Slug("haulchin", repairSlug);
    expect(result).not.toBeNull();
    expect(result!.entry.modelSlug).toBe(testEntry.modelSlug);
    expect(result!.city.slug).toBe("haulchin");
  });

  it("returns null for unknown city", () => {
    const repairSlug = `${testEntry.pieceSlug}-${testEntry.modelSlug}`;
    expect(parseCouche2Slug("paris", repairSlug)).toBeNull();
  });

  it("returns null for unknown repair slug", () => {
    expect(parseCouche2Slug("haulchin", "ecran-galaxy-z99")).toBeNull();
  });

  it("returns null for empty strings", () => {
    expect(parseCouche2Slug("", "")).toBeNull();
  });
});

describe("generateCouche2Metadata", () => {
  it("generates title with piece, brand, model and city", () => {
    const meta = generateCouche2Metadata(testEntry, testCity);
    expect(meta.title).toContain(testEntry.pieceLabel);
    expect(meta.title).toContain(testEntry.brandLabel);
    expect(meta.title).toContain(testEntry.modelLabel);
    expect(meta.title).toContain(testCity.name);
  });

  it("generates description with price", () => {
    const meta = generateCouche2Metadata(testEntry, testCity);
    expect(meta.description).toContain(String(testEntry.priceFrom));
  });

  it("sets canonical URL with city/repair pattern", () => {
    const meta = generateCouche2Metadata(testEntry, testCity);
    const repairSlug = `${testEntry.pieceSlug}-${testEntry.modelSlug}`;
    expect(meta.alternates?.canonical).toContain(
      `${testCity.slug}/${repairSlug}`,
    );
  });

  it("sets OpenGraph locale to fr_FR", () => {
    const meta = generateCouche2Metadata(testEntry, testCity);
    const og = meta.openGraph as { locale?: string };
    expect(og?.locale).toBe("fr_FR");
  });

  it("includes og:image", () => {
    const meta = generateCouche2Metadata(testEntry, testCity);
    const og = meta.openGraph as { images?: { url: string }[] };
    expect(og?.images).toBeDefined();
    expect(og?.images?.[0]?.url).toContain("og-image.png");
  });
});

describe("generateCouche2Breadcrumbs", () => {
  it("returns 4 items (Accueil > Categorie > Marque > Page)", () => {
    const crumbs = generateCouche2Breadcrumbs(testEntry, testCity);
    expect(crumbs).toHaveLength(4);
  });

  it("first item is Accueil", () => {
    const crumbs = generateCouche2Breadcrumbs(testEntry, testCity);
    expect(crumbs[0].name).toBe("Accueil");
    expect(crumbs[0].href).toBe("/");
  });

  it("third item links to Couche 1 page", () => {
    const crumbs = generateCouche2Breadcrumbs(testEntry, testCity);
    expect(crumbs[2].href).toContain(
      `/reparation-${testEntry.categorySlug}-${testCity.slug}`,
    );
  });

  it("last item is current page", () => {
    const crumbs = generateCouche2Breadcrumbs(testEntry, testCity);
    expect(crumbs[3].href).toContain(
      `/${testCity.slug}/${testEntry.pieceSlug}-${testEntry.modelSlug}`,
    );
  });
});
