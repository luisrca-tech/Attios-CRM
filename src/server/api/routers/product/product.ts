import { createTRPCRouter } from '../../trpc';
import { getProductQueries } from './queries/getProductQueries';

export const productRouter = createTRPCRouter({
	...getProductQueries
});
