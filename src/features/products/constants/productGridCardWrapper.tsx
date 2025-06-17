import { ProductGridCard } from '../components/ProductGridCard';
import type { Product } from '../types/product.type';

export const ProductGridCardWrapper = (
	props: Product & {
		isSelected?: boolean;
		onSelect?: (value: boolean) => void;
		isLoading?: boolean;
	}
) => {
	return (
		<ProductGridCard
			product={props}
			isSelected={props.isSelected}
			onSelect={props.onSelect}
		/>
	);
};
