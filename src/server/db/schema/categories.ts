import { serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createTable } from './config';
import { relations } from 'drizzle-orm';
import { products } from './products';

export const categories = createTable('category', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const categoriesRelations = relations(categories, ({ many }) => ({
	products: many(products)
}));
