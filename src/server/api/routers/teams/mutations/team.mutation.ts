import { eq } from "drizzle-orm";
import { protectedProcedure } from "~/server/api/trpc";
import { subDomains, teamUsers, teams } from "~/server/db/schema";
import { createTeamSchema } from "../schemas/teams.schema";
import { getCurrentUser } from "~/server/api/routers/utils/getCurrentUser";

export const teamMutations = {
  create: protectedProcedure
    .input(createTeamSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, subdomain } = input;

      const existingSubdomain = await ctx.db.query.subDomains.findFirst({
        where: eq(subDomains.subDomain, subdomain),
      });

      const team = await ctx.db.transaction(async (tx) => {
        const team = await tx.insert(teams).values({ name }).returning();

        if (!team[0]) {
          throw new Error("Team not created");
        }

        let subDomainId: number;
        if (existingSubdomain) {
          subDomainId = existingSubdomain.id;
        } else {
          const newSubDomain = await tx
            .insert(subDomains)
            .values({
              subDomain: subdomain,
            })
            .returning();

          if (!newSubDomain[0]) {
            throw new Error("Subdomain not created");
          }
          subDomainId = newSubDomain[0].id;
        }

        // Get current user and set subdomain
        const currentUser = await getCurrentUser(ctx);

        await tx
          .update(teams)
          .set({
            subDomainId,
          })
          .where(eq(teams.id, team[0].id));

        await tx.insert(teamUsers).values({
          teamId: team[0].id,
          userId: currentUser.id,
        });

        return team;
      });

      return team;
    }),
};
