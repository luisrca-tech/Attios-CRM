import { createTRPCRouter } from '../../trpc';
import { invoiceQueries } from './queries/invoiceQueries';

export const invoiceRouter = createTRPCRouter({
	...invoiceQueries
});
