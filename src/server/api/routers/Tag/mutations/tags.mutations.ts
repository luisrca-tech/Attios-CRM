import { publicProcedure } from '~/server/api/trpc';
import { tags } from '~/server/db/schema';
import { tagSchema } from '../schemas/tag.schema';

export const tagMutations = {
	create: publicProcedure.input(tagSchema).mutation(({ ctx, input }) => {
		return ctx.db.insert(tags).values(input);
	})
};
