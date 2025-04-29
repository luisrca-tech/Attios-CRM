import { newLeadSchema } from "~/features/leads/schemas/newLead.schema";
import { protectedProcedure } from "~/server/api/trpc";
import { leads } from "~/server/db/schema";

export const leadMutations = {
  create: protectedProcedure
    .input(newLeadSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        const tag = await tx.query.tags.findFirst({
          where: (tags, { eq }) => eq(tags.name, input.tag),
        });

        if (!tag) {
          throw new Error("Tag not found");
        }

        const lead = await tx
          .insert(leads)
          .values({
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            phone: input.phone,
            tagId: tag.id,
            image: input.leadImages[0]?.url ?? "",
            status: "online",
            convertedToCustomer: false,
          })
          .returning({
            id: leads.id,
          });

        return lead;
      });
    }),
};
