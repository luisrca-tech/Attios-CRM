import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { subDomains, teams, users, teamUsers } from "~/server/db/schema";
import { getCurrentUser } from "~/server/api/routers/utils/getCurrentUser";
import { eq } from "drizzle-orm";

import { VercelCore as Vercel } from "@vercel/sdk/core.js";
import { projectsAddProjectDomain } from "@vercel/sdk/funcs/projectsAddProjectDomain.js";
import { env } from "~/env";

const vercel = new Vercel({
  bearerToken: env.VERCEL_TOKEN,
});

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

        try {
          if (process.env.NODE_ENV === "production") {
            console.log(
              "Attempting to create Vercel domain:",
              `${subDomain}.attioscrm.site`
            );
            await projectsAddProjectDomain(vercel, {
              idOrName: env.VERCEL_PROJECT_ID,
              teamId: env.VERCEL_TEAM_ID,
              requestBody: {
                name: `${subDomain}.attioscrm.site`,
              },
            });
          }
        } catch (error) {
          console.error("Vercel domain creation failed:", error);
          // Consider throwing the error to rollback the transaction
          throw new Error("Failed to create Vercel domain");
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
