import { z } from 'zod';
import { productFiltersSchema } from '../product/schemas/productFilters.schema';

export const totalPagesQuerySchema = z.object({
	pageSize: z.number().min(1).max(50).default(10),
	search: z.string().optional(),
	status: z.enum(['All', 'Draft', 'Paid', 'Unpaid', 'Scheduled']).optional(),
	filters: productFiltersSchema.optional()
});
