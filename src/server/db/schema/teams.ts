import { relations } from 'drizzle-orm';
import { integer, timestamp, varchar } from 'drizzle-orm/pg-core';
import { leads } from './leads';
import { products } from './products';
import { teamUsers } from './users';
import { subDomains } from './subDomain';
import { createTable } from '../table';

export const teams = createTable('team', {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
	name: varchar('name', { length: 255 }).notNull().unique(),
	subDomainId: integer('sub_domain_id').references(() => subDomains.id),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const teamsRelations = relations(teams, ({ many, one }) => ({
	users: many(teamUsers),
	products: many(products),
	leads: many(leads),
	subDomain: one(subDomains, {
		fields: [teams.subDomainId],
		references: [subDomains.id]
	})
}));
