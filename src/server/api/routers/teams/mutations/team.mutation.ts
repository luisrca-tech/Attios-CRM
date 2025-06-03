import { eq } from "drizzle-orm";
import { protectedProcedure } from "~/server/api/trpc";
import { teamUsers, teams, workspaces } from "~/server/db/schema";
import { createTeamSchema } from "../schemas/teams.schema";
import { getCurrentUser } from "~/server/api/routers/utils/getCurrentUser";

export const teamMutations = {
  create: protectedProcedure
    .input(createTeamSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, workspace } = input;

      const existingSubdomain = await ctx.db.query.workspaces.findFirst({
        where: eq(workspaces.workspace, workspace),
      });

      const team = await ctx.db.transaction(async (tx) => {
        const team = await tx.insert(teams).values({ name }).returning();

        if (!team[0]) {
          throw new Error("Team not created");
        }

        let workspaceId: number;
        if (existingSubdomain) {
          workspaceId = existingSubdomain.id;
        } else {
          const newSubDomain = await tx
            .insert(workspaces)
            .values({
              workspace,
            })
            .returning();

          if (!newSubDomain[0]) {
            throw new Error("Subdomain not created");
          }
          workspaceId = newSubDomain[0].id;
        }

        // Get current user and set workspace
        const currentUser = await getCurrentUser(ctx);

        await tx
          .update(teams)
          .set({
            workspaceId,
          })
          .where(eq(teams.id, team[0].id))
          .returning();

        await tx.insert(teamUsers).values({
          teamId: team[0].id,
          userId: currentUser.id,
        });

        return team;
      });

      return team;
    }),
};
