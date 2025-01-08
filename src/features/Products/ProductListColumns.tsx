'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { InferSelectModel } from 'drizzle-orm';
import Image from 'next/image';
import { Button } from '~/common/components/ui/Button';
import { Icon } from '~/common/components/ui/Icons/_index';
import { Checkbox } from '~/common/components/ui/checkbox';
import type { products } from '~/server/db/schema';

export type ColumnType<TData> = ColumnDef<TData, unknown>[];

const randomSales = () => Math.floor(Math.random() * 1000);

type Product = InferSelectModel<typeof products> & {
	category?: { name: string };
};

export const columnsList: ColumnType<Product> = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				className="h-5 w-5"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				className="h-5 w-5"
			/>
		),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<div className="flex items-center justify-between">
				<span>Name</span>
				<button
					type="button"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					<Icon.Ordenation className="h-3 w-3" />
				</button>
			</div>
		),
		cell: ({ row }) => {
			const product = row.original;
			const pickName =
				product.name.length > 10
					? `${product.name.slice(0, 10)}...`
					: product.name;
			return (
				<div className="flex items-center md:gap-4 lg:gap-2 2xl:gap-4">
					<Image
						src={product.initialImage ?? ''}
						alt={product.name}
						width={52}
						height={52}
						className="h-10 w-10 rounded-md"
					/>
					<div className="flex flex-col">
						<div className="flex gap-1">
							<strong className="text-sm leading-4 md:hidden lg:flex 2xl:hidden">
								{pickName}
							</strong>
							<strong className="text-base leading-4 md:flex lg:hidden 2xl:flex">
								{product.name}
							</strong>
							<span className="font-bold leading-4 lg:hidden lg:text-sm 2xl:flex 2xl:text-base">
								{product.modelYear}
							</span>
						</div>
						<span className="font-normal text-primary-200 text-xs uppercase">
							{product.id}
						</span>
					</div>
				</div>
			);
		}
	},
	{
		accessorKey: 'sales',
		header: ({ column }) => (
			<div className="flex items-center justify-around gap-4">
				Sales
				<button
					type="button"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					<Icon.Ordenation className="h-3 w-3" />
				</button>
			</div>
		),
		cell: () => <div className="font-bold">{Number(randomSales())}</div>
	},
	{
		accessorKey: 'quantity',
		header: ({ column }) => (
			<div className="flex w-full items-center justify-between gap-4">
				Qty.
				<button
					type="button"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					<Icon.Ordenation className="h-3 w-3" />
				</button>
			</div>
		),
		cell: ({ row }) => <div className="font-bold">{row.original.quantity}</div>
	},
	{
		accessorKey: 'listPrice',
		header: ({ column }) => (
			<div className="flex w-full items-center justify-between">
				Price
				<button
					type="button"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					<Icon.Ordenation className="h-3 w-3" />
				</button>
			</div>
		),
		cell: ({ row }) => (
			<div className="font-bold">${row.original.listPrice}</div>
		)
	},
	{
		accessorKey: 'category',
		header: () => (
			<div className="flex w-full items-center justify-between lg:hidden 2xl:flex">
				Category
			</div>
		),
		cell: ({ row }) => (
			<div className="flex min-w-[11.25rem] items-center justify-center rounded-lg bg-white-200 px-7 py-2 lg:hidden 2xl:flex">
				<span className="font-bold text-base text-primary-200 leading-5">
					{row.original.category?.name}
				</span>
			</div>
		)
	},
	{
		id: 'actions',
		enableGrouping: false,
		header: () => null,
		cell: () => (
			<Button color="septenary" className="h-9 w-9 border border-white-200">
				<Icon.MoreActions />
			</Button>
		)
	}
];
