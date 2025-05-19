import { db } from '..';
import { subDomains } from '../schema';

export async function seedSubdomains() {
	await db.delete(subDomains);

	const subdomainsData = [{ subDomain: 'default' }];

	const insertedSubdomains = await db
		.insert(subDomains)
		.values(subdomainsData)
		.returning();

	console.log(`✓ Created ${insertedSubdomains.length} subdomains`);
	return insertedSubdomains;
}
