import type { z } from 'zod';
import type { signUpEmailVerifySchema } from '../schemas/signUpEmailVerify.schema';

export type SignUpEmailVerify = z.infer<typeof signUpEmailVerifySchema>;
