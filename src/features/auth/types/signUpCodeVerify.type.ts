import type { z } from 'zod';
import type { verifyCodeSchema } from '../schemas/verifyCode.schema';

export type VerifyCode = z.infer<typeof verifyCodeSchema>;
