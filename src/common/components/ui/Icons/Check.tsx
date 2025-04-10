import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';

export function CheckIcon({ className, fill = '#7CE7AC' }: IconProps) {
	return (
		<svg
			className={cn(className)}
			width="14"
			height="15"
			viewBox="0 0 14 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<svg
				width="16"
				height="13"
				viewBox="0 0 16 13"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>Check icon</title>
				<path
					d="M14.9082 0.783203L5.1875 10.5039L1.0918 6.4082L0.283203 7.2168L4.7832 11.7168L5.1875 12.1035L5.5918 11.7168L15.7168 1.5918L14.9082 0.783203Z"
					fill={fill}
				/>
			</svg>
		</svg>
	);
}

CheckIcon.displayName = 'CheckIcon';
