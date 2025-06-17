import { db } from "..";
import { teams } from "../schema/teams";

export async function seedTeams(workspaceId: number) {
  await db.delete(teams);

  const teamsData = [
    { name: "Sales Team", workspaceId },
    { name: "Support Team", workspaceId },
    { name: "Development Team", workspaceId },
  ];

  const insertedTeams = await db.insert(teams).values(teamsData).returning();
  console.log(
    `✓ Created ${insertedTeams.length} teams for workspace ${workspaceId}`
  );

  return insertedTeams;
}
