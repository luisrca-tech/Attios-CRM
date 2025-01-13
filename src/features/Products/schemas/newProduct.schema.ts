import { z } from "zod";

export const newProductSchema = z.object({
  name: z.string()
    .min(3, { message: 'Name must be at least 3 characters' })
    .regex(/^[A-Z]/, { message: 'Name must start with an uppercase letter' }),
  sku: z.string()
    .regex(/^[A-Z]{3}-\d{3}$/, { message: 'SKU must be in format: 3 uppercase letters, hyphen, 3 numbers (e.g. ABC-123)' }),
  price: z.number().min(0, { message: 'Price must be greater than 0' }),
  availableQuantity: z.number().min(0, { message: 'Available quantity must be greater than 0' }),
  category: z.string().nonempty({ message: 'Category is required' }),
  brand: z.string().nonempty({ message: 'Brand is required' }),
  file: z.instanceof(File, { message: 'Image is required' }).optional(),
  productImages: z.array(z.object({ 
    url: z.string(),
    key: z.string()
  })).optional()
}); 
