import { z } from 'zod';

export const createTeamSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	subdomain: z.string().min(1, { message: 'Subdomain is required' })
});
