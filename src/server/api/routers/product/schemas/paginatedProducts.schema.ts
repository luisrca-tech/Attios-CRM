import { z } from 'zod';
import { paginationSchema } from '../../schemas/pagination.schema';
import { productFiltersSchema } from './productFilters.schema';

export const paginatedProductsSchema = paginationSchema.extend({
	sort: z
		.object({
			column: z.enum(['name', 'quantity', 'listPrice', 'modelYear']),
			direction: z.enum(['asc', 'desc']).default('asc')
		})
		.optional(),
	filters: productFiltersSchema.extend({
		workspaceId: z.number().optional()
	})
});
