import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';

export function TasksIcon({ className, fill }: IconProps) {
	return (
		<svg
			className={cn(className)}
			width="16"
			height="19"
			viewBox="0 0 16 19"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Tasks icon</title>
			<path
				d="M8 0.125C7.58464 0.125 7.2194 0.261068 6.9043 0.533203C6.60352 0.776693 6.37435 1.09896 6.2168 1.5H0.4375V18.6875H15.5625V1.5H9.7832C9.62565 1.09896 9.39648 0.776693 9.0957 0.533203C8.7806 0.261068 8.41536 0.125 8 0.125ZM8 1.5C8.1862 1.5 8.34375 1.57161 8.47266 1.71484C8.61589 1.84375 8.6875 2.0013 8.6875 2.1875V2.875H10.75V4.25H5.25V2.875H7.3125V2.1875C7.3125 2.0013 7.37695 1.84375 7.50586 1.71484C7.64909 1.57161 7.8138 1.5 8 1.5ZM1.8125 2.875H3.875V5.625H12.125V2.875H14.1875V17.3125H1.8125V2.875ZM11.6309 7.88086L7.3125 12.1992L5.05664 9.94336L4.06836 10.9316L6.81836 13.6816L7.3125 14.1543L7.80664 13.6816L12.6191 8.86914L11.6309 7.88086Z"
				fill={fill}
			/>
		</svg>
	);
}

TasksIcon.displayName = 'TasksIcon';
