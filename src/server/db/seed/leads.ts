import { db } from '../index';
import { leads } from '../schema/leads';
import { faker } from '@faker-js/faker';

const LEADS_TO_GENERATE = 30;

export async function seedLeads() {
	await db.delete(leads);

	const leadsData = Array.from({ length: LEADS_TO_GENERATE }, () => {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();

		return {
			firstName,
			lastName,
			email: faker.internet.email({ firstName, lastName }),
			phone: faker.phone.number(),
			role: faker.helpers.arrayElement([
				'Customer',
				'Prospect',
				'Partner',
				'Supplier'
			]),
			image: faker.image.avatar(),
			convertedToCustomer: faker.datatype.boolean(),
			convertedToCustomerAt: faker.datatype.boolean()
				? faker.date.past()
				: null,
			status: faker.helpers.arrayElement(['online', 'offline', 'away', 'busy'])
		};
	});

	await db.insert(leads).values(leadsData);

	console.log(`✅ Seeded ${LEADS_TO_GENERATE} leads`);
}
