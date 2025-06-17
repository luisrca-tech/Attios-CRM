import { db } from "..";
import { workspaces } from "../schema/workspaces";

interface WorkspaceConfig {
  name: string;
  productCount: number;
  leadCount: number;
  orderCount: number;
}

export async function seedWorkspaces(configs: WorkspaceConfig[]) {
  await db.delete(workspaces);

  const workspacesData = configs.map((config) => ({
    workspace: config.name,
  }));

  const insertedWorkspaces = await db
    .insert(workspaces)
    .values(workspacesData)
    .returning();
  console.log(`✓ Created ${insertedWorkspaces.length} workspaces`);

  return insertedWorkspaces;
}
