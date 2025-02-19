import { createTRPCRouter } from '~/server/api/trpc';
import { orderQueries } from './queries/orderQueries';

export const orderRouter = createTRPCRouter({
	...orderQueries
});
