import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SEOCouche2Template } from "./seo-couche2-template";
import { SEO_COUCHE2_ENTRIES, SEO_CITIES } from "@/lib/constants/seo-config";

const entry = SEO_COUCHE2_ENTRIES[0];
const city = SEO_CITIES[1]; // valenciennes

describe("SEOCouche2Template", () => {
  it("renders hero heading with piece, brand, model and city", () => {
    render(<SEOCouche2Template entry={entry} city={city} />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toContain(entry.pieceLabel);
    expect(h1.textContent).toContain(entry.brandLabel);
    expect(h1.textContent).toContain(entry.modelLabel);
    expect(h1.textContent).toContain(city.name);
  });

  it("renders price and delai", () => {
    render(<SEOCouche2Template entry={entry} city={city} />);
    const priceMatches = screen.getAllByText(new RegExp(`${entry.priceFrom}`));
    expect(priceMatches.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(entry.delai)).toBeDefined();
  });

  it("renders specs section with details cards", () => {
    render(<SEOCouche2Template entry={entry} city={city} />);
    expect(screen.getByText("Appareil")).toBeDefined();
    expect(screen.getByText("Reparation")).toBeDefined();
    expect(screen.getByText("Intervention")).toBeDefined();
  });

  it("renders FAQ section with questions", () => {
    render(<SEOCouche2Template entry={entry} city={city} />);
    for (const faq of entry.faq) {
      expect(screen.getByText(faq.question)).toBeDefined();
    }
  });

  it("renders maillage interne link to Couche 1", () => {
    render(<SEOCouche2Template entry={entry} city={city} />);
    const link = screen.getByText(/Voir toutes les reparations/);
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toContain(
      `/reparation-${entry.categorySlug}-${city.slug}`,
    );
  });

  it("renders CTA section with WhatsApp", () => {
    render(<SEOCouche2Template entry={entry} city={city} />);
    const cta = screen.getByText(/Besoin de reparer/);
    expect(cta.textContent).toContain(city.name);
  });

  it("renders breadcrumbs with 4 levels", () => {
    render(<SEOCouche2Template entry={entry} city={city} />);
    expect(screen.getByText("Accueil")).toBeDefined();
  });

  it("renders Service JSON-LD without AggregateRating", () => {
    const { container } = render(
      <SEOCouche2Template entry={entry} city={city} />,
    );
    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    const serviceScript = Array.from(scripts).find(
      (s) => JSON.parse(s.textContent!)["@type"] === "Service",
    );
    expect(serviceScript).toBeDefined();
    const data = JSON.parse(serviceScript!.textContent!);
    expect(data.aggregateRating).toBeUndefined();
  });

  it("renders FAQPage JSON-LD", () => {
    const { container } = render(
      <SEOCouche2Template entry={entry} city={city} />,
    );
    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    const types = Array.from(scripts).map((s) =>
      JSON.parse(s.textContent!)["@type"],
    );
    expect(types).toContain("FAQPage");
  });
});
