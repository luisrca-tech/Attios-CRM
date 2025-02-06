import { beforeEach, describe, expect, it, vi } from "vitest";
import mockDb from "~/server/api/mocks/db.mock";
import { appRouter } from "~/server/api/root";
import { createCallerFactory, createTRPCContext } from "~/server/api/trpc";
import { faker } from "@faker-js/faker";

vi.mock("~/server/db", () => ({
  db: mockDb,
}));

describe("Product", () => {
  const createCaller = createCallerFactory(appRouter);
  let caller: ReturnType<typeof createCaller>;

  const mockProducts = [
    {
      id: "PROD1",
      name: "Test Product 1",
      brandId: 1,
      categoryId: 1,
      categoryName: "Test Category",
      modelYear: 2024,
      quantity: 10,
      listPrice: "99.99",
      sku: "SKU001",
      currency: "USD",
      subcategory: "Test Subcategory",
    },
    {
      id: "PROD2",
      name: "Test Product 2",
      brandId: 1,
      categoryId: 1,
      categoryName: "Test Category",
      modelYear: 2024,
      quantity: 5,
      listPrice: "149.99",
      sku: "SKU002",
      currency: "USD",
      subcategory: "Test Subcategory",
    },
  ];

  beforeEach(async () => {
    const ctx = await createTRPCContext({
      headers: new Headers(),
    });

    caller = createCaller(ctx);
  });

  it("should be able return all products", async () => {
    mockDb.query.products.findMany.mockResolvedValue(mockProducts);
    const products = await caller.product.getAll();
    expect(products).toBeDefined();
    expect(products).toHaveLength(2);
    expect(products[0]).toEqual(
      expect.objectContaining({
        id: "PROD1",
        name: "Test Product 1",
      })
    );
  });

  it("should be able to return a product by id", async () => {
    mockDb.query.products.findFirst.mockResolvedValue(mockProducts[0]);
    const product = await caller.product.getById("PROD1");
    expect(product).toBeDefined();
    expect(product?.id).toBe("PROD1");
    expect(mockDb.query.products.findFirst).toHaveBeenCalled();
  });

  it("should be able to create a new product", async () => {
    const mockCategory = { id: 1, name: "Test Category" };
    const mockBrand = { id: 1, name: "Test Brand" };
    const mockCreatedProduct = { id: "PROD3" };

    mockDb.query.categories.findFirst.mockResolvedValue(mockCategory);
    mockDb.query.brands.findFirst.mockResolvedValue(mockBrand);
    mockDb.transaction.mockImplementation(async (callback) => {
      const tx = {
        query: mockDb.query,
        insert: () => ({
          values: () => ({
            returning: () => Promise.resolve([mockCreatedProduct]),
          }),
        }),
      };
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      return callback(tx as any);
    });

    const newProduct = {
      name: "Test Product 3",
      sku: "SKU003",
      price: 199.99,
      availableQuantity: 15,
      category: "Test Category",
      brand: "Test Brand",
      productImages: [
        {
          url: faker.image.url(),
          key: faker.string.uuid(),
        },
      ],
    };

    const result = await caller.product.create(newProduct);

    expect(result).toBeDefined();
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("PROD3");
    expect(mockDb.query.categories.findFirst).toHaveBeenCalled();
    expect(mockDb.query.brands.findFirst).toHaveBeenCalled();
    expect(mockDb.transaction).toHaveBeenCalled();
  });

  it("should be able to update a product", async () => {
    const updateData = {
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

    mockDb.transaction.mockImplementation(async (callback) => {
      const tx = {
        update: () => ({
          set: () => ({
            where: () => Promise.resolve([{ id: "PROD1" }]),
          }),
        }),
        delete: () => ({
          where: () => Promise.resolve(),
        }),
        insert: () => ({
          values: () => Promise.resolve(),
        }),
      };
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      return callback(tx as any);
    });

    const result = await caller.product.update(updateData);

    expect(result).toBeDefined();
    expect(result).toEqual({ id: "PROD1" });
    expect(mockDb.transaction).toHaveBeenCalled();
  });
});
