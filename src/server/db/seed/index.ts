import { seedBrands } from "./brands";
import { seedCategories } from "./categories";
import { seedCustomers } from "./customers";
import { seedInvoices } from "./invoices";
import { seedLeads } from "./leads";
import { seedOrders } from "./orders";
import { seedProducts } from "./products";
import { seedTags } from "./tags";
import { seedTeams } from "./teams";
import { orderItems } from "../schema/orders";
import { productImages, products } from "../schema/products";
import { db } from "..";
import { teamUsers, tags, customers } from "../schema";

async function seed() {
  try {
    // Clear all data except users and workspaces
    await db.delete(orderItems);
    await db.delete(productImages);
    await db.delete(products);
    await db.delete(tags);
    await db.delete(customers);
    await db.delete(teamUsers);

    // Get existing users with their workspaces
    const existingUsers = await db.query.users.findMany({
      with: {
        workspaces: true,
      },
    });

    if (!existingUsers.length) {
      throw new Error(
        "No users found in the database. Please create users first."
      );
    }

    // Group users by workspace
    const workspaceUsers = existingUsers.reduce(
      (acc, user) => {
        if (user.workspaceId) {
          if (!acc[user.workspaceId]) {
            acc[user.workspaceId] = [];
          }
          acc[user.workspaceId]?.push(user);
        }
        return acc;
      },
      {} as Record<number, typeof existingUsers>
    );

    // For each workspace, create its data
    for (const [workspaceId] of Object.entries(workspaceUsers)) {
      const workspace = await db.query.workspaces.findFirst({
        where: (workspaces, { eq }) =>
          eq(workspaces.id, Number.parseInt(workspaceId, 10)),
      });

      if (!workspace || !workspace.workspace) continue;

      console.log(`\nSeeding data for workspace: ${workspace.workspace}`);

      // Create teams for this workspace
      await seedTeams(Number.parseInt(workspaceId, 10));

      // Create tags
      await seedTags();

      // Create categories and brands
      await seedCategories();
      await seedBrands();

      // Create products for this workspace
      await seedProducts(Number.parseInt(workspaceId, 10), 50);

      // Create customers
      await seedCustomers(Number.parseInt(workspaceId, 10));

      // Create orders for this workspace
      await seedOrders(Number.parseInt(workspaceId, 10), 400);

      // Create invoices
      await seedInvoices(Number.parseInt(workspaceId, 10));

      // Create leads for this workspace
      await seedLeads(Number.parseInt(workspaceId, 10), 10);
    }

    console.log("\n✅ Database seeded successfully");
  } catch (e) {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();
