'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { InferSelectModel } from 'drizzle-orm';
import { Icon } from '~/common/components/ui/Icons/_index';
import { Checkbox } from '~/common/components/ui/checkbox';
import type { products } from '~/server/db/schema';

export type ColumnType<TData> = ColumnDef<TData, unknown>[];
type Product = InferSelectModel<typeof products>

export const columnsGrid: ColumnDef<Product, unknown>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false
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
		)
	},
	{
		accessorKey: 'modelYear',
		header: ({ column }) => (
			<div className="flex items-center justify-between">
				<span>Sales</span>
				<button
					type="button"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					<Icon.Ordenation className="h-3 w-3" />
				</button>
			</div>
		)
	},
	{
		accessorKey: 'listPrice',
		header: ({ column }) => (
			<div className="flex items-center justify-between">
				<span>Price</span>
				<button
					type="button"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					<Icon.Ordenation className="h-3 w-3" />
				</button>
			</div>
		)
	}
];
