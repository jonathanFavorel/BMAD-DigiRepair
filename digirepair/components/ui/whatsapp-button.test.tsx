import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhatsAppButton } from "./whatsapp-button";

describe("WhatsAppButton", () => {
  it("renders inline variant with WhatsApp link", () => {
    render(<WhatsAppButton variant="inline" />);
    const link = document.querySelector('a[href*="wa.me"]');
    expect(link).toBeDefined();
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toContain("noopener");
  });

  it("renders floating variant with text", () => {
    render(<WhatsAppButton variant="floating" />);
    expect(screen.getByText("Nous contacter sur WhatsApp")).toBeDefined();
  });

  it("renders compact variant with aria-label", () => {
    render(<WhatsAppButton variant="compact" />);
    expect(screen.getByLabelText("Contacter via WhatsApp")).toBeDefined();
  });

  it("encodes custom message in URL", () => {
    render(<WhatsAppButton variant="inline" message="Test message" />);
    const link = document.querySelector('a[href*="wa.me"]');
    expect(link?.getAttribute("href")).toContain("Test%20message");
  });

  it("uses default message when none provided", () => {
    render(<WhatsAppButton variant="inline" />);
    const link = document.querySelector('a[href*="wa.me"]');
    expect(link?.getAttribute("href")).toContain("Bonjour");
  });
});
