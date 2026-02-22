import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { LocalBusinessJsonLd } from "./local-business-jsonld";

describe("LocalBusinessJsonLd", () => {
  it("renders a script tag with application/ld+json type", () => {
    render(<LocalBusinessJsonLd />);
    const script = document.querySelector('script[type="application/ld+json"]');
    expect(script).toBeDefined();
  });

  it("contains LocalBusiness schema type", () => {
    render(<LocalBusinessJsonLd />);
    const script = document.querySelector('script[type="application/ld+json"]');
    const jsonLd = JSON.parse(script?.textContent || "{}");
    expect(jsonLd["@type"]).toBe("LocalBusiness");
    expect(jsonLd["@context"]).toBe("https://schema.org");
  });

  it("contains DigiRepair business info", () => {
    render(<LocalBusinessJsonLd />);
    const script = document.querySelector('script[type="application/ld+json"]');
    const jsonLd = JSON.parse(script?.textContent || "{}");
    expect(jsonLd.name).toBe("DigiRepair");
    expect(jsonLd.address.addressLocality).toBe("Haulchin");
    expect(jsonLd.address.postalCode).toBe("59121");
  });

  it("contains area served with 40km radius", () => {
    render(<LocalBusinessJsonLd />);
    const script = document.querySelector('script[type="application/ld+json"]');
    const jsonLd = JSON.parse(script?.textContent || "{}");
    expect(jsonLd.areaServed["@type"]).toBe("GeoCircle");
    expect(jsonLd.areaServed.geoRadius).toBe("40000");
  });

  it("contains opening hours", () => {
    render(<LocalBusinessJsonLd />);
    const script = document.querySelector('script[type="application/ld+json"]');
    const jsonLd = JSON.parse(script?.textContent || "{}");
    expect(jsonLd.openingHoursSpecification).toBeDefined();
    expect(jsonLd.openingHoursSpecification[0].dayOfWeek).toContain("Monday");
  });
});
