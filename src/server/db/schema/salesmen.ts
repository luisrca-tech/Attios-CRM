import { relations } from "drizzle-orm";
import { integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { createTable } from "../table";
import { invoices } from "./invoices";

export const salesmen = createTable("salesman", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const salesmenRelations = relations(salesmen, ({ many }) => ({
  invoices: many(invoices),
}));
