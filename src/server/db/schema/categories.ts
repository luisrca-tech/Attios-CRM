import { relations } from "drizzle-orm";
import { createTable } from "./config";
import { serial, varchar } from "drizzle-orm/pg-core";
import { products } from "./products";

export const categories = createTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));
