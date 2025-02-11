import { createTRPCRouter } from '../../trpc';
import { categoryQueries } from './queries/categoryQueries';
import { categoryMutations } from './mutations/categoryMutations';

export const categoryRouter = createTRPCRouter({
	...categoryQueries,
	...categoryMutations
});
