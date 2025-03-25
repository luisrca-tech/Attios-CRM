import { vi, describe, it, expect, beforeEach } from "vitest";
import mockDb from "~/server/api/mocks/db.mock";
import { appRouter } from "~/server/api/root";
import { createCallerFactory, createTRPCContext } from "~/server/api/trpc";
import { faker } from "@faker-js/faker";

vi.mock("~/server/db", () => ({
  db: mockDb,
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: () => Promise.resolve({ userId: "test-user-id" }),
}));

describe("Invoices", () => {
  const createCaller = createCallerFactory(appRouter);
  let caller: ReturnType<typeof createCaller>;

  const mockInvoices = [
    {
      id: 1,
      number: "INV-001",
      customerId: 1,
      status: "Paid",
      amount: 1000,
      date: new Date("2024-01-01"),
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
      customer: {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        avatar: faker.image.avatar(),
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01"),
      },
    },
    {
      id: 2,
      number: "INV-002",
      customerId: 2,
      status: "Unpaid",
      amount: 2000,
      date: new Date("2024-01-02"),
      createdAt: new Date("2024-01-02"),
      updatedAt: new Date("2024-01-02"),
      customer: {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "+0987654321",
        street: "456 Oak St",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
        avatar: faker.image.avatar(),
        createdAt: new Date("2024-01-02"),
        updatedAt: new Date("2024-01-02"),
      },
    },
  ];

  beforeEach(async () => {
    const ctx = await createTRPCContext({
      headers: new Headers(),
    });

    caller = createCaller(ctx);
  });

  it("should return all invoices", async () => {
    mockDb.query.invoices.findMany.mockResolvedValue(mockInvoices);
    const invoices = await caller.invoices.getInvoicesPaginated({
      page: 1,
      pageSize: 10,
    });

    expect(invoices).toBeDefined();
    expect(invoices).toHaveLength(2);
    expect(invoices[0]).toEqual(
      expect.objectContaining({
        id: 1,
        number: "INV-001",
        customerId: 1,
        status: "Paid",
        amount: 1000,
        date: new Date("2024-01-01"),
        customer: expect.objectContaining({
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
        }),
      })
    );
  });

  it("should filter invoices by status", async () => {
    const firstInvoice = mockInvoices[0];
    if (!firstInvoice) throw new Error("Mock invoice not found");
    mockDb.query.invoices.findMany.mockResolvedValue([firstInvoice]);
    const invoices = await caller.invoices.getInvoicesPaginated({
      page: 1,
      pageSize: 10,
      status: "Paid",
    });

    expect(invoices).toBeDefined();
    expect(invoices).toHaveLength(1);
    if (invoices[0]?.status) {
      expect(invoices[0].status).toBe("Paid");
    }
  });

  it("should sort invoices by amount", async () => {
    mockDb.query.invoices.findMany.mockResolvedValue(
      [...mockInvoices].reverse()
    );
    const invoices = await caller.invoices.getInvoicesPaginated({
      page: 1,
      pageSize: 10,
      sort: {
        column: "amount",
        direction: "desc",
      },
    });

    expect(invoices).toBeDefined();
    expect(invoices).toHaveLength(2);
    if (invoices[0]) {
      expect(invoices[0].amount).toBe(2000);
    }
    if (invoices[1]) {
      expect(invoices[1].amount).toBe(1000);
    }
  });

  it("should sort invoices by customer name", async () => {
    mockDb.query.invoices.findMany.mockResolvedValue(
      [...mockInvoices].reverse()
    );
    const invoices = await caller.invoices.getInvoicesPaginated({
      page: 1,
      pageSize: 10,
      sort: {
        column: "customer",
        direction: "asc",
      },
    });

    expect(invoices).toBeDefined();
    expect(invoices).toHaveLength(2);
    if (invoices[0]?.customer) {
      expect(invoices[0].customer.firstName).toBe("Jane");
    }
    if (invoices[1]?.customer) {
      expect(invoices[1].customer.firstName).toBe("John");
    }
  });

  it("should return invoices with infinite scroll", async () => {
    mockDb.query.invoices.findMany.mockResolvedValue(mockInvoices);
    const result = await caller.invoices.getControlledInvoicesInfinite({
      limit: 2,
      cursor: 0,
    });

    expect(result).toBeDefined();
    expect(result.items).toHaveLength(2);
    expect(result.nextCursor).toBeUndefined();
    expect(result.items[0]).toEqual(
      expect.objectContaining({
        id: 1,
        number: "INV-001",
        customerId: 1,
        status: "Paid",
        amount: 1000,
        date: new Date("2024-01-01"),
        customer: expect.objectContaining({
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
        }),
      })
    );
  });

  it("should return next cursor when there are more invoices", async () => {
    const extendedMockInvoices = [
      ...mockInvoices,
      {
        id: 3,
        number: "INV-003",
        customerId: 3,
        status: "Draft" as const,
        amount: 3000,
        date: new Date("2024-01-03"),
        createdAt: new Date("2024-01-03"),
        updatedAt: new Date("2024-01-03"),
        customer: {
          id: 3,
          firstName: "Bob",
          lastName: "Johnson",
          email: "bob.johnson@example.com",
          phone: "+1122334455",
          street: "789 Pine St",
          city: "Chicago",
          state: "IL",
          zipCode: "60601",
          avatar: faker.image.avatar(),
          createdAt: new Date("2024-01-03"),
          updatedAt: new Date("2024-01-03"),
        },
      },
    ];

    mockDb.query.invoices.findMany.mockResolvedValue(extendedMockInvoices);
    const result = await caller.invoices.getControlledInvoicesInfinite({
      limit: 2,
      cursor: 0,
    });

    expect(result).toBeDefined();
    expect(result.items).toHaveLength(2);
    expect(result.nextCursor).toBe(2);
  });

  it("should return total pages for invoices", async () => {
    mockDb.select.mockReturnValue({
      from: () => ({
        where: () => Promise.resolve([{ count: 30 }]),
      }),
    } as unknown as ReturnType<typeof mockDb.select>);
    const totalPages = await caller.invoices.getTotalPages({
      pageSize: 10,
    });

    expect(totalPages).toBe(3);
  });

  it("should filter total pages by status", async () => {
    mockDb.select.mockReturnValue({
      from: () => ({
        where: () => Promise.resolve([{ count: 15 }]),
      }),
    } as unknown as ReturnType<typeof mockDb.select>);
    const totalPages = await caller.invoices.getTotalPages({
      pageSize: 10,
      status: "Paid",
    });

    expect(totalPages).toBe(2);
  });
});
