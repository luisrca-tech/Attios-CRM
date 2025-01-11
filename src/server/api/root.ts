import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';
import { userRouter } from './routers/user/user';
import { productRouter } from './routers/product';
import { categoryRouter } from './routers/categories/category';
import { brandRouter } from './routers/brand';
import { imagesRouter } from './routers/images';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	user: userRouter,
	product: productRouter,
	category: categoryRouter,
	brand: brandRouter,
	images: imagesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
