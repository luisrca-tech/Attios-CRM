import { db } from '../index';
import { tags } from '../schema/tags';
import { leads } from '../schema/leads';

export async function seedTags() {
	await db.delete(leads);
	await db.delete(tags);

	const tagsData = [
		{ name: 'Customer' },
		{ name: 'Prospect' },
		{ name: 'Partner' },
		{ name: 'Supplier' }
	];

	const insertedTags = (await db.insert(tags).values(tagsData).returning()) as {
		id: number;
		name: string;
	}[];

	console.log(`✅ Seeded ${insertedTags.length} tags`);

	return { insertedTags };
}
