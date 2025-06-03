import { relations } from "drizzle-orm";
import { index, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { workspaces } from "./workspaces";
import { teams } from "./teams";
import { createTable } from "../table";

export const users = createTable(
  "user",
  {
    id: varchar("id", { length: 50 }).primaryKey(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    fullName: varchar("full_name", { length: 256 }).notNull(),
    workspaceId: integer("workspace_id").references(() => workspaces.id, {
      onDelete: "cascade",
    }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    emailIndex: index("email_idx").on(table.email),
  })
);

export const teamUsers = createTable("team_user", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id", { length: 50 })
    .references(() => users.id)
    .notNull(),
  teamId: integer("team_id")
    .references(() => teams.id, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  teams: many(teamUsers),
  workspaces: one(workspaces, {
    fields: [users.workspaceId],
    references: [workspaces.id],
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
