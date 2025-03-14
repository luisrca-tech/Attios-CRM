import { publicProcedure } from '~/server/api/trpc';
import { asc, desc, sql } from 'drizzle-orm';
import { leads } from '~/server/db/schema/leads';
import { paginatedLeadsSchema } from '../schemas/paginatedLeads.schema';
import { totalPagesQuerySchema } from '../../schemas/totalPagesQuery.schema';
import { controlledQuerySchema } from '../../schemas/controlledQuery.schema';

export const leadQueries = {
	getLeadsPaginated: publicProcedure
		.input(paginatedLeadsSchema)
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
		.input(totalPagesQuerySchema)
		.query(async ({ ctx, input }) => {
			const [result] = await ctx.db
				.select({ count: sql<number>`count(*)`.mapWith(Number) })
				.from(leads);

			const totalCount = result?.count ?? 0;
			return Math.ceil(totalCount / input.pageSize);
		}),

	// This is the infinite scroll query for the mobile leads table
	getControlledLeadsInfinite: publicProcedure
		.input(controlledQuerySchema)
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
