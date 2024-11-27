import type { InferSelectModel } from 'drizzle-orm';
import Image from 'next/image';
import { ListItemCard } from '~/common/components/ui/ListItemCard';
import { Checkbox } from '~/common/components/ui/checkbox';
import type { products } from '~/server/db/schema';
import { Button } from '../../common/components/ui/Button';
import { Icon } from '../../common/components/ui/Icons/_index';
type Product = InferSelectModel<typeof products>;

export function ProductListCard({
	productImage,
	id,
	name,
	modelYear,
	quantity,
	listPrice,
	category
}: Pick<
	Product,
	'productImage' | 'id' | 'name' | 'modelYear' | 'quantity' | 'listPrice'
> & {
	category?: { name: string };
}) {
	const randomSales = Math.floor(Math.random() * 1000);
	const pickName = name.length > 10 ? `${name.slice(0, 10)}...` : name;

	return (
		<div className="flex 3xl:grid-cols-[auto_0.8fr_repeat(3,minmax(140px,140px))_200px_40px] items-center justify-between rounded-xl bg-white-100 px-[0.875rem] py-[0.9375rem] lg:grid lg:grid-cols-[auto_0.8fr_repeat(1,minmax(3.75rem,6.25rem))_11.25rem_2.5rem] lg:border lg:border-white-400 lg:p-[1.125rem] xl:grid-cols-[auto_0.9fr_repeat(3,minmax(2.5rem,4.375rem))_11.25rem_2.5rem] 2xl:grid-cols-[auto_0.8fr_repeat(3,minmax(80px,90px))_180px_40px]">
			<Checkbox className="hidden lg:mr-5 lg:flex" />
			<div className="flex gap-4">
				<Image
					src={productImage ?? ''}
					alt={name}
					width={52}
					height={52}
					className="h-[3.25rem] w-[3.25rem] rounded-md"
				/>
				<div className="flex flex-col">
					<div className="flex gap-1">
						<strong className="text-base leading-6 2xl:hidden">
							{pickName}
						</strong>
						<strong className="hidden 2xl:flex">{name}</strong>
						<span className="font-bold text-base leading-6 lg:hidden xl:flex">
							{modelYear}
						</span>
					</div>
					<span className="font-normal text-primary-200 text-sm uppercase leading-5">
						{id}
					</span>
				</div>
			</div>
			<div className="lg:hidden xl:flex">
				<ListItemCard metricValue={`${randomSales}`} metricLabel="Sales" />
			</div>
			<ListItemCard metricValue={`${quantity}`} metricLabel="Qty." />
			<ListItemCard
				metricValue={`$${listPrice}`}
				metricLabel="Price"
				className="font-bold"
			/>
			<div className="3xl:flex hidden items-center justify-center rounded-lg bg-white-200 px-7 py-2 lg:hidden xl:flex 2xl:flex">
				<span className="font-bold text-base text-primary-200 leading-5">
					{category?.name}
				</span>
			</div>
			<Button color="septenary" className="h-9 w-9 border border-white-200">
				<Icon.MoreActions />
			</Button>
		</div>
	);
}
