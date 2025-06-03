import { eq } from "drizzle-orm";
import { z } from "zod";
import { getCurrentUser } from "~/server/api/routers/utils/getCurrentUser";
import { protectedProcedure } from "~/server/api/trpc";
import { teamUsers, teams, users, workspaces } from "~/server/db/schema";

export const workspaceMutations = {
  create: protectedProcedure
    .input(
      z.object({
        workspace: z.string(),
        teamName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { workspace: workspaceName, teamName } = input;
      const currentUser = await getCurrentUser(ctx);

      const [newWorkspace] = await ctx.db.transaction(async (tx) => {
        const [workspace] = await tx
          .insert(workspaces)
          .values({
            workspace: workspaceName,
          })
          .returning();

        if (!workspace) {
          throw new Error("Failed to create workspace");
        }

        // Update the user with the new subdomain first
        await tx
          .update(users)
          .set({
            workspaceId: workspace.id,
          })
          .where(eq(users.id, currentUser.id));

        const [team] = await tx
          .insert(teams)
          .values({
            name: teamName,
            workspaceId: workspace.id,
          })
          .returning();

        if (!team) {
          throw new Error("Failed to create team");
        }

        // Create team-user relationship
        await tx.insert(teamUsers).values({
          teamId: team.id,
          userId: currentUser.id,
        });

        return [workspace, team];
      });

      return newWorkspace;
    }),
};
