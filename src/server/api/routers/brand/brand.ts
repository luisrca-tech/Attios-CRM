import { createTRPCRouter } from '../../trpc';
import { brandMutations } from './mutations/brandMutations';
import { brandQueries } from './queries/brandQueries';

export const brandRouter = createTRPCRouter({
	...brandQueries,
	...brandMutations
});
