import type { z } from 'zod';
import type { signUpFormSchema } from '../schemas/signUpForm.schema';

export type SignUpFormType = z.infer<typeof signUpFormSchema>;
