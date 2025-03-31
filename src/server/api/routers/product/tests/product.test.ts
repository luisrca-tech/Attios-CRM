import { beforeEach, describe, expect, it, vi } from "vitest";
import mockDb from "~/server/api/mocks/db.mock";
import { appRouter } from "~/server/api/root";
import { createCallerFactory, createTRPCContext } from "~/server/api/trpc";
import type { MockProduct } from "./types/mockProduct.type";
import { mockProducts } from "./mock/mockProducts";
import { newProduct } from "./mock/newProduct";
import { updateData } from "./mock/updateProduct";

vi.mock("~/server/db", () => ({
  db: mockDb,
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: () => Promise.resolve({ userId: "test-user-id" }),
}));

describe("Product", () => {
  const createCaller = createCallerFactory(appRouter);
  let caller: ReturnType<typeof createCaller>;

  beforeEach(async () => {
    const ctx = await createTRPCContext({
      headers: new Headers(),
    });

    caller = createCaller(ctx);
  });

  it("should be able return all products", async () => {
    mockDb.query.products.findMany.mockResolvedValue(mockProducts);
    const products = await caller.product.getProductsPaginated({
      page: 1,
      pageSize: 10,
    });
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

    const result = await caller.product.create(newProduct);

    expect(result).toBeDefined();
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("PROD3");
    expect(mockDb.query.categories.findFirst).toHaveBeenCalled();
    expect(mockDb.query.brands.findFirst).toHaveBeenCalled();
    expect(mockDb.transaction).toHaveBeenCalled();
  });

  it("should be able to update a product", async () => {
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

  it("should return paginated products with infinite scroll", async () => {
    mockDb.query.products.findMany.mockResolvedValue(mockProducts);
    const result = await caller.product.getControlledProductsInfinite({
      limit: 2,
      cursor: 0,
    });

    expect(result).toBeDefined();
    expect(result.items).toHaveLength(2);
    expect(result.nextCursor).toBeUndefined();
    expect(result.items[0]).toEqual(mockProducts[0]);
  });

  it("should return next cursor when there are more items", async () => {
    const extendedMockProducts = [
      ...mockProducts,
      {
        id: "PROD3",
        name: "Test Product 3",
        brandId: 1,
        categoryId: 1,
        categoryName: "Test Category",
        modelYear: 2024,
        quantity: 8,
        listPrice: "129.99",
        sku: "SKU003",
        currency: "USD",
        subcategory: "Test Subcategory",
      },
    ];

    mockDb.query.products.findMany.mockResolvedValue(extendedMockProducts);
    const result = await caller.product.getControlledProductsInfinite({
      limit: 2,
      cursor: 0,
    });

    expect(result).toBeDefined();
    expect(result.items).toHaveLength(2);
    expect(result.nextCursor).toBe(2);
  });

  describe("Search, sort and order functionality", () => {
    it("should filter products by name in paginated query", async () => {
      const searchTerm = "Test Product 1";
      const [firstProduct] = mockProducts as [MockProduct, ...MockProduct[]];
      mockDb.query.products.findMany.mockResolvedValue([firstProduct]);

      const result = await caller.product.getProductsPaginated({
        page: 1,
        pageSize: 10,
        search: searchTerm,
      });

      expect(result).toHaveLength(1);
      expect(result[0]?.name).toContain(searchTerm);
      expect(mockDb.query.products.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.any(Object),
        })
      );
    });

    it("should return empty array when search term matches no products", async () => {
      mockDb.query.products.findMany.mockResolvedValue([]);

      const result = await caller.product.getProductsPaginated({
        page: 1,
        pageSize: 10,
        search: "NonexistentProduct",
      });

      expect(result).toHaveLength(0);
    });

    it("should filter products by name in infinite scroll query", async () => {
      const searchTerm = "Test Product 2";
      const [, secondProduct] = mockProducts as [MockProduct, MockProduct];
      mockDb.query.products.findMany.mockResolvedValue([secondProduct]);

      const result = await caller.product.getControlledProductsInfinite({
        limit: 10,
        cursor: 0,
        search: searchTerm,
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0]?.name).toContain(searchTerm);
      expect(result.nextCursor).toBeUndefined();
    });

    it("should order products by name in paginated query", async () => {
      const ascOrder = [{ ...mockProducts[0] }, { ...mockProducts[1] }];
      const descOrder = [{ ...mockProducts[1] }, { ...mockProducts[0] }];

      mockDb.query.products.findMany.mockResolvedValueOnce(
        ascOrder as MockProduct[]
      );
      const acrescentResult = await caller.product.getProductsPaginated({
        page: 1,
        pageSize: 10,
        sort: {
          column: "name",
          direction: "asc",
        },
      });

      expect(acrescentResult).toBeDefined();
      expect(acrescentResult).toHaveLength(2);
      expect(acrescentResult[0]?.name).toBe("Test Product 1");
      expect(acrescentResult[1]?.name).toBe("Test Product 2");

      mockDb.query.products.findMany.mockResolvedValueOnce(
        descOrder as MockProduct[]
      );
      const decrescentResult = await caller.product.getProductsPaginated({
        page: 1,
        pageSize: 10,
        sort: {
          column: "name",
          direction: "desc",
        },
      });

      expect(decrescentResult).toBeDefined();
      expect(decrescentResult).toHaveLength(2);
      expect(decrescentResult[0]?.name).toBe("Test Product 2");
      expect(decrescentResult[1]?.name).toBe("Test Product 1");
    });

    it("should order products by quantity in paginated query", async () => {
      const ascOrder = [{ ...mockProducts[1] }, { ...mockProducts[0] }];
      const descOrder = [{ ...mockProducts[0] }, { ...mockProducts[1] }];

      mockDb.query.products.findMany.mockResolvedValueOnce(
        ascOrder as MockProduct[]
      );
      const acrescentResult = await caller.product.getProductsPaginated({
        page: 1,
        pageSize: 10,
        sort: {
          column: "quantity",
          direction: "asc",
        },
      });

      expect(acrescentResult).toBeDefined();
      expect(acrescentResult).toHaveLength(2);
      expect(acrescentResult[0]?.quantity).toBe(5);
      expect(acrescentResult[1]?.quantity).toBe(10);

      mockDb.query.products.findMany.mockResolvedValueOnce(
        descOrder as MockProduct[]
      );
      const decrescentResult = await caller.product.getProductsPaginated({
        page: 1,
        pageSize: 10,
        sort: {
          column: "quantity",
          direction: "desc",
        },
      });

      expect(decrescentResult).toBeDefined();
      expect(decrescentResult).toHaveLength(2);
      expect(decrescentResult[0]?.quantity).toBe(10);
      expect(decrescentResult[1]?.quantity).toBe(5);
    });

    it("should order products by price in paginated query", async () => {
      const ascOrder = [{ ...mockProducts[0] }, { ...mockProducts[1] }];
      const descOrder = [{ ...mockProducts[1] }, { ...mockProducts[0] }];

      mockDb.query.products.findMany.mockResolvedValueOnce(
        ascOrder as MockProduct[]
      );
      const acrescentResult = await caller.product.getProductsPaginated({
        page: 1,
        pageSize: 10,
        sort: {
          column: "listPrice",
          direction: "asc",
        },
      });

      expect(acrescentResult).toBeDefined();
      expect(acrescentResult).toHaveLength(2);
      expect(acrescentResult[0]?.listPrice).toBe("99.99");
      expect(acrescentResult[1]?.listPrice).toBe("149.99");

      mockDb.query.products.findMany.mockResolvedValueOnce(
        descOrder as MockProduct[]
      );
      const decrescentResult = await caller.product.getProductsPaginated({
        page: 1,
        pageSize: 10,
        sort: {
          column: "listPrice",
          direction: "desc",
        },
      });

      expect(decrescentResult).toBeDefined();
      expect(decrescentResult).toHaveLength(2);
      expect(decrescentResult[0]?.listPrice).toBe("149.99");
      expect(decrescentResult[1]?.listPrice).toBe("99.99");
    });
  });
});
