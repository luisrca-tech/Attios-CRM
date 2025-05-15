import { relations } from 'drizzle-orm';
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { users } from './users';

export const subDomains = pgTable('sub_domain', {
	id: serial('id').primaryKey(),
	subDomain: varchar('sub_domain', { length: 255 }).notNull().unique(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const subDomainsRelations = relations(subDomains, ({ many }) => ({
	users: many(users)
}));
