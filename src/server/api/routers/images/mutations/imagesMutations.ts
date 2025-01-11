import { sql } from "drizzle-orm";

import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import { productImages } from "~/server/db/schema/products";

export const imagesMutations = {
  deleteImage: publicProcedure
  .input(z.object({
    productId: z.string(),
    imageUrl: z.string()
  }))
  .mutation(async ({ ctx, input }) => {
    await ctx.db.delete(productImages)
      .where(sql`product_id = ${input.productId} AND url = ${input.imageUrl}`);
    
    return { success: true };
  })
}