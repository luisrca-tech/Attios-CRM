import { relations, sql } from "drizzle-orm";
import {
  decimal,
  index,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { brands } from "./brands";
import { categories } from "./categories";
import { leadProducts } from "./leads";
import { teams } from "./teams";

export const products = pgTable(
  "product",
  {
    id: varchar("id", { length: 10 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    brandId: integer("brand_id")
      .references(() => brands.id)
      .notNull(),
    categoryId: integer("category_id")
      .references(() => categories.id)
      .notNull(),
    categoryName: varchar("category_name", { length: 20 }),
    modelYear: integer("model_year").notNull(),
    quantity: integer("quantity").notNull(),
    listPrice: decimal("list_price", { precision: 10, scale: 2 }).notNull(),
    sku: varchar("sku", { length: 100 }).unique(),
    currency: varchar("currency", { length: 3 }),
    subcategory: varchar("subcategory", { length: 100 }),
    teamId: integer("team_id")
      .references(() => teams.id)
      .notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    brandIdIdx: index("brand_id_idx").on(table.brandId),
    categoryIdIdx: index("category_id_idx").on(table.categoryId),
    teamIdIdx: index("team_id_idx").on(table.teamId),
  })
);

export const productImages = pgTable("product_images", {
  id: serial("id").primaryKey(),
  productId: varchar("product_id", { length: 10 })
    .references(() => products.id)
    .notNull(),
  url: varchar("url", { length: 255 }).notNull(),
  key: varchar("key", { length: 255 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`now()`)
    .notNull(),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  productImages: many(productImages),
  team: one(teams, {
    fields: [products.teamId],
    references: [teams.id],
  }),
  leads: many(leadProducts),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));
