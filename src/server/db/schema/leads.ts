import { relations } from "drizzle-orm";
import { boolean, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { products } from "./products";
import { teams } from "./teams";
import { tags } from "./tags";
import { createTable } from "../table";

export const leads = createTable("lead", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  tagId: integer("tag_id").references(() => tags.id),
  image: varchar("image", { length: 255 }).notNull(),
  convertedToCustomer: boolean("converted_to_customer")
    .notNull()
    .default(false),
  convertedToCustomerAt: timestamp("converted_to_customer_at"),
  status: varchar("status", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  teamId: integer("team_id")
    .references(() => teams.id, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const leadProducts = createTable("lead_products", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  leadId: integer("lead_id")
    .references(() => leads.id)
    .notNull(),
  productId: integer("product_id")
    .references(() => products.id, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const leadsRelations = relations(leads, ({ many, one }) => ({
  products: many(leadProducts),
  team: one(teams, {
    fields: [leads.teamId],
    references: [teams.id],
  }),
  tag: one(tags, {
    fields: [leads.tagId],
    references: [tags.id],
  }),
}));

export const leadProductsRelations = relations(leadProducts, ({ one }) => ({
  lead: one(leads, {
    fields: [leadProducts.leadId],
    references: [leads.id],
  }),
  product: one(products, {
    fields: [leadProducts.productId],
    references: [products.id],
  }),
}));
