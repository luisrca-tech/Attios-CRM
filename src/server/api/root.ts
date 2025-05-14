import { createCallerFactory, createTRPCRouter } from '~/server/api/trpc';
import { brandRouter } from './routers/brand';
import { categoryRouter } from './routers/categories/category';
import { imagesRouter } from './routers/images';
import { invoiceRouter } from './routers/invoices';
import { leadRouter } from './routers/leads';
import { orderRouter } from './routers/orders/order';
import { productRouter } from './routers/product/product';
import { teamRouter } from './routers/teams';
import { userRouter } from './routers/user/user';
import { tagRouter } from './routers/Tag';
import { subdomainRouter } from './routers/subdomain';
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
	images: imagesRouter,
	orders: orderRouter,
	leads: leadRouter,
	invoices: invoiceRouter,
	teams: teamRouter,
	subdomain: subdomainRouter,
	tag: tagRouter
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
