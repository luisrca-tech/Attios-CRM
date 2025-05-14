import { eq } from 'drizzle-orm';
import { z } from 'zod';
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
	}),

	getUserById: publicProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			const user = await ctx.db.query.users.findFirst({
				where: eq(users.id, input),
				with: {
					subDomains: true,
					teams: true
				}
			});
			return user;
		})
});
