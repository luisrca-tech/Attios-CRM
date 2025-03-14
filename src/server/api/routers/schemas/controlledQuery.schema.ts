import { z } from 'zod';

export const controlledQuerySchema = z.object({
	limit: z.number().min(1).max(50).default(10),
	cursor: z.number().default(0)
});
