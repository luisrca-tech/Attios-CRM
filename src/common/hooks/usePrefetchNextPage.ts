import { useEffect } from "react";
import { api } from "~/trpc/react";

type PrefetchConfig = {
  page: number;
  pageSize: number;
  totalPages?: number;
  resource: "product" | "orders";
  procedure: "getPaginated" | "getAll";
  extraParams?: Record<string, unknown>;
};

export function usePrefetchNextPage({
  page,
  pageSize,
  totalPages,
  resource,
  procedure,
  extraParams,
}: PrefetchConfig) {
  const utils = api.useUtils();

  useEffect(() => {
    if (totalPages && page < totalPages) {
      // @ts-expect-error - Dynamic access to tRPC utils
      utils[resource][procedure].prefetch({
        page: page + 1,
        pageSize,
        ...extraParams,
      });
    }
  }, [page, pageSize, totalPages, resource, procedure, utils, extraParams]);
}
