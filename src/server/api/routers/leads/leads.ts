import { createTRPCRouter } from '../../trpc';
import { leadQueries } from './queries/lead.queries';

export const leadRouter = createTRPCRouter({
	...leadQueries
});
