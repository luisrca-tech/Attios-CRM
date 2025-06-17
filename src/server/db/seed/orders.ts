import { faker } from "@faker-js/faker";
import { db } from "..";
import { products, users } from "../schema";
import { customers } from "../schema/customers";
import { orderItems, orders } from "../schema/orders";
import { eq } from "drizzle-orm";

export async function seedOrders(workspaceId: number, count = 400) {
  await db.delete(orderItems);
  await db.delete(orders);

  const existingCustomers = await db
    .select()
    .from(customers)
    .where(eq(customers.workspaceId, workspaceId));
  const existingUsers = await db
    .select()
    .from(users)
    .where(eq(users.workspaceId, workspaceId));
  const existingProducts = await db
    .select()
    .from(products)
    .where(eq(products.workspaceId, workspaceId));

  if (!existingCustomers.length) {
    throw new Error(
      "No customers found for this workspace. Please seed customers first."
    );
  }

  const ordersData = Array.from({ length: count }, () => ({
    customerId: faker.helpers.arrayElement(existingCustomers).id,
    orderStatus: faker.helpers.arrayElement([
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ]),
    orderDate: faker.date.past(),
    requiredDate: faker.date.future(),
    shippedDate: faker.date.past(),
    userId: faker.helpers.arrayElement(existingUsers).id,
    workspace: workspaceId.toString(),
  }));

  console.log(
    `Creating ${ordersData.length} orders for workspace ${workspaceId}`
  );

  const insertedOrders = await db.insert(orders).values(ordersData).returning();

  const orderItemsPromises = insertedOrders.flatMap((order) =>
    Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, async () => {
      const product = faker.helpers.arrayElement(existingProducts);
      const productWithImages = await db.query.products.findFirst({
        where: (products, { eq }) => eq(products.id, product.id),
        with: {
          productImages: true,
        },
      });

      return {
        orderId: order.id,
        productId: product.id,
        productImage: productWithImages?.productImages[0]?.url ?? "",
        quantity: faker.number.int({ min: 1, max: 100 }),
        listPrice: faker.commerce.price({ min: 10, max: 1000, dec: 2 }),
        discount: (faker.number.int({ min: 0, max: 100 }) / 100).toFixed(2),
      };
    })
  );

  const orderItemsData = await Promise.all(orderItemsPromises.flat());
  await db.insert(orderItems).values(orderItemsData);
  console.log(
    `Created ${orderItemsData.length} order items for workspace ${workspaceId}`
  );
}
