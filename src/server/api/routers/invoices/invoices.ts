import { createTRPCRouter } from '../../trpc';
import { invoiceQueries } from './queries/invoice.queries';

export const invoiceRouter = createTRPCRouter({
	...invoiceQueries
});
