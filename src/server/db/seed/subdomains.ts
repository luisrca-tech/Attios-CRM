import { db } from "..";
import { workspaces } from "../schema";

export async function seedSubdomains() {
  await db.delete(workspaces);

  const workspacesData = [{ workspace: "default" }];

  const insertedSubdomains = await db
    .insert(workspaces)
    .values(workspacesData)
    .returning();

  console.log(`✓ Created ${insertedSubdomains.length} subdomains`);
  return insertedSubdomains;
}
