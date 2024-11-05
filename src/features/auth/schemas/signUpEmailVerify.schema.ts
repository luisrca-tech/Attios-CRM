import { z } from 'zod';

export const signUpEmailVerifySchema = z.object({
	code: z
		.string()
		.length(6, { message: 'O código deve ter 6 dígitos' })
		.regex(/^\d+$/, { message: 'O código deve conter apenas números' })
});
