import { faker } from "@faker-js/faker";
import { db } from "..";
import { customers } from "../schema/customers";
import { invoices } from "../schema/invoices";
import { eq } from "drizzle-orm";

export async function seedInvoices(workspaceId: number) {
  const existingCustomers = await db
    .select()
    .from(customers)
    .where(eq(customers.workspaceId, workspaceId));

  await db.delete(invoices);

  const invoicesData = Array.from({ length: 100 }, () => {
    const randomCustomer = faker.helpers.arrayElement(existingCustomers);

    const number = `AA-${faker.number.int({ min: 1, max: 99 }).toString().padStart(2, "0")}-${faker.number.int({ min: 1, max: 99 }).toString().padStart(2, "0")}-${faker.number.int({ min: 1000, max: 9999 })}`;

    return {
      number,
      date: faker.date.recent(),
      customerId: randomCustomer.id,
      status: faker.helpers.arrayElement([
        "Draft",
        "Paid",
        "Unpaid",
        "Scheduled",
      ]),
      amount: faker.number.int({ min: 100, max: 1000000 }),
    };
  });

  const insertedInvoices = await db
    .insert(invoices)
    .values(invoicesData)
    .returning();
  console.log(
    `✓ Created ${insertedInvoices.length} invoices for workspace ${workspaceId}`
  );

  return insertedInvoices;
}
