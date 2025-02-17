import { faker } from "@faker-js/faker";
import { db } from "..";
import { orderItems, orders } from "../schema/orders";
import { products, users } from "../schema";
import { customers } from "../schema/customers";

export async function seedOrders() {
  await db.delete(orderItems);
  await db.delete(orders);

  const existingCustomers = await db.select().from(customers);
  const existingUsers = await db.select().from(users);
  const existingProducts = await db.select().from(products);

  if (!existingCustomers.length) {
    throw new Error("No customers found. Please seed customers first.");
  }

  const ordersData = existingCustomers.flatMap((customer) => {
    const numberOfOrders = faker.number.int({ min: 0, max: 5 });

    return Array.from({ length: numberOfOrders }, () => ({
      customerId: customer.id,
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
    }));
  });

  console.log(
    `Creating ${ordersData.length} orders for ${existingCustomers.length} customers`
  );

  const insertedOrders = await db.insert(orders).values(ordersData).returning();

  const orderItemsData = insertedOrders.flatMap((order) =>
    Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
      orderId: order.id,
      productId: faker.helpers.arrayElement(existingProducts).id,
      quantity: faker.number.int({ min: 1, max: 100 }),
      listPrice: faker.commerce.price({ min: 10, max: 1000, dec: 2 }),
      discount: (faker.number.int({ min: 0, max: 100 }) / 100).toFixed(2),
    }))
  );

  await db.insert(orderItems).values(orderItemsData);
  console.log(`Created ${orderItemsData.length} order items`);
}
