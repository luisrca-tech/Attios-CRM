import { faker } from "@faker-js/faker";

export const newProduct = {
  name: 'Test Product 3',
  sku: 'SKU003',
  price: 199.99,
  availableQuantity: 15,
  category: 'Test Category',
  brand: 'Test Brand',
  productImages: [
    {
      url: faker.image.url(),
      key: faker.string.uuid()
    }
  ]
};