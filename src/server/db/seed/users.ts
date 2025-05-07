import { faker } from "@faker-js/faker";
import { db } from "..";
import { users, teamUsers } from "../schema";
import { randomUUID } from "node:crypto";

export async function seedUsers() {
  await db.delete(teamUsers);
  await db.delete(users);

  const usersData = Array.from({ length: 10 }, () => ({
    id: randomUUID(),
    email: faker.internet.email(),
    fullName: faker.person.fullName(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }));

  await db.insert(users).values(usersData);
  console.log(`✓ Created ${usersData.length} users`);
}
