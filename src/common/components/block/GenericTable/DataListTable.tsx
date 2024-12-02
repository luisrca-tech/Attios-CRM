'use client';

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable
} from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '../../ui/table';
import { Pagination } from './Pagination';

interface DataListTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pageSize?: number;
}

export function DataListTable<TData, TValue>({
	columns,
	data,
	pageSize = 8
}: DataListTableProps<TData, TValue>) {
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
		<div className="flex flex-col gap-4">
			<div className="hidden h-[calc(100vh-19rem)] w-full overflow-y-auto bg-white md:block lg:block [&::-webkit-scrollbar]:hidden">
				<Table>
					<TableHeader className="sticky top-0 z-10">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
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
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="hidden md:mb-24 md:flex lg:mb-0 lg:flex">
				<Pagination table={table} />
			</div>
		</div>
	);
}
