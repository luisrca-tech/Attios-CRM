export const requiredOrderRelations = {
  customer: {
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      street: true,
      city: true,
      state: true,
      zipCode: true,
      workspaceId: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  orderItems: {
    with: {
      product: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  },
} as const;
