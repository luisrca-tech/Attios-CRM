import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';

export function TelephoneIcon({ className, fill = '#8181A5' }: IconProps) {
	return (
		<svg
			className={cn(className)}
			width="16"
			height="19"
			viewBox="0 0 16 19"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<svg
				width="14"
				height="15"
				viewBox="0 0 14 15"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>Telephone icon</title>
				<path
					d="M4.75 0.0625V2.875H3.625V1.75H0.25V11.875H1.375V12.4375C1.375 12.8945 1.53906 13.2871 1.86719 13.6152C2.20703 13.9551 2.60547 14.125 3.0625 14.125C3.51953 14.125 3.91211 13.9551 4.24023 13.6152C4.58008 13.2871 4.75 12.8945 4.75 12.4375V11.875H13.75V2.875H11.5V0.0625H4.75ZM5.875 1.1875H10.375V4H5.875V1.1875ZM1.375 2.875H2.5V10.75H1.375V2.875ZM3.625 4H4.75V5.125H11.5V4H12.625V10.75H3.625V4ZM5.3125 6.25V7.375H6.4375V6.25H5.3125ZM7.5625 6.25V7.375H8.6875V6.25H7.5625ZM9.8125 6.25V7.375H10.9375V6.25H9.8125ZM5.3125 8.5V9.625H6.4375V8.5H5.3125ZM7.5625 8.5V9.625H8.6875V8.5H7.5625ZM9.8125 8.5V9.625H10.9375V8.5H9.8125ZM2.5 11.875H3.625V12.4375C3.625 12.5898 3.56641 12.7246 3.44922 12.8418C3.34375 12.9473 3.21484 13 3.0625 13C2.91016 13 2.77539 12.9473 2.6582 12.8418C2.55273 12.7246 2.5 12.5898 2.5 12.4375V11.875Z"
					fill={fill}
				/>
			</svg>
		</svg>
	);
}

TelephoneIcon.displayName = 'TelephoneIcon';
