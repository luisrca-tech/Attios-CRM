import type { z } from 'zod';
import type { defaultImageSchema } from '../schemas/defaultImage.schema';

export type defaultImageType = z.infer<typeof defaultImageSchema>;
