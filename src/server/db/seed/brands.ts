import { db } from '..';
import { brands } from '../schema';
import { faker } from '@faker-js/faker';
import { eq } from 'drizzle-orm';

export async function seedBrands(workspaceId: number) {
	// Only delete brands for this specific workspace (if they have workspaceId)
	// For now, brands appear to be global, so we'll check if they exist first
	const existingBrands = await db.select().from(brands);
	
	if (existingBrands.length > 0) {
		console.log(`✅ Found ${existingBrands.length} existing brands, skipping creation`);
		return { insertedBrands: existingBrands };
	}

	const brandsData = Array.from({ length: 10 }, () => ({
		name: faker.company.name()
	}));

	const insertedBrands = (await db
		.insert(brands)
		.values(brandsData)
		.returning()) as { id: number; name: string }[];

	console.log(`✅ Seeded ${insertedBrands.length} brands for workspace ${workspaceId}`);

	return { insertedBrands };
}
