import type { InferSelectModel } from 'drizzle-orm';
import Image from 'next/image';
import { Checkbox } from '~/common/components/ui/checkbox';
import type { products } from '~/server/db/schema';
import { Button } from './Button';
import { Icon } from './Icons/_index';

type Product = InferSelectModel<typeof products> & {
	category?: { name: string };
	productImages?: { url: string }[];
};

interface ProductGridCardProps
	extends Pick<
		Product,
		'productImages' | 'id' | 'name' | 'modelYear' | 'quantity' | 'listPrice' | 'category' | 'sku'
	> {
	isSelected?: boolean;
	onSelect?: (value: boolean) => void;
}

export function ProductGridCard({
	productImages,
	id,
	name,
	modelYear,
	quantity,
	listPrice,
	isSelected,
	onSelect
}: ProductGridCardProps) {

	return (
		<div className="flex h-full flex-col justify-between rounded-xl bg-white-100 lg:border lg:border-white-400">
			<div className="flex justify-between p-4">
				<Checkbox
					className="hidden h-5 w-5 lg:flex"
					checked={isSelected}
					onCheckedChange={onSelect}
				/>
				<Icon.Sidebar.Products className="h-4 w-4 lg:hidden" />
				
				<Button color="septenary" className="h-9 w-9 border border-white-200">
					<Icon.MoreActions />
				</Button>
			</div>
				<div className="flex flex-col items-center justify-center gap-4">
					<Image
						src={productImages?.[0]?.url ?? ''}
						alt={name}
						width={80}
						height={80}
						className="h-20 w-20 rounded-lg 3xl:h-32 3xl:w-32"
					/>
					<div className="flex flex-col items-center">
						<div className="flex items-center gap-1">
							<strong className="text-base leading-6">{name}</strong>
							<span className="font-bold text-sm leading-5">{modelYear}</span>
						</div>
						<span className="text-primary-200 text-sm leading-5 3xl:text-base">{id}</span>
					</div>
				</div>
			<div className="mt-4 flex w-full border-white-400 border-t 3xl:mt-8">
				<div className="flex flex-1 items-center justify-center border-white-400 border-r py-4">
					<span className="font-bold text-base leading-6 3xl:text-lg">{quantity}</span>
				</div>
				<div className="flex flex-1 items-center justify-center py-4">
					<span className="font-bold text-base leading-6 3xl:text-lg">${listPrice}</span>
				</div>
			</div>
		</div>
	);
}
