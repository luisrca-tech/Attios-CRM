import { publicProcedure } from '~/server/api/trpc';
import { categories } from '~/server/db/schema';
import { categorySchema } from '../schemas/category.schema';

export const categoryMutations = {
	create: publicProcedure.input(categorySchema).mutation(({ ctx, input }) => {
		return ctx.db.insert(categories).values(input);
	})
};
