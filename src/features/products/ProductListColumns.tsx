import type { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Checkbox } from '~/common/components/ui/checkbox';
import { OrdenationButton } from '~/common/components/block/OrdenationButton';
import { toast } from 'sonner';
import { Skeleton } from '~/common/components/ui/skeleton';
import type { Product } from './types/product.type';
import { ProductMoreActions } from '~/features/products/components/ProductMoreActions';
import { ProductFilterDropdown } from './components/ProductFilterDropdown';
import { Button } from '~/common/components/ui/Button';
import { CategorySearchFilter } from './components/CategorySearchFilter';

export type ColumnType<TData> = ColumnDef<TData, unknown>[];

interface ProductListColumnsProps {
	onSort: (column: string, direction: 'asc' | 'desc') => void;
	currentSort: {
		column: string;
		direction: 'asc' | 'desc';
	};
	isLoading?: boolean;
	selectedProducts: string[];
	onSelectProducts: (productIds: string[]) => void;
	onFilterChange: (
		type: 'quantity' | 'price' | 'category',
		filter: string
	) => void;
}

export const productListColumns = ({
	onSort,
	currentSort,
	isLoading,
	onSelectProducts,
	onFilterChange
}: ProductListColumnsProps): ColumnDef<Product, unknown>[] => {
	const columns: ColumnDef<Product, unknown>[] = [
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
					className="h-5 w-5"
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
					className="h-5 w-5"
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
						<OrdenationButton
							column="name"
							currentDirection={
								currentSort.column === 'name'
									? currentSort.direction
									: undefined
							}
							onClick={() =>
								onSort(
									'name',
									currentSort.column === 'name' &&
										currentSort.direction === 'asc'
										? 'desc'
										: 'asc'
								)
							}
						/>
					)}
				</div>
			),
			cell: ({ row }) => {
				if (isLoading) {
					return (
						<div className="flex items-center md:gap-4 lg:gap-2 2xl:gap-4">
							<Skeleton className="h-10 w-10 rounded-md" />
							<div className="flex flex-col gap-1">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-20" />
							</div>
						</div>
					);
				}
				const product = row.original;
				const pickName =
					product.name.length > 10
						? `${product.name.slice(0, 10)}...`
						: product.name;
				return (
					<div className="flex items-center md:gap-4 lg:gap-2 2xl:gap-4">
						<Image
							src={product.productImages?.[0]?.url ?? ''}
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
			header: () => (
				<div className="flex items-center justify-around gap-4">
					<Button
						className="bg-transparent text-primary-200 hover:bg-transparent hover:text-primary-200"
						onClick={() => toast.warning('Sales order is still in development')}
					>
						Sales
					</Button>
					{isLoading ? (
						<Skeleton className="h-4 w-4" />
					) : (
						<OrdenationButton
							column="sales"
							currentDirection={
								currentSort.column === 'sales'
									? currentSort.direction
									: undefined
							}
							onClick={() =>
								toast.warning('Sales order is still in development')
							}
						/>
					)}
				</div>
			),
			cell: ({ row }) => {
				if (isLoading) {
					return <Skeleton className="h-4 w-16" />;
				}
				const fixedSales = [1250, 840, 650, 950, 750, 1100, 890, 920];
				const sales = fixedSales[row.index % fixedSales.length];
				return <div className="font-bold">{sales}</div>;
			}
		},
		{
			accessorKey: 'quantity',
			header: () => (
				<div className="flex w-full items-center justify-between gap-4">
					<ProductFilterDropdown
						text="Qty."
						type="quantity"
						filtersCondition={['Empty', 'Over 100', 'Over 1000', 'Ilimited']}
						onFilterChange={onFilterChange}
					/>
					{isLoading ? (
						<Skeleton className="h-4 w-4" />
					) : (
						<OrdenationButton
							column="quantity"
							currentDirection={
								currentSort.column === 'quantity'
									? currentSort.direction
									: undefined
							}
							onClick={() =>
								onSort(
									'quantity',
									currentSort.column === 'quantity' &&
										currentSort.direction === 'asc'
										? 'desc'
										: 'asc'
								)
							}
						/>
					)}
				</div>
			),
			cell: ({ row }) => {
				if (isLoading) {
					return <Skeleton className="h-4 w-12" />;
				}
				return <div className="font-bold">{row.original.quantity}</div>;
			}
		},
		{
			accessorKey: 'listPrice',
			header: () => (
				<div className="flex w-full items-center justify-between">
					<ProductFilterDropdown
						text="Price"
						type="price"
						filtersCondition={['Over 1000', 'Over 2000', '5000+']}
						onFilterChange={onFilterChange}
					/>
					{isLoading ? (
						<Skeleton className="h-4 w-4" />
					) : (
						<OrdenationButton
							column="listPrice"
							currentDirection={
								currentSort.column === 'listPrice'
									? currentSort.direction
									: undefined
							}
							onClick={() =>
								onSort(
									'listPrice',
									currentSort.column === 'listPrice' &&
										currentSort.direction === 'asc'
										? 'desc'
										: 'asc'
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
				return <div className="font-bold">${row.original.listPrice}</div>;
			}
		},
		{
			accessorKey: 'modelYear',
			header: () => (
				<div className="flex w-full items-center justify-between">
					Year
					{isLoading ? (
						<Skeleton className="h-4 w-4" />
					) : (
						<OrdenationButton
							column="modelYear"
							currentDirection={
								currentSort.column === 'modelYear'
									? currentSort.direction
									: undefined
							}
							onClick={() =>
								onSort(
									'modelYear',
									currentSort.column === 'modelYear' &&
										currentSort.direction === 'asc'
										? 'desc'
										: 'asc'
								)
							}
						/>
					)}
				</div>
			),
			cell: ({ row }) => {
				if (isLoading) {
					return <Skeleton className="h-4 w-12" />;
				}
				return <div className="font-bold">{row.original.modelYear}</div>;
			}
		},
		{
			accessorKey: 'category',
			header: () => (
				<div className="flex w-full items-center justify-between lg:hidden 2xl:flex">
					<CategorySearchFilter />
				</div>
			),
			cell: ({ row }) => {
				if (isLoading) {
					return (
						<div className="flex min-w-[11.25rem] items-center justify-center rounded-lg bg-white-200 px-7 py-2 lg:hidden 2xl:flex">
							<Skeleton className="h-4 w-24" />
						</div>
					);
				}
				return (
					<div className="flex min-w-[11.25rem] items-center justify-center rounded-lg bg-white-200 px-7 py-2 lg:hidden 2xl:flex">
						<span className="font-bold text-base text-primary-200 leading-5">
							{row.original.category?.name}
						</span>
					</div>
				);
			}
		},
		{
			id: 'actions',
			enableGrouping: false,
			header: () => null,
			cell: ({ row }) => {
				if (isLoading) {
					return <Skeleton className="h-9 w-9" />;
				}
				return <ProductMoreActions product={row.original} />;
			}
		}
	];
	return columns;
};
