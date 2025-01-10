import { randomUUID } from "crypto";
import { eq, sql } from "drizzle-orm";
import { newProductSchema } from "~/features/Products/schemas/newProduct.schema";
import { updateProductSchema } from "~/features/Products/schemas/updateProduct.schema";
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

    const brand = await ctx.db.query.brands.findFirst({
      where: (brands, { eq }) => eq(brands.name, input.brand)
    });

    if (!brand) {
      throw new Error("Brand not found");
    }

    const product = await ctx.db.insert(products).values({
      id: randomUUID().slice(0, 10),
      brandId: brand.id,
      name: input.name,
      sku: input.sku,
      listPrice: sql`${input.price}::decimal`,
      quantity: input.availableQuantity,
      categoryId: category.id,
      category: category.name,
      modelYear: new Date().getFullYear(),
      productImages: input.productImages,
    }).returning({
      id: products.id,
    });

    return product;
  }),
  update: publicProcedure.input(updateProductSchema).mutation(async ({ ctx, input }) => {
    await ctx.db.update(products)
      .set({
        name: input.name,
        sku: input.sku,
        listPrice: sql`${input.price}::decimal`,
        quantity: input.availableQuantity,
        category: input.category,
        subcategory: input.subcategory ?? null,
        currency: input.currency,
        productImages: input.productImages
      })
      .where(eq(products.id, input.productId))
      .returning({
        id: products.id
      });
  })
}