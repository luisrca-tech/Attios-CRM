import { vi, describe, it, expect, beforeEach } from "vitest";
import mockDb from "~/server/api/mocks/db.mock";
import { appRouter } from "~/server/api/root";
import { createCallerFactory, createTRPCContext } from "~/server/api/trpc";

vi.mock("~/server/db", () => ({
  db: mockDb,
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: () => Promise.resolve({ userId: "test-user-id" }),
}));

describe("Orders", () => {
  const createCaller = createCallerFactory(appRouter);
  let caller: ReturnType<typeof createCaller>;

  const mockOrders = [
    {
      id: 1,
      customerId: 1,
      orderDate: new Date("2024-01-01"),
      orderStatus: "pending" as const,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
      requiredDate: null,
      shippedDate: null,
      storeId: null,
      staffId: null,
      userId: "test-user-id",
      customer: {
        id: 1,
        name: "Test Customer",
      },
      orderItems: [
        {
          id: 1,
          product: {
            id: 1,
            name: "Test Product",
          },
        },
      ],
    },
    {
      id: 2,
      customerId: 2,
      orderDate: new Date("2024-01-02"),
      orderStatus: "processing" as const,
      createdAt: new Date("2024-01-02"),
      updatedAt: new Date("2024-01-02"),
      requiredDate: null,
      shippedDate: null,
      storeId: null,
      staffId: null,
      userId: "test-user-id",
      customer: {
        id: 2,
        name: "Test Customer 2",
      },
      orderItems: [
        {
          id: 2,
          product: {
            id: 2,
            name: "Test Product 2",
          },
        },
      ],
    },
  ];

  beforeEach(async () => {
    const ctx = await createTRPCContext({
      headers: new Headers(),
    });

    caller = createCaller(ctx);
  });

  it("should be able return all orders", async () => {
    mockDb.query.orders.findMany.mockResolvedValue(mockOrders);
    const orders = await caller.orders.getOrdersPaginated({
      page: 1,
      pageSize: 10,
    });
    expect(orders).toBeDefined();
    expect(orders).toHaveLength(2);
    expect(orders[0]).toEqual(
      expect.objectContaining({
        id: 1,
        customerId: 1,
        orderDate: new Date("2024-01-01"),
        orderStatus: "pending" as const,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
        requiredDate: null,
        shippedDate: null,
        storeId: null,
        staffId: null,
        userId: "test-user-id",
      })
    );
  });

  it("should return paginated orders with infinite scroll", async () => {
    mockDb.query.orders.findMany.mockResolvedValue(mockOrders);
    const result = await caller.orders.getControlledOrdersInfinite({
      limit: 2,
      cursor: 0,
      timeFrame: "week",
    });

    expect(result).toBeDefined();
    expect(result.items).toHaveLength(2);
    expect(result.nextCursor).toBeUndefined();
    expect(result.items[0]).toEqual(
      expect.objectContaining({
        id: 1,
        customerId: 1,
        orderDate: new Date("2024-01-01"),
        orderStatus: "pending" as const,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
        requiredDate: null,
        shippedDate: null,
        storeId: null,
        staffId: null,
        userId: "test-user-id",
        customer: {
          id: 1,
          name: "Test Customer",
        },
        orderItems: [
          expect.objectContaining({
            id: 1,
            product: {
              id: 1,
              name: "Test Product",
            },
            productName: "Test Product",
          }),
        ],
      })
    );
  });
});
