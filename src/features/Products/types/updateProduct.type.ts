import type { z } from 'zod';
import type { updateProductSchema } from '../schemas/updateProduct.schema';

export type UpdateProduct = z.infer<typeof updateProductSchema>;
