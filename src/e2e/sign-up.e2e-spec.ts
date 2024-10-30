import test, { expect } from "@playwright/test";

test("navigate to sign up page", async ({ page }) => {
  await page.goto("/signUp", { waitUntil: "networkidle" });

  await page.getByLabel("Full Name").fill("John Doe");
  await page.getByLabel("Email").fill("john.doe@example.com");
  await page.getByLabel("Password").fill("Test1234@");

  await page.getByRole("button", { name: "Sign Up" }).click();
  
  const toast = page.getByText("We sent you a verification code to your email.");
  await expect(toast).toBeVisible();

  await page.getByRole("textbox", { name: "Enter the code we sent to your email" }).fill("123456");
  await page.getByRole("button", { name: "Confirm" }).click();
});

test("resend code", async ({ page }) => {
  await page.goto("/signUp", { waitUntil: "networkidle" });

  await page.getByLabel("Full Name").fill("John Doe");
  await page.getByLabel("Email").fill("john.doe@example.com");
  await page.getByLabel("Password").fill("Lf16012003@");

  await page.getByRole("button", { name: "Sign Up" }).click();
  
  const toast = page.getByText("We sent you a verification code to your email.");
  await expect(toast).toBeVisible();

  await page.getByRole("button", { name: "Resend Code" }).click();

  const toastResend = page.getByText("We resent you a verification code to your email.");
  await expect(toastResend).toBeVisible();
});
