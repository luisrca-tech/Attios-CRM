import { eq, sql } from 'drizzle-orm';
import { randomUUID } from 'node:crypto';
import { newProductSchema } from '~/features/Products/schemas/newProduct.schema';
import { updateProductSchema } from '~/features/Products/schemas/updateProduct.schema';
import { protectedProcedure } from '~/server/api/trpc';
import { products, productImages } from '~/server/db/schema';

export const productMutations = {
	create: protectedProcedure
		.input(newProductSchema)
		.mutation(async ({ ctx, input }) => {
			return await ctx.db.transaction(async (tx) => {
				const category = await tx.query.categories.findFirst({
					where: (categories, { eq }) => eq(categories.name, input.category)
				});

				if (!category) {
					throw new Error('Category not found');
				}

				const brand = await tx.query.brands.findFirst({
					where: (brands, { eq }) => eq(brands.name, input.brand)
				});

				if (!brand) {
					throw new Error('Brand not found');
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
						modelYear: new Date().getFullYear()
					})
					.returning({
						id: products.id
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
						currency: input.currency
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
							key: image.key
						}))
					);
				}

				return { id: input.productId };
			});
		})
};
