import { relations } from "drizzle-orm";
import { index, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { orders } from "./orders";
import { createTable } from "../table";
import { workspaces } from "./workspaces";

export const customers = createTable(
  "customer",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    firstName: varchar("first_name", { length: 50 }).notNull(),
    lastName: varchar("last_name", { length: 50 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    street: varchar("street", { length: 255 }),
    city: varchar("city", { length: 100 }),
    state: varchar("state", { length: 2 }),
    zipCode: varchar("zip_code", { length: 10 }),
    avatar: varchar("avatar", { length: 255 }),
    workspaceId: integer("workspace_id")
      .references(() => workspaces.id, {
        onDelete: "cascade",
      })
      .notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: index("customer_email_idx").on(table.email),
    workspaceIdx: index("customer_workspace_idx").on(table.workspaceId),
  })
);

export const customersRelations = relations(customers, ({ many, one }) => ({
  orders: many(orders),
  workspace: one(workspaces, {
    fields: [customers.workspaceId],
    references: [workspaces.id],
  }),
}));
