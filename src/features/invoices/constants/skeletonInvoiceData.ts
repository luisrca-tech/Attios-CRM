import type { Invoice } from "../types/invoice.type";

export const skeletonInvoicesData = ({
  pageSize,
}: {
  pageSize: number;
}): Invoice[] => {
  return Array.from({ length: pageSize }).map((_, index) => ({
    id: index,
    number: "",
    date: new Date(),
    amount: 0,
    status: "",
    customerId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    customer: {
      id: index,
      firstName: "",
      lastName: "",
      email: "",
      phone: null,
      street: null,
      city: null,
      state: null,
      zipCode: null,
      avatar: null,
      workspaceId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  }));
};
