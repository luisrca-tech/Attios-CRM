import { publicProcedure } from '~/server/api/trpc';

export const productQueries = {
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.db.query.products.findMany({
			with: {
				category: {
					columns: {
						name: true
					}
				}
			}
		});
	}),
	getAllIds: publicProcedure.query(({ ctx }) => {
		return ctx.db.query.products.findMany({
			columns: {
				id: true
			}
		});
	})
};