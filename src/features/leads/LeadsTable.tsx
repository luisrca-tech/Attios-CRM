"use client";

import { useState } from "react";
import { NotFoundItem } from "~/common/components/ui/NotFoundItem";
import { Image } from "~/common/components/ui/images";
import { calculateItemPerPage } from "~/common/utils/calculateItemPerPage";
import { api } from "~/trpc/react";
import { GenericDataGridTable } from "../../common/components/block/GenericTable/DataGridTable";
import { GenericDataListTable } from "../../common/components/block/GenericTable/DataListTable";
import { Icon } from "../../common/components/ui/Icons/_index";
import { ViewTypeSelector } from "../../common/components/ui/ViewTypeSelector";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { usePrefetchNextPage } from "~/common/hooks/usePrefetchNextPage";
import { useInfiniteScroll } from "~/common/hooks/useInfiniteScroll";
import { GenericGridSkeleton } from "../../common/components/ui/GenericGridSkeleton";
import { GenericListSkeleton } from "../../common/components/ui/GenericListSkeleton";
import type { LeadSort } from "./types/leadSort.type";
import { leadListColumns } from "./components/LeadListColumns";
import { skeletonLeadsData } from "./constants/skeletonLeadsData";
import { leadGridColumns } from "./components/LeadGridColumns";
import { LeadGridCard } from "./components/LeadGridCard";
import { cn } from "~/lib/utils";
import { LeadListCard } from "./components/LeadListCard";

export function LeadsTable() {
  const [viewType, setViewType] = useState<"list" | "grid">("list");
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search] = useQueryState("search", parseAsString.withDefault(""));
  const [sort, setSort] = useState<LeadSort>({
    column: "name",
    direction: "asc",
  });

  const infiniteLeads = api.leads.getControlledLeadsInfinite.useInfiniteQuery(
    {
      limit: 8,
      sort,
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
    canLoadMore: infiniteLeads.hasNextPage,
    fetchMore: infiniteLeads.fetchNextPage,
  });

  const handleSort = (column: string, direction: "asc" | "desc") => {
    setSort({
      column: column as "name" | "email" | "phone" | "tag" | "status",
      direction,
    });
  };

  const extraItemHeight = 65;
  const maxItemPerPage = 25;
  const pageSize = Math.min(
    calculateItemPerPage(extraItemHeight),
    maxItemPerPage
  );

  const totalPagesQuery = api.leads.getTotalPages.useQuery({
    pageSize,
    search,
  });

  const leadQuery = api.leads.getLeadsPaginated.useQuery(
    {
      page,
      pageSize,
      sort,
      search,
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
    resource: "leads",
    procedure: "getLeadsPaginated",
    extraParams: { sort, search },
  });

  const leadData = leadQuery.data ?? [];
  const isLoading =
    leadQuery.isLoading || (leadQuery.isFetching && !leadQuery.data);

  const columnsList = leadListColumns({
    onSort: handleSort,
    currentSort: sort,
    isLoading,
  });

  const columnsGrid = leadGridColumns({
    onSort: handleSort,
    currentSort: sort,
    isLoading,
  });

  const skeletonData = skeletonLeadsData({ pageSize });

  const displayData = isLoading ? skeletonData : leadData;

  const infiniteLeadsData =
    infiniteLeads.data?.pages.flatMap((page) => page.items) ?? [];
  const isLoadingInfinite =
    infiniteLeads.isLoading ||
    (infiniteLeads.isFetching && !infiniteLeads.data);

  if (!leadData.length && !isLoading) {
    return (
      <NotFoundItem
        href="#"
        renderImage={() => (
          <Image.NotFound className="h-[14.125rem] w-[20.625rem] md:h-[20rem] md:w-[22.625rem] lg:h-[24.0625rem] lg:w-[35rem]" />
        )}
        title="No leads found?"
        description="Try to create more new leads or drag xls files
to upload items list"
        textButton="Create Lead"
      />
    );
  }

  return (
    <div className="flex w-full flex-col gap-1 bg-white-300 md:block md:bg-white-100 lg:block lg:gap-[0.875rem] lg:rounded-xl">
      <ViewTypeSelector
        viewType={viewType}
        onViewChange={setViewType}
        onSort={handleSort}
        currentSort={sort}
      >
        <button
          type="button"
          className="flex items-center gap-1 rounded-lg bg-white-100"
          onClick={() =>
            handleSort(
              "name",
              sort.column === "name" && sort.direction === "asc"
                ? "desc"
                : "asc"
            )
          }
        >
          <div className="flex items-center gap-1">
            <Icon.Funnel className="h-[1.125rem] w-[1.125rem]" />
            <div className="flex items-center gap-1 font-bold text-primary-200 text-xs uppercase leading-[1.125rem]">
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
      </ViewTypeSelector>
      {viewType === "list" ? (
        <>
          {/* This table list is showing on desktop */}
          <GenericDataListTable
            className="h-[calc(100vh-21.5rem)]"
            columns={columnsList}
            data={displayData}
            pageSize={pageSize}
            totalPages={totalPagesQuery.data}
          />
          {/* This list is showing on mobile */}
          <div className="flex flex-col gap-1 md:hidden">
            {infiniteLeadsData.map((lead) => (
              <div
                className="px-3"
                key={lead.id}
              >
                <LeadListCard {...lead} />
              </div>
            ))}
            {(isLoadingInfinite || infiniteLeads.isFetchingNextPage) &&
              Array.from({ length: 8 }).map((_, index) => (
                <GenericListSkeleton
                  key={`product-list-skeleton-${Date.now()}-${index}`}
                />
              ))}
            {infiniteLeads.hasNextPage && (
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
            CardComponent={LeadGridCard}
            columns={columnsGrid}
            data={displayData}
            pageSize={pageSize}
            totalPages={totalPagesQuery.data}
            isLoading={isLoading}
            className="h-[calc(100vh-27.5rem)]"
          />
          {/* This grid is showing on mobile */}
          <div className="grid grid-cols-1 gap-1 px-3 md:hidden">
            {infiniteLeadsData.map((lead) => (
              <LeadGridCard
                key={lead.id}
                {...lead}
              />
            ))}
            {(isLoadingInfinite || infiniteLeads.isFetchingNextPage) &&
              Array.from({ length: 8 }).map((_, index) => (
                <GenericGridSkeleton
                  key={`product-grid-skeleton-${Date.now()}-${index}`}
                />
              ))}
            {infiniteLeads.hasNextPage && (
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
