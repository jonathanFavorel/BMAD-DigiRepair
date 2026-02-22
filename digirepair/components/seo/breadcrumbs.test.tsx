import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumbs } from "./breadcrumbs";
import type { BreadcrumbItem } from "@/lib/utils/seo-helpers";

const items: BreadcrumbItem[] = [
  { name: "Accueil", href: "/" },
  { name: "Telephones", href: "/#services" },
  { name: "Haulchin", href: "/reparation-telephone-haulchin" },
];

describe("Breadcrumbs", () => {
  it("renders all breadcrumb items", () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText("Accueil")).toBeDefined();
    expect(screen.getByText("Telephones")).toBeDefined();
    expect(screen.getByText("Haulchin")).toBeDefined();
  });

  it("renders links for non-last items", () => {
    render(<Breadcrumbs items={items} />);
    const accueil = screen.getByText("Accueil");
    expect(accueil.tagName).toBe("A");
  });

  it("renders last item as span (not link)", () => {
    render(<Breadcrumbs items={items} />);
    const last = screen.getByText("Haulchin");
    expect(last.tagName).toBe("SPAN");
  });

  it("has nav with aria-label", () => {
    const { container } = render(<Breadcrumbs items={items} />);
    const nav = container.querySelector("nav");
    expect(nav).toBeDefined();
    expect(nav?.getAttribute("aria-label")).toBeTruthy();
  });

  it("renders Schema.org BreadcrumbList JSON-LD", () => {
    const { container } = render(<Breadcrumbs items={items} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeDefined();
    const json = JSON.parse(script!.textContent!);
    expect(json["@type"]).toBe("BreadcrumbList");
    expect(json.itemListElement).toHaveLength(3);
  });
});
