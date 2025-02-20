import { desc, sql, and, gte, lte } from 'drizzle-orm';
import type { SQL } from 'drizzle-orm';
import { z } from 'zod';
import { publicProcedure } from '~/server/api/trpc';
import { orders } from '~/server/db/schema/orders';
import { paginationSchema } from '../../schemas/pagination.schema';

const requiredOrderRelations = {
	customer: true,
	orderItems: {
		with: {
			product: {
				columns: {
					id: true,
					name: true
				}
			}
		}
	}
} as const;

const dateFilterSchema = z.object({
	timeFrame: z.enum(['day', 'week', 'month']).optional()
});

export const orderQueries = {
	getOrdersPaginated: publicProcedure
		.input(paginationSchema.merge(dateFilterSchema))
		.query(async ({ ctx, input }) => {
			const now = new Date();
			let dateFilter: SQL | undefined;

			if (input.timeFrame) {
				const startDate = new Date();
				switch (input.timeFrame) {
					case 'day':
						startDate.setHours(0, 0, 0, 0);
						break;
					case 'week':
						startDate.setDate(now.getDate() - 7);
						break;
					case 'month':
						startDate.setMonth(now.getMonth() - 1);
						break;
				}
				dateFilter = and(
					gte(orders.createdAt, startDate),
					lte(orders.createdAt, now)
				);
			}

			const result = await ctx.db.query.orders.findMany({
				with: requiredOrderRelations,
				limit: input.pageSize,
				offset: (input.page - 1) * input.pageSize,
				where: dateFilter,
				orderBy: [desc(orders.createdAt)]
			});

			return result.map((order) => ({
				...order,
				orderItems: order.orderItems.map((item) => ({
					...item,
					productName: item.product.name
				}))
			}));
		}),

	getTotalPages: publicProcedure
		.input(
			z.object({
				pageSize: z.number().default(8),
				timeFrame: z.enum(['day', 'week', 'month']).optional()
			})
		)
		.query(async ({ ctx, input }) => {
			const now = new Date();
			let dateFilter: SQL | undefined;

			if (input.timeFrame) {
				const startDate = new Date();
				switch (input.timeFrame) {
					case 'day':
						startDate.setHours(0, 0, 0, 0);
						break;
					case 'week':
						startDate.setDate(now.getDate() - 7);
						break;
					case 'month':
						startDate.setMonth(now.getMonth() - 1);
						break;
				}
				dateFilter = and(
					gte(orders.createdAt, startDate),
					lte(orders.createdAt, now)
				);
			}

			const [result] = await ctx.db
				.select({ count: sql<number>`count(*)`.mapWith(Number) })
				.from(orders)
				.where(dateFilter || undefined);

			const totalCount = result?.count ?? 0;
			return Math.ceil(totalCount / input.pageSize);
		})
};
