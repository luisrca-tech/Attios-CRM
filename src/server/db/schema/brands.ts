import { integer, pgTable } from "drizzle-orm/pg-core";

import { varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { products } from "./products";

export const brands = pgTable("brand", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  name: varchar("name", { length: 100 }).notNull(),
});

export const brandsRelations = relations(brands, ({ many }) => ({
  products: many(products),
}));
