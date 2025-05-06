import { z } from 'zod';

export const quantityFilterSchema = z.enum([
	'Empty',
	'Over 100',
	'Over 1000',
	'Ilimited'
]);
export const priceFilterSchema = z.enum(['Over 1000', 'Over 2000', '5000+']);

export const categoryFilterSchema = z.string();

export const productFiltersSchema = z.object({
	quantity: quantityFilterSchema.optional(),
	price: priceFilterSchema.optional(),
	category: categoryFilterSchema.optional()
});
