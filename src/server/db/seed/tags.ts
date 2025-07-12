import { db } from "../index";
import { tags } from "../schema/tags";

export async function seedTags(workspaceId: number) {
  // Tags appear to be global, so check if they exist first
  const existingTags = await db.select().from(tags);

  if (existingTags.length > 0) {
    console.log(
      `✅ Found ${existingTags.length} existing tags, skipping creation`
    );
    return { insertedTags: existingTags };
  }

  const tagsData = [
    { name: "Customer" },
    { name: "Prospect" },
    { name: "Partner" },
    { name: "Supplier" },
  ];

  const insertedTags = (await db.insert(tags).values(tagsData).returning()) as {
    id: number;
    name: string;
  }[];

  console.log(
    `✅ Seeded ${insertedTags.length} tags for workspace ${workspaceId}`
  );

  return { insertedTags };
}
