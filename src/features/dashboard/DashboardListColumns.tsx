"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { cn } from "~/lib/utils";
import { Skeleton } from "~/common/components/ui/skeleton";
import type { OrderRelations } from "./types/orderRelations.type";

export type ColumnType<TData> = ColumnDef<TData, unknown>[];

const SHIPPING_PRICE = 18;

interface DashboardColumnsProps {
  isLoading?: boolean;
}

export const dashboardListColumns = ({
  isLoading,
}: DashboardColumnsProps): ColumnDef<OrderRelations, unknown>[] => [
  {
    accessorKey: "orderItems",
    header: () => <span className="pl-2">Product</span>,
    cell: ({ row }) => {
      if (isLoading) {
        return (
          <div className="flex items-center gap-2 md:gap-4 2xl:gap-4">
            <Skeleton className="h-10 w-10 rounded-md" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        );
      }
      const order = row.original;
      const firstItem = order.orderItems[0];
      const pickName =
        firstItem?.product.name && firstItem.product.name.length > 10
          ? `${firstItem.product.name.slice(0, 10)}...`
          : (firstItem?.product.name ?? "");
      return (
        <div className="flex items-center gap-2 md:gap-4 2xl:gap-4">
          <Image
            src={firstItem?.productImage ?? ""}
            alt={firstItem?.product.name ?? ""}
            width={52}
            height={52}
            className="h-10 w-10 rounded-md"
          />
          <div className="flex flex-col">
            <strong className="text-sm leading-5 md:hidden lg:hidden 2xl:block">
              {firstItem?.product.name}
            </strong>
            <strong className="text-sm leading-5 md:block lg:block 2xl:hidden">
              {pickName}
            </strong>
            <span className="font-normal text-primary-200 text-xs uppercase">
              {firstItem?.product.id}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      if (isLoading) {
        return (
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        );
      }
      const { customer } = row.original;
      const pickName =
        customer.firstName.length + customer.lastName.length > 10
          ? `${customer.firstName.slice(0, 10)}...`
          : customer.firstName;
      const pickEmail =
        customer.email.length > 10
          ? `${customer.email.slice(0, 10)}...`
          : customer.email;
      return (
        <div className="flex flex-col gap-1">
          <strong className="text-sm leading-5 md:hidden lg:hidden 2xl:block">
            {customer.firstName} {customer.lastName}
          </strong>
          <strong className="text-sm leading-5 md:block lg:block 2xl:hidden">
            {pickName}
          </strong>
          <span className="font-normal text-primary-200 text-sm md:hidden lg:hidden 2xl:block">
            {customer.email}
          </span>
          <span className="font-normal text-primary-200 text-sm md:block lg:block 2xl:hidden">
            {pickEmail}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "delivery",
    header: () => (
      <span className="md:block lg:hidden 2xl:block">Delivery</span>
    ),
    cell: ({ row }) => {
      if (isLoading) {
        return (
          <div className="flex flex-col gap-1 md:flex lg:hidden 2xl:flex">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
        );
      }
      const { customer } = row.original;
      const pickStreet =
        customer.street && customer.street.length > 10
          ? `${customer.street.slice(0, 10)}...`
          : (customer.street ?? "");
      return (
        <div className="flex flex-col gap-1 md:flex lg:hidden 2xl:flex">
          <strong className="text-sm leading-5">{customer.city}</strong>
          <span className="font-normal text-primary-200 text-sm md:block lg:hidden 2xl:block">
            {customer.street}
          </span>
          <span className="font-normal text-primary-200 text-sm md:hidden lg:block 2xl:hidden">
            {pickStreet}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: () => <span />,
    cell: ({ row }) => {
      if (isLoading) {
        return (
          <div className="flex w-[6.125rem] items-center justify-center rounded-lg bg-white-200 py-2">
            <Skeleton className="h-4 w-16" />
          </div>
        );
      }
      return (
        <div
          className={cn(
            "flex w-[6.125rem] items-center justify-center rounded-lg py-2",
            row.original.orderStatus === "pending" && "bg-secondary-400/10",
            row.original.orderStatus === "processing" && "bg-secondary-100/10",
            row.original.orderStatus === "shipped" && "bg-primary-100/10",
            row.original.orderStatus === "delivered" && "bg-secondary-200/10",
            row.original.orderStatus === "cancelled" && "bg-secondary-300/10"
          )}
        >
          <span
            className={cn(
              "font-bold text-sm leading-5 first-letter:capitalize",
              row.original.orderStatus === "pending" && "text-secondary-400",
              row.original.orderStatus === "processing" && "text-secondary-100",
              row.original.orderStatus === "shipped" && "text-primary-100",
              row.original.orderStatus === "delivered" && "text-secondary-200",
              row.original.orderStatus === "cancelled" && "text-secondary-300"
            )}
          >
            {row.original.orderStatus}
          </span>
        </div>
      );
    },
  },
  {
    id: "subtotal",
    header: () => (
      <span className="md:block lg:hidden 2xl:block">Subtotal</span>
    ),
    cell: ({ row }) => {
      if (isLoading) {
        return (
          <div className="font-bold text-sm leading-5 md:block lg:hidden 2xl:block">
            <Skeleton className="h-4 w-16" />
          </div>
        );
      }
      const subtotal = row.original.orderItems.reduce(
        (acc, item) => acc + Number(item.listPrice) * item.quantity,
        0
      );
      return (
        <div className="font-bold text-sm leading-5 md:block lg:hidden 2xl:block">
          ${subtotal.toFixed(2)}
        </div>
      );
    },
  },
  {
    id: "shipping",
    header: "Shipping",
    cell: () => {
      if (isLoading) {
        return <Skeleton className="h-4 w-16" />;
      }
      return <div className="font-bold">${SHIPPING_PRICE.toFixed(2)}</div>;
    },
  },
  {
    id: "total",
    header: () => (
      <div className="flex items-center justify-center">
        <span className="text-right">Total</span>
      </div>
    ),
    cell: ({ row }) => {
      if (isLoading) {
        return <Skeleton className="h-4 w-16" />;
      }
      const subtotal = row.original.orderItems.reduce(
        (acc, item) => acc + Number(item.listPrice) * item.quantity,
        0
      );
      const total = subtotal + SHIPPING_PRICE;
      return <div className="font-bold">${total.toFixed(2)}</div>;
    },
  },
];
