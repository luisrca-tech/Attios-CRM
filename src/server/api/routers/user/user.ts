import { z } from 'zod';
import { users } from '~/server/db/schema';
import { createTRPCRouter, publicProcedure } from '../../trpc';

export const userRouter = createTRPCRouter({
	create: publicProcedure
		.input(
			z.object({
				userId: z.string(),
				email: z.string().email(),
				fullName: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			await ctx.db.insert(users).values({
				id: input.userId,
				email: input.email,
				fullName: input.fullName
			});
		})
});
