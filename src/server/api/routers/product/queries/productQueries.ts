import { eq, sql, asc, desc, ilike } from 'drizzle-orm';
import { z } from 'zod';
import { publicProcedure } from '~/server/api/trpc';
import { products } from '~/server/db/schema';
import { controlledQuerySchema } from '../../schemas/controlledQuery.schema';
import { totalPagesQuerySchema } from '../../schemas/totalPagesQuery.schema';
import { paginatedProductsSchema } from '../schemas/paginatedProducts.schema';

const requiredProductRelations = {
	category: {
		columns: {
			id: true,
			name: true
		}
	},
	productImages: {
		columns: {
			url: true,
			key: true
		}
	}
} as const;

export const productQueries = {
	// This is a paginated query that returns a list of products to be displayed in the desktop product table
	getProductsPaginated: publicProcedure
		.input(paginatedProductsSchema)
		.query(async ({ ctx, input }) => {
			const searchTerm = input.search?.trim() || '';
			const searchCondition = searchTerm
				? ilike(products.name, `%${searchTerm}%`)
				: undefined;

			return ctx.db.query.products.findMany({
				with: requiredProductRelations,
				limit: input.pageSize,
				offset: (input.page - 1) * input.pageSize,
				where: searchCondition,
				orderBy: input.sort
					? [
							input.sort.direction === 'asc'
								? asc(products[input.sort.column])
								: desc(products[input.sort.column])
						]
					: [asc(products.name)]
			});
		}),

	getTotalPages: publicProcedure
		.input(totalPagesQuerySchema)
		.query(async ({ ctx, input }) => {
			const searchTerm = input.search?.trim() || '';
			const searchCondition = searchTerm
				? ilike(products.name, `%${searchTerm}%`)
				: undefined;

			const [result] = await ctx.db
				.select({ count: sql<number>`count(*)`.mapWith(Number) })
				.from(products)
				.where(searchCondition);

			const totalCount = result?.count ?? 0;
			return Math.ceil(totalCount / input.pageSize);
		}),

	// This is the infinite scroll query for the mobile product table
	getControlledProductsInfinite: publicProcedure
		.input(controlledQuerySchema)
		.query(async ({ ctx, input }) => {
			const { limit, cursor } = input;
			const searchTerm = input.search?.trim() || '';
			const searchCondition = searchTerm
				? ilike(products.name, `%${searchTerm}%`)
				: undefined;

			const items = await ctx.db.query.products.findMany({
				with: requiredProductRelations,
				limit: limit + 1,
				offset: cursor,
				where: searchCondition,
				orderBy: [asc(products.name)]
			});

			let nextCursor: number | undefined = undefined;
			if (items.length > limit) {
				items.pop();
				nextCursor = cursor + limit;
			}

			return {
				items,
				nextCursor
			};
		}),

	getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
		return ctx.db.query.products.findFirst({
			where: eq(products.id, input),
			with: requiredProductRelations
		});
	})
};
