import { forwardRef } from 'react';
import { cn } from '~/lib/utils';

type BadgeProps = {
	variant?: 'rounded' | 'square' | 'status';
	color?: 'green' | 'white';
	children?: React.ReactNode;
	className?: string;
};

const variants = ({ variant = 'rounded', color = 'green' }: BadgeProps) =>
	cn(
		'flex items-center justify-center px-[0.625rem] py-1 font-bold text-sm leading-5',
		{
			'rounded-xl bg-secondary-200/10 text-secondary-200':
				variant === 'rounded' && color === 'green',
			'rounded-lg bg-secondary-200/10 text-secondary-200':
				variant === 'square' && color === 'green',
			'gap-1 rounded-md bg-white-200 font-normal text-primary-200':
				variant === 'status' && color === 'white'
		}
	);

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
	({ children, className, ...rest }, ref) => {
		return (
			<div ref={ref} className={cn(variants(rest), className)}>
				{children}
			</div>
		);
	}
);

Badge.displayName = 'Badge';
