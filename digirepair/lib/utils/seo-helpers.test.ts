import { describe, it, expect } from "vitest";
import {
  parseSeoSlug,
  generateSeoMetadata,
  generateBreadcrumbs,
} from "./seo-helpers";
import { SEO_CATEGORIES, SEO_CITIES } from "@/lib/constants/seo-config";

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
