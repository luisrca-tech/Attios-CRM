import { defineConfig, devices } from "@playwright/test";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load test environment variables
dotenv.config({ path: ".env.test" });

// Ensure we have the test database URL
const testDatabaseUrl = process.env.DATABASE_URL;
if (!testDatabaseUrl) {
  throw new Error("DATABASE_URL must be set in .env.test for Playwright tests");
}

export default defineConfig({
  testDir: "./src/e2e",
  testMatch: /.*\.e2e-spec\.ts/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
    trace: "on-first-retry",
    testIdAttribute: "data-testid",
    viewport: { width: 1920, height: 1080 },
  },

  webServer: {
    command: "NODE_ENV=test bun start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    env: {
      NODE_ENV: "test",
      DATABASE_URL: testDatabaseUrl,
    },
  },

  globalSetup: path.join(__dirname, "./src/e2e/global.setup.ts"),

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
