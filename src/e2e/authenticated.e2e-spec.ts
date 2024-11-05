import { setupClerkTestingToken } from '@clerk/testing/playwright';
import { expect, test } from '@playwright/test';

test('sign up successfully', async ({ page }) => {
	await page.goto('/signUp', { waitUntil: 'networkidle' });

	await page.getByLabel('Full Name').fill('John Doe');
	await page.getByLabel('Email').fill('john+clerk_test@example.com');
	await page.getByLabel('Password').fill('Jd16012003@');

	await page.getByRole('button', { name: 'Sign Up' }).click();

	const toast = page.getByText(
		'We sent you a verification code to your email.'
	);
	await expect(toast).toBeVisible();

	await page
		.getByRole('textbox', { name: 'Enter the code we sent to your email' })
		.fill('424242');
	await page.getByRole('button', { name: 'Confirm' }).click();

	await page.waitForURL('/', { waitUntil: 'networkidle' });
	const userButton = page.getByRole('button', { name: /user/i });
	await expect(userButton).toBeVisible();
});

test('resend code', async ({ page }) => {
	await setupClerkTestingToken({ page });

	await page.goto('/signUp', { waitUntil: 'networkidle' });

	await page.getByLabel('Full Name').fill('John Doe');
	await page.getByLabel('Email').fill('john.doe@example.com');
	await page.getByLabel('Password').fill('Lf16012003@');

	await page.getByRole('button', { name: 'Sign Up' }).click();

	const toast = page.getByText(
		'We sent you a verification code to your email.'
	);
	await expect(toast).toBeVisible();

	await page.getByRole('button', { name: 'Resend Code' }).click();

	const toastResend = page.getByText(
		'We resent you a verification code to your email.'
	);
	await expect(toastResend).toBeVisible();
});
