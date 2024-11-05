import type { z } from 'zod';
import type { signUpEmailVerifySchema } from '../schemas/signUpEmailVerify.schema';

export type SignUpEmailVerifyType = z.infer<typeof signUpEmailVerifySchema>;
