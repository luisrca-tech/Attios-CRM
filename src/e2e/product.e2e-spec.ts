import { test } from '@playwright/test';

test('create product successfully', async ({ page }) => {
	await page.goto('/sign-in', { waitUntil: 'networkidle' });
	await page.getByLabel('Email').fill('john+clerk_test@example.com');
	await page.getByLabel('Password').fill('Jd16012003@');
	await page.getByRole('button', { name: 'Sign In' }).click();
	await page.waitForURL('/', { waitUntil: 'networkidle' });

	await page
		.getByRole('button')
		.filter({ has: page.locator('svg') })
		.first()
		.click();
	await page.getByRole('menuitem').filter({ hasText: 'New Product' }).click();

	await page.getByTestId('product-name-input').fill('Test Product');
});
