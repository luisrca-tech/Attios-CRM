"use client";

import { useState } from "react";
import { NotFoundItem } from "~/common/components/ui/NotFoundItem";
import { Image } from "~/common/components/ui/images";
import { calculateItemPerPage } from "~/common/utils/calculateItemPerPage";
import { api } from "~/trpc/react";
import { GenericDataListTable } from "../../common/components/block/GenericTable/DataListTable";
import { parseAsInteger, useQueryState } from "nuqs";
import { usePrefetchNextPage } from "~/common/hooks/usePrefetchNextPage";
import { useInfiniteScroll } from "~/common/hooks/useInfiniteScroll";
import { GenericListSkeleton } from "../../common/components/ui/GenericListSkeleton";
import type { InvoiceSort } from "./types/invoiceSort.type";
import { invoiceColumns } from "./components/InvoiceColumns";
import { InvoiceCard } from "./components/InvoiceCard";
import { skeletonInvoicesData } from "./constants/skeletonInvoiceData";
import { StatusFilter } from "./components/InvoiceFilters";
import type { StatusType } from "./types/invoiceFilters.type";
import { Icon } from "~/common/components/ui/Icons/_index";
import { cn } from "~/lib/utils";
import type { Invoice } from "./types/invoice.type";

const parseStatus = (value: string | null): StatusType => {
  if (!value) return "All";
  return (value as StatusType) || "All";
};

export function InvoicesTable() {
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [sort, setSort] = useState<InvoiceSort>({
    column: "number",
    direction: "asc",
  });
  const [status, setStatus] = useQueryState<StatusType>("status", {
    parse: parseStatus,
    defaultValue: "All",
  });

  const infiniteInvoices =
    api.invoices.getControlledInvoicesInfinite.useInfiniteQuery(
      {
        limit: 8,
        status,
        sort,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        staleTime: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      }
    );

  const { loadMoreRef } = useInfiniteScroll({
    canLoadMore: infiniteInvoices.hasNextPage,
    fetchMore: infiniteInvoices.fetchNextPage,
  });

  const handleSort = (column: string, direction: "asc" | "desc") => {
    setSort({
      column: column as "number" | "date" | "customer" | "status" | "amount",
      direction,
    });
  };

  const handleStatusChange = (
    newStatus: "All" | "Draft" | "Paid" | "Unpaid" | "Scheduled"
  ) => {
    setStatus(newStatus);
  };

  const extraItemHeight = 65;
  const maxItemPerPage = 25;
  const pageSize = Math.min(
    calculateItemPerPage(extraItemHeight),
    maxItemPerPage
  );

  const totalPagesQuery = api.invoices.getTotalPages.useQuery({
    pageSize,
    status,
  });

  const invoiceQuery = api.invoices.getInvoicesPaginated.useQuery(
    {
      page,
      pageSize,
      sort,
      status,
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
    resource: "invoices",
    procedure: "getInvoicesPaginated",
    extraParams: { sort, status },
  });

  const invoiceData = invoiceQuery.data ?? [];
  const isLoading =
    invoiceQuery.isLoading || (invoiceQuery.isFetching && !invoiceQuery.data);

  const columnsList = invoiceColumns({
    onSort: handleSort,
    currentSort: sort,
    isLoading,
  });

  const skeletonData = skeletonInvoicesData({ pageSize });

  const displayData = isLoading ? skeletonData : invoiceData;

  const infiniteInvoicesData =
    infiniteInvoices.data?.pages.flatMap((page) => page.items) ?? [];
  const isLoadingInfinite =
    infiniteInvoices.isLoading ||
    (infiniteInvoices.isFetching && !infiniteInvoices.data);

  if (!invoiceData.length && !isLoading) {
    return (
      <NotFoundItem
        href="#"
        renderImage={() => (
          <Image.NotFound className="h-[14.125rem] w-[20.625rem] md:h-[20rem] md:w-[22.625rem] lg:h-[24.0625rem] lg:w-[35rem]" />
        )}
        title="No invoices found?"
        description="Try to create more new invoices or drag xls files
to upload items list"
        textButton="Create Invoice"
      />
    );
  }

  return (
    <div className="flex w-full flex-col gap-1 bg-white-300 md:block md:bg-white-100 lg:block lg:gap-[0.875rem] lg:rounded-xl">
      <div className="flex items-center justify-between px-6 py-5">
        <StatusFilter
          status={status}
          onStatusChange={handleStatusChange}
          className="w-full"
        />
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center gap-1 rounded-lg bg-white-100 lg:min-w-28"
          onClick={() =>
            handleSort(
              "number",
              sort.column === "number" && sort.direction === "asc"
                ? "desc"
                : "asc"
            )
          }
        >
          <div className="flex items-center gap-1">
            <Icon.Funnel
              className={cn(
                "h-[1.125rem] w-[1.125rem]",
                sort.direction === "asc" && "rotate-180"
              )}
            />
            <div className="hidden items-center gap-1 font-bold text-primary-200 text-xs uppercase leading-[1.125rem] lg:flex">
              Sort: <span className="font-extrabold text-black">A-Z</span>
              <Icon.Arrow.Down
                className={cn(
                  "h-3 w-4",
                  sort.direction === "asc" && "rotate-180"
                )}
              />
            </div>
          </div>
        </button>
      </div>
      {/* This table list is showing on desktop */}
      <GenericDataListTable<Invoice, unknown>
        className="h-[calc(100vh-21.5rem)]"
        columns={columnsList}
        data={displayData}
        pageSize={pageSize}
        totalPages={totalPagesQuery.data}
      />
      {/* This list is showing on mobile */}
      <div className="mb-20 flex flex-col gap-1 md:hidden">
        {infiniteInvoicesData.map((invoice) => (
          <div
            className="px-3"
            key={invoice.id}
          >
            <InvoiceCard invoice={invoice} />
          </div>
        ))}
        {(isLoadingInfinite || infiniteInvoices.isFetchingNextPage) &&
          Array.from({ length: 8 }).map((_, index) => (
            <GenericListSkeleton
              key={`product-list-skeleton-${Date.now()}-${index}`}
            />
          ))}
        {infiniteInvoices.hasNextPage && (
          <div
            ref={loadMoreRef}
            className="h-10"
          />
        )}
      </div>
    </div>
  );
}
