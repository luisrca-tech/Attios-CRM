import { expect, test } from '@playwright/test';
import path from 'node:path';

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

	const testFile = path.join(
		process.cwd(),
		'public',
		'images',
		'test',
		'blush.webp'
	);
	await page.setInputFiles('input[type="file"]', testFile);

	await page.getByLabel("Product's name").first().fill('Test Product');
	await page.getByLabel('Sku').first().fill('TEST-123');
	await page.getByLabel('Available quantity').first().fill('100');
	await page.getByLabel('Price').first().fill('99.99');

	await page
		.locator('form')
		.filter({ hasText: 'Images up to 4MB, max 10' })
		.getByLabel('Select category')
		.click();

	await expect(page.getByRole('dialog')).toBeVisible();
	await expect(page.getByPlaceholder('Search...')).toBeVisible();

	await page.getByPlaceholder('Search...').fill('test category');
	await page.getByRole('button', { name: 'Add "test category"' }).click();
	await page.getByRole('option', { name: 'test category' }).click();
	await expect(page.getByText('Category added')).toBeVisible();
});
