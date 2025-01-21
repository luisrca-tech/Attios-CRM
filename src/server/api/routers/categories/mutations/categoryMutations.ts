import { z } from 'zod';
import { publicProcedure } from '~/server/api/trpc';
import { categories } from '~/server/db/schema';

export const categoryMutations = {
	create: publicProcedure
		.input(
			z.object({
				name: z.string()
			})
		)
		.mutation(({ ctx, input }) => {
			return ctx.db.insert(categories).values(input);
		})
};
