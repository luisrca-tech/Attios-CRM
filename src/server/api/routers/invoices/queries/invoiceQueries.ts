import { publicProcedure } from '~/server/api/trpc';
import { asc, sql, desc, eq } from 'drizzle-orm';
import { totalPagesQuerySchema } from '../../schemas/totalPagesQuery.schema';
import { controlledQuerySchema } from '../../schemas/controlledQuery.schema';
import { paginatedInvoicesSchema } from '../schemas/paginatedInvoices.schema';
import { invoices } from '~/server/db/schema/invoices';

const requiredInvoiceRelations = {
	customer: {
		columns: {
			id: true,
			firstName: true,
			lastName: true,
			phone: true,
			email: true,
			street: true,
			city: true,
			state: true,
			zipCode: true,
			avatar: true,
			createdAt: true,
			updatedAt: true
		}
	}
} as const;

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
					? [
							sort.column === 'customer'
								? sort.direction === 'asc'
									? asc(invoices.customerId)
									: desc(invoices.customerId)
								: sort.direction === 'asc'
									? asc(
											invoices[
												sort.column as keyof typeof invoices
											] as typeof invoices.number
										)
									: desc(
											invoices[
												sort.column as keyof typeof invoices
											] as typeof invoices.number
										)
						]
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
		.input(controlledQuerySchema)
		.query(async ({ ctx, input }) => {
			const { limit, cursor } = input;

			const items = await ctx.db.query.invoices.findMany({
				with: requiredInvoiceRelations,
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
		})
};
