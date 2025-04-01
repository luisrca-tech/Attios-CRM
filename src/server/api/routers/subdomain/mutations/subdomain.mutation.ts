import { z } from 'zod';
import { protectedProcedure } from '~/server/api/trpc';
import { subDomains, teams } from '~/server/db/schema';

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

				return [subdomain, team];
			});

			return newSubdomain;
		})
};
