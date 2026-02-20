import { describe, it, expect } from "vitest";
import type { ActionResult } from "@/types/app.types";

describe("ActionResult type contract", () => {
  it("should represent a successful result with data and no error", () => {
    const success: ActionResult<string> = { data: "ok", error: null };
    expect(success.data).toBe("ok");
    expect(success.error).toBeNull();
  });

  it("should represent a failure result with error and no data", () => {
    const failure: ActionResult<string> = {
      data: null,
      error: "Something went wrong",
    };
    expect(failure.data).toBeNull();
    expect(failure.error).toBe("Something went wrong");
  });

  it("should support complex generic types", () => {
    type Quote = { id: string; totalCents: number };
    const result: ActionResult<Quote> = {
      data: { id: "q-1", totalCents: 4999 },
      error: null,
    };
    expect(result.data?.id).toBe("q-1");
    expect(result.data?.totalCents).toBe(4999);
  });
});
