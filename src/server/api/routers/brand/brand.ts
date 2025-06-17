import { createTRPCRouter } from '../../trpc';
import { brandMutations } from './mutations/brand.mutations';
import { brandQueries } from './queries/brand.queries';

export const brandRouter = createTRPCRouter({
	...brandQueries,
	...brandMutations
});
