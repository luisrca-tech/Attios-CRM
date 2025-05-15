import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { subDomains, teams, users, teamUsers } from "~/server/db/schema";
import { getCurrentUser } from "~/server/api/routers/utils/getCurrentUser";
import { eq } from "drizzle-orm";

export const subdomainMutations = {
  create: protectedProcedure
    .input(
      z.object({
        subDomain: z.string(),
        teamName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { subDomain, teamName } = input;
      const currentUser = await getCurrentUser(ctx);
      console.log("currentUser", currentUser);

      const [newSubdomain] = await ctx.db.transaction(async (tx) => {
        const [subdomain] = await tx
          .insert(subDomains)
          .values({
            subDomain,
          })
          .returning();

        if (!subdomain) {
          throw new Error("Failed to create subdomain");
        }

        // Update the user with the new subdomain first
        await tx
          .update(users)
          .set({
            subDomainId: subdomain.id,
          })
          .where(eq(users.id, currentUser.id));

        const [team] = await tx
          .insert(teams)
          .values({
            name: teamName,
            subDomainId: subdomain.id,
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

        return [subdomain, team];
      });

      return newSubdomain;
    }),
};
