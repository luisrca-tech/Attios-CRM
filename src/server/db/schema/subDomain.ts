import { relations } from 'drizzle-orm';
import { integer, timestamp, varchar } from 'drizzle-orm/pg-core';
import { orders } from './orders';
import { users } from './users';
import { createTable } from '../table';

// TODO: Change all routes and tables to use subdomain
export const subDomains = createTable('sub_domain', {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
	subDomain: varchar('sub_domain', { length: 255 }).notNull().unique(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const subDomainsRelations = relations(subDomains, ({ many }) => ({
	users: many(users),
	orders: many(orders)
}));
