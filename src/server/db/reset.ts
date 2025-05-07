import { db } from ".";
import { orderItems, orders } from "./schema/orders";
import { productImages, products } from "./schema/products";
import { brands } from "./schema/brands";
import { categories } from "./schema/categories";
import { customers } from "./schema/customers";
import { invoices } from "./schema/invoices";
import { leads } from "./schema/leads";
import { tags } from "./schema/tags";
import { users } from "./schema/users";

async function reset() {
  try {
    await db.delete(orderItems);
    await db.delete(orders);
    await db.delete(productImages);
    await db.delete(products);
    await db.delete(brands);
    await db.delete(categories);
    await db.delete(invoices);
    await db.delete(leads);
    await db.delete(tags);
    await db.delete(customers);
    await db.delete(users);

    console.log("✅ All tables dropped successfully");
  } catch (error) {
    console.error("❌ Error dropping tables:", error);
    process.exit(1);
  }
}

reset();
