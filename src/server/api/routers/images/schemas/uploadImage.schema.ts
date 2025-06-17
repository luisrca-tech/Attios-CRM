import { z } from 'zod';
import { defaultImageSchema } from './defaultImage.schema';

export const uploadImageSchema = z.object({
	...defaultImageSchema.shape,
	imageUrl: z.string()
});
