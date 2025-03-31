import { relations, sql } from 'drizzle-orm';
import { index, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createTable } from './config';
import { orders } from './orders';

export const customers = createTable(
	'customer',
	{
		id: serial('id').primaryKey(),
		firstName: varchar('first_name', { length: 50 }).notNull(),
		lastName: varchar('last_name', { length: 50 }).notNull(),
		phone: varchar('phone', { length: 20 }),
		email: varchar('email', { length: 255 }).notNull().unique(),
		street: varchar('street', { length: 255 }),
		city: varchar('city', { length: 100 }),
		state: varchar('state', { length: 2 }),
		zipCode: varchar('zip_code', { length: 10 }),
		avatar: varchar('avatar', { length: 255 }),
		createdAt: timestamp('created_at')
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).notNull()
	},
	(table) => ({
		emailIdx: index('customer_email_idx').on(table.email)
	})
);

export const customersRelations = relations(customers, ({ many }) => ({
	orders: many(orders)
}));
