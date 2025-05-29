import { relations } from 'drizzle-orm';
import { createTable } from '../table';
import { integer, timestamp, varchar   } from 'drizzle-orm/pg-core';
import { customers } from './customers';

export const invoices = createTable('invoice', {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
	number: varchar('number', { length: 255 }).notNull(),
	date: timestamp('date').notNull(),
	customerId: integer('customer_id').references(() => customers.id),
	status: varchar('status', { length: 255 }).notNull(),
	amount: integer('amount').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const invoicesRelations = relations(invoices, ({ one }) => ({
	customer: one(customers, {
		fields: [invoices.customerId],
		references: [customers.id]
	})
}));
