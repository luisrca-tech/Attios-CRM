import { createTRPCRouter } from '~/server/api/trpc';
import { workspaceMutations } from './mutations/workspace.mutation';
import { workspaceQueries } from './queries/workspace.queries';

export const workspaceRouter = createTRPCRouter({
	...workspaceQueries,
	...workspaceMutations
});
