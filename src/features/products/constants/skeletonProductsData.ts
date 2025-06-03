import type { SkeletonTable } from "~/common/types/skeletonTable.type";

export const skeletonProductsData = ({ pageSize }: SkeletonTable) =>
  Array.from({ length: pageSize }, (_, index) => ({
    id: index,
    name: "",
    quantity: 0,
    sales: 0,
    listPrice: "",
    modelYear: 0,
    category: { name: "" },
    productImages: [{ url: "" }],
    brandId: 0,
    categoryId: 0,
    categoryName: "",
    sku: "",
    currency: "",
    subcategory: "",
    description: null,
    workspaceId: 0,
    isActive: true,
    teamId: 0,
    subdomainId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
