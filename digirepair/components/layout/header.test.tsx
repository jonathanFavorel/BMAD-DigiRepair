import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./header";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { priority, fill, ...rest } = props;
    return <img {...rest} data-priority={priority ? "true" : undefined} data-fill={fill ? "true" : undefined} />;
  },
}));

describe("Header", () => {
  it("renders the logo", () => {
    render(<Header />);
    const logo = screen.getByAltText("DigiRepair");
    expect(logo).toBeDefined();
  });

  it("renders desktop navigation links", () => {
    render(<Header />);
    expect(screen.getByText("Services")).toBeDefined();
    expect(screen.getByText("Tarifs")).toBeDefined();
    expect(screen.getByText("Blog")).toBeDefined();
    expect(screen.getByText("Contact")).toBeDefined();
  });

  it("renders desktop CTA button", () => {
    render(<Header />);
    const ctaButtons = screen.getAllByText("Nous contacter");
    expect(ctaButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("renders mobile hamburger button", () => {
    render(<Header />);
    const hamburger = screen.getByLabelText("Ouvrir le menu");
    expect(hamburger).toBeDefined();
  });

  it("is sticky with backdrop blur", () => {
    render(<Header />);
    const header = document.querySelector("header");
    expect(header?.className).toContain("sticky");
    expect(header?.className).toContain("backdrop-blur");
  });
});
