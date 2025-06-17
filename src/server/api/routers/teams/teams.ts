import { createTRPCRouter } from '~/server/api/trpc';
import { teamMutations } from './mutations/team.mutation';

export const teamRouter = createTRPCRouter({
	...teamMutations
});
