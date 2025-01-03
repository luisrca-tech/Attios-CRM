import { relations } from 'drizzle-orm';
import { decimal, index, integer, serial, varchar } from 'drizzle-orm/pg-core';
import { createTable } from './config';

export const brands = createTable('brand', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull()
});

export const categories = createTable('category', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull()
});

export const products = createTable(
	'product',
	{
		id: varchar('id', { length: 10 }).primaryKey(),
		name: varchar('name', { length: 255 }).notNull().unique(),
		brandId: integer('brand_id')
			.references(() => brands.id)
			.notNull(),
		categoryId: integer('category_id')
			.references(() => categories.id)
			.notNull(),
		modelYear: integer('model_year').notNull(),
		quantity: integer('quantity').notNull(),
		listPrice: decimal('list_price', { precision: 10, scale: 2 }).notNull(),
		sku: varchar('sku', { length: 100 }),
		productImage: varchar('product_image', { length: 255 }),
		file: varchar('file', { length: 255 }),
	},
	(table) => ({
		brandIdIdx: index('brand_id_idx').on(table.brandId),
		categoryIdIdx: index('category_id_idx').on(table.categoryId)
	})
);

export const productsRelations = relations(products, ({ one }) => ({
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id]
	}),
	brand: one(brands, {
		fields: [products.brandId],
		references: [brands.id]
	})
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
	products: many(products)
}));

export const brandsRelations = relations(brands, ({ many }) => ({
	products: many(products)
}));
