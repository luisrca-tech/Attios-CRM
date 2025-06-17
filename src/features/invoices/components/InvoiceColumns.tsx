import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "~/common/components/ui/Button";
import { Icon } from "~/common/components/ui/Icons/_index";
import { OrdenationButton } from "~/common/components/block/OrdenationButton";
import { Skeleton } from "~/common/components/ui/skeleton";
import type { Invoice } from "../types/invoice.type";
import { cn } from "~/lib/utils";

interface InvoiceColumnsProps {
  onSort: (column: string, direction: "asc" | "desc") => void;
  currentSort: {
    column: string;
    direction: "asc" | "desc";
  };
  isLoading?: boolean;
}

export const invoiceColumns = ({
  onSort,
  currentSort,
  isLoading,
}: InvoiceColumnsProps): ColumnDef<Invoice, unknown>[] => {
  const columns: ColumnDef<Invoice, unknown>[] = [
    {
      id: "number",
      accessorFn: (row) => row.number,
      header: () => (
        <div className="flex items-center justify-between">
          <span>Number</span>
          {isLoading ? (
            <Skeleton className="h-4 w-4" />
          ) : (
            <OrdenationButton
              column="number"
              currentDirection={
                currentSort.column === "number"
                  ? currentSort.direction
                  : undefined
              }
              onClick={() =>
                onSort(
                  "number",
                  currentSort.column === "number" &&
                    currentSort.direction === "asc"
                    ? "desc"
                    : "asc"
                )
              }
            />
          )}
        </div>
      ),
      cell: ({ row }) => {
        if (isLoading) {
          return (
            <div className="flex items-center gap-5">
              <Skeleton className="h-[3.25rem] w-[3.25rem] rounded-md" />
              <Skeleton className="h-4 w-32" />
            </div>
          );
        }
        return (
          <div className="flex items-center gap-5">
            <div className="flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-lg bg-primary-100/30">
              <Icon.Sidebar.Invoices fill="#5E81F4" />
            </div>
            <div>
              <span className="font-bold text-base text-black leading-6">
                {row.original.number}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      id: "date",
      accessorFn: (row) => row.date,
      header: () => (
        <div className="flex items-center justify-around gap-4">
          Date
          {isLoading ? (
            <Skeleton className="h-4 w-4" />
          ) : (
            <OrdenationButton
              column="date"
              currentDirection={
                currentSort.column === "date"
                  ? currentSort.direction
                  : undefined
              }
              onClick={() =>
                onSort(
                  "date",
                  currentSort.column === "date" &&
                    currentSort.direction === "asc"
                    ? "desc"
                    : "asc"
                )
              }
            />
          )}
        </div>
      ),
      cell: ({ row }) => {
        if (isLoading) {
          return <Skeleton className="h-4 w-16" />;
        }
        const date = new Date(row.original.date);
        const formattedDate = date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        return (
          <div className="flex flex-col gap-1">
            <span className="font-normal text-base text-black leading-5">
              {formattedDate}
            </span>
          </div>
        );
      },
    },
    {
      id: "customer",
      accessorFn: (row) => row.customer,
      header: () => (
        <div className="flex w-full items-center justify-between gap-4">
          Customer
          {isLoading ? (
            <Skeleton className="h-4 w-4" />
          ) : (
            <OrdenationButton
              column="customer"
              currentDirection={
                currentSort.column === "customer"
                  ? currentSort.direction
                  : undefined
              }
              onClick={() =>
                onSort(
                  "customer",
                  currentSort.column === "customer" &&
                    currentSort.direction === "asc"
                    ? "desc"
                    : "asc"
                )
              }
            />
          )}
        </div>
      ),
      cell: ({ row }) => {
        if (isLoading) {
          return (
            <div className="flex items-center gap-3">
              <Skeleton className="h-9 w-9 rounded-md" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          );
        }
        return (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center">
              <Image
                src={row.original.customer?.avatar ?? ""}
                alt={row.original.customer?.firstName ?? ""}
                width={36}
                height={36}
                className="rounded-md"
              />
            </div>
            <span className="font-normal text-base text-black leading-6">
              {row.original.customer?.firstName}{" "}
              {row.original.customer?.lastName}
            </span>
          </div>
        );
      },
    },
    {
      id: "status",
      accessorFn: (row) => row.status,
      header: () => (
        <div className="flex w-full items-center justify-between lg:hidden 2xl:flex">
          Status
          {isLoading ? (
            <Skeleton className="h-4 w-4" />
          ) : (
            <OrdenationButton
              column="status"
              currentDirection={
                currentSort.column === "status"
                  ? currentSort.direction
                  : undefined
              }
              onClick={() =>
                onSort(
                  "status",
                  currentSort.column === "status" &&
                    currentSort.direction === "asc"
                    ? "desc"
                    : "asc"
                )
              }
            />
          )}
        </div>
      ),
      cell: ({ row }) => {
        if (isLoading) {
          return (
            <div className="flex min-w-[7.125rem] items-center justify-center rounded-lg bg-white-200 px-7 py-2 lg:hidden 2xl:flex">
              <Skeleton className="h-4 w-24" />
            </div>
          );
        }
        return (
          <div
            className={cn(
              "flex w-[6.125rem] items-center justify-center rounded-lg py-2",
              row.original.status === "Paid" && "bg-primary-100/10",
              row.original.status === "Unpaid" && "bg-secondary-300/10",
              row.original.status === "Scheduled" && "bg-secondary-100/10",
              row.original.status === "Draft" && "bg-secondary-200/10"
            )}
          >
            <span
              className={cn(
                "font-bold text-sm leading-5 first-letter:capitalize",
                row.original.status === "Paid" && "text-primary-100",
                row.original.status === "Unpaid" && "text-secondary-300",
                row.original.status === "Scheduled" && "text-secondary-100",
                row.original.status === "Draft" && "text-secondary-200"
              )}
            >
              {row.original.status}
            </span>
          </div>
        );
      },
    },
    {
      id: "amount",
      accessorFn: (row) => row.amount,
      header: () => (
        <div className="flex w-full items-center justify-between lg:hidden 2xl:flex">
          Amount
          {isLoading ? (
            <Skeleton className="h-4 w-4" />
          ) : (
            <OrdenationButton
              column="amount"
              currentDirection={
                currentSort.column === "amount"
                  ? currentSort.direction
                  : undefined
              }
              onClick={() =>
                onSort(
                  "amount",
                  currentSort.column === "amount" &&
                    currentSort.direction === "asc"
                    ? "desc"
                    : "asc"
                )
              }
            />
          )}
        </div>
      ),
      cell: ({ row }) => {
        if (isLoading) {
          return <Skeleton className="h-4 w-16" />;
        }
        return (
          <div className="flex flex-col gap-1">
            <span className="font-normal text-base text-black leading-5">
              ${row.original.amount}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      enableGrouping: false,
      header: () => null,
      cell: () => {
        if (isLoading) {
          return <Skeleton className="h-9 w-9" />;
        }
        return (
          <Button
            color="septenary"
            className="h-9 w-9 border border-white-200"
          >
            <Icon.MoreActions />
          </Button>
        );
      },
    },
  ];
  return columns;
};
