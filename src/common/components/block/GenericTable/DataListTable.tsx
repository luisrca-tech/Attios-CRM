'use client';

import {
	type ColumnDef,
	type SortingState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '../../ui/table';
import { Pagination } from './Pagination';
import { cn } from '~/lib/utils';

interface DataListTableProps<TData, TValue> {
	className?: string;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pageSize?: number;
}

export function DataListTable<TData, TValue>({
	columns,
	data,
	pageSize = 8,
	className
}: DataListTableProps<TData, TValue>) {
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		pageCount: Math.ceil(data.length / pageSize),
		state: {
			sorting
		},
		onSortingChange: setSorting,
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

	const sortedData = table.getSortedRowModel().rows.map((row) => row.original);

	const start = (page - 1) * pageSize;
	const end = start + pageSize;
	const paginatedData = sortedData.slice(start, end);

	return (
		<div className="flex flex-col">
			<div
				className={cn(
					'hidden h-[calc(100vh-23rem)] w-full overflow-y-auto bg-white-100 md:block lg:block lg:h-[calc(100vh-19rem)] [&::-webkit-scrollbar]:hidden',
					className
				)}
			>
				<Table>
					<TableHeader className="sticky top-0 z-10 bg-white-300">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead
										className="font-bold text-primary-200 text-xs leading-[1.125rem]"
										key={header.id}
									>
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
					<TableBody>
						{paginatedData.length ? (
							paginatedData.map((row) => {
								const tableRow = table
									.getRowModel()
									.rows.find((r) => r.original === row);
								if (!tableRow) return null;

								return (
									<TableRow
										key={tableRow.id}
										data-state={tableRow.getIsSelected() && 'selected'}
									>
										{tableRow.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								);
							})
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="hidden rounded-b-[0.625rem] bg-white-100 md:mb-24 md:flex lg:mb-0 lg:flex lg:pt-4">
				<Pagination table={table} />
			</div>
		</div>
	);
}
