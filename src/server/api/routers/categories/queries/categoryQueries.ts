import { publicProcedure } from '~/server/api/trpc';

export const categoryQueries = {
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.db.query.categories.findMany({
			columns: {
				name: true
			}
		});
	})
};
