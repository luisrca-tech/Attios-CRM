import { relations } from 'drizzle-orm';
import { integer, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createTable } from './config';
import { leads } from './leads';
import { products } from './products';
import { subDomains } from './subDomain';
import { users } from './users';

export const teams = createTable('team', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	subDomainId: integer('sub_domain_id').references(() => subDomains.id),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const teamsRelations = relations(teams, ({ many, one }) => ({
	users: many(users),
	subDomains: one(subDomains),
	products: many(products),
	leads: many(leads)
}));
