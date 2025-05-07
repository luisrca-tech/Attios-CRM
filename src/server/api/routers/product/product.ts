import { createTRPCRouter } from '../../trpc';
import { productMutations } from './mutations/product.mutations';
import { productQueries } from './queries/product.queries';

export const productRouter = createTRPCRouter({
	...productQueries,
	...productMutations
});
