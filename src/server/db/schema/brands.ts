import { serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { createTable } from './config';
import { relations } from 'drizzle-orm';
import { products } from './products';

export const brands = createTable('brand', {
	id: serial('id').primaryKey(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow(),
	name: varchar('name', { length: 100 }).notNull()
});

export const brandsRelations = relations(brands, ({ many }) => ({
	products: many(products)
}));
