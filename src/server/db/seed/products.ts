import { faker } from '@faker-js/faker';
import { randomUUID } from 'node:crypto';
import { db } from '../index';
import { productImages, products } from '../schema/products';
import { orderItems } from '../schema/orders';
import { seedCategories } from './categories';
import { seedBrands } from './brands';

export async function seedProducts() {
	await db.delete(orderItems);
	await db.delete(productImages);
	await db.delete(products);

	const { insertedCategories } = (await seedCategories()) as {
		insertedCategories: { id: number; name: string }[];
	};
	const { insertedBrands } = (await seedBrands()) as {
		insertedBrands: { id: number; name: string }[];
	};

	// Generate unique product names
	const usedNames = new Set<string>();
	const generateUniqueName = () => {
		let name = faker.commerce.productName();
		while (usedNames.has(name)) {
			name = `${faker.commerce.productName()} ${faker.string.alphanumeric(4)}`;
		}
		usedNames.add(name);
		return name;
	};

	const productsData = Array.from({ length: 500 }, (_, index) => {
		const randomBrand = faker.helpers.arrayElement(insertedBrands);
		const randomCategory = faker.helpers.arrayElement(insertedCategories);
		const sku = `SKU-${randomUUID().slice(0, 8)}`;

		return {
			id: randomUUID().slice(0, 10),
			name: generateUniqueName(),
			brandId: randomBrand.id,
			categoryId: randomCategory.id,
			modelYear: faker.number.int({ min: 2020, max: 2024 }),
			sku,
			listPrice: faker.commerce.price({ min: 100, max: 2000, dec: 2 }),
			quantity: faker.number.int({ min: 0, max: 3000 }),
			description: faker.lorem.paragraph({ min: 10, max: 1000 }),
			isActive: index >= 50 // Set first 50 products as inactive
		};
	});

	const insertedProducts = await db
		.insert(products)
		.values(productsData)
		.returning();

	const productImagesData = insertedProducts.flatMap((product) =>
		Array.from({ length: 3 }, () => ({
			productId: product.id,
			url: faker.image.url({ width: 640, height: 480 }),
			key: randomUUID()
		}))
	);

	await db.insert(productImages).values(productImagesData);

	console.log('✓ Created 500 products with unique names');
}
