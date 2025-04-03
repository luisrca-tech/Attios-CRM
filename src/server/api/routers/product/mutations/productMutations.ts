import { eq, sql, inArray } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { newProductSchema } from "~/features/products/schemas/newProduct.schema";
import { updateProductSchema } from "~/features/products/schemas/updateProduct.schema";
import { protectedProcedure } from "~/server/api/trpc";
import { products, productImages, orderItems } from "~/server/db/schema";
import { deleteStorageFile } from "~/app/server/storage";

export const productMutations = {
  create: protectedProcedure
    .input(newProductSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        const category = await tx.query.categories.findFirst({
          where: (categories, { eq }) => eq(categories.name, input.category),
        });

        if (!category) {
          throw new Error("Category not found");
        }

        const brand = await tx.query.brands.findFirst({
          where: (brands, { eq }) => eq(brands.name, input.brand),
        });

        if (!brand) {
          throw new Error("Brand not found");
        }

        const productId = randomUUID().slice(0, 10);

        const product = await tx
          .insert(products)
          .values({
            id: productId,
            brandId: brand.id,
            name: input.name,
            sku: input.sku,
            listPrice: sql`${input.price}::decimal`,
            quantity: input.availableQuantity,
            categoryId: category.id,
            categoryName: category.name,
            modelYear: new Date().getFullYear(),
          })
          .returning({
            id: products.id,
          });

        return product;
      });
    }),

  update: protectedProcedure
    .input(updateProductSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        await tx
          .update(products)
          .set({
            name: input.name,
            sku: input.sku,
            listPrice: sql`${input.price}::decimal`,
            quantity: input.availableQuantity,
            categoryName: input.category,
            subcategory: input.subcategory ?? null,
            currency: input.currency,
          })
          .where(eq(products.id, input.productId));

        if (input.productImages && input.productImages.length > 0) {
          await tx
            .delete(productImages)
            .where(eq(productImages.productId, input.productId));

          await tx.insert(productImages).values(
            input.productImages.map((image) => ({
              productId: input.productId,
              url: image.url,
              key: image.key,
            }))
          );
        }

        return { id: input.productId };
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        // Get product images before deleting them
        const images = await tx.query.productImages.findMany({
          where: eq(productImages.productId, input.id),
        });

        await tx.delete(orderItems).where(eq(orderItems.productId, input.id));

        await tx
          .delete(productImages)
          .where(eq(productImages.productId, input.id));

        // Delete images from UploadThing
        await Promise.all(images.map((image) => deleteStorageFile(image.key)));

        return await tx.delete(products).where(eq(products.id, input.id));
      });
    }),

  bulkDelete: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        // Get product images before deleting them
        const images = await tx.query.productImages.findMany({
          where: inArray(productImages.productId, input.ids),
        });

        await tx
          .delete(orderItems)
          .where(inArray(orderItems.productId, input.ids));

        await tx
          .delete(productImages)
          .where(inArray(productImages.productId, input.ids));

        // Delete images from UploadThing
        await Promise.all(images.map((image) => deleteStorageFile(image.key)));

        return await tx.delete(products).where(inArray(products.id, input.ids));
      });
    }),
};
