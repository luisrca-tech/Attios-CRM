import { relations } from "drizzle-orm";
import {
  decimal,
  index,
  integer,
  pgEnum,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { customers } from "./customers";
import { products } from "./products";
import { workspaces } from "./workspaces";
import { users } from "./users";
import { createTable } from "../table";

export const orderStatusEnum = pgEnum("attios_order_status", [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);

export const orders = createTable(
  "order",
  {
    id: serial("id").primaryKey(),
    workspace: varchar("workspace", { length: 255 }).notNull(),
    customerId: integer("customer_id")
      .references(() => customers.id)
      .notNull(),
    orderStatus: orderStatusEnum("order_status").notNull().default("pending"),
    orderDate: timestamp("order_date").notNull().defaultNow(),
    requiredDate: timestamp("required_date"),
    shippedDate: timestamp("shipped_date"),
    storeId: integer("store_id"), // Will be added when store table is created
    staffId: integer("staff_id"), // Will be added when staff table is created
    userId: varchar("user_id", { length: 50 })
      .references(() => users.id)
      .notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index("user_id_idx").on(table.userId),
  })
);

export const orderItems = createTable(
  "order_item",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    orderId: integer("order_id")
      .references(() => orders.id)
      .notNull(),
    productId: integer("product_id")
      .references(() => products.id, {
        onDelete: "cascade",
      })
      .notNull(),
    productImage: varchar("product_image", { length: 255 }),
    quantity: integer("quantity").notNull(),
    listPrice: decimal("list_price", { precision: 10, scale: 2 }).notNull(),
    discount: decimal("discount", { precision: 4, scale: 2 })
      .default("0")
      .notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    orderIdIdx: index("order_id_idx").on(table.orderId),
    productIdIdx: index("product_id_idx").on(table.productId),
  })
);

export const ordersRelations = relations(orders, ({ many, one }) => ({
  workspace: one(workspaces, {
    fields: [orders.workspace],
    references: [workspaces.id],
  }),
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));
