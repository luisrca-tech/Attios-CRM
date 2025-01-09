import { faker } from '@faker-js/faker';
import { randomUUID } from 'node:crypto';
import { db } from '../index';
import { brands, categories, products } from '../schema/products';

export async function seedProducts() {
	await db.delete(products);
	await db.delete(categories);
	await db.delete(brands);

	const brandsData = Array.from({ length: 10 }, () => ({
		name: faker.company.name()
	}));

	const insertedBrands = await db.insert(brands).values(brandsData).returning();

	const categoriesData = [
		{ name: 'Smartphones' },
		{ name: 'Laptops' },
		{ name: 'Tablets' },
		{ name: 'Smartwatches' },
		{ name: 'Headphones' },
		{ name: 'Cameras' },
		{ name: 'Gaming Consoles' },
		{ name: 'Speakers' }
	];

	const insertedCategories = await db
		.insert(categories)
		.values(categoriesData)
		.returning();

	const productsData = Array.from({ length: 50 }, () => {
		const randomBrand = faker.helpers.arrayElement(insertedBrands);
		const randomCategory = faker.helpers.arrayElement(insertedCategories);
		const sku = 'SKU' + '-' + faker.number.int({ min: 1000, max: 9999 });

		return {
			id: randomUUID().slice(0, 10),
			name: faker.commerce.productName(),
			brandId: randomBrand.id,
			categoryId: randomCategory.id,
			modelYear: faker.number.int({ min: 2020, max: 2024 }),
			sku,
			listPrice: faker.commerce.price({ min: 100, max: 2000, dec: 2 }),
			productImages: Array.from({ length: 3 }, () => faker.image.url({ width: 640, height: 480 })),
			quantity: faker.number.int({ min: 0, max: 3000 })
		};
	});

	await db.insert(products).values(productsData);
}
