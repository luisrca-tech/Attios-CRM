import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { publicProcedure } from '~/server/api/trpc';
import { products } from '~/server/db/schema';

export const productQueries = {
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.db.query.products.findMany({
			with: {
				category: {
					columns: {
						name: true
					}
				}
			}
		});
	}),
	getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
		return ctx.db.query.products.findFirst({
			where: eq(products.id, input),
			with: {
				category: {
					columns: {
						id: true,
						name: true
					}
				}
			}
		});
	})
};
