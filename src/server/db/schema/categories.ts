import { relations } from 'drizzle-orm';
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
import { products } from './products';

export const categories = pgTable('category', {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
	name: varchar('name', { length: 100 }).notNull()
});

export const categoriesRelations = relations(categories, ({ many }) => ({
	products: many(products)
}));
