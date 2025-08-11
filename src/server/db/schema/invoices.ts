import { relations } from "drizzle-orm";
import { createTable } from "../table";
import { integer, timestamp, varchar, boolean } from "drizzle-orm/pg-core";
import { customers } from "./customers";
import { salesmen } from "./salesmen";

export const invoices = createTable("invoice", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  number: varchar("number", { length: 255 }).notNull(),
  date: timestamp("date").notNull(),
  customerId: integer("customer_id").references(() => customers.id),
  status: varchar("status", { length: 255 }).notNull(),
  amount: integer("amount").notNull(),
  salesmanId: integer("salesman_id").references(() => salesmen.id),
  outsideSeller: boolean("outside_seller").notNull().default(false),
  outsideSellerFirstName: varchar("outside_seller_first_name", { length: 100 }),
  outsideSellerLastName: varchar("outside_seller_last_name", { length: 100 }),
  outsideSellerIdentification: varchar("outside_seller_identification", {
    length: 100,
  }),
  outsideSellerEmail: varchar("outside_seller_email", { length: 255 }),
  outsideSellerPhone: varchar("outside_seller_phone", { length: 50 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const invoicesRelations = relations(invoices, ({ one }) => ({
  customer: one(customers, {
    fields: [invoices.customerId],
    references: [customers.id],
  }),
}));
