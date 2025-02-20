"use client";

import { useState } from "react";
import { NotFoundItem } from "~/common/components/ui/NotFoundItem";
import { ProductListCard } from "~/features/Products/components/ProductListCard";
import { Image } from "~/common/components/ui/images";
import { calculateItemPerPage } from "~/common/utils/calculateItemPerPage";
import { api } from "~/trpc/react";
import { DataGridTable } from "../../common/components/block/GenericTable/DataGridTable";
import { DataListTable } from "../../common/components/block/GenericTable/DataListTable";
import { Icon } from "../../common/components/ui/Icons/_index";
import { ViewTypeSelector } from "../../common/components/ui/ViewTypeSelector";
import { productListColumns } from "./ProductListColumns";
import { ProductGridCard } from "./components/ProductGridCard";
import { parseAsInteger, useQueryState } from "nuqs";
import { usePrefetchNextPage } from "~/common/hooks/usePrefetchNextPage";
import { ProductListSkeleton } from "./components/ProductListSkeleton";
import { ProductGridSkeleton } from "./components/ProductGridSkeleton";
import { productGridColumns } from "./ProductGridColumns";

type SortState = {
  column: "name" | "quantity" | "listPrice" | "modelYear";
  direction: "asc" | "desc";
};

export function ProductsTable() {
  const [viewType, setViewType] = useState<"list" | "grid">("list");
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [sort, setSort] = useState<SortState>({
    column: "name",
    direction: "asc",
  });

  const handleSort = (column: string, direction: "asc" | "desc") => {
    setSort({
      column: column as "name" | "quantity" | "listPrice" | "modelYear",
      direction,
    });
  };

  const extraItemHeight = 65;
  const maxItemPerPage = 25;
  const pageSize = Math.min(
    calculateItemPerPage(extraItemHeight),
    maxItemPerPage
  );

  const totalPagesQuery = api.product.getTotalPages.useQuery({
    pageSize,
  });

  const productQuery = api.product.getProductsPaginated.useQuery(
    {
      page,
      pageSize,
      sort,
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
    extraParams: { sort },
  });

  const productData = productQuery.data ?? [];

  const columnsList = productListColumns({
    onSort: handleSort,
    currentSort: sort,
    isLoading: productQuery.isFetching,
  });

  const columnsGrid = productGridColumns({
    onSort: handleSort,
    currentSort: sort,
    isLoading: productQuery.isFetching,
  });

  // Generate skeleton data when loading
  const skeletonData = productQuery.isFetching
    ? Array.from({ length: 8 }, (_, index) => ({
        id: `skeleton-${index}`,
        name: "",
        quantity: 0,
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
      }))
    : [];

  const displayData = productQuery.isFetching ? skeletonData : productData;

  if (!displayData.length) {
    return (
      <NotFoundItem
        href="#"
        renderImage={() => (
          <Image.NotFound className="h-[14.125rem] w-[20.625rem] md:h-[20rem] md:w-[22.625rem] lg:h-[24.0625rem] lg:w-[35rem]" />
        )}
        title="No products found?"
        description="Try to create more new products or drag xls files
to upload items list"
        textButton="Create Product"
      />
    );
  }

  return (
    <div className="flex w-full flex-col gap-1 bg-white-300 md:block md:bg-white-100 lg:block lg:gap-[0.875rem] lg:rounded-xl">
      <ViewTypeSelector
        viewType={viewType}
        onViewChange={setViewType}
      >
        <button
          type="button"
          className="flex items-center gap-1 rounded-lg bg-white-100"
        >
          <Icon.MoreActions />
          <span className="font-extrabold text-black text-xs leading-[0.875rem] hover:font-semibold">
            ALL ACTIONS
          </span>
        </button>
      </ViewTypeSelector>
      {viewType === "list" ? (
        <>
          {/* This table list is showing on desktop */}
          <DataListTable
            columns={columnsList}
            data={displayData}
            pageSize={pageSize}
            totalPages={totalPagesQuery.data}
          />
          {/* This list is showing on mobile */}
          {productQuery.isFetching
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProductListSkeleton
                  key={`product-skeleton-${Date.now()}-${index}`}
                />
              ))
            : productData.map((product) => (
                <div
                  className="flex flex-col gap-1 px-3"
                  key={product.id}
                >
                  <ProductListCard {...product} />
                </div>
              ))}
        </>
      ) : (
        <>
          {/* This table grid is showing on desktop */}
          <DataGridTable
            columns={columnsGrid}
            data={displayData}
            pageSize={pageSize}
            totalPages={totalPagesQuery.data}
            CardComponent={ProductGridCard}
            isLoading={productQuery.isFetching}
          />
          {/* This grid is showing on mobile */}
          {productQuery.isFetching
            ? Array.from({ length: 8 }).map((_, index) => (
                <ProductGridSkeleton
                  key={`product-skeleton-${Date.now()}-${index}`}
                />
              ))
            : displayData.map((product) => (
                <div
                  className="grid grid-cols-1 gap-1 px-3 md:hidden"
                  key={product.id}
                >
                  <ProductGridCard {...product} />
                </div>
              ))}
        </>
      )}
    </div>
  );
}
