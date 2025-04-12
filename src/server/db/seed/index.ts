import { seedBrands } from "./brands";
import { seedCategories } from "./categories";
import { seedCustomers } from "./customers";
import { seedInvoices } from "./invoices";
import { seedLeads } from "./leads";
import { seedOrders } from "./orders";
import { seedProducts } from "./products";
import { seedRoles } from "./roles";

async function seed() {
  try {
    await seedCustomers();
    await seedProducts();
    await seedBrands();
    await seedCategories();
    await seedLeads();
    await seedOrders();
    await seedInvoices();
    await seedRoles();

    console.log("✅ Database seeded successfully");
  } catch (e) {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();
