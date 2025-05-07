import type { z } from 'zod';
import type { storageFileSchema } from '../schemas/storageFile.schema';

export type StorageFile = z.infer<typeof storageFileSchema>;
