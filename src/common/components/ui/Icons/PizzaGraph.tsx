import Image from 'next/image';
import PizzaGraphIconImage from '/public/icons/pizzaGraph.png';
import { cn } from '~/lib/utils';
import type { IconProps } from '~/common/types/Icons.type';

export function PizzaGraphIcon({ className }: IconProps) {
	return (
		<Image
			className={cn(className)}
			src={PizzaGraphIconImage}
			alt="Pizza Graph"
		/>
	);
}
