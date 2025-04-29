// import { newLeadSchema } from "~/features/leads/schemas/newLead.schema";
// import { protectedProcedure } from "~/server/api/trpc";
// import { tags } from "~/server/db/schema";

// export const leadMutations = {
//   create: protectedProcedure
//     .input(newLeadSchema)
//     .mutation(async ({ ctx, input }) => {
//       return await ctx.db.transaction(async (tx) => {
//         const tag = await tx.query.tags.findFirst({
//           where: (tags, { eq }) => eq(tags.name, input.tag),
//         });

//         if (!tag) {
//           throw new Error("Tag not found");
//         }
//       });



//     }),
// };
