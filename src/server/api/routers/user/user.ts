
import { users } from '~/server/db/schema';
import { createTRPCRouter, publicProcedure } from '../../trpc';
import { userSchema } from './schemas/user.schema';

export const userRouter = createTRPCRouter({
	create: publicProcedure.input(userSchema).mutation(async ({ ctx, input }) => {
		await ctx.db.insert(users).values({
			id: input.userId,
			email: input.email,
			fullName: input.fullName
		});
	})
});
