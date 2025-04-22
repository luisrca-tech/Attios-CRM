import type { z } from 'zod';
import type { createTeamSchema } from '../schemas/teams.schema';

export type CreateTeamInputType = z.infer<typeof createTeamSchema>;
