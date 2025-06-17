'use client';

import type { Table } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
import {
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Pagination as PaginationRoot
} from '~/common/components/ui/pagination';
import { Icon } from '../../ui/Icons/_index';

interface PaginationProps<TData> {
	table: Table<TData>;
}

export function Pagination<TData>({ table }: PaginationProps<TData>) {
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
	const totalPages = table.getPageCount();

	function generatePaginationNumbers(current: number, total: number) {
		const siblingsCount = 1;
		const numbersToShow = siblingsCount * 2 + 3;
		const pages: (number | 'ellipsis')[] = [];

		if (total <= numbersToShow) {
			return Array.from({ length: total }, (_, i) => i + 1);
		}

		pages.push(1);

		const leftSiblingIndex = Math.max(current - siblingsCount, 1);
		const rightSiblingIndex = Math.min(current + siblingsCount, total);

		const shouldShowLeftEllipsis = leftSiblingIndex > 2;
		const shouldShowRightEllipsis = rightSiblingIndex < total - 1;

		if (shouldShowLeftEllipsis) {
			pages.push('ellipsis');
		}

		for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
			if (i !== 1 && i !== total) {
				pages.push(i);
			}
		}

		if (shouldShowRightEllipsis) {
			pages.push('ellipsis');
		}

		if (total !== 1) {
			pages.push(total);
		}

		return pages;
	}

	const paginationRange = generatePaginationNumbers(page, totalPages);
	const isFirstPage = page === 1;
	const isLastPage = page === totalPages;

	const handlePageChange = async (pageNumber: number) => {
		await setPage(pageNumber);
		table.setPageIndex(pageNumber - 1);
	};

	const getPageHref = (pageNum: number) => {
		return `?page=${pageNum}`;
	};

	return (
		<PaginationRoot className="p-7">
			<PaginationContent className="flex w-full items-center justify-between">
				<PaginationItem>
					<div className="flex items-center gap-2">
						{isFirstPage ? (
							<PaginationLink className="h-8 w-8 bg-opacity-50 px-0" href="#">
								<Icon.Arrow.Left />
							</PaginationLink>
						) : (
							<PaginationPrevious
								href={getPageHref(page - 1)}
								aria-disabled={!table.getCanPreviousPage()}
								onClick={(e) => {
									e.preventDefault();
									handlePageChange(page - 1);
								}}
							/>
						)}
						<span className="font-normal text-primary-200 text-sm leading-5">
							Prev
						</span>
					</div>
				</PaginationItem>

				<div className="flex items-center justify-center gap-2">
					{paginationRange.map((pageNumber) => (
						<PaginationItem
							key={
								pageNumber === 'ellipsis'
									? `ellipsis-${Math.random()}`
									: `page-${pageNumber}`
							}
						>
							{pageNumber === 'ellipsis' ? (
								<PaginationEllipsis />
							) : (
								<PaginationLink
									className="h-8 w-8 px-0 hover:bg-primary-100 hover:text-white-100"
									href={getPageHref(pageNumber)}
									isActive={page === pageNumber}
									onClick={(e) => {
										e.preventDefault();
										handlePageChange(pageNumber);
									}}
								>
									{pageNumber}
								</PaginationLink>
							)}
						</PaginationItem>
					))}
				</div>

				<PaginationItem>
					<div className="flex items-center gap-2">
						<span className="font-normal text-primary-200 text-sm leading-5">
							Next
						</span>
						{isLastPage ? (
							<PaginationLink className="h-8 w-8 bg-opacity-50 px-0" href="#">
								<Icon.Arrow.Right />
							</PaginationLink>
						) : (
							<PaginationNext
								href={getPageHref(page + 1)}
								onClick={(e) => {
									e.preventDefault();
									handlePageChange(page + 1);
								}}
							/>
						)}
					</div>
				</PaginationItem>
			</PaginationContent>
		</PaginationRoot>
	);
}
