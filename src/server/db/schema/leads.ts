import { boolean, serial, timestamp } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { createTable } from "./config";
import { roles } from "./roles";
import { relations } from "drizzle-orm";

export const leads = createTable("lead", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  roleId: serial("role_id").references(() => roles.id),
  image: varchar("image", { length: 255 }).notNull(),
  convertedToCustomer: boolean("converted_to_customer")
    .notNull()
    .default(false),
  convertedToCustomerAt: timestamp("converted_to_customer_at"),
  status: varchar("status", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const leadsRelations = relations(leads, ({ one }) => ({
  role: one(roles, {
    fields: [leads.roleId],
    references: [roles.id],
  }),
}));
