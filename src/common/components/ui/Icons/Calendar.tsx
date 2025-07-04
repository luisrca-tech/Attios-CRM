import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';

export function CalendarIcon({ className, fill }: IconProps) {
	return (
		<svg
			className={cn(className)}
			width="22"
			height="22"
			viewBox="0 0 16 17"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Calendar icon</title>
			<path
				d="M3.1875 0.5V1.1875H0.4375V16.3125H15.5625V1.1875H12.8125V0.5H11.4375V1.1875H4.5625V0.5H3.1875ZM1.8125 2.5625H3.1875V3.25H4.5625V2.5625H11.4375V3.25H12.8125V2.5625H14.1875V3.9375H1.8125V2.5625ZM1.8125 5.3125H14.1875V14.9375H1.8125V5.3125ZM5.9375 6.6875V8.0625H7.3125V6.6875H5.9375ZM8.6875 6.6875V8.0625H10.0625V6.6875H8.6875ZM11.4375 6.6875V8.0625H12.8125V6.6875H11.4375ZM3.1875 9.4375V10.8125H4.5625V9.4375H3.1875ZM5.9375 9.4375V10.8125H7.3125V9.4375H5.9375ZM8.6875 9.4375V10.8125H10.0625V9.4375H8.6875ZM11.4375 9.4375V10.8125H12.8125V9.4375H11.4375ZM3.1875 12.1875V13.5625H12.8125V12.1875H3.1875Z"
				fill={fill}
			/>
		</svg>
	);
}

CalendarIcon.displayName = 'CalendarIcon';
