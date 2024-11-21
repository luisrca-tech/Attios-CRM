import {
  decimal,
  index,
  integer,
  serial,
  varchar
} from 'drizzle-orm/pg-core';
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
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    brandId: integer('brand_id')
      .references(() => brands.id)
      .notNull(),
    categoryId: integer('category_id')
      .references(() => categories.id)
      .notNull(),
    modelYear: integer('model_year').notNull(),
    listPrice: decimal('list_price', { precision: 10, scale: 2 }).notNull(),
    productImage: varchar('product_image', { length: 255 })
  },
  (table) => ({
    brandIdIdx: index('brand_id_idx').on(table.brandId),
    categoryIdIdx: index('category_id_idx').on(table.categoryId)
  })
); 