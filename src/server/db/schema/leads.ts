import { boolean, pgTable, integer, timestamp } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { tags } from './tags';
import { relations } from 'drizzle-orm';

export const leads = pgTable('lead', {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
	firstName: varchar('first_name', { length: 255 }).notNull(),
	lastName: varchar('last_name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	phone: varchar('phone', { length: 255 }).notNull(),
	tagId: integer('tag_id').references(() => tags.id),
	image: varchar('image', { length: 255 }).notNull(),
	convertedToCustomer: boolean('converted_to_customer')
		.notNull()
		.default(false),
	convertedToCustomerAt: timestamp('converted_to_customer_at'),
	status: varchar('status', { length: 255 }).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const leadsRelations = relations(leads, ({ one }) => ({
	tag: one(tags, {
		fields: [leads.tagId],
		references: [tags.id]
	})
}));
