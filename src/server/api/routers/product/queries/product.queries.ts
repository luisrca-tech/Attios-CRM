import { and, asc, desc, eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { createSearchCondition } from '~/server/api/routers/utils/searchCondition';
import { publicProcedure } from '~/server/api/trpc';
import { categories, products } from '~/server/db/schema';
import { totalPagesQuerySchema } from '../../schemas/totalPagesQuery.schema';
import { controlledProductsSchema } from '../schemas/controlledProducts.schema';
import { paginatedProductsSchema } from '../schemas/paginatedProducts.schema';
import { applyPriceFilter, applyQuantityFilter } from '../utils/filters';

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
			const searchCondition = createSearchCondition(input.search, {
				name: products.name
			});

			const quantityFilter = applyQuantityFilter(input.filters?.quantity);
			const priceFilter = applyPriceFilter(input.filters?.price);
			const categoryFilter = input.filters?.category
				? eq(
						products.categoryId,
						sql`(SELECT id FROM ${categories} WHERE name = ${input.filters.category})`
					)
				: undefined;
			const workspaceFilter = input.filters?.workspaceId
				? eq(products.workspaceId, input.filters.workspaceId)
				: undefined;

			const filterConditions = [
				searchCondition,
				quantityFilter,
				priceFilter,
				categoryFilter,
				workspaceFilter
			].filter(
				(condition): condition is NonNullable<typeof condition> =>
					condition !== undefined
			);

			const whereCondition =
				filterConditions.length > 0 ? and(...filterConditions) : undefined;

			return ctx.db.query.products.findMany({
				with: requiredProductRelations,
				limit: input.pageSize,
				offset: (input.page - 1) * input.pageSize,
				where: whereCondition,
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
			const searchCondition = createSearchCondition(input.search, {
				name: products.name
			});

			const quantityFilter = applyQuantityFilter(input.filters?.quantity);
			const priceFilter = applyPriceFilter(input.filters?.price);
			const categoryFilter = input.filters?.category
				? eq(
						products.categoryId,
						sql`(SELECT id FROM ${categories} WHERE name = ${input.filters.category})`
					)
				: undefined;

			const filterConditions = [
				searchCondition,
				quantityFilter,
				priceFilter,
				categoryFilter
			].filter(
				(condition): condition is NonNullable<typeof condition> =>
					condition !== undefined
			);

			const whereCondition =
				filterConditions.length > 0 ? and(...filterConditions) : undefined;

			const [result] = await ctx.db
				.select({ count: sql<number>`count(*)`.mapWith(Number) })
				.from(products)
				.where(whereCondition);

			const totalCount = result?.count ?? 0;
			return Math.ceil(totalCount / input.pageSize);
		}),

	// This is the infinite scroll query for the mobile product table
	getControlledProductsInfinite: publicProcedure
		.input(controlledProductsSchema)
		.query(async ({ ctx, input }) => {
			const { limit, cursor, sort } = input;
			const searchCondition = createSearchCondition(input.search, {
				name: products.name
			});

			const items = await ctx.db.query.products.findMany({
				with: requiredProductRelations,
				limit: limit + 1,
				offset: cursor,
				where: searchCondition,
				orderBy: sort
					? [
							sort.direction === 'asc'
								? asc(products[sort.column])
								: desc(products[sort.column])
						]
					: [asc(products.name)]
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

	getById: publicProcedure.input(z.number()).query(({ ctx, input }) => {
		return ctx.db.query.products.findFirst({
			where: eq(products.id, Number(input)),
			with: requiredProductRelations
		});
	})
};
