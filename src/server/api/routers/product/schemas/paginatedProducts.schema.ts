import { z } from 'zod';
import { paginationSchema } from '../../schemas/pagination.schema';

export const paginatedProductsSchema = paginationSchema.extend({
	search: z.string().optional(),
	sort: z
		.object({
			column: z.enum(['name', 'quantity', 'listPrice', 'modelYear']),
			direction: z.enum(['asc', 'desc']).default('asc')
		})
		.optional()
});
