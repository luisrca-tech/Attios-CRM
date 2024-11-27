'use client';

import { useState } from 'react';
import { Ordenation } from '~/common/components/block/OrdenationActions';
import { Icon } from '~/common/components/ui/Icons/_index';
import { ViewTypeSelector } from '~/common/components/ui/ViewTypeSelector';
import { api } from '~/trpc/react';
import { ProductGridCard } from './ProductGridCard';
import { ProductListCard } from './ProductListCard';

export function ProductsList() {
	const [viewType, setViewType] = useState<'list' | 'grid'>('list');
	const ProductQuery = api.product.getAll.useQuery();
	const ProductData = ProductQuery.data;

	return (
		<div className="flex h-full w-full flex-col gap-[0.875rem] bg-white-300 lg:rounded-xl lg:bg-white-100">
			<ViewTypeSelector viewType={viewType} onViewChange={setViewType}>
				<button type="button" className="flex items-center gap-1">
					<Icon.MoreActions />
					<span className="font-extrabold text-black text-xs leading-[0.875rem]">
						ALL ACTIONS
					</span>
				</button>
			</ViewTypeSelector>
			{viewType === 'list' ? (
				<Ordenation.pages.ProductList />
			) : (
				<Ordenation.pages.ProductGrid />
			)}
			<div
				className={`flex flex-1 flex-col gap-1 overflow-y-auto px-[1.625rem] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${viewType === 'grid' ? 'gap-2 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4' : ''}`}
			>
				{ProductData?.map((_product) =>
					viewType === 'list' ? (
						<ProductListCard key={_product.id} {..._product} />
					) : (
						<ProductGridCard key={_product.id} {..._product} />
					)
				)}
			</div>
		</div>
	);
}
