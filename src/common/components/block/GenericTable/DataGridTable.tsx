'use client';

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable
} from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
import type { ComponentType } from 'react';
import { cn } from '~/lib/utils';
import { Table, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Pagination } from './Pagination';

interface DataGridTableProps<TData extends { id: string | number }> {
	data: TData[];
	columns: ColumnDef<TData, unknown>[];
	pageSize?: number;
	CardComponent: ComponentType<TData>;
}

export function DataGridTable<TData extends { id: string | number }>({
	data,
	columns,
	pageSize = 8,
	CardComponent
}: DataGridTableProps<TData>) {
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		pageCount: Math.ceil(data.length / pageSize),
		initialState: {
			pagination: {
				pageSize,
				pageIndex: page - 1
			}
		},
		onPaginationChange: (updater) => {
			if (typeof updater === 'function') {
				const newState = updater(table.getState().pagination);
				setPage(newState.pageIndex + 1);
			}
		},
		manualPagination: true
	});

	const start = (page - 1) * pageSize;
	const end = start + pageSize;
	const paginatedData = data.slice(start, end);

	return (
		<div className="hidden flex-col gap-6 md:flex">
			<Table>
				<TableHeader className="sticky top-0 z-10">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id} className={cn('w-10 px-7')}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
			</Table>

			<div className="grid h-[calc(100vh-30rem)] grid-cols-1 gap-4 overflow-y-auto px-7 sm:grid-cols-2 lg:h-[calc(100vh-23.5rem)] lg:grid-cols-3 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
				{paginatedData.map((item) => (
					<div key={item.id}>
						<CardComponent {...item} />
					</div>
				))}
			</div>

			<div className="flex w-full items-center justify-between md:mb-24 lg:mb-0">
				<Pagination table={table} />
			</div>
		</div>
	);
}
