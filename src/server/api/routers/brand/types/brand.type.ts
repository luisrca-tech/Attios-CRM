import type { z } from 'zod';
import type { brandSchema } from '../schemas/brand.schema';

export type brandType = z.infer<typeof brandSchema>;
