import { z } from 'zod';

export const paginationSchema = z.object({
	page: z.number().min(1).default(1),
	pageSize: z.number().min(1).max(50).default(10),
	search: z.string().optional()
});
