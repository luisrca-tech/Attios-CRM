import type { z } from 'zod';
import type { signInFormSchema } from '../schemas/signInForm.schema';

export type SignInFormType = z.infer<typeof signInFormSchema>;
