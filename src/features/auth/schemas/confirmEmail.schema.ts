import { z } from 'zod';

export const confirmEmailSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' })
});
