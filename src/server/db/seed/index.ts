import { seedCustomers } from "./customers";
import { seedInvoices } from "./invoices";
import { seedLeads } from "./leads";
import { seedOrders } from "./orders";
import { seedProducts } from "./products";

async function seed() {
  try {
    await seedCustomers();
    await seedProducts();
    await seedLeads();
    await seedOrders();
    await seedInvoices();

    console.log("✅ Database seeded successfully");
  } catch (e) {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();
