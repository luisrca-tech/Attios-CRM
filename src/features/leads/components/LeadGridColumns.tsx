import type { ColumnDef } from '@tanstack/react-table';
import { Icon } from '~/common/components/ui/Icons/_index';
import { Skeleton } from '~/common/components/ui/skeleton';
import type { Lead } from '../types/lead.type';

export type ColumnType<TData> = ColumnDef<TData, unknown>[];

interface LeadGridColumnsProps {
	onSort: (column: string, direction: 'asc' | 'desc') => void;
	currentSort: {
		column: string;
		direction: 'asc' | 'desc';
	};
	isLoading?: boolean;
}

export const leadGridColumns = ({
	onSort,
	currentSort,
	isLoading
}: LeadGridColumnsProps): ColumnDef<Lead, unknown>[] => [
	{
		accessorFn: (row) => `${row.firstName} ${row.lastName}`,
		id: 'name',
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
			return `${row.original.firstName} ${row.original.lastName}`;
		}
	},
	{
		accessorKey: 'email',
		header: () => (
			<div className="flex items-center justify-between">
				<span>Email</span>
				{isLoading ? (
					<Skeleton className="h-4 w-4" />
				) : (
					<button
						type="button"
						onClick={() =>
							onSort(
								'email',
								currentSort.column === 'email' &&
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
			return row.original.email;
		}
	},
	{
		accessorKey: 'role',
		header: () => (
			<div className="flex items-center justify-between">
				<span>Tag</span>
				{isLoading ? (
					<Skeleton className="h-4 w-4" />
				) : (
					<button
						type="button"
						onClick={() =>
							onSort(
								'role',
								currentSort.column === 'role' && currentSort.direction === 'asc'
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
			return row.original.role;
		}
	}
];
