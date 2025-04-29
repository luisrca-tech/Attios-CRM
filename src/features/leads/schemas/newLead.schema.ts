import { z } from 'zod';
import { storageFileSchema } from '~/features/schemas/storageFile.schema';

export const newLeadSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
	phone: z.string().min(1),
	tag: z.string().min(1),
	file: z.any().optional(),
	leadImages: storageFileSchema.optional(),
});
