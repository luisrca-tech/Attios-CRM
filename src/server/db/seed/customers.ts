import { faker } from "@faker-js/faker";
import { db } from "..";
import { customers } from "../schema/customers";

export async function seedCustomers() {
  await db.delete(customers);

  const customersData = Array.from({ length: 100 }, () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: "national" }),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode(),
  }));

  const insertedCustomers = await db
    .insert(customers)
    .values(customersData)
    .returning();
  console.log(`✓ Created ${insertedCustomers.length} customers`);

  return insertedCustomers;
}
