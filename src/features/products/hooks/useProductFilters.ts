import { parseAsString, useQueryState } from "nuqs";
import { priceFilterParser, quantityFilterParser } from "../utils/parseFilters";

interface UseProductFiltersProps {
  setPage?: (page: number) => void;
}

export function useProductFilters({ setPage }: UseProductFiltersProps = {}) {
  const [quantityFilter, setQuantityFilter] = useQueryState(
    "quantityFilter",
    quantityFilterParser
  );
  const [priceFilter, setPriceFilter] = useQueryState(
    "priceFilter",
    priceFilterParser
  );

  const [categoryFilter, setCategoryFilter] = useQueryState(
    "category",
    parseAsString.withDefault("")
  );
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  const handleFilterChange = (
    type: "quantity" | "price" | "category",
    value: string
  ) => {
    // Reset page to 1 when any filter changes
    setPage?.(1);

    switch (type) {
      case "quantity":
        setQuantityFilter(
          value === ""
            ? null
            : (value as "Empty" | "Over 100" | "Over 1000" | "Ilimited")
        );
        break;
      case "price":
        setPriceFilter(
          value === "" ? null : (value as "Over 1000" | "Over 2000" | "5000+")
        );
        break;
      case "category":
        setCategoryFilter(value);
        break;
    }
  };

  const resetFilters = () => {
    // Reset page to 1 when filters are reset
    setPage?.(1);
    setSearch("");
    setQuantityFilter(null);
    setPriceFilter(null);
    setCategoryFilter("");
  };

  return {
    quantityFilter,
    priceFilter,
    categoryFilter,
    handleFilterChange,
    setQuantityFilter,
    setPriceFilter,
    setCategoryFilter,
    search,
    resetFilters,
  };
}
