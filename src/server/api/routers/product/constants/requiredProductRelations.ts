export const requiredProductRelations = {
  category: {
    columns: {
      id: true,
      name: true,
    },
  },
  productImages: {
    columns: {
      url: true,
      key: true,
    },
  },
} as const;
