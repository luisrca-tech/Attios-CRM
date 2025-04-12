import { timestamp, varchar } from "drizzle-orm/pg-core";
import { serial } from "drizzle-orm/pg-core";

import { createTable } from "./config";
import { leads } from "./leads";
import { relations } from "drizzle-orm";

export const roles = createTable("role", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  leads: many(leads),
}));
