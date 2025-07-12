import { db } from '../index';
import { categories } from '../schema/categories';
import { faker } from '@faker-js/faker';

export async function seedCategories(workspaceId: number) {
	// Categories appear to be global, so check if they exist first
	const existingCategories = await db.select().from(categories);
	
	if (existingCategories.length > 0) {
		console.log(`✅ Found ${existingCategories.length} existing categories, skipping creation`);
		return { insertedCategories: existingCategories };
	}

	const categoriesData = Array.from({ length: 10 }, () => ({
		name: faker.commerce.department()
	}));

	const insertedCategories = (await db
		.insert(categories)
		.values(categoriesData)
		.returning()) as { id: number; name: string }[];

	console.log(`✅ Seeded ${insertedCategories.length} categories for workspace ${workspaceId}`);

	return { insertedCategories };
}
