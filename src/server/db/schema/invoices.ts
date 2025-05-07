import { integer, pgTable, timestamp } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { customers } from './customers';
import { relations } from 'drizzle-orm';

export const invoices = pgTable('invoice', {
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
