'use client';

import { dashboardListColumns } from './DashboardListColumns';
import { DataListTable } from '~/common/components/block/GenericTable/DataListTable';
import { calculateItemPerPage } from '~/common/utils/calculateItemPerPage';
import { api } from '~/trpc/react';
import { DashboardListCard } from './DashboardListCard';
import { DashboardFiltersAction } from './DashboardFiltersAction';
import { parseAsInteger, useQueryState } from 'nuqs';
import { usePrefetchNextPage } from '~/common/hooks/usePrefetchNextPage';

export function DashboardTable() {
	const [page] = useQueryState('page', parseAsInteger.withDefault(1));
	const extraItemHeight = 65;
	const maxItemPerPage = 25;
	const pageSize = Math.min(
		calculateItemPerPage(extraItemHeight),
		maxItemPerPage
	);

	const totalPagesQuery = api.orders.getTotalPages.useQuery({
		pageSize
	});

	const orderQuery = api.orders.getOrdersPaginated.useQuery({
		page,
		pageSize
	});

	usePrefetchNextPage({
		page,
		pageSize,
		totalPages: totalPagesQuery.data,
		resource: 'orders',
		procedure: 'getOrdersPaginated'
	});

	const orderData = orderQuery.data ?? [];

	return (
		<div className="flex flex-col gap-2 bg-white-300 lg:gap-0">
			<DashboardFiltersAction />
			{/* This list table is showing on desktop and tablet */}
			<DataListTable
				className="md:max-h-[calc(100vh-32rem)] lg:max-h-[calc(100vh-28rem)]"
				columns={dashboardListColumns}
				data={orderData}
				pageSize={pageSize}
				totalPages={totalPagesQuery.data}
			/>
			{/* This list table is showing on mobile */}
			{orderData.map((order) => (
				<DashboardListCard key={order.id} {...order} />
			))}
		</div>
	);
}
