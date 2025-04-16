import { relations } from 'drizzle-orm';
import { serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createTable } from './config';
import { leads } from './leads';
import { products } from './products';
import { teamUsers } from './users';

export const teams = createTable('team', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const teamsRelations = relations(teams, ({ many }) => ({
	users: many(teamUsers),
	products: many(products),
	leads: many(leads)
}));
