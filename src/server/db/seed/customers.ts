import { faker } from '@faker-js/faker';
import { db } from '..';
import { customers } from '../schema/customers';
import { orderItems, orders } from '../schema/orders';
import { invoices } from '../schema/invoices';

export async function seedCustomers() {
	await db.delete(invoices);
	await db.delete(orderItems);
	await db.delete(orders);
	await db.delete(customers);

	const customersData = Array.from({ length: 100 }, () => ({
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		email: faker.internet.email(),
		phone: faker.phone.number({ style: 'national' }),
		avatar: faker.image.avatar(),
		street: faker.location.streetAddress(),
		city: faker.location.city(),
		state: faker.location.state({ abbreviated: true }),
		zipCode: faker.location.zipCode()
	}));

	const insertedCustomers = await db
		.insert(customers)
		.values(customersData)
		.returning();
	console.log(`✓ Created ${insertedCustomers.length} customers`);

	return insertedCustomers;
}
