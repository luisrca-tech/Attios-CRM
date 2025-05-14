import { z } from 'zod';
import { protectedProcedure } from '~/server/api/trpc';
import { subDomains, teams, users } from '~/server/db/schema';
import { getCurrentUser } from '~/server/api/routers/utils/getCurrentUser';
import { eq } from 'drizzle-orm';

export const subdomainMutations = {
	create: protectedProcedure
		.input(
			z.object({
				subDomain: z.string(),
				teamName: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { subDomain, teamName } = input;
			const currentUser = await getCurrentUser(ctx);

			const [newSubdomain] = await ctx.db.transaction(async (tx) => {
				const [subdomain] = await tx
					.insert(subDomains)
					.values({
						subDomain
					})
					.returning();

				if (!subdomain) {
					throw new Error('Failed to create subdomain');
				}

				const [team] = await tx
					.insert(teams)
					.values({
						name: teamName,
						subDomainId: subdomain.id
					})
					.returning();

				// Update the user with the new subdomain
				await tx
					.update(users)
					.set({
						subDomainId: subdomain.id
					})
					.where(eq(users.id, currentUser.id));

				return [subdomain, team];
			});

			return newSubdomain;
		})
};
