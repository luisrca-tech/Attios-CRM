import Image from 'next/image';
import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';
import FileBrowserIconImage from '/public/icons/sidebar/fileBrowser.png';

export function FileBrowserIcon({ className }: IconProps) {
	return (
		<Image
			className={cn(className)}
			src={FileBrowserIconImage}
			alt="File browser"
		/>
	);
}
