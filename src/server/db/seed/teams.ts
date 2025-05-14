import { db } from '..';
import { teams } from '../schema/teams';

export async function seedTeams() {
	await db.delete(teams);

	const teamsData = [{ name: 'Default Team' }];

	const insertedTeams = await db.insert(teams).values(teamsData).returning();

	console.log(`✓ Created ${insertedTeams.length} teams`);
	return insertedTeams;
}
