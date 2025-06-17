export const requiredInvoiceRelations = {
  customer: {
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
      street: true,
      city: true,
      state: true,
      zipCode: true,
      avatar: true,
      workspaceId: true,
      createdAt: true,
      updatedAt: true,
    },
  },
} as const;
