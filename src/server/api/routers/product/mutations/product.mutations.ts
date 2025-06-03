import { eq, inArray, sql } from "drizzle-orm";
import { z } from "zod";
import { deleteStorageFile } from "~/app/server/storage";
import { newProductSchema } from "~/features/products/schemas/newProduct.schema";
import { updateProductSchema } from "~/features/products/schemas/updateProduct.schema";
import { getCurrentUser } from "~/server/api/routers/utils/getCurrentUser";
import { protectedProcedure } from "~/server/api/trpc";
import { orderItems, productImages, products } from "~/server/db/schema";

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

        // Get the current user to find their subdomain
        const currentUser = await getCurrentUser(ctx);

        if (!currentUser.workspaceId) {
          throw new Error("User has no workspace");
        }

        const product = await tx
          .insert(products)
          .values({
            brandId: brand.id,
            name: input.name,
            sku: input.sku,
            listPrice: sql`${input.price}::decimal`,
            quantity: input.availableQuantity,
            categoryId: category.id,
            categoryName: category.name,
            modelYear: new Date().getFullYear(),
            workspaceId: currentUser.workspaceId,
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
          .where(eq(products.id, Number(input.productId)));

        if (input.productImages && input.productImages.length > 0) {
          await tx
            .delete(productImages)
            .where(eq(productImages.productId, Number(input.productId)));

          await tx.insert(productImages).values(
            input.productImages.map((image) => ({
              productId: Number(input.productId),
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
          where: eq(productImages.productId, Number(input.id)),
        });

        await tx
          .delete(orderItems)
          .where(eq(orderItems.productId, Number(input.id)));

        await tx
          .delete(productImages)
          .where(eq(productImages.productId, Number(input.id)));

        // Delete images from UploadThing
        await Promise.all(images.map((image) => deleteStorageFile(image.key)));

        return await tx
          .delete(products)
          .where(eq(products.id, Number(input.id)));
      });
    }),

  bulkDelete: protectedProcedure
    .input(z.object({ ids: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.transaction(async (tx) => {
        // Get product images before deleting them
        const images = await tx.query.productImages.findMany({
          where: inArray(productImages.productId, input.ids.map(Number)),
        });

        await tx
          .delete(orderItems)
          .where(inArray(orderItems.productId, input.ids.map(Number)));

        await tx
          .delete(productImages)
          .where(inArray(productImages.productId, input.ids.map(Number)));

        // Delete images from UploadThing
        await Promise.all(images.map((image) => deleteStorageFile(image.key)));

        return await tx
          .delete(products)
          .where(inArray(products.id, input.ids.map(Number)));
      });
    }),

  toggleActive: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(products)
        .set({ isActive: sql`NOT ${products.isActive}` })
        .where(eq(products.id, Number(input.id)));
    }),
};
