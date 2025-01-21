import { z } from 'zod';
import { defaultProductSchema } from './defaultProduct.schema';

export const updateProductSchema = z.object({
	...defaultProductSchema.shape,
	productId: z.string(),
	subcategory: z.string().optional(),
	currency: z.string().optional(),
	productImages: z
		.array(
			z.object({
				url: z.string(),
				key: z.string()
			})
		)
		.optional()
});
