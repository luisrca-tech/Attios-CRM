import { db } from "../index";
import { leads } from "../schema/leads";
import { faker } from "@faker-js/faker";
import { categories } from "../schema/categories";
import { seedTags } from "./tags";
import { teams } from "../schema/teams";

const LEADS_TO_GENERATE = 30;

export async function seedLeads() {
  await db.delete(leads);

  const existingCategories = await db.select().from(categories);
  const existingTeams = await db.select().from(teams);

  if (!existingCategories.length) {
    throw new Error(
      "No categories found. Please seed products first to create categories."
    );
  }

  if (!existingTeams.length) {
    throw new Error("No teams found. Please seed teams first.");
  }

  const { insertedTags } = (await seedTags()) as {
    insertedTags: { id: number; name: string }[];
  };

  const leadsData = Array.from({ length: LEADS_TO_GENERATE }, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const randomCategory = faker.helpers.arrayElement(existingCategories);
    const randomTeam = faker.helpers.arrayElement(existingTeams);

    return {
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }),
      phone: faker.phone.number(),
      tagId: faker.helpers.arrayElement(insertedTags).id,
      image: faker.image.avatar(),
      categoryId: randomCategory.id,
      teamId: randomTeam.id,
      convertedToCustomer: faker.datatype.boolean(),
      convertedToCustomerAt: faker.datatype.boolean()
        ? faker.date.past()
        : null,
      status: faker.helpers.arrayElement(["online", "offline", "away", "busy"]),
    };
  });

  await db.insert(leads).values(leadsData);

  console.log(`✅ Seeded ${LEADS_TO_GENERATE} leads`);
}
