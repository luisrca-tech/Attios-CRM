import { relations, sql } from 'drizzle-orm';
import {
	index,
	integer,
	serial,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core';
import { createTable } from './config';
import { subDomains } from './subDomain';
import { teams } from './teams';

export const users = createTable(
	'user',
	{
		id: varchar('id', { length: 50 }).primaryKey(),
		email: varchar('email', { length: 256 }).notNull().unique(),
		fullName: varchar('full_name', { length: 256 }).notNull(),
		subDomainId: integer('sub_domain_id').references(() => subDomains.id),
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

export const teamUsers = createTable('team_user', {
	id: serial('id').primaryKey(),
	userId: varchar('user_id', { length: 50 })
		.references(() => users.id)
		.notNull(),
	teamId: integer('team_id')
		.references(() => teams.id)
		.notNull(),
	createdAt: timestamp('created_at', { withTimezone: true })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp('updated_at', { withTimezone: true })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()
		.$onUpdate(() => new Date())
});

export const usersRelations = relations(users, ({ many, one }) => ({
	teams: many(teamUsers),
	subDomains: one(subDomains, {
		fields: [users.subDomainId],
		references: [subDomains.id]
	})
}));

export const teamUsersRelations = relations(teamUsers, ({ one }) => ({
	user: one(users, {
		fields: [teamUsers.userId],
		references: [users.id]
	}),
	team: one(teams, {
		fields: [teamUsers.teamId],
		references: [teams.id]
	})
}));
