import { beforeEach, describe, expect, it, vi } from "vitest";
import mockDb from "~/server/api/mocks/db.mock";
import { appRouter } from "~/server/api/root";
import { createCallerFactory, createTRPCContext } from "~/server/api/trpc";

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
});
