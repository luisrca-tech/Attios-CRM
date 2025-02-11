import { z } from 'zod';

export const updateProductSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	sku: z.string().min(1, 'SKU is required'),
	price: z.number().min(0, 'Price must be greater than 0'),
	availableQuantity: z.number().min(0, 'Quantity must be greater than 0'),
	category: z.string().min(1, 'Category is required'),
	subcategory: z.string().optional(),
	currency: z.string().optional(),
	productId: z.string(),
	productImages: z
		.array(
			z.object({
				url: z.string(),
				key: z.string()
			})
		)
		.optional(),
	filesToUpload: z.array(z.instanceof(File)).optional()
});
