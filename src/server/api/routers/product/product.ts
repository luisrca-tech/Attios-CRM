import { createTRPCRouter } from '../../trpc';
import { productMutations } from './mutations/productMutations';
import { productQueries } from './queries/productQueries';

export const productRouter = createTRPCRouter({
	...productQueries,
	...productMutations
});
