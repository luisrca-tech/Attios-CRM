import { publicProcedure } from '~/server/api/trpc';
import { brands } from '~/server/db/schema';
import { brandSchema } from '../schemas/brand.schema';

export const brandMutations = {
	create: publicProcedure.input(brandSchema).mutation(({ ctx, input }) => {
		return ctx.db.insert(brands).values(input);
	})
};
