import { eq } from "drizzle-orm";
import { protectedProcedure } from "~/server/api/trpc";
import { subDomains, teamUsers, teams, users } from "~/server/db/schema";
import { createTeamSchema } from "../schemas/teams.schema";

export const teamMutations = {
  create: protectedProcedure
    .input(createTeamSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, subdomain } = input;

      const userHasSubDomain = await ctx.db.query.subDomains.findMany({
        where: eq(subDomains.subDomain, subdomain),
      });

      if (userHasSubDomain.length > 0) {
        console.log("User has subdomain");
        const team = await ctx.db.transaction(async (tx) => {
          const team = await tx.insert(teams).values({ name }).returning();

          if (!team[0]) {
            throw new Error("Team not created");
          }

          await tx.insert(teamUsers).values({
            teamId: team[0].id,
            userId: ctx.session.userId,
          });

          return team;
        });
        return team;
      }

      const team = await ctx.db.transaction(async (tx) => {
        const team = await tx.insert(teams).values({ name }).returning();

        if (!team[0]) {
          throw new Error("Team not created");
        }

        const subDomain = await tx
          .insert(subDomains)
          .values({
            subDomain: subdomain,
          })
          .returning();

        if (!subDomain[0]) {
          throw new Error("Subdomain not created");
        }

        await tx
          .update(users)
          .set({
            subDomainId: subDomain[0].id,
          })
          .where(eq(users.id, ctx.session.userId));

        await tx.insert(teamUsers).values({
          teamId: team[0].id,
          userId: ctx.session.userId,
        });

        return team;
      });

      return team;
    }),
};
