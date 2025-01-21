import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';

export function MessagesIcon({ className, fill }: IconProps) {
	return (
		<svg
			className={cn(className)}
			width="20"
			height="18"
			viewBox="0 0 20 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M0.375 0.1875V11.1875H3.125V14.6895L7.48633 11.1875H14.125V0.1875H0.375ZM1.75 1.5625H12.75V9.8125H7.01367L4.5 11.8105V9.8125H1.75V1.5625ZM15.5 2.9375V4.3125H18.25V12.5625H15.5V14.5605L12.9863 12.5625H7.83008L6.11133 13.9375H12.5137L16.875 17.4395V13.9375H19.625V2.9375H15.5Z"
				fill={fill}
			/>
		</svg>
	);
}
