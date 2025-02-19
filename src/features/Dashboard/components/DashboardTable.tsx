'use client';

import { dashboardListColumns } from './DashboardListColumns';

import { DataListTable } from '~/common/components/block/GenericTable/DataListTable';
import { calculateItemPerPage } from '~/common/utils/calculateItemPerPage';
import { api } from '~/trpc/react';
import { DashboardListCard } from './DashboardListCard';
import { DashboardFiltersAction } from './DashboardFiltersAction';

export function DashboardTable() {
	const orderQuery = api.orders.getOrders.useQuery({
		limit: 100
	});
	const extraItemHeight = 65;
	const itemPerPage = calculateItemPerPage(extraItemHeight);
	const maxItemPerPage = 25;

	const orderData = orderQuery.data?.items ?? [];

	return (
		<div className="flex flex-col gap-2 bg-white-300 lg:gap-0">
			<DashboardFiltersAction />
			{/* This list table is showing on desktop and tablet */}
			<DataListTable
				className="md:max-h-[calc(100vh-32rem)] lg:max-h-[calc(100vh-28rem)]"
				columns={dashboardListColumns}
				data={orderData}
				pageSize={Math.min(itemPerPage, maxItemPerPage)}
			/>
			{/* This list table is showing on mobile */}
			{orderData.map((order) => (
				<DashboardListCard key={order.id} {...order} />
			))}
		</div>
	);
}
