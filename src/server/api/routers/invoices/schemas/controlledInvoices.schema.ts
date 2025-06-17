import { z } from 'zod';
import { controlledQuerySchema } from '../../schemas/controlledQuery.schema';

export const controlledInvoicesSchema = controlledQuerySchema.extend({
	status: z.enum(['All', 'Draft', 'Paid', 'Unpaid', 'Scheduled']).optional(),
	sort: z
		.object({
			column: z.enum(['number', 'date', 'customer', 'status', 'amount']),
			direction: z.enum(['asc', 'desc']).default('asc')
		})
		.optional()
});
