import { publicProcedure } from '~/server/api/trpc';

export const brandQueries = {
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.db.query.brands.findMany({
			columns: {
				name: true
			}
		});
	})
};
