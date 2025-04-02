import Image from 'next/image';
import { Checkbox } from '~/common/components/ui/checkbox';
import { Icon } from '~/common/components/ui/Icons/_index';
import type { Product } from '../types/product.type';
import { ProductMoreActions } from './ProductMoreActions';

interface ProductGridCardProps {
	product: Product;
	isSelected?: boolean;
	onSelect?: (value: boolean) => void;
}

export function ProductGridCard({
	product,
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

				<ProductMoreActions product={product} />
			</div>
			<div className="flex flex-col items-center justify-center gap-4">
				<Image
					src={product.productImages?.[0]?.url ?? ''}
					alt={product.name}
					width={80}
					height={80}
					className="3xl:h-32 h-20 3xl:w-32 w-20 rounded-lg"
				/>
				<div className="flex flex-col items-center">
					<div className="flex items-center gap-1">
						<strong className="text-base leading-6">{product.name}</strong>
						<span className="font-bold text-sm leading-5">
							{product.modelYear}
						</span>
					</div>
					<span className="3xl:text-base text-primary-200 text-sm leading-5">
						{product.id}
					</span>
				</div>
			</div>
			<div className="3xl:mt-8 mt-4 flex w-full border-white-400 border-t">
				<div className="flex flex-1 items-center justify-center border-white-400 border-r py-4">
					<span className="font-bold 3xl:text-lg text-base leading-6">
						{product.quantity}
					</span>
				</div>
				<div className="flex flex-1 items-center justify-center py-4">
					<span className="font-bold 3xl:text-lg text-base leading-6">
						${product.listPrice}
					</span>
				</div>
			</div>
		</div>
	);
}
