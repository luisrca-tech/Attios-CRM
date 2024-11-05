import { z } from 'zod';

export const signInFormSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters long!')
		.max(255, 'This field accepts only 255 characters')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
			"Password must contain at least one uppercase letter, one number, and one special character '@'."
		)
});
