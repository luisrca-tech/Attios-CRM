import { publicProcedure } from '~/server/api/trpc';
import { asc, sql, eq } from 'drizzle-orm';
import { totalPagesQuerySchema } from '../../schemas/totalPagesQuery.schema';
import { controlledQuerySchema } from '../../schemas/controlledQuery.schema';
import { paginatedInvoicesSchema } from '../schemas/paginatedInvoices.schema';
import { controlledInvoicesSchema } from '../schemas/controlledInvoices.schema';
import { invoices } from '~/server/db/schema/invoices';
import { getInvoiceOrderBy } from '../utils/getInvoiceOrderBy';
import { requiredInvoiceRelations } from '../constants/requiredInvoiceRelations';

export const invoiceQueries = {
	getInvoicesPaginated: publicProcedure
		.input(paginatedInvoicesSchema)
		.query(async ({ ctx, input }) => {
			const { sort, status } = input;

			const query = ctx.db.query.invoices.findMany({
				with: requiredInvoiceRelations,
				limit: input.pageSize,
				offset: (input.page - 1) * input.pageSize,
				where:
					status !== 'All'
						? eq(
								invoices.status,
								status as 'Draft' | 'Paid' | 'Unpaid' | 'Scheduled'
							)
						: undefined,
				orderBy: sort
					? [getInvoiceOrderBy(sort.column, sort.direction)]
					: undefined
			});

			const results = await query;

			// If sorting by customer, we need to sort the results in memory
			if (sort?.column === 'customer') {
				return results.sort((a, b) => {
					const aName = `${a.customer?.firstName ?? ''} ${a.customer?.lastName ?? ''}`;
					const bName = `${b.customer?.firstName ?? ''} ${b.customer?.lastName ?? ''}`;
					return sort.direction === 'asc'
						? aName.localeCompare(bName)
						: bName.localeCompare(aName);
				});
			}

			return results;
		}),

	getTotalPages: publicProcedure
		.input(totalPagesQuerySchema)
		.query(async ({ ctx, input }) => {
			const [result] = await ctx.db
				.select({ count: sql<number>`count(*)`.mapWith(Number) })
				.from(invoices)
				.where(
					input.status !== 'All'
						? eq(
								invoices.status,
								input.status as 'Draft' | 'Paid' | 'Unpaid' | 'Scheduled'
							)
						: undefined
				);

			const totalCount = result?.count ?? 0;
			return Math.ceil(totalCount / input.pageSize);
		}),

	// This is the infinite scroll query for the mobile leads table
	getControlledLeadsInfinite: publicProcedure
		.input(controlledQuerySchema)
		.query(async ({ ctx, input }) => {
			const { limit, cursor } = input;

			const items = await ctx.db.query.invoices.findMany({
				limit: limit + 1,
				offset: cursor,
				orderBy: [asc(invoices.number)]
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

	getControlledInvoicesInfinite: publicProcedure
		.input(controlledInvoicesSchema)
		.query(async ({ ctx, input }) => {
			const { limit, cursor, status, sort } = input;

			const items = await ctx.db.query.invoices.findMany({
				with: requiredInvoiceRelations,
				limit: limit + 1,
				offset: cursor,
				where:
					status !== 'All'
						? eq(
								invoices.status,
								status as 'Draft' | 'Paid' | 'Unpaid' | 'Scheduled'
							)
						: undefined,
				orderBy: sort
					? [getInvoiceOrderBy(sort.column, sort.direction)]
					: [asc(invoices.number)]
			});

			let nextCursor: number | undefined = undefined;
			if (items.length > limit) {
				items.pop();
				nextCursor = cursor + limit;
			}

			// If sorting by customer, we need to sort the results in memory
			if (sort?.column === 'customer') {
				items.sort((a, b) => {
					const aName = `${a.customer?.firstName ?? ''} ${a.customer?.lastName ?? ''}`;
					const bName = `${b.customer?.firstName ?? ''} ${b.customer?.lastName ?? ''}`;
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
