import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ServiceJsonLd } from "./service-jsonld";
import { SEO_CATEGORIES, SEO_CITIES } from "@/lib/constants/seo-config";

const category = SEO_CATEGORIES[0];
const city = SEO_CITIES[0];

describe("ServiceJsonLd", () => {
  it("renders script tag with application/ld+json", () => {
    const { container } = render(
      <ServiceJsonLd category={category} city={city} />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeDefined();
  });

  it("contains Service type", () => {
    const { container } = render(
      <ServiceJsonLd category={category} city={city} />,
    );
    const json = JSON.parse(
      container.querySelector("script")!.textContent!,
    );
    expect(json["@type"]).toBe("Service");
  });

  it("includes city name in areaServed", () => {
    const { container } = render(
      <ServiceJsonLd category={category} city={city} />,
    );
    const json = JSON.parse(
      container.querySelector("script")!.textContent!,
    );
    expect(json.areaServed.name).toBe("Haulchin");
  });

  it("includes price from category", () => {
    const { container } = render(
      <ServiceJsonLd category={category} city={city} />,
    );
    const json = JSON.parse(
      container.querySelector("script")!.textContent!,
    );
    expect(json.offers.price).toBe(category.priceFrom.toString());
  });

  it("provider is DigiRepair", () => {
    const { container } = render(
      <ServiceJsonLd category={category} city={city} />,
    );
    const json = JSON.parse(
      container.querySelector("script")!.textContent!,
    );
    expect(json.provider.name).toBe("DigiRepair");
  });
});
