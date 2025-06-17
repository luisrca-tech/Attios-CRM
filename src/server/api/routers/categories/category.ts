import { createTRPCRouter } from '../../trpc';
import { categoryQueries } from './queries/category.queries';
import { categoryMutations } from './mutations/category.mutations';

export const categoryRouter = createTRPCRouter({
	...categoryQueries,
	...categoryMutations
});
