import { z } from 'zod';

export const categorySchema = z.object({
	name: z.string().min(3, { message: 'Name must be at least 3 characters' })
});
