import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';

export function FunnelIcon({ className, fill = '#8181A5' }: IconProps) {
	return (
		<svg
			className={cn(className)}
			width="14"
			height="14"
			viewBox="0 0 14 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Funnel icon</title>
			<path
				d="M0.8125 0V1.31836L5.3125 6.94336V13.5L8.6875 10.9688V6.94336L13.1875 1.31836V0H0.8125ZM2.0957 1.125H11.9043L7.86133 6.1875H6.13867L2.0957 1.125ZM6.4375 7.3125H7.5625V10.4062L6.4375 11.25V7.3125Z"
				fill={fill}
			/>
		</svg>
	);
}

FunnelIcon.displayName = 'FunnelIcon';
