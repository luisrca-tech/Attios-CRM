import { publicProcedure } from '~/server/api/trpc';

export const getProductQueries = {
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
	})
};
