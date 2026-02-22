import { describe, it, expect } from "vitest";
import {
  SEO_CATEGORIES,
  SEO_CITIES,
  SEO_COUCHE2_ENTRIES,
  generateSeoSlugs,
  generateSeoCouche2Slugs,
} from "./seo-config";

describe("seo-config", () => {
  it("has 6 categories", () => {
    expect(SEO_CATEGORIES).toHaveLength(6);
  });

  it("has 15 cities", () => {
    expect(SEO_CITIES).toHaveLength(15);
  });

  it("every category has required fields", () => {
    for (const cat of SEO_CATEGORIES) {
      expect(cat.slug).toBeTruthy();
      expect(cat.label).toBeTruthy();
      expect(cat.description).toBeTruthy();
      expect(cat.priceFrom).toBeGreaterThan(0);
      expect(cat.repairs.length).toBeGreaterThan(0);
      expect(cat.faq.length).toBeGreaterThan(0);
    }
  });

  it("every city has required fields", () => {
    for (const city of SEO_CITIES) {
      expect(city.slug).toBeTruthy();
      expect(city.name).toBeTruthy();
      expect(city.postalCode).toMatch(/^\d{5}$/);
      expect(city.distanceKm).toBeGreaterThanOrEqual(0);
    }
  });

  it("generateSeoSlugs returns 90 combinations (6×15)", () => {
    const slugs = generateSeoSlugs();
    expect(slugs).toHaveLength(90);
  });

  it("slug format is reparation-{category}-{city}", () => {
    const slugs = generateSeoSlugs();
    for (const item of slugs) {
      expect(item.slug).toBe(
        `reparation-${item.category.slug}-${item.city.slug}`,
      );
    }
  });

  it("all slugs are unique", () => {
    const slugs = generateSeoSlugs().map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("seo-config Couche 2", () => {
  it("has at least 40 Couche 2 entries", () => {
    expect(SEO_COUCHE2_ENTRIES.length).toBeGreaterThanOrEqual(40);
  });

  it("every entry has required fields", () => {
    for (const entry of SEO_COUCHE2_ENTRIES) {
      expect(entry.categorySlug).toBeTruthy();
      expect(entry.brandSlug).toBeTruthy();
      expect(entry.brandLabel).toBeTruthy();
      expect(entry.modelSlug).toBeTruthy();
      expect(entry.modelLabel).toBeTruthy();
      expect(entry.pieceSlug).toBeTruthy();
      expect(entry.pieceLabel).toBeTruthy();
      expect(entry.priceFrom).toBeGreaterThan(0);
      expect(entry.delai).toBeTruthy();
      expect(entry.faq.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("every entry categorySlug matches an existing category", () => {
    const categorySlugs = SEO_CATEGORIES.map((c) => c.slug);
    for (const entry of SEO_COUCHE2_ENTRIES) {
      expect(categorySlugs).toContain(entry.categorySlug);
    }
  });

  it("repair slugs (piece-model) are unique", () => {
    const repairSlugs = SEO_COUCHE2_ENTRIES.map(
      (e) => `${e.pieceSlug}-${e.modelSlug}`,
    );
    expect(new Set(repairSlugs).size).toBe(repairSlugs.length);
  });

  it("generateSeoCouche2Slugs returns entries × cities combinations", () => {
    const slugs = generateSeoCouche2Slugs();
    expect(slugs).toHaveLength(SEO_COUCHE2_ENTRIES.length * SEO_CITIES.length);
  });

  it("Couche 2 slug format is citySlug + repairSlug", () => {
    const slugs = generateSeoCouche2Slugs();
    for (const item of slugs) {
      expect(item.citySlug).toBe(item.city.slug);
      expect(item.repairSlug).toBe(
        `${item.entry.pieceSlug}-${item.entry.modelSlug}`,
      );
    }
  });

  it("all Couche 2 city+repair combinations are unique", () => {
    const slugs = generateSeoCouche2Slugs().map(
      (s) => `${s.citySlug}/${s.repairSlug}`,
    );
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
