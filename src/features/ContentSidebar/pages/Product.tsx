'use client';

import { Icon } from '~/common/components/ui/Icons/_index';
import { Creator } from '~/common/components/ui/images/mocks/Creators';
import type { products } from '~/server/db/schema';
import { ContentSidebar } from '..';
import Image from 'next/image';
import { Button } from '~/common/components/ui/Button';
import { useGraphWaveImages } from '../mocks/GraphWaveImages';

interface ProductWithContentSidebarProps {
	product: typeof products.$inferSelect & { category: { name: string } };
}

export const ProductWithContentSidebar = ({
	product
}: ProductWithContentSidebarProps) => {
	const { blueWaveGraphForeground, whiteWaveGraphBackground } =
		useGraphWaveImages();

	return (
		<ContentSidebar.Root
			hasHeader
			headerTitle={product.name}
			headerDescription={product.sku ?? ''}
		>
			<div className="flex flex-col gap-[1.875rem]">
				<div className="flex flex-col gap-2">
					<strong className="text-sm leading-4">Description</strong>
					<p className="teext-sm font-normal text-primary-200 leading-5">
						Color is so powerful that it can persuade, motivate, inspire and
						touch people's soft spot the heart. This is the reason why
						understanding colors is pretty crucial in relating.
					</p>
				</div>
				<div className="flex flex-col gap-3">
					<strong className="text-sm leading-4">Created</strong>
					<div className="flex items-center gap-1">
						<Creator creatorNumber={1} />
						<Creator creatorNumber={2} />
						<Creator creatorNumber={3} />
					</div>
				</div>
				<div className="flex flex-col gap-5">
					<strong className="text-sm leading-4">Item details</strong>
					<div className="flex items-center gap-5">
						<Icon.Garage className="h-[1.125rem] w-[1.125rem]" />
						<span className="font-normal text-black text-sm leading-5">
							{product.quantity} available
						</span>
					</div>
					<div className="flex items-center gap-5">
						<Icon.Shop className="h-[1.125rem] w-[1.125rem]" fill="#8181A5" />
						<span className="font-normal text-black text-sm leading-5">
							1.328 sold
						</span>
					</div>
					<div className="flex items-center gap-5">
						<Icon.Wallet className="h-[1.125rem] w-[1.125rem]" />
						<span className="font-normal text-black text-sm leading-5">
							${product.listPrice} current price
						</span>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<strong className="text-sm leading-4">Categories</strong>
					<div className="flex items-center gap-1">
						<div className="rounded-lg bg-white-200 px-5 py-2">
							<span className="font-bold text-primary-200 text-sm leading-5">
								{product.category.name}
							</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<strong>Reviews</strong>
					<ContentSidebar.Card>
						<div className="flex w-full flex-col gap-3">
							<div className="flex items-center justify-between">
								<span className="font-normal text-black text-sm leading-5">
									Good
								</span>
								<div className="flex items-center gap-1">
									<span className="font-bold text-black text-sm leading-5">
										4.2
									</span>
									<span className="font-normal text-black text-sm leading-5">
										/ 5
									</span>
								</div>
							</div>
							<div className="h-1 w-full rounded-full bg-white-400">
								<div className="h-full w-[84%] rounded-full bg-secondary-200" />
							</div>
						</div>
					</ContentSidebar.Card>
				</div>
				<ContentSidebar.Graph.Dinamyc className="relative mt-10 mb-6 min-h-[12rem] py-0 pt-[1.375rem]">
					<div className="flex items-center justify-between pb-7">
						<div className="flex flex-col">
							<strong className="text-base text-black leading-6">
								Conversion history
							</strong>
							<span className="font-normal text-primary-200 text-xs leading-5">
								Week to week performance
							</span>
						</div>
						<Button
							className="h-[2.625rem] w-[2.625rem] bg-primary-200/10 p-0 hover:bg-primary-200/50"
							color="secondary"
						>
							<Icon.Graph.Pizza className="h-[1.125rem] w-[1.125rem]" />
						</Button>
					</div>
					<div className="absolute right-0 bottom-0">
						<div className='h-full w-full'>
							<Image
								src={whiteWaveGraphBackground.imageUrl ?? ''}
								alt="White background wave graph"
								className='-top-4 absolute h-full w-full'
								height={93}
								width={330}
							/>
						</div>
						<div className='h-full w-full'>
							<Image
								src={blueWaveGraphForeground.imageUrl ?? ''}
								alt="Blue foreground wave graph"
								className='h-full w-full object-cover'
								height={93}
								width={330}
							/>
						</div>
					</div>
				</ContentSidebar.Graph.Dinamyc>
			</div>
		</ContentSidebar.Root>
	);
};
