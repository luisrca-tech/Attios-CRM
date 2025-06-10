import { relations } from "drizzle-orm";
import { integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { orders } from "./orders";
import { users } from "./users";
import { createTable } from "../table";
import { products } from "./products";

export const workspaces = createTable("workspaces", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  workspace: varchar("workspace", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const workspacesRelations = relations(workspaces, ({ many }) => ({
  users: many(users),
  orders: many(orders),
  products: many(products),
}));
