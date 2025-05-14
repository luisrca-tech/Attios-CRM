import { eq } from 'drizzle-orm';
import { users } from '~/server/db/schema';
import type { createTRPCContext } from '~/server/api/trpc';
import { TRPCError } from '@trpc/server';

// Define the type for the context parameter
type Context = Awaited<ReturnType<typeof createTRPCContext>>;

export const getCurrentUser = async (ctx: Context) => {
	if (!ctx.session?.userId) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'You must be logged in to access this resource'
		});
	}

	const currentUser = await ctx.db.query.users.findFirst({
		where: eq(users.id, ctx.session.userId)
	});

	if (!currentUser) {
		throw new TRPCError({
			code: 'NOT_FOUND',
			message: 'User not found'
		});
	}

	return currentUser;
};

// Extended version to get user with subdomain
export const getCurrentUserWithSubdomain = async (ctx: Context) => {
	if (!ctx.session?.userId) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'You must be logged in to access this resource'
		});
	}

	const currentUser = await ctx.db.query.users.findFirst({
		where: eq(users.id, ctx.session.userId),
		with: {
			subDomains: true
		}
	});

	if (!currentUser) {
		throw new TRPCError({
			code: 'NOT_FOUND',
			message: 'User not found'
		});
	}

	return currentUser;
};
