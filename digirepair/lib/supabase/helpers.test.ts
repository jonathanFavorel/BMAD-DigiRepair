import { describe, it, expect, vi } from "vitest";
import { isAdmin } from "./helpers";

describe("isAdmin", () => {
  it("should return true when admin_users row exists", async () => {
    const mockSupabase = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: { id: "admin-uuid" },
            error: null,
          }),
        }),
      }),
    };

    const result = await isAdmin(mockSupabase as never);
    expect(result).toBe(true);
    expect(mockSupabase.from).toHaveBeenCalledWith("admin_users");
  });

  it("should return false when no admin_users row exists", async () => {
    const mockSupabase = {
      from: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: null,
            error: { message: "No rows found" },
          }),
        }),
      }),
    };

    const result = await isAdmin(mockSupabase as never);
    expect(result).toBe(false);
  });
});
