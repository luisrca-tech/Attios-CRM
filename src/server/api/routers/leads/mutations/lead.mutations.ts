import { newLeadSchema } from "~/features/leads/schemas/newLead.schema";
import { protectedProcedure } from "~/server/api/trpc";
import { leads } from "~/server/db/schema";

export const leadMutations = {
  create: protectedProcedure
    .input(newLeadSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        const category = await tx.query.categories.findFirst({
          where: (categories, { eq }) => eq(categories.name, input.category),
        });

        if (!category) {
          throw new Error("Category not found");
        }
      });
    }),
};
