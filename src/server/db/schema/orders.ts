import { relations, sql } from 'drizzle-orm';
import {
	decimal,
	index,
	integer,
	pgEnum,
	serial,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core';
import { createTable } from './config';
import { customers } from './customers';
import { products } from './products';
import { users } from './users';

export const orderStatusEnum = pgEnum('order_status', [
	'pending',
	'processing',
	'shipped',
	'delivered',
	'cancelled'
]);

export const orders = createTable(
	'order',
	{
		id: serial('id').primaryKey(),
		customerId: integer('customer_id')
			.references(() => customers.id)
			.notNull(),
		orderStatus: orderStatusEnum('order_status').notNull().default('pending'),
		orderDate: timestamp('order_date')
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		requiredDate: timestamp('required_date'),
		shippedDate: timestamp('shipped_date'),
		storeId: integer('store_id'), // Will be added when store table is created
		staffId: integer('staff_id'), // Will be added when staff table is created
		userId: varchar('user_id', { length: 50 })
			.references(() => users.id)
			.notNull(),
		createdAt: timestamp('created_at')
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull()
	},
	(table) => ({
		userIdIdx: index('user_id_idx').on(table.userId)
	})
);

export const orderItems = createTable(
	'order_item',
	{
		id: serial('id').primaryKey(),
		orderId: integer('order_id')
			.references(() => orders.id)
			.notNull(),
		productId: varchar('product_id', { length: 10 })
			.references(() => products.id)
			.notNull(),
		productImage: varchar('product_image', { length: 255 }),
		quantity: integer('quantity').notNull(),
		listPrice: decimal('list_price', { precision: 10, scale: 2 }).notNull(),
		discount: decimal('discount', { precision: 4, scale: 2 })
			.default('0')
			.notNull(),
		createdAt: timestamp('created_at')
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull()
	},
	(table) => ({
		orderIdIdx: index('order_id_idx').on(table.orderId),
		productIdIdx: index('product_id_idx').on(table.productId)
	})
);

export const ordersRelations = relations(orders, ({ many, one }) => ({
	customer: one(customers, {
		fields: [orders.customerId],
		references: [customers.id]
	}),
	user: one(users, {
		fields: [orders.userId],
		references: [users.id]
	}),
	orderItems: many(orderItems)
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
	order: one(orders, {
		fields: [orderItems.orderId],
		references: [orders.id]
	}),
	product: one(products, {
		fields: [orderItems.productId],
		references: [products.id]
	})
}));
