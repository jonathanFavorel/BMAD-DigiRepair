import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SEOPageTemplate } from "./seo-page-template";
import { SEO_CATEGORIES, SEO_CITIES } from "@/lib/constants/seo-config";

const category = SEO_CATEGORIES[0]; // telephone
const city = SEO_CITIES[1]; // valenciennes

describe("SEOPageTemplate", () => {
  it("renders hero heading with category and city", () => {
    render(<SEOPageTemplate category={category} city={city} />);
    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toBeDefined();
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toContain("Telephones");
    expect(h1.textContent).toContain("Valenciennes");
  });

  it("renders repair cards", () => {
    render(<SEOPageTemplate category={category} city={city} />);
    for (const repair of category.repairs) {
      expect(screen.getByText(repair.title)).toBeDefined();
    }
  });

  it("renders FAQ section with questions", () => {
    render(<SEOPageTemplate category={category} city={city} />);
    for (const faq of category.faq) {
      expect(screen.getByText(faq.question)).toBeDefined();
    }
  });

  it("renders CTA section with city name", () => {
    render(<SEOPageTemplate category={category} city={city} />);
    const cta = screen.getByText(/Besoin d/);
    expect(cta.textContent).toContain("Valenciennes");
  });

  it("renders breadcrumbs", () => {
    render(<SEOPageTemplate category={category} city={city} />);
    expect(screen.getByText("Accueil")).toBeDefined();
  });

  it("renders Service JSON-LD", () => {
    const { container } = render(
      <SEOPageTemplate category={category} city={city} />,
    );
    const scripts = container.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    const types = Array.from(scripts).map((s) =>
      JSON.parse(s.textContent!)["@type"],
    );
    expect(types).toContain("Service");
  });

  it("renders FAQPage JSON-LD", () => {
    const { container } = render(
      <SEOPageTemplate category={category} city={city} />,
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
