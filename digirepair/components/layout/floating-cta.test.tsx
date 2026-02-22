import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { FloatingCTA } from "./floating-cta";

describe("FloatingCTA", () => {
  it("renders fixed positioned container", () => {
    render(<FloatingCTA />);
    const container = document.querySelector(".fixed");
    expect(container).toBeDefined();
    expect(container?.className).toContain("bottom-0");
    expect(container?.className).toContain("z-50");
  });

  it("is hidden on desktop (md:hidden)", () => {
    render(<FloatingCTA />);
    const container = document.querySelector(".fixed");
    expect(container?.className).toContain("md:hidden");
  });

  it("contains a WhatsApp link", () => {
    render(<FloatingCTA />);
    const link = document.querySelector('a[href*="wa.me"]');
    expect(link).toBeDefined();
  });
});
