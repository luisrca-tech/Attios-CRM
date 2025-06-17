import Image from 'next/image';
import type { Product } from '../types/product.type';
import { ProductMoreActions } from './ProductMoreActions';
import { Checkbox } from '~/common/components/ui/checkbox';
import { cn } from '~/lib/utils';
import { useAtomValue } from 'jotai';
import { productActiveStatesAtom } from '../atoms/productAtoms';

interface ProductListCardProps {
	product: Product;
	isSelected?: boolean;
	onSelect?: (value: boolean) => void;
}

export function ProductListCard({
	product,
	isSelected,
	onSelect
}: ProductListCardProps) {
	const activeStates = useAtomValue(productActiveStatesAtom);
	const isActive = activeStates[product.id] ?? product.isActive;

	return (
		<div
			className={cn(
				'flex w-full items-center justify-between rounded-xl bg-white-100 px-[1.625rem] py-[0.6875rem] md:hidden lg:hidden',
				!isActive && 'bg-secondary-300/30'
			)}
		>
			<div className="flex items-center gap-4">
				<Checkbox
					className="hidden h-5 w-5 lg:flex"
					checked={isSelected}
					onCheckedChange={onSelect}
				/>
				<div className="h-[3.25rem] w-[3.25rem] rounded-md">
					<Image
						className="h-full w-full rounded-md object-cover"
						src={product.productImages?.[0]?.url ?? ''}
						alt={product.name}
						width={52}
						height={52}
					/>
				</div>
				<div className="flex flex-col">
					<div className="flex items-center">
						<strong className="text-base leading-6">{product.name}</strong>
					</div>
					<span className="text-primary-200 text-sm leading-5">
						{product.id}
					</span>
				</div>
			</div>
			<ProductMoreActions product={product} />
		</div>
	);
}
