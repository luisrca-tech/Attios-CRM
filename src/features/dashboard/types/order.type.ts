import type { InferSelectModel } from 'drizzle-orm';
import type { orders } from '~/server/db/schema';
import type { OrderItem } from './orderItem.type';

export type Order = Pick<InferSelectModel<typeof orders>, 'id'> & {
	orderItems: OrderItem[];
};
