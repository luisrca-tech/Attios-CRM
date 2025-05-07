import { faker } from "@faker-js/faker";
import { db } from "..";
import { users } from "../schema";

export async function seedUsers() {
  await db.delete(users);

  const usersData = Array.from({ length: 10 }, () => ({
    email: faker.internet.email(),
    fullName: faker.person.fullName(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }));

  await db.insert(users).values(usersData);
  console.log(`✓ Created ${usersData.length} users`);
}
