import type { ColumnDef } from '@tanstack/react-table';
import { Icon } from '~/common/components/ui/Icons/_index';
import { Checkbox } from '~/common/components/ui/checkbox';
import { Skeleton } from '~/common/components/ui/skeleton';
import type { Product } from './types/product.type';

export type ColumnType<TData> = ColumnDef<TData, unknown>[];

interface ProductGridColumnsProps {
	onSort: (column: string, direction: 'asc' | 'desc') => void;
	currentSort: {
		column: string;
		direction: 'asc' | 'desc';
	};
	isLoading?: boolean;
	selectedProducts: string[];
	onSelectProducts: (productIds: number[]) => void;
}

export const productGridColumns = ({
	onSort,
	currentSort,
	isLoading,
	onSelectProducts
}: ProductGridColumnsProps): ColumnDef<Product, unknown>[] => [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => {
					table.toggleAllPageRowsSelected(!!value);
					setTimeout(() => {
						const selectedRows = table.getSelectedRowModel().rows;
						const selectedIds = selectedRows.map((row) => row.original.id);
						onSelectProducts(selectedIds);
					}, 0);
				}}
				aria-label="Select all"
				disabled={isLoading}
			/>
		),
		cell: ({ row, table }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => {
					row.toggleSelected(!!value);
					setTimeout(() => {
						const selectedRows = table.getSelectedRowModel().rows;
						const selectedIds = selectedRows.map((row) => row.original.id);
						onSelectProducts(selectedIds);
					}, 0);
				}}
				aria-label="Select row"
				disabled={isLoading}
			/>
		),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'name',
		header: () => (
			<div className="flex items-center justify-between">
				<span>Name</span>
				{isLoading ? (
					<Skeleton className="h-4 w-4" />
				) : (
					<button
						type="button"
						onClick={() =>
							onSort(
								'name',
								currentSort.column === 'name' && currentSort.direction === 'asc'
									? 'desc'
									: 'asc'
							)
						}
					>
						<Icon.Ordenation className="h-3 w-3" />
					</button>
				)}
			</div>
		),
		cell: ({ row }) => {
			if (isLoading) {
				return <Skeleton className="h-4 w-32" />;
			}
			return row.getValue('name');
		}
	},
	{
		accessorKey: 'modelYear',
		header: () => (
			<div className="flex items-center justify-between">
				<span>Sales</span>
				{isLoading ? (
					<Skeleton className="h-4 w-4" />
				) : (
					<button
						type="button"
						onClick={() =>
							onSort(
								'modelYear',
								currentSort.column === 'modelYear' &&
									currentSort.direction === 'asc'
									? 'desc'
									: 'asc'
							)
						}
					>
						<Icon.Ordenation className="h-3 w-3" />
					</button>
				)}
			</div>
		),
		cell: ({ row }) => {
			if (isLoading) {
				return <Skeleton className="h-4 w-16" />;
			}
			return row.getValue('modelYear');
		}
	},
	{
		accessorKey: 'listPrice',
		header: () => (
			<div className="flex items-center justify-between">
				<span>Price</span>
				{isLoading ? (
					<Skeleton className="h-4 w-4" />
				) : (
					<button
						type="button"
						onClick={() =>
							onSort(
								'listPrice',
								currentSort.column === 'listPrice' &&
									currentSort.direction === 'asc'
									? 'desc'
									: 'asc'
							)
						}
					>
						<Icon.Ordenation className="h-3 w-3" />
					</button>
				)}
			</div>
		),
		cell: ({ row }) => {
			if (isLoading) {
				return <Skeleton className="h-4 w-16" />;
			}
			return `$${row.getValue('listPrice')}`;
		}
	}
];
