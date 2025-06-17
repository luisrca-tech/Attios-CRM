import { faker } from "@faker-js/faker";
import { db } from "..";
import { users, teamUsers } from "../schema";
import { randomUUID } from "node:crypto";

export async function seedUsers(workspaceId: number) {
  await db.delete(teamUsers);
  await db.delete(users);

  const usersData = Array.from({ length: 5 }, () => ({
    id: randomUUID(),
    email: faker.internet.email(),
    fullName: faker.person.fullName(),
    workspaceId,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }));

  const insertedUsers = await db.insert(users).values(usersData).returning();
  console.log(
    `✓ Created ${insertedUsers.length} users for workspace ${workspaceId}`
  );

  return insertedUsers;
}
