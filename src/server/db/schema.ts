// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from 'drizzle-orm';
import {
	index,
	pgTableCreator,
	serial,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `attios-crm_${name}`);

export const users = createTable(
	'user',
	{
		id: varchar('id', { length: 50 }).primaryKey(),
		email: varchar('email', { length: 256 }).notNull().unique(),
		fullName: varchar('full_name', { length: 256 }).notNull(),
		createdAt: timestamp('created_at', { withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: timestamp('updated_at', { withTimezone: true })
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull()
			.$onUpdate(() => new Date())
	},
	(table) => ({
		emailIndex: index('email_idx').on(table.email)
	})
);
