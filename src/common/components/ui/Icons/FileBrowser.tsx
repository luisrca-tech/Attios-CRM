import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';

export function FileBrowserIcon({ className, fill }: IconProps) {
	return (
		<svg
			className={cn(className)}
			width="22"
			height="22"
			viewBox="0 0 16 20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>File browser icon</title>
			<path
				d="M0.4375 0.8125V17.8711L10.0625 19.8691V18H14.1875V9.36328L15.3691 8.18164L15.5625 7.9668V0.8125H0.4375ZM6.71094 2.1875H14.1875V7.38672L13.0059 8.56836L12.8125 8.7832V16.625H10.0625V10.502L9.86914 10.2871L8.6875 9.10547V2.68164L6.71094 2.1875ZM1.8125 2.38086L7.3125 3.75586V9.68555L7.50586 9.90039L8.6875 11.082V18.1934L1.8125 16.7539V2.38086Z"
				fill={fill}
			/>
		</svg>
	);
}

FileBrowserIcon.displayName = 'FileBrowserIcon';
