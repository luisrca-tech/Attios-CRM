import { randomUUID } from "crypto";
import { sql } from "drizzle-orm";
import { newProductSchema } from "~/features/Products/schemas/newProduct.schema";
import { publicProcedure } from "~/server/api/trpc";
import { products } from "~/server/db/schema";

export const productMutations = {
  create: publicProcedure.input(newProductSchema).mutation(async ({ ctx, input }) => {
    const category = await ctx.db.query.categories.findFirst({
      where: (categories, { eq }) => eq(categories.name, input.category)
    });

    if (!category) {
      throw new Error("Category not found");
    }

    return ctx.db.insert(products).values({
      id: randomUUID().slice(0, 10),
      name: input.name,
      sku: input.sku,
      productImage: input.productImage,
      listPrice: sql`${input.price}::decimal`,
      quantity: input.availableQuantity,
      categoryId: category.id,
      brandId: 1,
      modelYear: new Date().getFullYear()
    });
  })
}