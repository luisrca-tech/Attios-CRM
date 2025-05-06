import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';

test('create lead successfully', async ({ page }) => {
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
	await page.getByRole('menuitem').filter({ hasText: 'New Lead' }).click();

	await page.waitForURL('/leads/new');

	const imageUrl = faker.image.url({ width: 200, height: 200 });
	const imageResponse = await fetch(imageUrl);
	const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

	const fileInput = page.locator('input[type="file"]');
	await fileInput.setInputFiles({
		name: 'lead-image.jpg',
		mimeType: 'image/jpeg',
		buffer: imageBuffer
	});

	const firstName = faker.person.firstName();
	await page.getByTestId('lead-first-name-input').fill(firstName);

	const lastName = faker.person.lastName();
	await page.getByTestId('lead-last-name-input').fill(lastName);

	const email = faker.internet.email({ firstName, lastName });
	await page.getByTestId('lead-email-input').fill(email);

	const phone = faker.phone.number();
	await page.getByTestId('lead-phone-input').fill(phone);

	await page.locator('form').getByLabel('Select tag').click();

	await expect(page.getByRole('dialog')).toBeVisible();
	await expect(page.getByPlaceholder('Search...')).toBeVisible();

	const leadTag = faker.helpers.arrayElement([
		faker.commerce.department(),
		faker.commerce.productAdjective(),
		faker.person.jobTitle(),
		faker.company.buzzPhrase()
	]);

	await page.getByPlaceholder('Search...').fill(leadTag);
	await page.getByRole('button', { name: `Add "${leadTag}"` }).click();
	await page.getByRole('option', { name: leadTag }).click();
	await expect(page.getByText('Tag added')).toBeVisible();

	await page.getByRole('button', { name: 'Add Lead' }).click();

	await expect(page.getByText('Lead created successfully')).toBeVisible({
		timeout: 10000
	});
});
