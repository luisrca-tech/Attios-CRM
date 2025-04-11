import { createTRPCRouter } from '../../trpc';
import { imagesMutations } from './mutations/image.mutations';

export const imagesRouter = createTRPCRouter({
	...imagesMutations
});
