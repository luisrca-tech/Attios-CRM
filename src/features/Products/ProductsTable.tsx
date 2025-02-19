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
import { columnsGrid } from './ProductGridColumns';
import { productListColumns } from './ProductListColumns';
import { ProductGridCard } from './components/ProductGridCard';

export function ProductsTable() {
	const [viewType, setViewType] = useState<'list' | 'grid'>('list');
	const ProductQuery = api.product.getAll.useQuery();
	const ProductData = ProductQuery.data ?? [];

	const extraItemHeight = 65;
	const itemPerPage = calculateItemPerPage(extraItemHeight);
	const maxItemPerPage = 25;

	if (!ProductQuery.data && !ProductQuery.isLoading) {
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
						columns={productListColumns}
						data={ProductData}
						pageSize={Math.min(itemPerPage, maxItemPerPage)}
					/>
					{/* This list is showing on mobile */}
					{ProductData.map((product) => (
						<div className="flex flex-col gap-1 px-3" key={product.id}>
							<ProductListCard {...product} />
						</div>
					))}
				</>
			) : (
				<>
					{/* This table grid is showing on desktop */}
					<DataGridTable
						data={ProductData}
						columns={columnsGrid}
						pageSize={8}
						CardComponent={ProductGridCard}
					/>
					{/* This grid is showing on mobile */}
					{ProductData.map((product) => (
						<div
							className="grid grid-cols-1 gap-1 px-3 md:hidden"
							key={product.id}
						>
							<ProductGridCard {...product} />
						</div>
					))}
				</>
			)}
		</div>
	);
}
