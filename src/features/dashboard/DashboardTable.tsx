'use client';

import { dashboardListColumns } from './DashboardListColumns';
import { GenericDataListTable } from '~/common/components/block/GenericTable/DataListTable';
import { calculateItemPerPage } from '~/common/utils/calculateItemPerPage';
import { api } from '~/trpc/react';
import { DashboardListCard } from './components/DashboardListCard';
import { DashboardFiltersAction } from './components/DashboardFiltersAction';
import { parseAsInteger, useQueryState } from 'nuqs';
import { usePrefetchNextPage } from '~/common/hooks/usePrefetchNextPage';
import { DashboardListSkeleton } from './components/DashboardListSkeleton';
import { skeletonOrdersData } from './constants/skeletonOrdersData';
import { useInfiniteScroll } from '~/common/hooks/useInfiniteScroll';

type TimeFrame = 'day' | 'week' | 'month';

export function DashboardTable() {
	const [page] = useQueryState('page', parseAsInteger.withDefault(1));
	const [timeFrame, setTimeFrame] = useQueryState<TimeFrame | null>(
		'timeFrame',
		{
			defaultValue: null,
			parse: (value) => value as TimeFrame,
			serialize: (value) => value || ''
		}
	);

	const infiniteOrders =
		api.orders.getControlledOrdersInfinite.useInfiniteQuery(
			{
				limit: 8,
				timeFrame: timeFrame || undefined
			},
			{
				getNextPageParam: (lastPage) => lastPage.nextCursor,
				staleTime: 0,
				refetchOnMount: false,
				refetchOnWindowFocus: false
			}
		);

	const { loadMoreRef } = useInfiniteScroll({
		canLoadMore: infiniteOrders.hasNextPage,
		fetchMore: infiniteOrders.fetchNextPage
	});

	const extraItemHeight = 65;
	const maxItemPerPage = 25;
	const pageSize = Math.min(
		calculateItemPerPage(extraItemHeight),
		maxItemPerPage
	);

	const totalPagesQuery = api.orders.getTotalPages.useQuery({
		pageSize,
		timeFrame: timeFrame || undefined
	});

	const orderQuery = api.orders.getOrdersPaginated.useQuery({
		page,
		pageSize,
		timeFrame: timeFrame || undefined
	});

	usePrefetchNextPage({
		page,
		pageSize,
		totalPages: totalPagesQuery.data,
		resource: 'orders',
		procedure: 'getOrdersPaginated',
		extraParams: { timeFrame: timeFrame || undefined }
	});

	const orderData = orderQuery.data ?? [];
	const infiniteOrdersData =
		infiniteOrders.data?.pages.flatMap((page) => page.items) ?? [];

	const isLoading =
		orderQuery.isLoading || (orderQuery.isFetching && !orderQuery.data);
	const isLoadingInfinite =
		infiniteOrders.isLoading ||
		(infiniteOrders.isFetching && !infiniteOrders.data);

	const columns = dashboardListColumns({ isLoading });
	const skeletonData = skeletonOrdersData({ pageSize });
	const displayData = isLoading ? skeletonData : orderData;

	return (
		<div className="flex flex-col gap-2 bg-white-300 lg:gap-0">
			<DashboardFiltersAction
				onTimeFrameChange={setTimeFrame}
				selectedTimeFrame={timeFrame || undefined}
			/>
			{/* This list table is showing on desktop and tablet */}
			<GenericDataListTable
				className="md:max-h-[calc(100vh-28rem)]"
				columns={columns}
				data={displayData}
				pageSize={pageSize}
				totalPages={totalPagesQuery.data}
			/>
			{/* This list table is showing on mobile */}
			<div className="flex flex-col gap-1 md:hidden">
				{infiniteOrdersData.map((order) => (
					<DashboardListCard key={order.id} {...order} />
				))}
				{(isLoadingInfinite || infiniteOrders.isFetchingNextPage) &&
					Array.from({ length: 8 }).map((_, index) => (
						<DashboardListSkeleton
							key={`dashboard-skeleton-${Date.now()}-${index}`}
						/>
					))}
				{infiniteOrders.hasNextPage && (
					<div ref={loadMoreRef} className="h-10" />
				)}
			</div>
		</div>
	);
}
