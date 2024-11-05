import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	testDir: './src/e2e',
	testMatch: /.*\.e2e-spec\.ts/,
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: 'http://localhost:3000',
		headless: true,
		trace: 'on-first-retry'
	},

	webServer: {
		command: process.env.DATABASE_URL
			? 'bun start'
			: 'bun run build && bun start',
		url: 'http://localhost:3000',
		reuseExistingServer: !process.env.CI
	},

	globalSetup: path.join(__dirname, './src/e2e/global.setup.ts'),

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] }
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] }
		}
	]
});
