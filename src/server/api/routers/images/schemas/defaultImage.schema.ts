import { z } from 'zod';

export const defaultImageSchema = z.object({
	productId: z.string(),
	imageKey: z.string()
});
