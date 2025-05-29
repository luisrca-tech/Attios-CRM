import { relations } from 'drizzle-orm';
import { integer, timestamp, varchar } from 'drizzle-orm/pg-core';
import { leads } from './leads';
import { createTable } from '../table';

export const tags = createTable('tag', {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
	name: varchar('name', { length: 255 }).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const tagsRelations = relations(tags, ({ many }) => ({
	leads: many(leads)
}));
