import { protectedProcedure, publicProcedure } from '~/server/api/trpc';
import { eq } from 'drizzle-orm';
import { workspaces } from '~/server/db/schema';
import { getCurrentUser } from '~/server/api/routers/utils/getCurrentUser';
import { z } from 'zod';

export const workspaceQueries = {
	getAll: protectedProcedure.query(async ({ ctx }) => {
		const workspaces = await ctx.db.query.workspaces.findMany();
		return workspaces;
	}),
	getByCurrentUser: protectedProcedure.query(async ({ ctx }) => {
		const user = await getCurrentUser(ctx);
		if (!user?.workspaceId) return null;
		const workspace = await ctx.db.query.workspaces.findFirst({
			where: eq(workspaces.id, user.workspaceId)
		});
		return workspace;
	}),
	getBySubdomain: publicProcedure
		.input(z.object({ workspace: z.string() }))
		.query(async ({ ctx, input }) => {
			const workspace = await ctx.db.query.workspaces.findFirst({
				where: eq(workspaces.workspace, input.workspace)
			});
			return workspace;
		})
};
