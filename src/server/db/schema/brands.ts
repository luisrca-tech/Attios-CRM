import { integer, timestamp, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { products } from './products';
import { createTable } from '../table';

export const brands = createTable('brand', {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
	name: varchar('name', { length: 100 }).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const brandsRelations = relations(brands, ({ many }) => ({
	products: many(products)
}));
