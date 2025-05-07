import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { subDomains } from "./subDomain";
import { teams } from "./teams";

export const users = pgTable(
  "user",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
    email: varchar("email", { length: 256 }).notNull().unique(),
    fullName: varchar("full_name", { length: 256 }).notNull(),
    subDomainId: integer("sub_domain_id").references(() => subDomains.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => ({
    emailIndex: index("email_idx").on(table.email),
  })
);

export const teamUsers = pgTable("team_user", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  teamId: integer("team_id")
    .references(() => teams.id)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  teams: many(teamUsers),
  subDomains: one(subDomains, {
    fields: [users.subDomainId],
    references: [subDomains.id],
  }),
}));

export const teamUsersRelations = relations(teamUsers, ({ one }) => ({
  user: one(users, {
    fields: [teamUsers.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamUsers.teamId],
    references: [teams.id],
  }),
}));
