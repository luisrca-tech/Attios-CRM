import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { serial } from 'drizzle-orm/pg-core';

import { leads } from './leads';
import { relations } from 'drizzle-orm';

export const tags = pgTable('tag', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const tagsRelations = relations(tags, ({ many }) => ({
	leads: many(leads)
}));
