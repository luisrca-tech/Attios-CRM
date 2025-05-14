import { eq } from "drizzle-orm";
import { newLeadSchema } from "~/features/leads/schemas/newLead.schema";
import { protectedProcedure } from "~/server/api/trpc";
import { leads, tags, teamUsers } from "~/server/db/schema";
import { getCurrentUser } from "~/server/api/routers/utils/getCurrentUser";
import { TRPCError } from "@trpc/server";

// TODO: add automatic relation between lead and team when creating a lead

export const leadMutations = {
  create: protectedProcedure
    .input(newLeadSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        const tag = await tx.query.tags.findFirst({
          where: eq(tags.name, input.tag),
        });

        if (!tag) {
          throw new Error("Tag not found");
        }

        const currentUser = await getCurrentUser(ctx);

        // Get the user's team
        const userTeam = await tx.query.teamUsers.findFirst({
          where: eq(teamUsers.userId, currentUser.id),
          with: {
            team: true,
          },
        });

        if (!userTeam?.team) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User has no team assigned",
          });
        }

        const lead = await tx
          .insert(leads)
          .values({
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phone: input.phone,
            tagId: tag.id,
            image: input.leadImages?.[0]?.url ?? "",
            status: "online",
            convertedToCustomer: false,
            teamId: userTeam.team.id,
          })
          .returning({
            id: leads.id,
          });

        return lead;
      });
    }),
};
