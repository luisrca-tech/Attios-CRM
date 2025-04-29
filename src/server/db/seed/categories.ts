import { db } from "../index";
import { categories } from "../schema/categories";
import { faker } from "@faker-js/faker";
import { products } from "../schema/products";

export async function seedCategories() {
  await db.delete(products);
  await db.delete(categories);

  const categoriesData = Array.from({ length: 10 }, () => ({
    name: faker.commerce.department(),
  }));

  const insertedCategories = (await db
    .insert(categories)
    .values(categoriesData)
    .returning()) as { id: number; name: string }[];

  console.log(`✅ Seeded ${insertedCategories.length} categories`);

  return { insertedCategories };
}
