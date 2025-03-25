import { z } from 'zod';
import { paginationSchema } from '../../schemas/pagination.schema';

export const paginatedInvoicesSchema = paginationSchema.extend({
	sort: z
		.object({
			column: z.enum(['number', 'date', 'customer', 'status', 'amount']),
			direction: z.enum(['asc', 'desc']).default('asc')
		})
		.optional(),
	status: z.enum(['All', 'Draft', 'Paid', 'Unpaid', 'Scheduled']).optional()
});
