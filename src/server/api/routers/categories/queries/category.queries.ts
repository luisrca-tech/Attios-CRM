import { publicProcedure } from '~/server/api/trpc';

const requiredCategoryRelations = {
	products: {
		columns: {
			id: true,
			name: true
		}
	}
} as const;

export const categoryQueries = {
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.db.query.categories.findMany({
			with: requiredCategoryRelations
		});
	})
};
