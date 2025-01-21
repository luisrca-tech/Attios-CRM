import { z } from 'zod';
import { publicProcedure } from '~/server/api/trpc';
import { brands } from '~/server/db/schema';

export const brandMutations = {
	create: publicProcedure
		.input(
			z.object({
				name: z.string()
			})
		)
		.mutation(({ ctx, input }) => {
			return ctx.db.insert(brands).values(input);
		})
};
