"use client";

import type { Table } from "@tanstack/react-table";
import { parseAsInteger, useQueryState } from "nuqs";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/common/components/ui/Button";
import { NotFoundItem } from "~/common/components/ui/NotFoundItem";
import { Image } from "~/common/components/ui/images";
import { useInfiniteScroll } from "~/common/hooks/useInfiniteScroll";
import { usePrefetchNextPage } from "~/common/hooks/usePrefetchNextPage";
import { calculateItemPerPage } from "~/common/utils/calculateItemPerPage";
import { ProductListCard } from "~/features/products/components/ProductListCard";
import { api } from "~/trpc/react";
import { GenericDataGridTable } from "../../common/components/block/GenericTable/DataGridTable";
import { GenericDataListTable } from "../../common/components/block/GenericTable/DataListTable";
import { GenericGridSkeleton } from "../../common/components/ui/GenericGridSkeleton";
import { GenericListSkeleton } from "../../common/components/ui/GenericListSkeleton";
import { Icon } from "../../common/components/ui/Icons/_index";
import { ViewTypeSelector } from "../../common/components/ui/ViewTypeSelector";
import { useWorkspace } from "../workspace/hooks/useWorkspace";
import { productGridColumns } from "./ProductGridColumns";
import { productListColumns } from "./ProductListColumns";
import { NewProductModal } from "./components/NewProductModal";
import { ProductGridCard } from "./components/ProductGridCard";
import { ProductGridCardWrapper } from "./constants/productGridCardWrapper";
import { skeletonProductsData } from "./constants/skeletonProductsData";
import { useProduct } from "./hooks/useProduct";
import { useProductFilters } from "./hooks/useProductFilters";
import type { Product } from "./types/product.type";
import type { ProductSort } from "./types/productSort.type";
export function ProductsTable() {
  const [viewType, setViewType] = useState<"list" | "grid">("list");
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [sort, setSort] = useState<ProductSort>({
    column: "name",
    direction: "asc",
  });
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const tableRef = useRef<Table<Product> | null>(null);

  const { bulkDeleteProducts } = useProduct();
  const {
    quantityFilter,
    priceFilter,
    categoryFilter,
    handleFilterChange,
    resetFilters,
    search,
  } = useProductFilters();

  const infiniteProducts =
    api.product.getControlledProductsInfinite.useInfiniteQuery(
      {
        limit: 8,
        search,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        staleTime: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      }
    );

  const { loadMoreRef } = useInfiniteScroll({
    canLoadMore: infiniteProducts.hasNextPage,
    fetchMore: infiniteProducts.fetchNextPage,
  });

  const handleSort = (column: string, direction: "asc" | "desc") => {
    setSort({
      column: column as "name" | "quantity" | "listPrice" | "modelYear",
      direction,
    });
  };

  const handleSelectProduct = (productId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedProducts((prev) => [...prev, productId]);
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) {
      toast.warning("Please select at least one product to delete");
      return;
    }

    try {
      await bulkDeleteProducts.mutateAsync({ ids: selectedProducts });

      toast.success(`Successfully deleted ${selectedProducts.length} products`);
      setSelectedProducts([]);
      if (tableRef.current) {
        tableRef.current.resetRowSelection();
      }
    } catch (error) {
      console.error("Error deleting products:", error);
      toast.error("Failed to delete products");
    }
  };

  const extraItemHeight = 65;
  const maxItemPerPage = 25;
  const pageSize = Math.min(
    calculateItemPerPage(extraItemHeight),
    maxItemPerPage
  );

  const { workspace } = useWorkspace();

  const totalPagesQuery = api.product.getTotalPages.useQuery({
    pageSize,
    search,
    filters: {
      quantity: quantityFilter || undefined,
      price: priceFilter || undefined,
      category: categoryFilter || undefined,
      subdomain: workspace || "",
    },
  });

  const productQuery = api.product.getProductsPaginated.useQuery(
    {
      page,
      pageSize,
      sort,
      search,
      filters: {
        quantity: quantityFilter || undefined,
        price: priceFilter || undefined,
        category: categoryFilter || undefined,
        subdomain: workspace || "",
      },
    },
    {
      staleTime: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  usePrefetchNextPage({
    page,
    pageSize,
    totalPages: totalPagesQuery.data,
    resource: "product",
    procedure: "getProductsPaginated",
    extraParams: { sort, search },
  });

  const productData = productQuery.data ?? [];

  const isLoading =
    productQuery.isLoading || (productQuery.isFetching && !productQuery.data);

  const columnsList = productListColumns({
    onSort: handleSort,
    currentSort: sort,
    isLoading,
    selectedProducts,
    onSelectProducts: (productIds) => {
      setSelectedProducts(productIds);
    },
    onFilterChange: handleFilterChange,
  });

  const columnsGrid = productGridColumns({
    onSort: handleSort,
    currentSort: sort,
    isLoading,
    selectedProducts,
    onSelectProducts: (productIds) => {
      setSelectedProducts(productIds);
    },
  });

  const skeletonData = skeletonProductsData({ pageSize });

  const displayData = isLoading ? skeletonData : productData;

  const infiniteProductsData =
    infiniteProducts.data?.pages.flatMap((page) => page.items) ?? [];
  const isLoadingInfinite =
    infiniteProducts.isLoading ||
    (infiniteProducts.isFetching && !infiniteProducts.data);

  if (!productData.length && !isLoading) {
    return (
      <NotFoundItem
        renderModal={() => <NewProductModal />}
        href="/products/new"
        renderImage={() => (
          <Image.NotFound className="h-[14.125rem] w-[20.625rem] md:h-[20rem] md:w-[22.625rem] lg:h-[24.0625rem] lg:w-[35rem]" />
        )}
        title="No products found?"
        description="Try to create more new products or drag xls files
to upload items list or reset filters"
        textButton="Create Product"
        resetFilters={resetFilters}
      />
    );
  }

  return (
    <div className="flex w-full flex-col gap-1 bg-white-300 md:block md:bg-white-100 lg:block lg:gap-[0.875rem] lg:rounded-xl">
      <ViewTypeSelector
        viewType={viewType}
        onViewChange={setViewType}
        onSort={handleSort}
      >
        <div className="flex items-center gap-5">
          <Button
            type="button"
            variant="outlined"
            onClick={resetFilters}
            className="hidden md:block"
          >
            Reset Filters
          </Button>
          <Button
            type="button"
            color="secondary"
            className="flex items-center gap-2 rounded-lg"
            onClick={handleBulkDelete}
            disabled={selectedProducts.length === 0}
          >
            <span className="font-extrabold text-sm text-white leading-[0.875rem] hover:font-semibold">
              {selectedProducts.length > 0
                ? `DELETE ${selectedProducts.length} ITEMS`
                : "ALL ACTIONS"}
            </span>
            <Icon.Trash fill="#FF808B" />
          </Button>
        </div>
      </ViewTypeSelector>
      {viewType === "list" ? (
        <>
          {/* This table list is showing on desktop */}
          <GenericDataListTable
            ref={tableRef}
            columns={columnsList}
            data={displayData}
            pageSize={pageSize}
            totalPages={totalPagesQuery.data}
          />
          {/* This list is showing on mobile */}
          <div className="flex flex-col gap-1 md:hidden">
            {infiniteProductsData.map((product) => (
              <div
                className="px-3"
                key={product.id}
              >
                <ProductListCard
                  product={product}
                  isSelected={selectedProducts.includes(product.id.toString())}
                  onSelect={(value) =>
                    handleSelectProduct(product.id.toString(), value)
                  }
                />
              </div>
            ))}
            {(isLoadingInfinite || infiniteProducts.isFetchingNextPage) &&
              Array.from({ length: 8 }).map((_, index) => (
                <GenericListSkeleton
                  key={`product-list-skeleton-${Date.now()}-${index}`}
                />
              ))}
            {infiniteProducts.hasNextPage && (
              <div
                ref={loadMoreRef}
                className="h-10"
              />
            )}
          </div>
        </>
      ) : (
        <>
          {/* This table grid is showing on desktop */}
          <GenericDataGridTable
            ref={tableRef}
            columns={columnsGrid}
            data={displayData}
            pageSize={pageSize}
            totalPages={totalPagesQuery.data}
            CardComponent={ProductGridCardWrapper}
            isLoading={isLoading}
            selectedItems={selectedProducts}
            onSelectItem={handleSelectProduct}
          />
          {/* This grid is showing on mobile */}
          <div className="grid grid-cols-1 gap-1 px-3 md:hidden">
            {infiniteProductsData.map((product) => (
              <ProductGridCard
                key={product.id}
                product={product}
                isSelected={selectedProducts.includes(product.id.toString())}
                onSelect={(value) =>
                  handleSelectProduct(product.id.toString(), value)
                }
              />
            ))}
            {(isLoadingInfinite || infiniteProducts.isFetchingNextPage) &&
              Array.from({ length: 8 }).map((_, index) => (
                <GenericGridSkeleton
                  key={`product-grid-skeleton-${Date.now()}-${index}`}
                />
              ))}
            {infiniteProducts.hasNextPage && (
              <div
                ref={loadMoreRef}
                className="h-10"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
