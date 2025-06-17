import type { z } from 'zod';
import type { uploadImageSchema } from '../schemas/uploadImage.schema';

export type uploadImageType = z.infer<typeof uploadImageSchema>;
