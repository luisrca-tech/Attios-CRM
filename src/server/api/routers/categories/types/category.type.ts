import type { z } from 'zod';
import type { categorySchema } from '../schemas/category.schema';

export type categoryType = z.infer<typeof categorySchema>;
