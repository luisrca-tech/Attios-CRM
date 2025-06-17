import { z } from 'zod';

export const storageFileSchema = z.array(
	z
		.object({
			url: z.string(),
			key: z.string()
		})
		.optional()
);
