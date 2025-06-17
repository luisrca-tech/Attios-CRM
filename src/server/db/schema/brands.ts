import { relations } from 'drizzle-orm';
import { integer, timestamp, varchar } from 'drizzle-orm/pg-core';
import { products } from './products';
import { createTable } from '../table';

export const brands = createTable('brand', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
	name: varchar('name', { length: 100 }).notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const brandsRelations = relations(brands, ({ many }) => ({
	products: many(products)
}));
