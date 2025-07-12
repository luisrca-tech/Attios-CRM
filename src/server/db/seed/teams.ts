import { db } from "..";
import { teams } from "../schema/teams";
import { eq } from "drizzle-orm";

export async function seedTeams(workspaceId: number) {
  // Check if teams already exist for this workspace
  const existingTeams = await db
    .select()
    .from(teams)
    .where(eq(teams.workspaceId, workspaceId));

  if (existingTeams.length > 0) {
    console.log(
      `✓ Found ${existingTeams.length} existing teams for workspace ${workspaceId}, skipping team creation`
    );
    return existingTeams;
  }

  // Only create default teams if none exist
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
