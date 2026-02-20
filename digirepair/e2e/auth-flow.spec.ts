import { test, expect } from "@playwright/test";

test.describe("Auth flow", () => {
  test("admin login page is accessible", async ({ page }) => {
    await page.goto("/auth/login");
    await expect(page.locator("text=Administration DigiRepair")).toBeVisible();
  });

  test("magic link page is accessible", async ({ page }) => {
    await page.goto("/auth/magic-link");
    await expect(page.locator("text=Espace Client")).toBeVisible();
  });

  test("admin routes redirect to login when unauthenticated", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForURL("**/auth/login**");
    expect(page.url()).toContain("/auth/login");
  });

  test("devis token routes are accessible without auth", async ({ page }) => {
    await page.goto("/devis/test-token-123");
    // Should not redirect to login — page may 404 but should NOT redirect to /auth/
    expect(page.url()).toContain("/devis/test-token-123");
  });
});
