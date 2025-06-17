import { createTRPCRouter } from '~/server/api/trpc';
import { orderQueries } from './queries/order.queries';

export const orderRouter = createTRPCRouter({
	...orderQueries
});
