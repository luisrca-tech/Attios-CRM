import { createTRPCRouter } from '../../trpc';
import { leadQueries } from './queries/leadQueries';

export const leadRouter = createTRPCRouter({
	...leadQueries
});
