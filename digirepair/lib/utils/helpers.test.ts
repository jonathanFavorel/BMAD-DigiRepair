import { describe, it, expect } from "vitest";

describe("DigiRepair project setup", () => {
  it("should have vitest configured correctly", () => {
    expect(true).toBe(true);
  });

  it("should support TypeScript imports", () => {
    const result: { data: string | null; error: string | null } = {
      data: "test",
      error: null,
    };
    expect(result.data).toBe("test");
    expect(result.error).toBeNull();
  });
});
