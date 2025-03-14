import type { z } from 'zod';
import type { newProductSchema } from '../schemas/newProduct.schema';

export type NewProduct = z.infer<typeof newProductSchema>;
