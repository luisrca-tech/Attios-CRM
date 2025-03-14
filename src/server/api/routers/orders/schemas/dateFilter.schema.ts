import { z } from 'zod';

export const dateFilterSchema = z.object({
	timeFrame: z.enum(['day', 'week', 'month']).optional()
});
