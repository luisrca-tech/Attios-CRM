import { sql } from "drizzle-orm";

import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import { productImages } from "~/server/db/schema/products";

export const imagesMutations = {
  create: publicProcedure
    .input(
      z.object({
        productId: z.string().optional(),
        imageUrl: z.string(),
        imageKey: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(productImages).values({
        productId: input.productId ?? "",
        url: input.imageUrl,
        key: input.imageKey,
      });
    }),

  uploadImage: publicProcedure
    .input(
      z.object({
        productId: z.string(),
        imageUrl: z.string(),
        imageKey: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(productImages).values({
        productId: input.productId,
        url: input.imageUrl,
        key: input.imageKey,
      });
    }),

  deleteImage: publicProcedure
    .input(
      z.object({
        productId: z.string(),
        imageKey: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(productImages)
        .where(
          sql`product_id = ${input.productId} AND key = ${input.imageKey}`
        );

      return { success: true };
    }),
};
