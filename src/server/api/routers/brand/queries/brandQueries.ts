import { publicProcedure } from '~/server/api/trpc';

const requiredBrandRelations = {
	products: {
		columns: {
			id: true,
			name: true
		}
	}
} as const;

export const brandQueries = {
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.db.query.brands.findMany({
			with: requiredBrandRelations
		});
	})
};
