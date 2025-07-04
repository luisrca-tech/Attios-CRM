import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';

export function ProjectsIcon({ className, fill }: IconProps) {
	return (
		<svg
			className={cn(className)}
			width="22"
			height="22"
			viewBox="0 0 20 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Projects icon</title>
			<path
				d="M7.9375 0.1875C7.5651 0.1875 7.24284 0.323568 6.9707 0.595703C6.69857 0.867839 6.5625 1.1901 6.5625 1.5625V2.9375H0.375V15.3125H19.625V2.9375H13.4375V1.5625C13.4375 1.1901 13.3014 0.867839 13.0293 0.595703C12.7572 0.323568 12.4349 0.1875 12.0625 0.1875H7.9375ZM7.9375 1.5625H12.0625V2.9375H7.9375V1.5625ZM1.75 4.3125H18.25V7.75H15.5V7.0625H12.75V7.75H7.25V7.0625H4.5V7.75H1.75V4.3125ZM1.75 9.125H4.5V9.8125H7.25V9.125H12.75V9.8125H15.5V9.125H18.25V13.9375H1.75V9.125Z"
				fill={fill}
			/>
		</svg>
	);
}

ProjectsIcon.displayName = 'ProjectsIcon';
