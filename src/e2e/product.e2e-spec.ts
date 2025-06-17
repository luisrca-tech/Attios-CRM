import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';

test('create product successfully', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });

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

	await page.waitForURL('/products/new');

	const imageUrl = faker.image.url({ width: 200, height: 200 });
	const imageResponse = await fetch(imageUrl);
	const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

	const fileInput = page.locator('input[type="file"]');
	await fileInput.setInputFiles({
		name: 'product-image.jpg',
		mimeType: 'image/jpeg',
		buffer: imageBuffer
	});

	const productName = faker.commerce.productName();
	await page.getByTestId('product-name-input').fill(productName);

	const productSku = faker.string.alphanumeric(8).toUpperCase();
	await page.getByTestId('product-sku-input').fill(productSku);

	const productAvailableQuantity = faker.number.int({ min: 1, max: 100 });
	await page
		.getByTestId('product-available-quantity-input')
		.fill(productAvailableQuantity.toString());

	const productPrice = faker.number.int({ min: 0, max: 3000 });
	await page.getByTestId('product-price-input').fill(productPrice.toString());

	await page.locator('form').getByLabel('Select category').click();

	await expect(page.getByRole('dialog')).toBeVisible();
	await expect(page.getByPlaceholder('Search...')).toBeVisible();

	const productCategory = faker.helpers.arrayElement([
		faker.commerce.department().slice(0, 20),
		faker.commerce.productAdjective().slice(0, 20),
		faker.person.jobTitle().slice(0, 20),
		faker.company.buzzPhrase().slice(0, 20)
	]);

	await page.getByPlaceholder('Search...').fill(productCategory);
	await page.getByRole('button', { name: `Add "${productCategory}"` }).click();
	await page.getByRole('option', { name: productCategory }).click();

	await page.locator('form').getByLabel('Select brand').click();

	await expect(page.getByRole('dialog')).toBeVisible();
	await expect(page.getByPlaceholder('Search...')).toBeVisible();

	const productBrand = faker.helpers.arrayElement([
		faker.commerce.department().slice(0, 20),
		faker.commerce.productAdjective().slice(0, 20),
		faker.person.jobTitle().slice(0, 20),
		faker.company.buzzPhrase().slice(0, 20)
	]);

	await page.getByPlaceholder('Search...').fill(productBrand);
	await page.getByRole('button', { name: `Add "${productBrand}"` }).click();
	await page.getByRole('option', { name: productBrand }).click();

	await page.getByRole('button', { name: 'Create Product' }).click();

	await expect(page.getByText('Product created successfully')).toBeVisible({
		timeout: 10000
	});
});
