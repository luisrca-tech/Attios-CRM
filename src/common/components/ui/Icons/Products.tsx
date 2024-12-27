import type { IconProps } from '~/common/types/Icons.type';
import { cn } from '~/lib/utils';

export function ProductsIcon({ className, fill }: IconProps) {
	return (
		<svg className={cn(className)} width="22" height="22" viewBox="0 0 16 18" fill="" xmlns="http://www.w3.org/2000/svg">
			<path d="M8 0.779297L7.7207 0.908203L0.845703 4.00195L0.4375 4.17383V12.8965L8 17.1074L15.5625 12.8965V4.17383L15.1543 4.00195L8.2793 0.908203L8 0.779297ZM8 2.2832L13.2852 4.64648L8 7.28906L2.71484 4.64648L8 2.2832ZM1.8125 5.74219L7.3125 8.49219V15.1309L1.8125 12.0801V5.74219ZM14.1875 5.74219V12.0801L8.6875 15.1309V8.49219L14.1875 5.74219Z" fill={fill} />
		</svg>
);
}
