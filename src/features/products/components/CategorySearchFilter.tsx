"use client";

import { Input } from "~/common/components/ui/Input";
import { useCategory } from "~/features/hooks/useCategory";

interface CategorySearchFilterProps {
  onFilterChange?: (
    type: "quantity" | "price" | "category",
    value: string
  ) => void;
}

export function CategorySearchFilter({
  onFilterChange,
}: CategorySearchFilterProps) {
  const { filteredCategories, setCategorySearch: onSearchCategory } =
    useCategory();

  return (
    <Input.SelectInput
      text="Category"
      options={filteredCategories}
      onSearch={(value) => {
        onSearchCategory(value);
      }}
      onChange={(value) => onFilterChange?.("category", value)}
      withoutAddButton
    />
  );
}
