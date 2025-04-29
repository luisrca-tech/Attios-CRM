import { seedBrands } from "./brands";
import { seedCategories } from "./categories";
import { seedCustomers } from "./customers";
import { seedInvoices } from "./invoices";
import { seedLeads } from "./leads";
import { seedOrders } from "./orders";
import { seedProducts } from "./products";
import { seedTags } from "./tags";
import { orderItems } from "../schema/orders";
import { productImages, products } from "../schema/products";
import { db } from "..";

async function seed() {
  try {
    await db.delete(orderItems);
    await db.delete(productImages);
    await db.delete(products);

    await seedCustomers();
    await seedTags();
    await seedCategories();
    await seedBrands();
    await seedProducts();
    await seedOrders();
    await seedInvoices();
    await seedLeads();

    console.log("✅ Database seeded successfully");
  } catch (e) {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();
