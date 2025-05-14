import { relations, sql } from 'drizzle-orm';
import {
	boolean,
	integer,
	pgTable,
	serial,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core';
import { products } from './products';
import { teams } from './teams';
import { tags } from './tags';

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
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
	teamId: integer('team_id')
		.references(() => teams.id)
		.notNull()
});

export const leadProducts = pgTable('lead_products', {
	id: serial('id').primaryKey(),
	leadId: integer('lead_id')
		.references(() => leads.id)
		.notNull(),
	productId: varchar('product_id', { length: 10 })
		.references(() => products.id)
		.notNull(),
	createdAt: timestamp('created_at').default(sql`now()`).notNull(),
	updatedAt: timestamp('updated_at').default(sql`now()`).notNull()
});

export const leadsRelations = relations(leads, ({ many, one }) => ({
	products: many(leadProducts),
	team: one(teams, {
		fields: [leads.teamId],
		references: [teams.id]
	}),
	tag: one(tags, {
		fields: [leads.tagId],
		references: [tags.id]
	})
}));

export const leadProductsRelations = relations(leadProducts, ({ one }) => ({
	lead: one(leads, {
		fields: [leadProducts.leadId],
		references: [leads.id]
	}),
	product: one(products, {
		fields: [leadProducts.productId],
		references: [products.id]
	})
}));
