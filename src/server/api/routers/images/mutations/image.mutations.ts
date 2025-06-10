import { and, eq } from "drizzle-orm";
import { publicProcedure } from "~/server/api/trpc";
import { productImages } from "~/server/db/schema/products";
import { uploadImageSchema } from "../schemas/uploadImage.schema";
import { defaultImageSchema } from "../schemas/defaultImage.schema";

export const imagesMutations = {
  upload: publicProcedure
    .input(uploadImageSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(productImages).values({
        productId: Number(input.productId),
        url: input.imageUrl,
        key: input.imageKey,
      });
    }),

  delete: publicProcedure
    .input(defaultImageSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(productImages)
        .where(
          and(
            eq(productImages.productId, Number(input.productId)),
            eq(productImages.key, input.imageKey)
          )
        );

      return { success: true };
    }),
};
