'use client';

import {
	type ColumnDef,
	type SortingState,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type Table
} from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
import {
	useState,
	forwardRef,
	useImperativeHandle,
	type ReactNode
} from 'react';
import {
	Table as TableUI,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '../../ui/table';
import { Pagination } from './Pagination';
import { cn } from '~/lib/utils';
import { useAtomValue } from 'jotai';
import { productActiveStatesAtom } from '~/features/products/atoms/productAtoms';

interface DataListTableProps<TData extends { id: string | number }, TValue> {
	className?: string;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pageSize?: number;
	totalPages?: number;
}

export const GenericDataListTable = forwardRef(
	<TData extends { id: string | number }, TValue>(
		{
			columns,
			data,
			pageSize = 8,
			totalPages,
			className
		}: DataListTableProps<TData, TValue>,
		ref: React.ForwardedRef<Table<TData>>
	): ReactNode => {
		const [page, setPage] = useQueryState(
			'page',
			parseAsInteger.withDefault(1)
		);
		const [sorting, setSorting] = useState<SortingState>([]);
		const activeStates = useAtomValue(productActiveStatesAtom);

		const table = useReactTable({
			data,
			columns,
			getCoreRowModel: getCoreRowModel(),
			getPaginationRowModel: getPaginationRowModel(),
			getSortedRowModel: getSortedRowModel(),
			pageCount: totalPages,
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

		useImperativeHandle(ref, () => table);

		return (
			<div className="flex flex-col">
				<div
					className={cn(
						'hidden h-[calc(100vh-23rem)] w-full overflow-y-auto bg-white-100 md:block lg:block lg:h-[calc(100vh-19rem)] [&::-webkit-scrollbar]:hidden',
						className
					)}
				>
					<TableUI>
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
							{data.length ? (
								data.map((row) => {
									const tableRow = table
										.getRowModel()
										.rows.find((r) => r.original === row);
									if (!tableRow) return null;

									const rowWithIsActive = row as TData & { isActive?: boolean };
									const isActive =
										activeStates[row.id as string] ?? rowWithIsActive.isActive;

									return (
										<TableRow
											className={cn(
												'cursor-pointer',
												'isActive' in row && !isActive && 'bg-secondary-300/30'
											)}
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
					</TableUI>
				</div>

				<div className="hidden rounded-b-[0.625rem] bg-white-100 md:mb-24 md:flex lg:mb-0 lg:flex lg:pt-4">
					<Pagination table={table} />
				</div>
			</div>
		);
	}
) as <TData extends { id: string | number }, TValue>(
	props: DataListTableProps<TData, TValue> & {
		ref?: React.ForwardedRef<Table<TData>>;
	}
) => ReactNode;
