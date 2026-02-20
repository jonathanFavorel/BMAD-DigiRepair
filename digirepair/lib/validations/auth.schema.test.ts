import { describe, it, expect } from "vitest";
import { adminLoginSchema, magicLinkSchema } from "./auth.schema";

describe("adminLoginSchema", () => {
  it("should accept valid admin login data", () => {
    const result = adminLoginSchema.safeParse({
      email: "admin@digirepair.fr",
      password: "securepassword123",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid email", () => {
    const result = adminLoginSchema.safeParse({
      email: "not-an-email",
      password: "securepassword123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Email invalide");
    }
  });

  it("should reject short password", () => {
    const result = adminLoginSchema.safeParse({
      email: "admin@digirepair.fr",
      password: "short",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("8 caractères");
    }
  });

  it("should reject missing fields", () => {
    const result = adminLoginSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

describe("magicLinkSchema", () => {
  it("should accept valid email", () => {
    const result = magicLinkSchema.safeParse({
      email: "client@example.com",
    });
    expect(result.success).toBe(true);
  });

  it("should reject invalid email", () => {
    const result = magicLinkSchema.safeParse({
      email: "bad-email",
    });
    expect(result.success).toBe(false);
  });

  it("should reject empty email", () => {
    const result = magicLinkSchema.safeParse({
      email: "",
    });
    expect(result.success).toBe(false);
  });
});
