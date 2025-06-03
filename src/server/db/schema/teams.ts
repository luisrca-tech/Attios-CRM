import { relations } from "drizzle-orm";
import { integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { leads } from "./leads";
import { products } from "./products";
import { teamUsers } from "./users";
import { workspaces } from "./workspaces";
import { createTable } from "../table";

export const teams = createTable("team", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  workspaceId: integer("workspace_id").references(() => workspaces.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const teamsRelations = relations(teams, ({ many, one }) => ({
  users: many(teamUsers),
  products: many(products),
  leads: many(leads),
  workspace: one(workspaces, {
    fields: [teams.workspaceId],
    references: [workspaces.id],
  }),
}));
