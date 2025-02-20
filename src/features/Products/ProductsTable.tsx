'use client';

import { useState } from 'react';
import { NotFoundItem } from '~/common/components/ui/NotFoundItem';
import { ProductListCard } from '~/features/Products/components/ProductListCard';
import { Image } from '~/common/components/ui/images';
import { calculateItemPerPage } from '~/common/utils/calculateItemPerPage';
import { api } from '~/trpc/react';
import { DataGridTable } from '../../common/components/block/GenericTable/DataGridTable';
import { DataListTable } from '../../common/components/block/GenericTable/DataListTable';
import { Icon } from '../../common/components/ui/Icons/_index';
import { ViewTypeSelector } from '../../common/components/ui/ViewTypeSelector';
import { productListColumns } from './ProductListColumns';
import { ProductGridCard } from './components/ProductGridCard';
import { parseAsInteger, useQueryState } from 'nuqs';
import { usePrefetchNextPage } from '~/common/hooks/usePrefetchNextPage';
import { ProductListSkeleton } from './components/ProductListSkeleton';
import { ProductGridSkeleton } from './components/ProductGridSkeleton';
import { productGridColumns } from './ProductGridColumns';
import { skeletonProductsData } from './constants/skeletonProductsData';
import { useInfiniteScroll } from '~/common/hooks/useInfiniteScroll';

type SortState = {
	column: 'name' | 'quantity' | 'listPrice' | 'modelYear';
	direction: 'asc' | 'desc';
};

export function ProductsTable() {
	const [viewType, setViewType] = useState<'list' | 'grid'>('list');
	const [page] = useQueryState('page', parseAsInteger.withDefault(1));
	const [sort, setSort] = useState<SortState>({
		column: 'name',
		direction: 'asc'
	});

	const infiniteProducts =
		api.product.getControlledProductsInfinite.useInfiniteQuery(
			{
				limit: 8
			},
			{
				getNextPageParam: (lastPage) => lastPage.nextCursor,
				staleTime: 0,
				refetchOnMount: false,
				refetchOnWindowFocus: false
			}
		);

	const { loadMoreRef } = useInfiniteScroll({
		hasNextPage: infiniteProducts.hasNextPage,
		fetchNextPage: infiniteProducts.fetchNextPage
	});

	const handleSort = (column: string, direction: 'asc' | 'desc') => {
		setSort({
			column: column as 'name' | 'quantity' | 'listPrice' | 'modelYear',
			direction
		});
	};

	const extraItemHeight = 65;
	const maxItemPerPage = 25;
	const pageSize = Math.min(
		calculateItemPerPage(extraItemHeight),
		maxItemPerPage
	);

	const totalPagesQuery = api.product.getTotalPages.useQuery({
		pageSize
	});

	const productQuery = api.product.getProductsPaginated.useQuery(
		{
			page,
			pageSize,
			sort
		},
		{
			staleTime: 0,
			refetchOnMount: false,
			refetchOnWindowFocus: false
		}
	);

	usePrefetchNextPage({
		page,
		pageSize,
		totalPages: totalPagesQuery.data,
		resource: 'product',
		procedure: 'getProductsPaginated',
		extraParams: { sort }
	});

	const productData = productQuery.data ?? [];
	// Only show loading state on first load or when we don't have data
	const isLoading =
		productQuery.isLoading || (productQuery.isFetching && !productQuery.data);

	const columnsList = productListColumns({
		onSort: handleSort,
		currentSort: sort,
		isLoading
	});

	const columnsGrid = productGridColumns({
		onSort: handleSort,
		currentSort: sort,
		isLoading
	});

	const skeletonData = skeletonProductsData({ pageSize });

	const displayData = isLoading ? skeletonData : productData;

	const infiniteProductsData =
		infiniteProducts.data?.pages.flatMap((page) => page.items) ?? [];
	const isLoadingInfinite =
		infiniteProducts.isLoading ||
		(infiniteProducts.isFetching && !infiniteProducts.data);

	if (!productData.length && !isLoading) {
		return (
			<NotFoundItem
				href="#"
				renderImage={() => (
					<Image.NotFound className="h-[14.125rem] w-[20.625rem] md:h-[20rem] md:w-[22.625rem] lg:h-[24.0625rem] lg:w-[35rem]" />
				)}
				title="No products found?"
				description="Try to create more new products or drag xls files
to upload items list"
				textButton="Create Product"
			/>
		);
	}

	return (
		<div className="flex w-full flex-col gap-1 bg-white-300 md:block md:bg-white-100 lg:block lg:gap-[0.875rem] lg:rounded-xl">
			<ViewTypeSelector viewType={viewType} onViewChange={setViewType}>
				<button
					type="button"
					className="flex items-center gap-1 rounded-lg bg-white-100"
				>
					<Icon.MoreActions />
					<span className="font-extrabold text-black text-xs leading-[0.875rem] hover:font-semibold">
						ALL ACTIONS
					</span>
				</button>
			</ViewTypeSelector>
			{viewType === 'list' ? (
				<>
					{/* This table list is showing on desktop */}
					<DataListTable
						columns={columnsList}
						data={displayData}
						pageSize={pageSize}
						totalPages={totalPagesQuery.data}
					/>
					{/* This list is showing on mobile */}
					<div className="flex flex-col gap-1 md:hidden">
						{infiniteProductsData.map((product) => (
							<div className="px-3" key={product.id}>
								<ProductListCard {...product} />
							</div>
						))}
						{(isLoadingInfinite || infiniteProducts.isFetchingNextPage) &&
							Array.from({ length: 8 }).map((_, index) => (
								<ProductListSkeleton
									key={`product-list-skeleton-${Date.now()}-${index}`}
								/>
							))}
						{infiniteProducts.hasNextPage && (
							<div ref={loadMoreRef} className="h-10" />
						)}
					</div>
				</>
			) : (
				<>
					{/* This table grid is showing on desktop */}
					<DataGridTable
						columns={columnsGrid}
						data={displayData}
						pageSize={pageSize}
						totalPages={totalPagesQuery.data}
						CardComponent={ProductGridCard}
						isLoading={isLoading}
					/>
					{/* This grid is showing on mobile */}
					<div className="grid grid-cols-1 gap-1 px-3 md:hidden">
						{infiniteProductsData.map((product) => (
							<ProductGridCard key={product.id} {...product} />
						))}
						{(isLoadingInfinite || infiniteProducts.isFetchingNextPage) &&
							Array.from({ length: 8 }).map((_, index) => (
								<ProductGridSkeleton
									key={`product-grid-skeleton-${Date.now()}-${index}`}
								/>
							))}
						{infiniteProducts.hasNextPage && (
							<div ref={loadMoreRef} className="h-10" />
						)}
					</div>
				</>
			)}
		</div>
	);
}
