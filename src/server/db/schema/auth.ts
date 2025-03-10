import { sql } from 'drizzle-orm';
import { index, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createTable } from './config';

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
