export type MockProduct = {
  id: string;
  name: string;
  brandId: number;
  categoryId: number;
  categoryName: string | null;
  modelYear: number;
  quantity: number;
  listPrice: string;
  sku: string | null;
  currency: string | null;
  subcategory: string | null;
};