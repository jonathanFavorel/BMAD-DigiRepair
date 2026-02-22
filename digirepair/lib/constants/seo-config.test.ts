import { describe, it, expect } from "vitest";
import {
  SEO_CATEGORIES,
  SEO_CITIES,
  generateSeoSlugs,
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
