import { z } from 'zod';
import { publicProcedure } from '~/server/api/trpc';
import { paginationSchema } from '../../schemas/pagination.schema';
import { asc, desc, sql } from 'drizzle-orm';
import { leads } from '~/server/db/schema/leads';

export const leadQueries = {
	getLeadsPaginated: publicProcedure
		.input(
			paginationSchema.extend({
				sort: z
					.object({
						column: z.enum(['name', 'email', 'phone', 'status', 'role']),
						direction: z.enum(['asc', 'desc']).default('asc')
					})
					.optional()
			})
		)
		.query(async ({ ctx, input }) => {
			return ctx.db.query.leads.findMany({
				limit: input.pageSize,
				offset: (input.page - 1) * input.pageSize,
				orderBy: input.sort
					? [
							input.sort.column === 'name'
								? input.sort.direction === 'asc'
									? asc(
											sql<string>`concat(${leads.firstName}, ' ', ${leads.lastName})`
										)
									: desc(
											sql<string>`concat(${leads.firstName}, ' ', ${leads.lastName})`
										)
								: input.sort.direction === 'asc'
									? asc(leads[input.sort.column])
									: desc(leads[input.sort.column])
						]
					: [
							asc(
								sql<string>`concat(${leads.firstName}, ' ', ${leads.lastName})`
							)
						]
			});
		}),

	getTotalPages: publicProcedure
		.input(z.object({ pageSize: z.number().default(8) }))
		.query(async ({ ctx, input }) => {
			const [result] = await ctx.db
				.select({ count: sql<number>`count(*)`.mapWith(Number) })
				.from(leads);

			const totalCount = result?.count ?? 0;
			return Math.ceil(totalCount / input.pageSize);
		}),

	// This is the infinite scroll query for the mobile leads table
	getControlledLeadsInfinite: publicProcedure
		.input(
			z.object({
				limit: z.number().min(1).max(50).default(10),
				cursor: z.number().default(0)
			})
		)
		.query(async ({ ctx, input }) => {
			const { limit, cursor } = input;

			const items = await ctx.db.query.leads.findMany({
				limit: limit + 1,
				offset: cursor,
				orderBy: [asc(leads.firstName)]
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
		})
};
