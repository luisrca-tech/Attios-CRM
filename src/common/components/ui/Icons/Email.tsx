import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';

export function EmailIcon({ className, fill = '#8181A5' }: IconProps) {
	return (
		<svg
			className={cn(className)}
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Email icon</title>
			<path
				d="M8 0.9375L7.70117 1.13086L0.6875 5.70117V15.5625H15.3125V5.70117L8.29883 1.13086L8 0.9375ZM8 2.27344L13.7305 6L8 9.70898L2.26953 6L8 2.27344ZM1.8125 7.03711L7.70117 10.8516L8 11.0449L14.1875 7.03711V14.4375H1.8125V7.03711Z"
				fill={fill}
			/>
		</svg>
	);
}

EmailIcon.displayName = 'EmailIcon';
