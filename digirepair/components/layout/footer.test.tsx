import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

describe("Footer", () => {
  it("renders with dark background", () => {
    render(<Footer />);
    const footer = document.querySelector("footer");
    expect(footer?.className).toContain("bg-dr-dark");
  });

  it("renders services column", () => {
    render(<Footer />);
    expect(screen.getByText("Services")).toBeDefined();
    expect(screen.getByText("Smartphones")).toBeDefined();
    expect(screen.getByText("Consoles")).toBeDefined();
  });

  it("renders practical info", () => {
    render(<Footer />);
    expect(screen.getByText("Infos pratiques")).toBeDefined();
    expect(screen.getByText("Haulchin, 59121")).toBeDefined();
    expect(screen.getByText("Lun - Sam : 9h - 19h")).toBeDefined();
  });

  it("renders legal links", () => {
    render(<Footer />);
    expect(screen.getByText("Mentions legales")).toBeDefined();
    expect(screen.getByText("Politique de confidentialite")).toBeDefined();
    expect(screen.getByText("Conditions generales de vente")).toBeDefined();
  });

  it("renders copyright", () => {
    render(<Footer />);
    expect(screen.getByText(/2026 DigiRepair/)).toBeDefined();
  });
});
