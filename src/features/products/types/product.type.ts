import type { InferSelectModel } from 'drizzle-orm';
import type { products } from '~/server/db/schema';

export type Product = Omit<InferSelectModel<typeof products>, 'id'> & {
	id: number;
	category?: { name: string };
	productImages?: { url: string }[];
};
