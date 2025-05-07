"use client";

import { Input } from "~/common/components/ui/Input";
import { useProductFilters } from "../hooks/useProductFilters";
import { useCategory } from "~/features/hooks/useCategory";
export function CategorySearchFilter() {
  const { filteredCategories, setCategorySearch: onSearchCategory } =
    useCategory();

  const { handleFilterChange } = useProductFilters();
  return (
    <Input.SelectInput
      text="Category"
      options={filteredCategories}
      onSearch={(value) => {
        onSearchCategory(value);
      }}
      onChange={(value) => handleFilterChange("category", value)}
      withoutAddButton
    />
  );
}
