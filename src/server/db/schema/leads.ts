import { relations } from 'drizzle-orm';
import {
	boolean,
	integer,
	serial,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core';
import { createTable } from './config';
import { products } from './products';
import { teams } from './teams';

export const leads = createTable('lead', {
	id: serial('id').primaryKey(),
	firstName: varchar('first_name', { length: 255 }).notNull(),
	lastName: varchar('last_name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	phone: varchar('phone', { length: 255 }).notNull(),
	role: varchar('role', { length: 255 }).notNull(),
	image: varchar('image', { length: 255 }).notNull(),
	convertedToCustomer: boolean('converted_to_customer')
		.notNull()
		.default(false),
	convertedToCustomerAt: timestamp('converted_to_customer_at'),
	status: varchar('status', { length: 255 }).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
	teamId: integer('team_id')
		.references(() => teams.id)
		.notNull()
});

export const leadsRelations = relations(leads, ({ many, one }) => ({
	products: many(products),
	team: one(teams, {
		fields: [leads.teamId],
		references: [teams.id]
	})
}));
