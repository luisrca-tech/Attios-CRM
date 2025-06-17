import type { z } from 'zod';
import type { recoverPasswordSchema } from '../schemas/recoverPassword.schema';

export type RecoverPassword = z.infer<typeof recoverPasswordSchema>;
