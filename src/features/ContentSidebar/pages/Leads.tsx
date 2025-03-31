'use client';

import Image from 'next/image';
import { cn } from '~/lib/utils';
import { ContentSidebar } from '..';
import { useGraphWaveImages } from '../mocks/GraphWaveImages';
import { LeadsOverview } from '../mocks/LeadsOverview';
import { getCategoryColor } from '../constants/categoryColors';

export default function LeadsWithSidebar() {
	const { productsGraph } = useGraphWaveImages();

	return (
		<ContentSidebar.Root
			hasHeader
			headerTitle="Attios CRM"
			headerDescription="8484 Rooss Wells"
		>
			<div className="mb-10 flex flex-col gap-5">
				<div className="flex flex-col">
					<strong className="text-base text-black leading-6">
						Leads overview
					</strong>
					<span className="font-normal text-primary-200 text-sm leading-5">
						Your employees and clients details
					</span>
				</div>
				<div className="flex flex-col gap-[0.375rem]">
					{LeadsOverview.map((category) => (
						<ContentSidebar.Card className="bg-white-200/40" key={category.id}>
							<div className="flex w-full items-center justify-between py-1">
								<div className="flex flex-col">
									<strong className="text-lg leading-7">
										{category.quantity}
									</strong>
									<span className="font-normal text-primary-200 text-sm leading-5">
										{category.name}
									</span>
								</div>
								{/* TODO: Seek a better way to handle this */}
								<div
									className={cn(
										'rounded-[0.625rem] p-4',
										getCategoryColor(category.name)
									)}
								>
									{category.icon}
								</div>
							</div>
						</ContentSidebar.Card>
					))}
				</div>
			</div>
			<div className="flex flex-col">
				<strong className="text-base leading-6">Conversion history</strong>
				<span className="teext-sm font-normal text-primary-200 leading-5">
					Week to week
				</span>
				<span className="teext-sm font-normal text-primary-200 leading-5">
					performance
				</span>
				<ContentSidebar.Graph.Dinamyc className="flex items-center justify-center p-0">
					<div className="px-[1.4375rem] py-[1.375rem]">
						<Image
							src={productsGraph.imageUrl ?? ''}
							alt="Products graph"
							width={176}
							height={176}
						/>
					</div>
					<ContentSidebar.Graph.MetricContainer
						leftMetric={
							<ContentSidebar.Graph.Metric
								value="$342.000"
								metric="Total sales"
							/>
						}
						rightMetric={
							<ContentSidebar.Graph.Metric
								value="$200.000"
								metric="Spendings"
							/>
						}
					/>
				</ContentSidebar.Graph.Dinamyc>
			</div>
		</ContentSidebar.Root>
	);
}
