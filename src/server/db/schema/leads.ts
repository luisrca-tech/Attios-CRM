import { boolean, index, serial, timestamp } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { createTable } from "./config";
import { relations } from "drizzle-orm";
import { users } from "./auth";

export const leads = createTable(
  "lead",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 50 }).references(() => users.id),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 255 }).notNull(),
    role: varchar("role", { length: 255 }).notNull(),
    image: varchar("image", { length: 255 }).notNull(),
    convertedToCustomer: boolean("converted_to_customer")
      .notNull()
      .default(false),
    convertedToCustomerAt: timestamp("converted_to_customer_at"),
    status: varchar("status", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index("user_id_idx").on(table.userId),
  })
);

export const leadsRelations = relations(leads, ({ one }) => ({
  user: one(users, {
    fields: [leads.userId],
    references: [users.id],
  }),
}));
