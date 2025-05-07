import type { z } from 'zod';
import type { newLeadSchema } from '../schemas/newLead.schema';

export type NewLead = z.infer<typeof newLeadSchema>;
