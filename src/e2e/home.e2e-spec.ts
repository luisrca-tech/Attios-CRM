import { expect, test } from "@playwright/test";

test("should show the text input", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Text" })).toBeVisible();
});
