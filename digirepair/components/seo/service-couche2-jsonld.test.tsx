import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ServiceCouche2JsonLd } from "./service-couche2-jsonld";
import { SEO_COUCHE2_ENTRIES, SEO_CITIES } from "@/lib/constants/seo-config";

const entry = SEO_COUCHE2_ENTRIES[0];
const city = SEO_CITIES[1]; // valenciennes

describe("ServiceCouche2JsonLd", () => {
  it("renders Service JSON-LD script", () => {
    const { container } = render(
      <ServiceCouche2JsonLd entry={entry} city={city} />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeDefined();
    const data = JSON.parse(script!.textContent!);
    expect(data["@type"]).toBe("Service");
  });

  it("includes provider DigiRepair", () => {
    const { container } = render(
      <ServiceCouche2JsonLd entry={entry} city={city} />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data.provider.name).toBe("DigiRepair");
    expect(data.provider["@type"]).toBe("LocalBusiness");
  });

  it("includes areaServed with city", () => {
    const { container } = render(
      <ServiceCouche2JsonLd entry={entry} city={city} />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data.areaServed.name).toBe(city.name);
    expect(data.areaServed.postalCode).toBe(city.postalCode);
  });

  it("does not include AggregateRating (avoid structured data spam)", () => {
    const { container } = render(
      <ServiceCouche2JsonLd entry={entry} city={city} />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data.aggregateRating).toBeUndefined();
  });

  it("includes specific serviceType with piece, brand, model", () => {
    const { container } = render(
      <ServiceCouche2JsonLd entry={entry} city={city} />,
    );
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);
    expect(data.serviceType).toContain(entry.pieceLabel);
    expect(data.serviceType).toContain(entry.brandLabel);
    expect(data.serviceType).toContain(entry.modelLabel);
  });
});
