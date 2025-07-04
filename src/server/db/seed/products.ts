import { faker } from "@faker-js/faker";
import { randomUUID } from "node:crypto";
import { db } from "../index";
import { orderItems } from "../schema/orders";
import { productImages, products } from "../schema/products";
import { seedBrands } from "./brands";
import { seedCategories } from "./categories";

export async function seedProducts(workspaceId: number, count = 50) {
  await db.delete(orderItems);
  await db.delete(productImages);
  await db.delete(products);

  const { insertedCategories } = (await seedCategories()) as {
    insertedCategories: { id: number; name: string }[];
  };
  const { insertedBrands } = (await seedBrands()) as {
    insertedBrands: { id: number; name: string }[];
  };

  // Generate unique product names
  const usedNames = new Set<string>();
  const generateUniqueName = () => {
    let name = faker.commerce.productName();
    while (usedNames.has(name)) {
      name = `${faker.commerce.productName()} ${faker.string.alphanumeric(4)}`;
    }
    usedNames.add(name);
    return name;
  };

  const productsData = Array.from({ length: count }, (_) => {
    const randomBrand = faker.helpers.arrayElement(insertedBrands);
    const randomCategory = faker.helpers.arrayElement(insertedCategories);
    const randomIsActive = faker.helpers.weightedArrayElement([
      { value: true, weight: 8 },
      { value: false, weight: 2 },
    ]);
    const sku = `SKU-${randomUUID().slice(0, 8)}`;

    return {
      name: generateUniqueName(),
      description: faker.lorem.paragraph(),
      brandId: randomBrand.id,
      categoryId: randomCategory.id,
      categoryName: randomCategory.name,
      modelYear: faker.number.int({ min: 2020, max: 2024 }),
      quantity: faker.number.int({ min: 0, max: 3000 }),
      listPrice: faker.commerce.price({ min: 100, max: 2000, dec: 2 }),
      sku,
      currency: "USD",
      subcategory: faker.commerce.productAdjective(),
      workspaceId,
      isActive: randomIsActive,
    };
  });

  const insertedProducts = await db
    .insert(products)
    .values(productsData)
    .returning();

  const productImagesData = insertedProducts.flatMap((product) =>
    Array.from({ length: 3 }, () => ({
      productId: product.id,
      url: faker.image.url({ width: 640, height: 480 }),
      key: randomUUID(),
    }))
  );

  await db.insert(productImages).values(productImagesData);

  console.log(`✓ Created ${count} products for workspace ${workspaceId}`);
  return insertedProducts;
}
