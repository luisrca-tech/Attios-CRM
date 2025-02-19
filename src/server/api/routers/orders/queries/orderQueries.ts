import { desc } from 'drizzle-orm';
import { z } from 'zod';
import { db } from '~/server/db';
import { publicProcedure } from '~/server/api/trpc';
import { orders } from '~/server/db/schema/orders';

export const orderQueries = {
	getOrders: publicProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(100).nullish(),
				cursor: z.number().nullish()
			})
		)
		.query(async ({ input }) => {
			const limit = input.limit ?? 10;
			const cursor = input.cursor ?? 0;

			const ordersWithDetails = await db.query.orders.findMany({
				limit: limit + 1,
				offset: cursor,
				orderBy: [desc(orders.createdAt)],
				with: {
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
				}
			});

			let nextCursor: number | undefined = undefined;
			if (ordersWithDetails.length > limit) {
				ordersWithDetails.pop();
				nextCursor = cursor + limit;
			}

			const transformedOrders = ordersWithDetails.map((order) => ({
				...order,
				orderItems: order.orderItems.map((item) => ({
					...item,
					productName: item.product.name
				}))
			}));

			return {
				items: transformedOrders,
				nextCursor
			};
		})
};
