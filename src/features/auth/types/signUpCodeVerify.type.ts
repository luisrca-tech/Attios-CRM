import type { z } from 'zod';
import { verifyCodeSchema } from '../schemas/verifyCode.schema';

export type VerifyCode = z.infer<typeof verifyCodeSchema>;
