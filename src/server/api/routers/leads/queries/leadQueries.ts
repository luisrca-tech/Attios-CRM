import { publicProcedure } from '~/server/api/trpc';
import { asc, desc, sql } from 'drizzle-orm';
import { leads } from '~/server/db/schema/leads';
import { paginatedLeadsSchema } from '../schemas/paginatedLeads.schema';
import { totalPagesQuerySchema } from '../../schemas/totalPagesQuery.schema';
import { controlledLeadsSchema } from '../schemas/controlledLeads.schema';

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
		.input(controlledLeadsSchema)
		.query(async ({ ctx, input }) => {
			const { limit, cursor, sort } = input;

			const items = await ctx.db.query.leads.findMany({
				limit: limit + 1,
				offset: cursor,
				orderBy: sort
					? [
							sort.column === 'name'
								? sort.direction === 'asc'
									? asc(
											sql<string>`concat(${leads.firstName}, ' ', ${leads.lastName})`
										)
									: desc(
											sql<string>`concat(${leads.firstName}, ' ', ${leads.lastName})`
										)
								: sort.direction === 'asc'
									? asc(leads[sort.column])
									: desc(leads[sort.column])
						]
					: [
							asc(
								sql<string>`concat(${leads.firstName}, ' ', ${leads.lastName})`
							)
						]
			});

			let nextCursor: number | undefined = undefined;
			if (items.length > limit) {
				items.pop();
				nextCursor = cursor + limit;
			}

			// If sorting by name, we need to sort the results in memory
			if (sort?.column === 'name') {
				items.sort((a, b) => {
					const aName = `${a.firstName ?? ''} ${a.lastName ?? ''}`;
					const bName = `${b.firstName ?? ''} ${b.lastName ?? ''}`;
					return sort.direction === 'asc'
						? aName.localeCompare(bName)
						: bName.localeCompare(aName);
				});
			}

			return {
				items,
				nextCursor
			};
		})
};
