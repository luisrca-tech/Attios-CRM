import { faker } from "@faker-js/faker";

export const updateData = {
  productId: "PROD1",
  name: "Updated Product",
  sku: "SKU002",
  price: 149.99,
  availableQuantity: 20,
  category: "Test Category",
  subcategory: "New Subcategory",
  currency: "USD",
  productImages: [
    {
      url: faker.image.url(),
      key: faker.string.uuid(),
    },
  ],
};