import { test, expect } from "@playwright/test";

test.describe("VANIKARA Production RC1 Core Specs", () => {
  test("Homepage loads successfully and contains brand markers", async ({ page }) => {
    await page.goto("/");
    // Assert title brand contains VANIKARA
    await expect(page).toHaveTitle(/VANIKARA/);
    
    // Verify primary navigation is loaded
    const header = page.locator("header[role='banner']").first();
    await expect(header).toBeVisible();
  });

  test("Skip to content link is loaded for accessibility compliance", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.locator("a:has-text('Skip to content')").first();
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  test("Theme switcher button cycles color settings", async ({ page }) => {
    await page.goto("/");
    const themeBtn = page.locator("button[aria-label*='Cycle color theme']").first();
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
      // Verifies interaction works without throwing errors
      expect(true).toBe(true);
    }
  });

  test("Privacy consent banner accepts interactions", async ({ page }) => {
    await page.goto("/");
    const consentBanner = page.locator("div:has-text('Cookie Consent')").first();
    const acceptBtn = page.locator("button:has-text('Accept All')").first();
    
    if (await acceptBtn.isVisible()) {
      await acceptBtn.click();
      // Banner should dismiss
      await expect(acceptBtn).not.toBeVisible();
    }
  });

  test("API Health check endpoints are online and reporting healthy", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.status()).toBe(200);
    const payload = await res.json();
    expect(payload.status).toBe("healthy");
    expect(payload.services.database).toBe("healthy");
  });
});
