import { db } from "..";
import { brands } from "../schema";
import { faker } from "@faker-js/faker";
import { products } from "../schema/products";

export async function seedBrands() {
  await db.delete(products);
  await db.delete(brands);

  const brandsData = Array.from({ length: 10 }, () => ({
    name: faker.company.name(),
  }));

  const insertedBrands = (await db
    .insert(brands)
    .values(brandsData)
    .returning()) as { id: number; name: string }[];

  console.log(`✅ Seeded ${insertedBrands.length} brands`);

  return { insertedBrands };
}
