import { z } from 'zod';
import { storageFileSchema } from '~/features/schemas/storageFile.schema';

export const newProductSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	sku: z.string().min(1, 'SKU is required'),
	price: z.number().min(0, 'Price must be greater than 0'),
	availableQuantity: z.number().min(0, 'Quantity must be greater than 0'),
	category: z.string().min(1, 'Category is required'),
	brand: z.string().min(1, 'Brand is required'),
	file: z.any().optional(),
	productImages: storageFileSchema.optional(),
	workspaceId: z.number().min(1, 'Workspace is required')
});
