import { eq, sql, asc, desc } from 'drizzle-orm';
import { z } from 'zod';
import { publicProcedure } from '~/server/api/trpc';
import { products } from '~/server/db/schema';
import { paginationSchema } from '../../schemas/pagination.schema';

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
	getProductsPaginated: publicProcedure
		.input(
			paginationSchema.extend({
				sort: z
					.object({
						column: z.enum(['name', 'quantity', 'listPrice', 'modelYear']),
						direction: z.enum(['asc', 'desc']).default('asc')
					})
					.optional()
			})
		)
		.query(async ({ ctx, input }) => {
			return ctx.db.query.products.findMany({
				with: requiredProductRelations,
				limit: input.pageSize,
				offset: (input.page - 1) * input.pageSize,
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
		.input(z.object({ pageSize: z.number().default(8) }))
		.query(async ({ ctx, input }) => {
			const [result] = await ctx.db
				.select({ count: sql<number>`count(*)`.mapWith(Number) })
				.from(products);

			const totalCount = result?.count ?? 0;
			return Math.ceil(totalCount / input.pageSize);
		}),
	getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
		return ctx.db.query.products.findFirst({
			where: eq(products.id, input),
			with: requiredProductRelations
		});
	})
};
